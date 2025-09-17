/**
 * File Validation System
 * 고급 파일 검증 및 보안 시스템
 */

class FileValidator {
    constructor() {
        this.validationRules = {
            // MIME 타입별 시그니처
            mimeSignatures: {
                'image/jpeg': ['FFD8FFE0', 'FFD8FFE1', 'FFD8FFDB'],
                'image/png': ['89504E47'],
                'image/gif': ['47494638'],
                'application/pdf': ['25504446'],
                'application/zip': ['504B0304', '504B0506', '504B0708'],
                'video/mp4': ['00000020667479706D70'],
                'video/webm': ['1A45DFA3']
            },

            // 위험한 확장자
            dangerousExtensions: [
                '.exe', '.bat', '.cmd', '.scr', '.pif', '.com', '.jar',
                '.js', '.vbs', '.ps1', '.sh', '.php', '.asp', '.jsp'
            ],

            // 최대 파일 크기 (바이트)
            maxFileSizes: {
                image: 10 * 1024 * 1024,     // 10MB
                document: 25 * 1024 * 1024,  // 25MB
                video: 100 * 1024 * 1024     // 100MB
            }
        };

        this.quarantineFiles = [];
    }

    /**
     * 종합 파일 검증
     */
    async validateFile(file) {
        const results = {
            isValid: true,
            securityLevel: 'safe',
            warnings: [],
            errors: [],
            fileInfo: {
                name: file.name,
                size: file.size,
                type: file.type,
                lastModified: new Date(file.lastModified)
            }
        };

        try {
            // 1. 기본 검증
            const basicValidation = this.performBasicValidation(file);
            if (!basicValidation.isValid) {
                results.isValid = false;
                results.errors.push(...basicValidation.errors);
                return results;
            }

            // 2. 확장자 검증
            const extensionValidation = this.validateExtension(file.name);
            if (!extensionValidation.isValid) {
                results.isValid = false;
                results.securityLevel = 'dangerous';
                results.errors.push(...extensionValidation.errors);
                return results;
            }

            // 3. MIME 타입 검증
            const mimeValidation = await this.validateMimeType(file);
            if (!mimeValidation.isValid) {
                results.warnings.push(...mimeValidation.warnings);
                if (mimeValidation.severity === 'high') {
                    results.isValid = false;
                    results.securityLevel = 'suspicious';
                    results.errors.push(...mimeValidation.errors);
                }
            }

            // 4. 파일 헤더 검증
            const headerValidation = await this.validateFileHeader(file);
            if (!headerValidation.isValid) {
                results.warnings.push(...headerValidation.warnings);
                if (headerValidation.severity === 'high') {
                    results.securityLevel = 'suspicious';
                }
            }

            // 5. 크기 검증
            const sizeValidation = this.validateFileSize(file);
            if (!sizeValidation.isValid) {
                results.warnings.push(...sizeValidation.warnings);
            }

            // 6. 파일명 검증
            const nameValidation = this.validateFileName(file.name);
            if (!nameValidation.isValid) {
                results.warnings.push(...nameValidation.warnings);
            }

        } catch (error) {
            results.isValid = false;
            results.errors.push(`검증 중 오류 발생: ${error.message}`);
        }

        return results;
    }

    /**
     * 기본 검증
     */
    performBasicValidation(file) {
        const errors = [];

        // 파일 객체 유효성
        if (!file || !file.name || file.size === undefined) {
            errors.push('유효하지 않은 파일 객체입니다.');
        }

        // 빈 파일 검사
        if (file.size === 0) {
            errors.push('빈 파일은 업로드할 수 없습니다.');
        }

        return {
            isValid: errors.length === 0,
            errors
        };
    }

    /**
     * 확장자 검증
     */
    validateExtension(fileName) {
        const errors = [];
        const extension = fileName.substring(fileName.lastIndexOf('.')).toLowerCase();

        // 위험한 확장자 검사
        if (this.validationRules.dangerousExtensions.includes(extension)) {
            errors.push(`위험한 파일 확장자입니다: ${extension}`);
            this.quarantineFile(fileName, 'dangerous_extension');
        }

        // 이중 확장자 검사
        const parts = fileName.split('.');
        if (parts.length > 2) {
            const secondExt = '.' + parts[parts.length - 2].toLowerCase();
            if (this.validationRules.dangerousExtensions.includes(secondExt)) {
                errors.push(`숨겨진 위험한 확장자 발견: ${secondExt}`);
            }
        }

        return {
            isValid: errors.length === 0,
            errors
        };
    }

    /**
     * MIME 타입 검증
     */
    async validateMimeType(file) {
        const warnings = [];
        const errors = [];
        let severity = 'low';

        const declaredType = file.type;
        const fileExtension = this.getFileExtension(file.name);

        // MIME 타입과 확장자 불일치 검사
        const expectedMimeTypes = this.getExpectedMimeTypes(fileExtension);
        if (expectedMimeTypes.length > 0 && !expectedMimeTypes.includes(declaredType)) {
            warnings.push(`MIME 타입 불일치: 확장자(${fileExtension})와 선언된 타입(${declaredType})이 일치하지 않습니다.`);
            severity = 'medium';
        }

        // 실제 파일 시그니처 검증
        try {
            const actualMimeType = await this.detectMimeTypeFromContent(file);
            if (actualMimeType && actualMimeType !== declaredType) {
                warnings.push(`파일 내용과 선언된 MIME 타입이 일치하지 않습니다. 실제: ${actualMimeType}, 선언: ${declaredType}`);
                severity = 'high';

                if (this.isSuspiciousMimeTypeMismatch(actualMimeType, declaredType)) {
                    errors.push('악성 파일일 가능성이 있습니다.');
                    this.quarantineFile(file.name, 'mime_type_mismatch');
                }
            }
        } catch (error) {
            warnings.push(`MIME 타입 검증 중 오류: ${error.message}`);
        }

        return {
            isValid: errors.length === 0,
            warnings,
            errors,
            severity
        };
    }

    /**
     * 파일 헤더 검증
     */
    async validateFileHeader(file) {
        return new Promise((resolve) => {
            const reader = new FileReader();
            const warnings = [];
            let severity = 'low';

            reader.onload = (e) => {
                try {
                    const arrayBuffer = e.target.result;
                    const uint8Array = new Uint8Array(arrayBuffer.slice(0, 20));
                    const header = Array.from(uint8Array).map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase();

                    // 알려진 시그니처와 비교
                    const detectedType = this.detectTypeFromSignature(header);
                    const fileExtension = this.getFileExtension(file.name);

                    if (detectedType) {
                        const expectedTypes = this.getExpectedTypesFromExtension(fileExtension);
                        if (!expectedTypes.includes(detectedType)) {
                            warnings.push(`파일 시그니처 불일치: ${fileExtension} 파일이지만 ${detectedType} 시그니처를 가집니다.`);
                            severity = 'medium';
                        }
                    } else {
                        warnings.push('알 수 없는 파일 시그니처입니다.');
                    }

                    resolve({
                        isValid: true,
                        warnings,
                        severity,
                        signature: header.substring(0, 16)
                    });

                } catch (error) {
                    resolve({
                        isValid: false,
                        warnings: [`헤더 검증 실패: ${error.message}`],
                        severity: 'high'
                    });
                }
            };

            reader.onerror = () => {
                resolve({
                    isValid: false,
                    warnings: ['파일 헤더를 읽을 수 없습니다.'],
                    severity: 'high'
                });
            };

            reader.readAsArrayBuffer(file.slice(0, 20));
        });
    }

    /**
     * 파일 크기 검증
     */
    validateFileSize(file) {
        const warnings = [];
        const fileType = this.categorizeFileType(file.name);
        const maxSize = this.validationRules.maxFileSizes[fileType];

        if (maxSize && file.size > maxSize) {
            warnings.push(`파일 크기가 제한을 초과합니다: ${this.formatFileSize(file.size)} (최대: ${this.formatFileSize(maxSize)})`);
        }

        // 의심스럽게 큰 파일 검사 (100MB 이상)
        if (file.size > 100 * 1024 * 1024) {
            warnings.push('비정상적으로 큰 파일입니다. 검토가 필요합니다.');
        }

        return {
            isValid: warnings.length === 0,
            warnings
        };
    }

    /**
     * 파일명 검증
     */
    validateFileName(fileName) {
        const warnings = [];

        // 특수문자 검사
        const dangerousChars = /[<>:"|?*\x00-\x1f]/;
        if (dangerousChars.test(fileName)) {
            warnings.push('파일명에 위험한 특수문자가 포함되어 있습니다.');
        }

        // 긴 파일명 검사
        if (fileName.length > 255) {
            warnings.push('파일명이 너무 깁니다.');
        }

        // 숨겨진 파일 검사
        if (fileName.startsWith('.')) {
            warnings.push('숨겨진 파일입니다.');
        }

        // Unicode 제어 문자 검사
        const controlChars = /[\u0000-\u001f\u007f-\u009f]/;
        if (controlChars.test(fileName)) {
            warnings.push('파일명에 제어 문자가 포함되어 있습니다.');
        }

        return {
            isValid: warnings.length === 0,
            warnings
        };
    }

    /**
     * 파일 격리
     */
    quarantineFile(fileName, reason) {
        this.quarantineFiles.push({
            fileName,
            reason,
            timestamp: new Date().toISOString()
        });
        console.warn(`파일 격리: ${fileName} (사유: ${reason})`);
    }

    /**
     * 유틸리티 메서드들
     */
    getFileExtension(fileName) {
        return fileName.substring(fileName.lastIndexOf('.')).toLowerCase();
    }

    categorizeFileType(fileName) {
        const ext = this.getFileExtension(fileName);
        const imageExts = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
        const videoExts = ['.mp4', '.webm', '.ogg', '.avi', '.mov'];
        const docExts = ['.pdf', '.doc', '.docx', '.txt'];

        if (imageExts.includes(ext)) return 'image';
        if (videoExts.includes(ext)) return 'video';
        if (docExts.includes(ext)) return 'document';
        return 'unknown';
    }

    formatFileSize(bytes) {
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        if (bytes === 0) return '0 Bytes';
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
    }

    detectTypeFromSignature(signature) {
        for (const [mimeType, signatures] of Object.entries(this.validationRules.mimeSignatures)) {
            for (const sig of signatures) {
                if (signature.startsWith(sig)) {
                    return mimeType;
                }
            }
        }
        return null;
    }

    getExpectedMimeTypes(extension) {
        const mimeMap = {
            '.jpg': ['image/jpeg'],
            '.jpeg': ['image/jpeg'],
            '.png': ['image/png'],
            '.gif': ['image/gif'],
            '.pdf': ['application/pdf'],
            '.mp4': ['video/mp4'],
            '.webm': ['video/webm']
        };
        return mimeMap[extension] || [];
    }

    getExpectedTypesFromExtension(extension) {
        const typeMap = {
            '.jpg': ['image/jpeg'],
            '.jpeg': ['image/jpeg'],
            '.png': ['image/png'],
            '.gif': ['image/gif'],
            '.pdf': ['application/pdf']
        };
        return typeMap[extension] || [];
    }

    async detectMimeTypeFromContent(file) {
        // 실제 구현에서는 더 정교한 MIME 타입 감지 로직 필요
        // 여기서는 기본적인 시그니처 검사만 수행
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const arrayBuffer = e.target.result;
                const uint8Array = new Uint8Array(arrayBuffer.slice(0, 20));
                const header = Array.from(uint8Array).map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase();

                const detectedType = this.detectTypeFromSignature(header);
                resolve(detectedType);
            };
            reader.readAsArrayBuffer(file.slice(0, 20));
        });
    }

    isSuspiciousMimeTypeMismatch(actual, declared) {
        // 실행 파일이 이미지로 위장하는 경우 등을 감지
        const suspiciousCombinations = [
            { actual: 'application/x-executable', declared: 'image/jpeg' },
            { actual: 'application/zip', declared: 'image/png' }
        ];

        return suspiciousCombinations.some(combo =>
            combo.actual === actual && combo.declared === declared
        );
    }

    /**
     * 격리된 파일 목록 조회
     */
    getQuarantinedFiles() {
        return this.quarantineFiles;
    }

    /**
     * 격리 목록 초기화
     */
    clearQuarantine() {
        this.quarantineFiles = [];
    }
}

// 전역 인스턴스 생성
window.fileValidator = new FileValidator();
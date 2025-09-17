/**
 * File Processing System
 * 다중 파일 처리 및 검증 시스템
 */

class FileProcessor {
    constructor() {
        this.supportedFormats = {
            documents: ['.pdf', '.doc', '.docx', '.txt'],
            images: ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'],
            videos: ['.mp4', '.webm', '.ogg', '.avi', '.mov']
        };

        this.maxFileSize = {
            document: 10 * 1024 * 1024,  // 10MB
            image: 5 * 1024 * 1024,      // 5MB
            video: 50 * 1024 * 1024      // 50MB
        };

        this.processedFiles = {
            documents: [],
            images: [],
            videos: []
        };
    }

    /**
     * 파일 타입 검증
     */
    validateFile(file) {
        const fileName = file.name.toLowerCase();
        const fileSize = file.size;

        // 파일 확장자 확인
        const fileType = this.getFileType(fileName);
        if (!fileType) {
            return {
                valid: false,
                error: `지원하지 않는 파일 형식입니다: ${fileName}`
            };
        }

        // 파일 크기 확인
        const maxSize = this.maxFileSize[fileType];
        if (fileSize > maxSize) {
            return {
                valid: false,
                error: `파일 크기가 너무 큽니다: ${fileName} (최대 ${this.formatFileSize(maxSize)})`
            };
        }

        return {
            valid: true,
            type: fileType,
            category: this.getFileCategory(fileName)
        };
    }

    /**
     * 파일 타입 확인
     */
    getFileType(fileName) {
        const ext = this.getFileExtension(fileName);

        if (this.supportedFormats.documents.includes(ext)) return 'document';
        if (this.supportedFormats.images.includes(ext)) return 'image';
        if (this.supportedFormats.videos.includes(ext)) return 'video';

        return null;
    }

    /**
     * 파일 카테고리 확인
     */
    getFileCategory(fileName) {
        const ext = this.getFileExtension(fileName);

        for (const [category, extensions] of Object.entries(this.supportedFormats)) {
            if (extensions.includes(ext)) {
                return category;
            }
        }

        return 'unknown';
    }

    /**
     * 파일 확장자 추출
     */
    getFileExtension(fileName) {
        return fileName.substring(fileName.lastIndexOf('.')).toLowerCase();
    }

    /**
     * 파일 크기 포맷팅
     */
    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';

        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    /**
     * 다중 파일 처리
     */
    async processFiles(files) {
        const results = {
            success: [],
            errors: [],
            summary: {
                documents: 0,
                images: 0,
                videos: 0,
                totalSize: 0
            }
        };

        for (let i = 0; i < files.length; i++) {
            const file = files[i];

            try {
                const validation = this.validateFile(file);

                if (!validation.valid) {
                    results.errors.push({
                        file: file.name,
                        error: validation.error
                    });
                    continue;
                }

                const processedFile = await this.processIndividualFile(file, validation);

                if (processedFile.success) {
                    results.success.push(processedFile);
                    results.summary[validation.category]++;
                    results.summary.totalSize += file.size;

                    // 카테고리별로 저장
                    this.processedFiles[validation.category].push(processedFile);
                } else {
                    results.errors.push({
                        file: file.name,
                        error: processedFile.error
                    });
                }

            } catch (error) {
                results.errors.push({
                    file: file.name,
                    error: `처리 중 오류 발생: ${error.message}`
                });
            }
        }

        return results;
    }

    /**
     * 개별 파일 처리
     */
    async processIndividualFile(file, validation) {
        const fileData = {
            id: this.generateFileId(),
            name: file.name,
            size: file.size,
            type: validation.type,
            category: validation.category,
            uploadTime: new Date().toISOString(),
            success: false
        };

        try {
            switch (validation.type) {
                case 'document':
                    fileData.content = await this.processDocument(file);
                    break;
                case 'image':
                    fileData.content = await this.processImage(file);
                    break;
                case 'video':
                    fileData.content = await this.processVideo(file);
                    break;
            }

            fileData.success = true;
            return fileData;

        } catch (error) {
            return {
                ...fileData,
                error: error.message
            };
        }
    }

    /**
     * 문서 파일 처리
     */
    async processDocument(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = async (e) => {
                try {
                    let content = '';

                    if (file.type === 'text/plain') {
                        content = e.target.result;
                    } else if (file.type === 'application/pdf') {
                        // PDF 처리는 추후 PDF.js 라이브러리 사용
                        content = '[PDF 파일 - 텍스트 추출 예정]';
                    } else {
                        // DOC/DOCX 처리는 추후 mammoth.js 라이브러리 사용
                        content = '[Word 문서 - 텍스트 추출 예정]';
                    }

                    resolve({
                        textContent: content,
                        wordCount: content.split(/\s+/).length,
                        contentType: 'text'
                    });

                } catch (error) {
                    reject(new Error(`문서 처리 실패: ${error.message}`));
                }
            };

            reader.onerror = () => reject(new Error('파일 읽기 실패'));

            if (file.type === 'text/plain') {
                reader.readAsText(file);
            } else {
                reader.readAsArrayBuffer(file);
            }
        });
    }

    /**
     * 이미지 파일 처리
     */
    async processImage(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = (e) => {
                const img = new Image();

                img.onload = () => {
                    resolve({
                        dataUrl: e.target.result,
                        dimensions: {
                            width: img.width,
                            height: img.height
                        },
                        aspectRatio: img.width / img.height,
                        contentType: 'image'
                    });
                };

                img.onerror = () => reject(new Error('이미지 로딩 실패'));
                img.src = e.target.result;
            };

            reader.onerror = () => reject(new Error('파일 읽기 실패'));
            reader.readAsDataURL(file);
        });
    }

    /**
     * 비디오 파일 처리
     */
    async processVideo(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = (e) => {
                const video = document.createElement('video');

                video.onloadedmetadata = () => {
                    resolve({
                        dataUrl: e.target.result,
                        duration: video.duration,
                        dimensions: {
                            width: video.videoWidth,
                            height: video.videoHeight
                        },
                        contentType: 'video'
                    });
                };

                video.onerror = () => reject(new Error('비디오 로딩 실패'));
                video.src = e.target.result;
            };

            reader.onerror = () => reject(new Error('파일 읽기 실패'));
            reader.readAsDataURL(file);
        });
    }

    /**
     * 고유 파일 ID 생성
     */
    generateFileId() {
        return 'file_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    /**
     * 처리된 파일 목록 조회
     */
    getProcessedFiles(category = null) {
        if (category) {
            return this.processedFiles[category] || [];
        }
        return this.processedFiles;
    }

    /**
     * 처리된 파일 초기화
     */
    clearProcessedFiles() {
        this.processedFiles = {
            documents: [],
            images: [],
            videos: []
        };
    }

    /**
     * 파일 처리 통계
     */
    getProcessingStats() {
        const stats = {
            totalFiles: 0,
            totalSize: 0,
            byCategory: {}
        };

        for (const [category, files] of Object.entries(this.processedFiles)) {
            stats.byCategory[category] = {
                count: files.length,
                size: files.reduce((sum, file) => sum + file.size, 0)
            };
            stats.totalFiles += files.length;
            stats.totalSize += stats.byCategory[category].size;
        }

        return stats;
    }
}

// 전역 인스턴스 생성
window.fileProcessor = new FileProcessor();
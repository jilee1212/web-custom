/**
 * Upload Demo Main Controller
 * 파일 업로드 데모의 메인 컨트롤러
 */

class UploadDemo {
    constructor() {
        this.currentStep = 1;
        this.uploadedFiles = [];
        this.analysisResults = null;

        this.initializeElements();
        this.bindEvents();
        this.setupDragAndDrop();
    }

    /**
     * DOM 요소 초기화
     */
    initializeElements() {
        this.elements = {
            uploadZone: document.getElementById('uploadZone'),
            fileInput: document.getElementById('fileInput'),
            uploadProgress: document.getElementById('uploadProgress'),
            progressFill: document.getElementById('progressFill'),
            progressText: document.getElementById('progressText'),
            fileList: document.getElementById('fileList'),
            fileItems: document.getElementById('fileItems'),
            analysisSection: document.getElementById('analysisSection'),
            analysisStats: document.getElementById('analysisStats'),
            sectionMapping: document.getElementById('sectionMapping'),
            unmatchedContent: document.getElementById('unmatchedContent'),
            actionButtons: document.getElementById('actionButtons'),
            resetBtn: document.getElementById('resetBtn'),
            generateBtn: document.getElementById('generateBtn'),
            loadingOverlay: document.getElementById('loadingOverlay'),
            loadingMessage: document.getElementById('loadingMessage'),
            notification: document.getElementById('notification'),
            previewModal: document.getElementById('previewModal'),
            modalClose: document.getElementById('modalClose'),
            modalBody: document.getElementById('modalBody')
        };
    }

    /**
     * 이벤트 바인딩
     */
    bindEvents() {
        // 파일 선택
        this.elements.fileInput.addEventListener('change', (e) => {
            this.handleFileSelection(e.target.files);
        });

        // 업로드 존 클릭
        this.elements.uploadZone.addEventListener('click', () => {
            this.elements.fileInput.click();
        });

        // 브라우저 텍스트 클릭
        document.querySelector('.browse-text').addEventListener('click', (e) => {
            e.stopPropagation();
            this.elements.fileInput.click();
        });

        // 액션 버튼
        this.elements.resetBtn.addEventListener('click', () => {
            this.resetDemo();
        });

        this.elements.generateBtn.addEventListener('click', () => {
            this.generateWebsite();
        });

        // 모달 닫기
        this.elements.modalClose.addEventListener('click', () => {
            this.closeModal();
        });

        this.elements.previewModal.addEventListener('click', (e) => {
            if (e.target === this.elements.previewModal) {
                this.closeModal();
            }
        });

        // ESC 키로 모달 닫기
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.elements.previewModal.style.display === 'block') {
                this.closeModal();
            }
        });
    }

    /**
     * 드래그 앤 드롭 설정
     */
    setupDragAndDrop() {
        const uploadZone = this.elements.uploadZone;

        // 드래그 이벤트 방지
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            uploadZone.addEventListener(eventName, this.preventDefaults, false);
            document.body.addEventListener(eventName, this.preventDefaults, false);
        });

        // 드래그 오버 효과
        ['dragenter', 'dragover'].forEach(eventName => {
            uploadZone.addEventListener(eventName, () => {
                uploadZone.classList.add('dragover');
            }, false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            uploadZone.addEventListener(eventName, () => {
                uploadZone.classList.remove('dragover');
            }, false);
        });

        // 파일 드롭
        uploadZone.addEventListener('drop', (e) => {
            const files = e.dataTransfer.files;
            this.handleFileSelection(files);
        }, false);
    }

    /**
     * 기본 이벤트 방지
     */
    preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    /**
     * 파일 선택 처리
     */
    async handleFileSelection(files) {
        if (files.length === 0) return;

        this.showLoading('파일을 업로드하고 있습니다...');
        this.updateStep(2);

        try {
            // 파일 검증 및 처리
            const results = await this.processFiles(files);

            this.hideLoading();

            if (results.success.length > 0) {
                this.displayFileList(results);
                this.showNotification('파일 업로드가 완료되었습니다!', 'success');

                // 컨텐츠 분석 시작
                setTimeout(() => {
                    this.analyzeContent(results.success);
                }, 1000);
            } else {
                this.showNotification('업로드할 수 있는 파일이 없습니다.', 'error');
                this.updateStep(1);
            }

        } catch (error) {
            this.hideLoading();
            this.showNotification(`업로드 중 오류가 발생했습니다: ${error.message}`, 'error');
            this.updateStep(1);
        }
    }

    /**
     * 파일 처리
     */
    async processFiles(files) {
        this.showUploadProgress();

        const results = {
            success: [],
            errors: []
        };

        for (let i = 0; i < files.length; i++) {
            const file = files[i];

            try {
                console.log(`Processing file: ${file.name}, size: ${file.size}, type: ${file.type}`);

                // 파일 검증 (단순화)
                const validation = this.simpleValidateFile(file);

                if (!validation.valid) {
                    results.errors.push({
                        file: file.name,
                        error: validation.error
                    });
                    continue;
                }

                // 파일 처리 (단순화)
                const processResult = await this.simpleProcessFile(file);

                if (processResult.success) {
                    results.success.push(processResult);
                } else {
                    results.errors.push({
                        file: file.name,
                        error: processResult.error
                    });
                }

            } catch (error) {
                console.error(`Error processing file ${file.name}:`, error);
                results.errors.push({
                    file: file.name,
                    error: error.message
                });
            }

            // 진행률 업데이트
            const progress = ((i + 1) / files.length) * 100;
            this.updateUploadProgress(progress);
        }

        this.hideUploadProgress();

        // 기존 파일에 새로운 파일 추가
        this.uploadedFiles = [...this.uploadedFiles, ...results.success];

        return results;
    }

    /**
     * 단순화된 파일 검증
     */
    simpleValidateFile(file) {
        const supportedTypes = ['.pdf', '.doc', '.docx', '.txt', '.jpg', '.jpeg', '.png', '.gif', '.webp', '.mp4', '.webm', '.ogg'];
        const fileName = file.name.toLowerCase();
        const fileExtension = fileName.substring(fileName.lastIndexOf('.'));

        if (!supportedTypes.includes(fileExtension)) {
            return { valid: false, error: '지원하지 않는 파일 형식입니다.' };
        }

        if (file.size > 50 * 1024 * 1024) { // 50MB 제한
            return { valid: false, error: '파일 크기가 너무 큽니다 (최대 50MB).' };
        }

        return { valid: true };
    }

    /**
     * 단순화된 파일 처리
     */
    async simpleProcessFile(file) {
        return new Promise((resolve) => {
            const reader = new FileReader();
            const fileName = file.name.toLowerCase();
            const fileType = this.getSimpleFileType(fileName);

            const result = {
                id: 'file_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
                name: file.name,
                size: file.size,
                type: fileType,
                category: this.getSimpleFileCategory(fileName),
                uploadTime: new Date().toISOString(),
                success: true,
                content: {}
            };

            if (fileType === 'image') {
                reader.onload = (e) => {
                    const img = new Image();
                    img.onload = () => {
                        result.content = {
                            dataUrl: e.target.result,
                            dimensions: { width: img.width, height: img.height },
                            aspectRatio: img.width / img.height,
                            contentType: 'image'
                        };
                        resolve(result);
                    };
                    img.src = e.target.result;
                };
                reader.readAsDataURL(file);
            } else if (fileType === 'document') {
                if (file.type === 'text/plain') {
                    reader.onload = (e) => {
                        result.content = {
                            textContent: e.target.result,
                            wordCount: e.target.result.split(/\s+/).length,
                            contentType: 'text'
                        };
                        resolve(result);
                    };
                    reader.readAsText(file);
                } else {
                    // PDF, DOC 등은 임시로 파일명만 저장
                    result.content = {
                        textContent: `[${file.type || 'Document'} 파일 - ${file.name}]`,
                        wordCount: 0,
                        contentType: 'text'
                    };
                    resolve(result);
                }
            } else if (fileType === 'video') {
                reader.onload = (e) => {
                    result.content = {
                        dataUrl: e.target.result,
                        duration: 60, // 임시 값
                        dimensions: { width: 640, height: 480 }, // 임시 값
                        contentType: 'video'
                    };
                    resolve(result);
                };
                reader.readAsDataURL(file);
            } else {
                result.content = { contentType: 'unknown' };
                resolve(result);
            }
        });
    }

    getSimpleFileType(fileName) {
        const ext = fileName.substring(fileName.lastIndexOf('.')).toLowerCase();
        if (['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext)) return 'image';
        if (['.mp4', '.webm', '.ogg'].includes(ext)) return 'video';
        if (['.pdf', '.doc', '.docx', '.txt'].includes(ext)) return 'document';
        return 'unknown';
    }

    getSimpleFileCategory(fileName) {
        const ext = fileName.substring(fileName.lastIndexOf('.')).toLowerCase();
        if (['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext)) return 'images';
        if (['.mp4', '.webm', '.ogg'].includes(ext)) return 'videos';
        if (['.pdf', '.doc', '.docx', '.txt'].includes(ext)) return 'documents';
        return 'unknown';
    }

    /**
     * 컨텐츠 분석 (단순화)
     */
    async analyzeContent(files) {
        this.showLoading('AI가 컨텐츠를 분석하고 있습니다...');

        try {
            // 단순화된 분석 결과 생성
            this.analysisResults = this.simpleAnalyzeContent(files);

            // 약간의 지연으로 분석 과정 시뮬레이션
            setTimeout(() => {
                this.hideLoading();
                this.displayAnalysisResults();
                this.updateStep(3);
                this.showActionButtons();
                this.showNotification('컨텐츠 분석이 완료되었습니다!', 'success');
            }, 1500);

        } catch (error) {
            this.hideLoading();
            this.showNotification(`분석 중 오류가 발생했습니다: ${error.message}`, 'error');
        }
    }

    /**
     * 단순화된 컨텐츠 분석
     */
    simpleAnalyzeContent(files) {
        const sections = {};
        const unmatchedContent = [];

        files.forEach(file => {
            // 파일명 기반 섹션 매칭
            const fileName = file.name.toLowerCase();
            let matchedSection = null;

            if (fileName.includes('회사') || fileName.includes('소개') || fileName.includes('about') || fileName.includes('company')) {
                matchedSection = 'hero';
            } else if (fileName.includes('서비스') || fileName.includes('service') || fileName.includes('solution')) {
                matchedSection = 'services';
            } else if (fileName.includes('팀') || fileName.includes('team') || fileName.includes('직원')) {
                matchedSection = 'team';
            } else if (fileName.includes('연락') || fileName.includes('contact') || fileName.includes('주소')) {
                matchedSection = 'contact';
            } else if (fileName.includes('포트폴리오') || fileName.includes('portfolio') || fileName.includes('프로젝트')) {
                matchedSection = 'portfolio';
            } else if (file.type === 'image') {
                matchedSection = 'gallery';
            } else if (file.type === 'video') {
                matchedSection = 'hero';
            } else {
                // 텍스트 내용 기반 매칭
                if (file.content && file.content.textContent) {
                    const text = file.content.textContent.toLowerCase();
                    if (text.includes('회사') || text.includes('소개') || text.includes('비전') || text.includes('미션')) {
                        matchedSection = 'hero';
                    } else if (text.includes('서비스') || text.includes('솔루션')) {
                        matchedSection = 'services';
                    } else if (text.includes('팀') || text.includes('직원') || text.includes('구성원')) {
                        matchedSection = 'team';
                    } else if (text.includes('연락처') || text.includes('주소') || text.includes('전화')) {
                        matchedSection = 'contact';
                    }
                }
            }

            if (matchedSection) {
                if (!sections[matchedSection]) {
                    sections[matchedSection] = [];
                }
                sections[matchedSection].push({
                    ...file,
                    matchConfidence: 0.8,
                    matchedKeywords: ['자동매칭']
                });
            } else {
                unmatchedContent.push(file);
            }
        });

        return {
            sections: sections,
            unmatchedContent: unmatchedContent,
            confidence: Object.keys(sections).length > 0 ? 0.8 : 0.3
        };
    }

    /**
     * 파일 목록 표시
     */
    displayFileList(results) {
        this.elements.fileList.style.display = 'block';
        this.elements.fileItems.innerHTML = '';

        // 성공한 파일들
        results.success.forEach(file => {
            const fileElement = this.createFileItem(file, 'success');
            this.elements.fileItems.appendChild(fileElement);
        });

        // 실패한 파일들
        results.errors.forEach(error => {
            const fileElement = this.createFileItem(error, 'error');
            this.elements.fileItems.appendChild(fileElement);
        });
    }

    /**
     * 파일 아이템 생성
     */
    createFileItem(file, status) {
        const div = document.createElement('div');
        div.className = 'file-item';

        const isSuccess = status === 'success';
        const fileName = isSuccess ? file.name : file.file;
        const fileSize = isSuccess ? this.formatFileSize(file.size) : '';
        const fileType = isSuccess ? file.category : 'unknown';

        div.innerHTML = `
            <div class="file-icon ${fileType}">
                <i class="fas ${this.getFileIcon(fileType)}"></i>
            </div>
            <div class="file-info">
                <div class="file-name">${fileName}</div>
                <div class="file-details">
                    ${isSuccess ? `${fileSize} • ${file.type}` : file.error}
                </div>
            </div>
            <div class="file-status ${status}">
                ${isSuccess ? '성공' : '실패'}
            </div>
            ${isSuccess ? `
                <div class="file-actions">
                    <button class="file-action preview" onclick="uploadDemo.previewFile('${file.id}')">
                        미리보기
                    </button>
                    <button class="file-action remove" onclick="uploadDemo.removeFile('${file.id}')">
                        제거
                    </button>
                </div>
            ` : ''}
        `;

        return div;
    }

    /**
     * 분석 결과 표시
     */
    displayAnalysisResults() {
        this.elements.analysisSection.style.display = 'block';

        // 통계 표시
        this.displayAnalysisStats();

        // 섹션 매핑 표시
        this.displaySectionMapping();

        // 매칭되지 않은 컨텐츠 표시
        this.displayUnmatchedContent();
    }

    /**
     * 분석 통계 표시
     */
    displayAnalysisStats() {
        const totalContent = this.uploadedFiles.length;
        const matchedSections = Object.keys(this.analysisResults.sections).length;
        const confidence = this.analysisResults.confidence;
        const unmatchedCount = this.analysisResults.unmatchedContent.length;

        this.elements.analysisStats.innerHTML = `
            <div class="stat-card">
                <div class="stat-number">${totalContent}</div>
                <div class="stat-label">처리된 파일</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${matchedSections}</div>
                <div class="stat-label">매칭된 섹션</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${Math.round(confidence * 100)}%</div>
                <div class="stat-label">분석 신뢰도</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${unmatchedCount}</div>
                <div class="stat-label">미매칭 컨텐츠</div>
            </div>
        `;
    }

    /**
     * 섹션 매핑 표시
     */
    displaySectionMapping() {
        const sections = this.analysisResults.sections;
        let html = '';

        for (const [sectionName, contents] of Object.entries(sections)) {
            if (contents.length === 0) continue;

            const avgConfidence = contents.reduce((sum, c) => sum + (c.matchConfidence || 0.5), 0) / contents.length;

            html += `
                <div class="section-item">
                    <div class="section-title">
                        <span><i class="fas fa-layer-group"></i> ${this.getSectionDisplayName(sectionName)}</span>
                        <span class="confidence-badge">${Math.round(avgConfidence * 100)}%</span>
                    </div>
                    <div class="section-content">
                        ${contents.map(content => this.createContentPreview(content)).join('')}
                    </div>
                </div>
            `;
        }

        this.elements.sectionMapping.innerHTML = html || '<p>매칭된 섹션이 없습니다.</p>';
    }

    /**
     * 매칭되지 않은 컨텐츠 표시
     */
    displayUnmatchedContent() {
        const unmatched = this.analysisResults.unmatchedContent;

        if (unmatched.length > 0) {
            const html = `
                <h4><i class="fas fa-question-circle"></i> 매칭되지 않은 컨텐츠 (${unmatched.length}개)</h4>
                <div class="section-content">
                    ${unmatched.map(content => this.createContentPreview(content)).join('')}
                </div>
            `;
            this.elements.unmatchedContent.innerHTML = html;
        } else {
            this.elements.unmatchedContent.innerHTML = '';
        }
    }

    /**
     * 컨텐츠 미리보기 생성
     */
    createContentPreview(content) {
        const type = content.contentType;
        let preview = '';

        switch (type) {
            case 'document':
                preview = content.originalText ?
                    content.originalText.substring(0, 150) + '...' :
                    '텍스트 컨텐츠';
                break;
            case 'image':
                preview = `이미지: ${content.dimensions.width} × ${content.dimensions.height}px`;
                break;
            case 'video':
                preview = `비디오: ${Math.round(content.duration)}초, ${content.dimensions.width} × ${content.dimensions.height}px`;
                break;
            default:
                preview = content.sourceFile;
        }

        return `
            <div class="content-preview ${type}" onclick="uploadDemo.previewFile('${content.fileId}')">
                <strong>${content.sourceFile}</strong><br>
                ${preview}
            </div>
        `;
    }

    /**
     * 단계 업데이트
     */
    updateStep(step) {
        this.currentStep = step;

        document.querySelectorAll('.step').forEach((stepEl, index) => {
            stepEl.classList.toggle('active', index + 1 <= step);
        });
    }

    /**
     * 업로드 진행률 표시
     */
    showUploadProgress() {
        this.elements.uploadProgress.style.display = 'block';
        this.updateUploadProgress(0);
    }

    updateUploadProgress(percent) {
        this.elements.progressFill.style.width = `${percent}%`;
        this.elements.progressText.textContent = `업로드 중... ${Math.round(percent)}%`;
    }

    hideUploadProgress() {
        this.elements.uploadProgress.style.display = 'none';
    }

    /**
     * 로딩 오버레이
     */
    showLoading(message) {
        this.elements.loadingMessage.textContent = message;
        this.elements.loadingOverlay.style.display = 'flex';
    }

    hideLoading() {
        this.elements.loadingOverlay.style.display = 'none';
    }

    /**
     * 액션 버튼 표시
     */
    showActionButtons() {
        this.elements.actionButtons.style.display = 'flex';
    }

    /**
     * 알림 메시지 표시
     */
    showNotification(message, type = 'info') {
        const notification = this.elements.notification;
        notification.textContent = message;
        notification.className = `notification ${type}`;
        notification.classList.add('show');

        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }

    /**
     * 파일 미리보기
     */
    previewFile(fileId) {
        const file = this.uploadedFiles.find(f => f.id === fileId);
        if (!file) return;

        let content = '';

        switch (file.type) {
            case 'image':
                content = `<img src="${file.content.dataUrl}" style="max-width: 100%; height: auto;">`;
                break;
            case 'video':
                content = `<video controls style="max-width: 100%;"><source src="${file.content.dataUrl}"></video>`;
                break;
            case 'document':
                content = `
                    <div style="white-space: pre-wrap; font-family: monospace; max-height: 400px; overflow-y: auto;">
                        ${file.content.textContent || '텍스트를 추출할 수 없습니다.'}
                    </div>
                `;
                break;
            default:
                content = `<p>미리보기를 지원하지 않는 파일 형식입니다.</p>`;
        }

        this.elements.modalBody.innerHTML = content;
        this.elements.previewModal.style.display = 'block';
    }

    /**
     * 모달 닫기
     */
    closeModal() {
        this.elements.previewModal.style.display = 'none';
    }

    /**
     * 파일 제거
     */
    removeFile(fileId) {
        this.uploadedFiles = this.uploadedFiles.filter(f => f.id !== fileId);

        // 파일 목록 다시 표시
        if (this.uploadedFiles.length > 0) {
            this.displayFileList({ success: this.uploadedFiles, errors: [] });
        } else {
            this.elements.fileList.style.display = 'none';
            this.resetDemo();
        }
    }

    /**
     * 웹사이트 생성
     */
    generateWebsite() {
        this.showLoading('웹사이트를 생성하고 있습니다...');

        // 실제 구현에서는 분석 결과를 기반으로 템플릿에 컨텐츠를 적용
        setTimeout(() => {
            this.hideLoading();
            this.showNotification('웹사이트가 성공적으로 생성되었습니다!', 'success');

            // 새 창에서 생성된 웹사이트 열기 (임시)
            window.open('../templates/modified/eventre-business-test/index.html', '_blank');
        }, 3000);
    }

    /**
     * 데모 재설정
     */
    resetDemo() {
        this.uploadedFiles = [];
        this.analysisResults = null;
        this.currentStep = 1;

        // UI 재설정
        this.updateStep(1);
        this.elements.fileList.style.display = 'none';
        this.elements.analysisSection.style.display = 'none';
        this.elements.actionButtons.style.display = 'none';
        this.elements.fileInput.value = '';

        // 컨텐츠 분석기 초기화
        window.contentAnalyzer.analysisResults = {
            sections: {},
            unmatchedContent: [],
            confidence: 0
        };

        this.showNotification('데모가 재설정되었습니다.', 'info');
    }

    /**
     * 유틸리티 메서드들
     */
    formatFileSize(bytes) {
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        if (bytes === 0) return '0 Bytes';
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
    }

    getFileIcon(category) {
        const icons = {
            documents: 'fa-file-alt',
            images: 'fa-image',
            videos: 'fa-video',
            unknown: 'fa-file'
        };
        return icons[category] || icons.unknown;
    }

    getSectionDisplayName(sectionName) {
        const names = {
            hero: '메인 섹션',
            services: '서비스',
            portfolio: '포트폴리오',
            team: '팀 소개',
            testimonials: '고객 후기',
            contact: '연락처',
            gallery: '갤러리',
            news: '뉴스/공지'
        };
        return names[sectionName] || sectionName;
    }
}

// 페이지 로드 후 초기화
document.addEventListener('DOMContentLoaded', () => {
    window.uploadDemo = new UploadDemo();
});
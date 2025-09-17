/**
 * AI Integration for Main Website
 * 메인 웹사이트에서 AI 기능 통합
 */

class AIIntegration {
    constructor() {
        this.aiModal = null;
        this.isInitialized = false;

        this.init();
    }

    init() {
        this.createAIModal();
        this.setupEventListeners();
        this.isInitialized = true;
        console.log('✅ AI Integration initialized');
    }

    /**
     * AI 생성기 모달 생성
     */
    createAIModal() {
        // 모달 HTML 생성
        const modalHTML = `
            <div id="ai-generator-modal" class="ai-modal" style="display: none;">
                <div class="ai-modal-overlay" onclick="closeAIGenerator()"></div>
                <div class="ai-modal-content">
                    <div class="ai-modal-header">
                        <h2>🤖 AI 웹사이트 자동 생성기</h2>
                        <button class="ai-modal-close" onclick="closeAIGenerator()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>

                    <div class="ai-modal-body">
                        <!-- AI 상태 -->
                        <div class="ai-status-section">
                            <div class="ai-status-card">
                                <div class="ai-status-header">
                                    <h3>🔧 AI 시스템 상태</h3>
                                    <span class="ai-status-indicator" id="ai-status">확인 중...</span>
                                </div>
                                <div class="ai-status-details" id="ai-status-details">
                                    Ollama 연결을 확인하고 있습니다...
                                </div>
                                <div class="ai-status-actions">
                                    <button class="btn btn--secondary" onclick="aiIntegration.checkAIStatus()">
                                        🔄 상태 확인
                                    </button>
                                    <button class="btn btn--primary" onclick="aiIntegration.downloadModel()" id="download-model-btn" disabled>
                                        📥 모델 다운로드
                                    </button>
                                    <button class="btn btn--accent" onclick="aiIntegration.openFullDemo()" id="full-demo-btn">
                                        🚀 전체 데모 열기
                                    </button>
                                </div>
                            </div>
                        </div>

                        <!-- 빠른 업로드 -->
                        <div class="ai-upload-section">
                            <h3>📁 파일 업로드</h3>
                            <div class="ai-upload-zone" id="ai-upload-zone">
                                <div class="ai-upload-content">
                                    <i class="fas fa-cloud-upload-alt ai-upload-icon"></i>
                                    <h4>파일을 드래그하거나 클릭하세요</h4>
                                    <p>TXT, PDF, DOC, 이미지 지원</p>
                                </div>
                                <input type="file" id="ai-file-input" multiple accept=".txt,.pdf,.doc,.docx,.jpg,.jpeg,.png,.gif" style="display: none;">
                            </div>

                            <div class="ai-upload-actions">
                                <button class="btn btn--success" onclick="aiIntegration.loadSample()">
                                    🏢 샘플 로드
                                </button>
                                <button class="btn btn--primary" onclick="aiIntegration.analyzeFiles()" id="analyze-btn" disabled>
                                    🧠 AI 분석
                                </button>
                                <button class="btn btn--accent" onclick="aiIntegration.generateWebsite()" id="generate-btn" disabled>
                                    ✨ 웹사이트 생성
                                </button>
                            </div>

                            <div class="ai-file-list" id="ai-file-list"></div>
                        </div>

                        <!-- 결과 미리보기 -->
                        <div class="ai-result-section" id="ai-result-section" style="display: none;">
                            <h3>🎯 분석 결과</h3>
                            <div class="ai-result-content" id="ai-result-content"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // 스타일 추가
        const modalStyles = `
            <style id="ai-modal-styles">
                .ai-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 10000;
                    animation: fadeIn 0.3s ease;
                }

                .ai-modal-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.7);
                    backdrop-filter: blur(5px);
                }

                .ai-modal-content {
                    position: relative;
                    background: white;
                    margin: 2% auto;
                    border-radius: 15px;
                    max-width: 1000px;
                    max-height: 90vh;
                    overflow-y: auto;
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
                    animation: slideIn 0.3s ease;
                }

                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                @keyframes slideIn {
                    from { transform: translateY(-50px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }

                .ai-modal-header {
                    background: linear-gradient(135deg, #667eea, #764ba2);
                    color: white;
                    padding: 20px 30px;
                    border-radius: 15px 15px 0 0;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .ai-modal-header h2 {
                    margin: 0;
                    font-size: 1.5rem;
                }

                .ai-modal-close {
                    background: none;
                    border: none;
                    color: white;
                    font-size: 1.5rem;
                    cursor: pointer;
                    padding: 5px;
                    border-radius: 50%;
                    transition: background 0.3s ease;
                }

                .ai-modal-close:hover {
                    background: rgba(255, 255, 255, 0.2);
                }

                .ai-modal-body {
                    padding: 30px;
                }

                .ai-status-section, .ai-upload-section, .ai-result-section {
                    margin-bottom: 30px;
                    padding-bottom: 25px;
                    border-bottom: 1px solid #eee;
                }

                .ai-status-card {
                    background: linear-gradient(135deg, #f8f9ff, #fff);
                    border: 1px solid #e0e7ff;
                    border-radius: 12px;
                    padding: 20px;
                }

                .ai-status-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 10px;
                }

                .ai-status-header h3 {
                    margin: 0;
                    color: #333;
                }

                .ai-status-indicator {
                    padding: 4px 12px;
                    border-radius: 20px;
                    font-size: 0.8rem;
                    font-weight: 500;
                    background: #feebc8;
                    color: #744210;
                }

                .ai-status-indicator.ready {
                    background: #c6f6d5;
                    color: #22543d;
                }

                .ai-status-indicator.error {
                    background: #fed7d7;
                    color: #742a2a;
                }

                .ai-status-details {
                    color: #666;
                    margin-bottom: 15px;
                    font-size: 0.9rem;
                }

                .ai-status-actions, .ai-upload-actions {
                    display: flex;
                    gap: 10px;
                    flex-wrap: wrap;
                }

                .ai-upload-zone {
                    border: 2px dashed #ddd;
                    border-radius: 12px;
                    padding: 40px;
                    text-align: center;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    background: #fafafa;
                    margin-bottom: 20px;
                }

                .ai-upload-zone:hover {
                    border-color: #667eea;
                    background: #f0f4ff;
                }

                .ai-upload-icon {
                    font-size: 3rem;
                    color: #667eea;
                    margin-bottom: 10px;
                }

                .ai-upload-content h4 {
                    color: #333;
                    margin-bottom: 5px;
                }

                .ai-upload-content p {
                    color: #666;
                    font-size: 0.9rem;
                }

                .ai-file-list {
                    margin-top: 15px;
                }

                .ai-file-item {
                    background: #f8f9ff;
                    border-left: 4px solid #667eea;
                    padding: 10px 15px;
                    margin-bottom: 8px;
                    border-radius: 5px;
                    font-size: 0.9rem;
                }

                .ai-result-content {
                    background: linear-gradient(135deg, #e6fffa, #f0fff4);
                    border: 1px solid #38b2ac;
                    border-radius: 10px;
                    padding: 20px;
                }

                .btn {
                    padding: 8px 16px;
                    border: none;
                    border-radius: 6px;
                    cursor: pointer;
                    font-size: 0.9rem;
                    font-weight: 500;
                    transition: all 0.3s ease;
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                }

                .btn:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }

                .btn--primary {
                    background: #667eea;
                    color: white;
                }

                .btn--primary:hover:not(:disabled) {
                    background: #5a67d8;
                }

                .btn--secondary {
                    background: #f7fafc;
                    color: #4a5568;
                    border: 1px solid #e2e8f0;
                }

                .btn--secondary:hover:not(:disabled) {
                    background: #edf2f7;
                }

                .btn--accent {
                    background: #ed8936;
                    color: white;
                }

                .btn--accent:hover:not(:disabled) {
                    background: #dd6b20;
                }

                .btn--success {
                    background: #48bb78;
                    color: white;
                }

                .btn--success:hover:not(:disabled) {
                    background: #38a169;
                }

                @media (max-width: 768px) {
                    .ai-modal-content {
                        margin: 5% 10px;
                        max-height: 85vh;
                    }

                    .ai-modal-header {
                        padding: 15px 20px;
                    }

                    .ai-modal-body {
                        padding: 20px;
                    }

                    .ai-status-actions, .ai-upload-actions {
                        flex-direction: column;
                    }

                    .btn {
                        justify-content: center;
                        width: 100%;
                    }
                }
            </style>
        `;

        // DOM에 추가
        document.head.insertAdjacentHTML('beforeend', modalStyles);
        document.body.insertAdjacentHTML('beforeend', modalHTML);

        // 이벤트 리스너 설정
        this.setupModalEventListeners();
    }

    /**
     * 모달 이벤트 리스너 설정
     */
    setupModalEventListeners() {
        const uploadZone = document.getElementById('ai-upload-zone');
        const fileInput = document.getElementById('ai-file-input');

        if (uploadZone && fileInput) {
            uploadZone.addEventListener('click', () => fileInput.click());
            uploadZone.addEventListener('dragover', this.handleDragOver.bind(this));
            uploadZone.addEventListener('dragleave', this.handleDragLeave.bind(this));
            uploadZone.addEventListener('drop', this.handleDrop.bind(this));
            fileInput.addEventListener('change', this.handleFileSelect.bind(this));
        }
    }

    /**
     * 일반 이벤트 리스너 설정
     */
    setupEventListeners() {
        // ESC 키로 모달 닫기
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && document.getElementById('ai-generator-modal').style.display !== 'none') {
                this.closeModal();
            }
        });
    }

    /**
     * AI 생성기 모달 열기
     */
    openModal() {
        const modal = document.getElementById('ai-generator-modal');
        if (modal) {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';

            // AI 상태 자동 체크
            setTimeout(() => {
                this.checkAIStatus();
            }, 500);
        }
    }

    /**
     * AI 생성기 모달 닫기
     */
    closeModal() {
        const modal = document.getElementById('ai-generator-modal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    }

    /**
     * 전체 데모 페이지 열기
     */
    openFullDemo() {
        window.open('./upload-system/ai-powered-demo.html', '_blank');
    }

    /**
     * AI 상태 확인
     */
    async checkAIStatus() {
        const statusIndicator = document.getElementById('ai-status');
        const statusDetails = document.getElementById('ai-status-details');
        const downloadBtn = document.getElementById('download-model-btn');

        if (!statusIndicator) return;

        statusIndicator.textContent = '확인 중...';
        statusIndicator.className = 'ai-status-indicator';

        try {
            if (window.ollamaAI) {
                const status = await window.ollamaAI.getStatus();

                if (status.connected) {
                    statusIndicator.textContent = '준비됨';
                    statusIndicator.className = 'ai-status-indicator ready';
                    statusDetails.textContent = `✅ Ollama AI 연결됨 (모델: ${status.model})`;
                    downloadBtn.disabled = true;
                } else {
                    statusIndicator.textContent = '연결 실패';
                    statusIndicator.className = 'ai-status-indicator error';
                    statusDetails.textContent = '❌ Ollama 서버를 시작하고 모델을 다운로드하세요.';
                    downloadBtn.disabled = false;
                }
            } else {
                statusIndicator.textContent = '시스템 오류';
                statusIndicator.className = 'ai-status-indicator error';
                statusDetails.textContent = '❌ AI 시스템 로드 실패. 페이지를 새로고침하세요.';
            }
        } catch (error) {
            statusIndicator.textContent = '오류';
            statusIndicator.className = 'ai-status-indicator error';
            statusDetails.textContent = `❌ ${error.message}`;
        }
    }

    /**
     * 모델 다운로드
     */
    async downloadModel() {
        const downloadBtn = document.getElementById('download-model-btn');
        const statusDetails = document.getElementById('ai-status-details');

        if (!window.ollamaAI) {
            alert('AI 시스템이 로드되지 않았습니다.');
            return;
        }

        downloadBtn.disabled = true;
        downloadBtn.textContent = '📥 다운로드 중...';
        statusDetails.textContent = '모델을 다운로드하고 있습니다... (몇 분 소요)';

        try {
            const result = await window.ollamaAI.downloadModel();

            if (result.success) {
                downloadBtn.textContent = '✅ 완료';
                statusDetails.textContent = '✅ 모델 다운로드 완료! AI를 사용할 준비가 되었습니다.';

                // 상태 다시 확인
                setTimeout(() => {
                    this.checkAIStatus();
                }, 2000);
            } else {
                throw new Error(result.error);
            }
        } catch (error) {
            downloadBtn.disabled = false;
            downloadBtn.textContent = '📥 모델 다운로드';
            statusDetails.textContent = `❌ 다운로드 실패: ${error.message}`;
        }
    }

    /**
     * 샘플 로드
     */
    loadSample() {
        // 간단한 샘플 파일들
        this.uploadedFiles = [
            {
                id: 'sample_1',
                name: '회사소개.txt',
                size: 1024,
                type: 'document',
                content: {
                    type: 'text',
                    text: '혁신 솔루션 기업입니다. 우리는 최첨단 기술로 고객의 성공을 돕습니다.'
                }
            },
            {
                id: 'sample_2',
                name: '서비스목록.txt',
                size: 512,
                type: 'document',
                content: {
                    type: 'text',
                    text: '1. 웹 개발\n2. 모바일 앱 개발\n3. AI 솔루션\n4. 클라우드 서비스'
                }
            }
        ];

        this.displayFileList();
        this.updateButtonStates();
    }

    /**
     * 파일 목록 표시
     */
    displayFileList() {
        const fileList = document.getElementById('ai-file-list');
        if (!fileList || !this.uploadedFiles) return;

        fileList.innerHTML = this.uploadedFiles.map(file => `
            <div class="ai-file-item">
                📄 ${file.name} (${this.formatFileSize(file.size)})
            </div>
        `).join('');
    }

    /**
     * 파일 크기 포맷팅
     */
    formatFileSize(bytes) {
        const sizes = ['Bytes', 'KB', 'MB'];
        if (bytes === 0) return '0 Bytes';
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
    }

    /**
     * 버튼 상태 업데이트
     */
    updateButtonStates() {
        const analyzeBtn = document.getElementById('analyze-btn');
        const generateBtn = document.getElementById('generate-btn');

        if (analyzeBtn) {
            analyzeBtn.disabled = !this.uploadedFiles || this.uploadedFiles.length === 0;
        }

        if (generateBtn) {
            generateBtn.disabled = !this.analysisResults;
        }
    }

    /**
     * 드래그 앤 드롭 이벤트 처리
     */
    handleDragOver(e) {
        e.preventDefault();
        document.getElementById('ai-upload-zone').style.borderColor = '#667eea';
    }

    handleDragLeave(e) {
        e.preventDefault();
        document.getElementById('ai-upload-zone').style.borderColor = '#ddd';
    }

    handleDrop(e) {
        e.preventDefault();
        document.getElementById('ai-upload-zone').style.borderColor = '#ddd';
        const files = Array.from(e.dataTransfer.files);
        this.processFiles(files);
    }

    handleFileSelect(e) {
        const files = Array.from(e.target.files);
        this.processFiles(files);
    }

    /**
     * 파일 처리
     */
    async processFiles(files) {
        // 간단한 파일 처리 (실제 구현은 더 복잡)
        this.uploadedFiles = this.uploadedFiles || [];

        for (const file of files) {
            try {
                const processedFile = await this.processFile(file);
                this.uploadedFiles.push(processedFile);
            } catch (error) {
                console.error('파일 처리 실패:', error);
            }
        }

        this.displayFileList();
        this.updateButtonStates();
    }

    async processFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            const result = {
                id: Date.now() + '_' + Math.random().toString(36).substr(2, 5),
                name: file.name,
                size: file.size,
                type: 'document',
                content: null
            };

            if (file.type.startsWith('text/')) {
                reader.onload = (e) => {
                    result.content = { type: 'text', text: e.target.result };
                    resolve(result);
                };
                reader.readAsText(file);
            } else {
                result.content = { type: 'document', text: `[${file.name}]` };
                resolve(result);
            }

            reader.onerror = () => reject(new Error('파일 읽기 실패'));
        });
    }

    /**
     * AI 분석 실행
     */
    async analyzeFiles() {
        if (!this.uploadedFiles || this.uploadedFiles.length === 0) {
            alert('먼저 파일을 업로드하세요.');
            return;
        }

        const analyzeBtn = document.getElementById('analyze-btn');
        analyzeBtn.disabled = true;
        analyzeBtn.textContent = '🧠 분석 중...';

        try {
            if (window.ollamaAI) {
                this.analysisResults = await window.ollamaAI.analyzeContentWithAI(this.uploadedFiles);
                this.displayAnalysisResults();
            } else {
                // Fallback: 기본 분석
                this.analysisResults = {
                    company: { name: '샘플 회사' },
                    hero: { title: '분석된 제목', text: '분석된 설명' },
                    services: [{ title: '분석된 서비스', description: '설명' }]
                };
            }

            analyzeBtn.textContent = '✅ 분석 완료';
            this.updateButtonStates();

        } catch (error) {
            analyzeBtn.textContent = '❌ 분석 실패';
            alert('분석 중 오류가 발생했습니다: ' + error.message);
        } finally {
            analyzeBtn.disabled = false;
        }
    }

    /**
     * 분석 결과 표시
     */
    displayAnalysisResults() {
        const resultSection = document.getElementById('ai-result-section');
        const resultContent = document.getElementById('ai-result-content');

        if (!resultSection || !resultContent) return;

        resultSection.style.display = 'block';
        resultContent.innerHTML = `
            <h4>📊 AI 분석 결과</h4>
            <p><strong>회사명:</strong> ${this.analysisResults.company?.name || '미감지'}</p>
            <p><strong>메인 제목:</strong> ${this.analysisResults.hero?.title || '미감지'}</p>
            <p><strong>서비스 개수:</strong> ${this.analysisResults.services?.length || 0}개</p>
            <p><strong>팀원 수:</strong> ${this.analysisResults.team?.length || 0}명</p>
            <div style="margin-top: 15px;">
                <button class="btn btn--accent" onclick="aiIntegration.generateWebsite()">
                    ✨ 이 결과로 웹사이트 생성
                </button>
            </div>
        `;
    }

    /**
     * 웹사이트 생성
     */
    async generateWebsite() {
        if (!this.analysisResults) {
            alert('먼저 AI 분석을 수행하세요.');
            return;
        }

        const generateBtn = document.getElementById('generate-btn');
        generateBtn.disabled = true;
        generateBtn.textContent = '✨ 생성 중...';

        try {
            // 실제 웹사이트 생성 (content-injector 사용)
            const templateHTML = await this.fetchTemplateHTML();
            const result = await window.contentInjector.injectContent(templateHTML, this.uploadedFiles);

            if (result.success) {
                // 새 창에서 결과 표시
                const newWindow = window.open();
                newWindow.document.write(result.html);
                newWindow.document.close();

                generateBtn.textContent = '✅ 생성 완료';
                alert('웹사이트가 새 탭에서 열렸습니다!');
            } else {
                throw new Error('웹사이트 생성 실패');
            }

        } catch (error) {
            generateBtn.textContent = '❌ 생성 실패';
            alert('웹사이트 생성 중 오류가 발생했습니다: ' + error.message);
        } finally {
            generateBtn.disabled = false;
        }
    }

    /**
     * 템플릿 HTML 가져오기
     */
    async fetchTemplateHTML() {
        const response = await fetch('./templates/modified/eventre-business-test/index.html');
        if (!response.ok) throw new Error('템플릿을 불러올 수 없습니다.');
        return await response.text();
    }
}

// 전역 함수들
function openAIGenerator() {
    if (window.aiIntegration) {
        window.aiIntegration.openModal();
    } else {
        alert('AI 시스템이 로드되지 않았습니다. 페이지를 새로고침하세요.');
    }
}

function closeAIGenerator() {
    if (window.aiIntegration) {
        window.aiIntegration.closeModal();
    }
}

// 초기화
document.addEventListener('DOMContentLoaded', () => {
    window.aiIntegration = new AIIntegration();
});

// 전역 노출
window.AIIntegration = AIIntegration;
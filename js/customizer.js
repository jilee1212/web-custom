// 디바운스 함수 - 성능 최적화를 위한 유틸리티
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 실시간 커스터마이징 시스템
class RealtimeCustomizer {
    constructor() {
        this.brandExtractor = null;
        this.templateSystem = null;
        this.contentMapper = null;
        this.isInitialized = false;
        this.currentData = {
            companyName: 'TechCorp',
            industry: 'enterprise',
            logo: null,
            colors: {
                primary: '#007bff',
                secondary: '#6c757d',
                accent: '#28a745'
            },
            // 새로운 템플릿 시스템 지원
            template: {
                base: 'corporate',
                industry: 'technology',
                style: 'modern',
                id: null
            }
        };

        // 조합형 템플릿 생성기
        this.templateGenerator = null;

        // 색상 업데이트에 디바운스 적용
        this.debouncedColorUpdate = debounce((colorType, colorValue) => {
            this.updateColor(colorType, colorValue);
        }, 100);

        this.init();
    }

    async init() {
        try {
            await this.waitForDependencies();
            this.initializeUI();
            this.bindEvents();
            this.isInitialized = true;
            console.log('✅ 실시간 커스터마이징 시스템 초기화 완료');
        } catch (error) {
            console.error('❌ 커스터마이징 시스템 초기화 실패:', error);
        }
    }

    async waitForDependencies() {
        return new Promise((resolve) => {
            let attempts = 0;
            const maxAttempts = 50; // 5초 최대 대기

            const checkDependencies = () => {
                attempts++;
                console.log(`의존성 확인 시도 ${attempts}: BrandDNAExtractor=${!!window.BrandDNAExtractor}, TemplateCustomizer=${!!window.TemplateCustomizer}, IndustryContentMapper=${!!window.IndustryContentMapper}, CombinatorialTemplateGenerator=${!!window.CombinatorialTemplateGenerator}`);

                if (window.BrandDNAExtractor && window.TemplateCustomizer && window.IndustryContentMapper && window.CombinatorialTemplateGenerator) {
                    console.log('✅ 모든 의존성 로드 완료 (조합형 시스템 포함)');
                    this.brandExtractor = new BrandDNAExtractor();
                    this.templateSystem = window.TemplateCustomizer;
                    this.contentMapper = new IndustryContentMapper();

                    // 새로운 조합형 템플릿 생성기 초기화
                    this.templateGenerator = new CombinatorialTemplateGenerator();
                    try {
                        await this.templateGenerator.initialize();
                    } catch (error) {
                        console.warn('⚠️ 템플릿 생성기 초기화 실패:', error);
                    }

                    resolve();
                } else if (attempts >= maxAttempts) {
                    console.warn('⚠️ 의존성 로드 시간 초과, 기본 기능만 활성화');
                    if (window.IndustryContentMapper) {
                        this.contentMapper = new IndustryContentMapper();
                    }
                    resolve();
                } else {
                    setTimeout(checkDependencies, 100);
                }
            };
            checkDependencies();
        });
    }

    initializeUI() {
        // 토글 버튼 이벤트
        const toggleBtn = document.getElementById('customizer-toggle');
        const panel = document.getElementById('customizer-panel');
        const closeBtn = document.getElementById('customizer-close');

        console.log('UI 초기화:', {
            toggleBtn: !!toggleBtn,
            panel: !!panel,
            closeBtn: !!closeBtn
        });

        if (toggleBtn && panel) {
            toggleBtn.addEventListener('click', () => {
                console.log('커스터마이징 패널 열기');
                panel.classList.remove('hidden');
                panel.classList.add('active');
            });
            console.log('✅ 토글 버튼 이벤트 연결 완료');
        } else {
            console.error('❌ 토글 버튼 또는 패널을 찾을 수 없음');
        }

        if (closeBtn && panel) {
            closeBtn.addEventListener('click', () => {
                console.log('커스터마이징 패널 닫기');
                panel.classList.remove('active');
                setTimeout(() => panel.classList.add('hidden'), 300);
            });
        }

        // ESC 키로 패널 닫기
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && panel && panel.classList.contains('active')) {
                closeBtn.click();
            }
        });

        // 초기 값 설정
        this.updateUIFromData();
    }

    bindEvents() {
        // 회사명 변경
        const companyNameInput = document.getElementById('company-name');
        if (companyNameInput) {
            companyNameInput.addEventListener('input', (e) => {
                this.currentData.companyName = e.target.value;
                this.updateCompanyName(e.target.value);
            });
        }

        // 업종 선택
        const industrySelect = document.getElementById('industry-select');
        if (industrySelect) {
            industrySelect.addEventListener('change', (e) => {
                this.currentData.industry = e.target.value;
                this.applyIndustryTemplate(e.target.value);
            });
        }

        // 로고 업로드
        const logoUpload = document.getElementById('logo-upload');
        const logoFile = document.getElementById('logo-file');
        if (logoUpload && logoFile) {
            logoUpload.addEventListener('click', () => logoFile.click());
            logoFile.addEventListener('change', (e) => this.handleLogoUpload(e));
        }

        // 드래그 앤 드롭
        if (logoUpload) {
            logoUpload.addEventListener('dragover', (e) => {
                e.preventDefault();
                logoUpload.classList.add('dragover');
            });

            logoUpload.addEventListener('dragleave', () => {
                logoUpload.classList.remove('dragover');
            });

            logoUpload.addEventListener('drop', (e) => {
                e.preventDefault();
                logoUpload.classList.remove('dragover');
                const files = e.dataTransfer.files;
                if (files.length > 0 && files[0].type.startsWith('image/')) {
                    this.processLogoFile(files[0]);
                }
            });
        }

        // 색상 변경
        ['primary', 'secondary', 'accent'].forEach(colorType => {
            const colorInput = document.getElementById(`${colorType}-color`);
            if (colorInput) {
                colorInput.addEventListener('input', (e) => {
                    this.currentData.colors[colorType] = e.target.value;
                    this.debouncedColorUpdate(colorType, e.target.value);
                });

                colorInput.addEventListener('change', (e) => {
                    this.currentData.colors[colorType] = e.target.value;
                    this.updateColor(colorType, e.target.value);
                });
            }
        });

        // 색상 추출 버튼
        const extractBtn = document.getElementById('extract-colors');
        if (extractBtn) {
            extractBtn.addEventListener('click', () => this.extractColorsFromLogo());
        }

        // 액션 버튼들
        const applyBtn = document.getElementById('apply-changes');
        const resetBtn = document.getElementById('reset-template');
        const downloadBtn = document.getElementById('download-template');

        if (applyBtn) {
            applyBtn.addEventListener('click', () => this.applyAllChanges());
        }

        if (resetBtn) {
            resetBtn.addEventListener('click', () => this.resetToDefault());
        }

        if (downloadBtn) {
            downloadBtn.addEventListener('click', () => this.downloadTemplate());
        }

        // 미리보기 모드 버튼
        const previewModeBtn = document.getElementById('preview-mode');
        if (previewModeBtn) {
            previewModeBtn.addEventListener('click', () => this.togglePreviewMode());
        }

        // 자동 색상 추출 버튼
        const extractAutoColorsBtn = document.getElementById('extract-auto-colors');
        if (extractAutoColorsBtn) {
            extractAutoColorsBtn.addEventListener('click', () => this.extractAndApplyColors());
        }

        // 템플릿 미리보기 초기화
        this.initializeTemplatePreview();
    }

    updateUIFromData() {
        // 현재 데이터로 UI 업데이트
        const companyNameInput = document.getElementById('company-name');
        if (companyNameInput) {
            companyNameInput.value = this.currentData.companyName;
        }

        const industrySelect = document.getElementById('industry-select');
        if (industrySelect) {
            industrySelect.value = this.currentData.industry;
        }

        // 색상 입력 필드 업데이트
        Object.entries(this.currentData.colors).forEach(([type, color]) => {
            const colorInput = document.getElementById(`${type}-color`);
            if (colorInput) {
                colorInput.value = color;
            }
        });
    }

    updateCompanyName(name) {
        // 모든 회사명 요소 업데이트
        const elements = document.querySelectorAll('[data-content="company-name"]');
        elements.forEach(element => {
            element.textContent = name;
        });

        this.showNotification('회사명이 업데이트되었습니다.', 'success');
    }

    async applyIndustryTemplate(industry) {
        try {
            console.log(`🎨 ${industry} 업종 템플릿 적용 시작`);

            // 1. 업종별 템플릿 시스템 적용 (색상, 스타일)
            if (this.templateSystem) {
                const result = await this.templateSystem.customizeForClient({
                    industry: industry,
                    companyName: this.currentData.companyName
                });

                if (result.success) {
                    console.log('✅ 템플릿 시스템 적용 완료');
                    this.updateColorsFromCSS();
                } else {
                    console.warn('⚠️ 템플릿 시스템 적용 실패');
                }
            }

            // 2. 업종별 콘텐츠 매핑 적용 (기존 시스템)
            if (this.contentMapper) {
                console.log('📝 업종별 콘텐츠 적용 중...');
                this.contentMapper.applyContentToDOM(industry);
                this.contentMapper.updateMetaTags(industry, this.currentData.companyName);
                console.log('✅ 콘텐츠 매핑 완료');
            }

            // 3. 새로운 컨텐츠 채우기 시스템 적용
            if (window.ContentFiller) {
                console.log('📝 업종별 기본 텍스트 적용 중...');
                const contentFiller = new window.ContentFiller();
                const customInfo = {
                    companyName: this.currentData.companyName,
                    contact: {
                        email: `info@${this.currentData.companyName.toLowerCase().replace(/\s+/g, '')}.com`
                    }
                };
                contentFiller.fillContentByIndustry(industry, customInfo);
                console.log('✅ 기본 텍스트 채우기 완료');
            }

            // 4. 포트폴리오 필터 업데이트
            this.updatePortfolioFilters(industry);

            this.showNotification(`${industry} 업종 템플릿이 적용되었습니다.`, 'success');

        } catch (error) {
            console.error('템플릿 적용 오류:', error);
            this.showNotification('템플릿 적용 중 오류가 발생했습니다.', 'error');
        }
    }

    async handleLogoUpload(event) {
        const file = event.target.files[0];
        if (file) {
            await this.processLogoFile(file);
        }
    }

    async processLogoFile(file) {
        try {
            // 파일 유효성 검사
            if (!file.type.startsWith('image/')) {
                this.showNotification('이미지 파일만 업로드 가능합니다.', 'error');
                return;
            }

            if (file.size > 5 * 1024 * 1024) { // 5MB 제한
                this.showNotification('파일 크기는 5MB 이하로 제한됩니다.', 'error');
                return;
            }

            // 로고 미리보기 표시
            this.showLogoPreview(file);

            // 로고에서 색상 추출
            if (this.brandExtractor) {
                const colors = await this.brandExtractor.extractColorsFromLogo(file);
                if (colors) {
                    this.applyExtractedColors(colors);
                }
            }

            // 로고를 실제 사이트에 적용
            this.applyLogoToSite(file);

            this.currentData.logo = file;
            this.showNotification('로고가 성공적으로 업로드되었습니다.', 'success');

        } catch (error) {
            console.error('로고 처리 오류:', error);
            this.showNotification('로고 처리 중 오류가 발생했습니다.', 'error');
        }
    }

    showLogoPreview(file) {
        const preview = document.getElementById('logo-preview');
        const image = document.getElementById('logo-image');
        const uploadArea = document.getElementById('logo-upload');

        if (preview && image && uploadArea) {
            const reader = new FileReader();
            reader.onload = (e) => {
                image.src = e.target.result;
                uploadArea.style.display = 'none';
                preview.style.display = 'block';
            };
            reader.readAsDataURL(file);
        }

        // 로고 제거 버튼
        const removeBtn = document.getElementById('logo-remove');
        if (removeBtn) {
            removeBtn.addEventListener('click', () => {
                this.removeLogo();
            });
        }
    }

    removeLogo() {
        const preview = document.getElementById('logo-preview');
        const uploadArea = document.getElementById('logo-upload');

        if (preview && uploadArea) {
            preview.style.display = 'none';
            uploadArea.style.display = 'block';
        }

        // 사이트에서 로고 제거
        const logoElements = document.querySelectorAll('[data-content="logo"] img');
        logoElements.forEach(img => {
            img.style.display = 'none';
        });

        // 아이콘 다시 표시
        const iconElements = document.querySelectorAll('[data-content="logo-icon"]');
        iconElements.forEach(icon => {
            icon.style.display = 'inline-block';
        });

        this.currentData.logo = null;
        this.showNotification('로고가 제거되었습니다.', 'success');
    }

    applyLogoToSite(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const logoUrl = e.target.result;

            // 네비게이션 로고 교체
            const navLogo = document.querySelector('.nav__logo');
            if (navLogo) {
                const existingImg = navLogo.querySelector('img');
                if (existingImg) {
                    existingImg.src = logoUrl;
                } else {
                    const img = document.createElement('img');
                    img.src = logoUrl;
                    img.alt = this.currentData.companyName;
                    img.style.height = '40px';
                    img.style.width = 'auto';

                    // 아이콘 숨기고 이미지 추가
                    const icon = navLogo.querySelector('[data-content="logo-icon"]');
                    if (icon) {
                        icon.style.display = 'none';
                    }

                    navLogo.insertBefore(img, navLogo.firstChild);
                }
            }

            // 푸터 로고 교체
            const footerLogo = document.querySelector('.footer__logo');
            if (footerLogo) {
                const existingImg = footerLogo.querySelector('img');
                if (existingImg) {
                    existingImg.src = logoUrl;
                } else {
                    const img = document.createElement('img');
                    img.src = logoUrl;
                    img.alt = this.currentData.companyName;
                    img.style.height = '32px';
                    img.style.width = 'auto';

                    const icon = footerLogo.querySelector('i');
                    if (icon) {
                        icon.style.display = 'none';
                    }

                    footerLogo.insertBefore(img, footerLogo.firstChild);
                }
            }
        };
        reader.readAsDataURL(file);
    }

    async extractColorsFromLogo() {
        if (!this.currentData.logo) {
            this.showNotification('먼저 로고를 업로드해주세요.', 'error');
            return;
        }

        try {
            if (this.brandExtractor) {
                const colors = await this.brandExtractor.extractColorsFromLogo(this.currentData.logo);
                if (colors) {
                    this.applyExtractedColors(colors);
                    this.showNotification('로고에서 색상을 추출했습니다.', 'success');
                }
            }
        } catch (error) {
            console.error('색상 추출 오류:', error);
            this.showNotification('색상 추출 중 오류가 발생했습니다.', 'error');
        }
    }

    applyExtractedColors(colorPalette) {
        // 추출된 색상을 현재 데이터에 저장
        this.currentData.colors = {
            primary: colorPalette.primary,
            secondary: colorPalette.secondary,
            accent: colorPalette.accent
        };

        // UI 색상 입력 필드 업데이트
        Object.entries(this.currentData.colors).forEach(([type, color]) => {
            const colorInput = document.getElementById(`${type}-color`);
            if (colorInput) {
                colorInput.value = color;
            }
        });

        // CSS 변수에 색상 적용
        this.applyCSSColors(colorPalette);
    }

    updateColor(colorType, color) {
        const root = document.documentElement;
        root.style.setProperty(`--color-${colorType}-500`, color);
        root.style.setProperty(`--${colorType}-color`, color);

        // 주 색상인 경우 추가 변형 적용
        if (colorType === 'primary') {
            root.style.setProperty('--primary-color', color);
        }

        this.showNotification(`${colorType} 색상이 업데이트되었습니다.`, 'success');
    }

    applyCSSColors(colorPalette) {
        const root = document.documentElement;

        // 메인 색상 적용
        root.style.setProperty('--color-primary-500', colorPalette.primary);
        root.style.setProperty('--color-secondary-500', colorPalette.secondary);
        root.style.setProperty('--color-accent-500', colorPalette.accent);
        root.style.setProperty('--primary-color', colorPalette.primary);

        // 그라데이션 적용
        if (colorPalette.gradients) {
            root.style.setProperty('--gradient-tech', colorPalette.gradients.main);
            root.style.setProperty('--gradient-hero', colorPalette.gradients.tech);
        }
    }

    updateColorsFromCSS() {
        // CSS 변수에서 현재 색상 읽어오기
        const root = getComputedStyle(document.documentElement);
        const newColors = {
            primary: root.getPropertyValue('--color-primary-500').trim(),
            secondary: root.getPropertyValue('--color-secondary-500').trim(),
            accent: root.getPropertyValue('--color-accent-500').trim()
        };

        // 색상이 있는 경우 업데이트
        Object.entries(newColors).forEach(([type, color]) => {
            if (color) {
                this.currentData.colors[type] = color;
                const colorInput = document.getElementById(`${type}-color`);
                if (colorInput) {
                    colorInput.value = color;
                }
            }
        });
    }

    applyAllChanges() {
        try {
            // 모든 변경사항을 한번에 적용
            this.updateCompanyName(this.currentData.companyName);

            // 색상 적용
            Object.entries(this.currentData.colors).forEach(([type, color]) => {
                this.updateColor(type, color);
            });

            // 업종 템플릿 적용
            this.applyIndustryTemplate(this.currentData.industry);

            this.showNotification('모든 변경사항이 적용되었습니다.', 'success');
        } catch (error) {
            console.error('변경사항 적용 오류:', error);
            this.showNotification('변경사항 적용 중 오류가 발생했습니다.', 'error');
        }
    }

    resetToDefault() {
        // 기본값으로 재설정
        this.currentData = {
            companyName: 'TechCorp',
            industry: 'enterprise',
            logo: null,
            colors: {
                primary: '#007bff',
                secondary: '#6c757d',
                accent: '#28a745'
            }
        };

        this.updateUIFromData();
        this.applyAllChanges();
        this.removeLogo();

        this.showNotification('기본 설정으로 초기화되었습니다.', 'success');
    }

    async downloadTemplate() {
        try {
            const downloadBtn = document.getElementById('download-template');
            if (downloadBtn) {
                downloadBtn.classList.add('loading');
                downloadBtn.disabled = true;
            }

            this.showNotification('웹사이트 패키지를 생성하고 있습니다...', 'info');

            // JSZip 라이브러리 로드 확인
            if (!window.JSZip) {
                await this.loadJSZip();
            }

            await this.generateAdvancedDownloadPackage();

            this.showNotification('웹사이트 패키지가 다운로드되었습니다!', 'success');

        } catch (error) {
            console.error('다운로드 오류:', error);
            this.showNotification('다운로드 중 오류가 발생했습니다.', 'error');
        } finally {
            const downloadBtn = document.getElementById('download-template');
            if (downloadBtn) {
                downloadBtn.classList.remove('loading');
                downloadBtn.disabled = false;
            }
        }
    }

    // JSZip 라이브러리 동적 로드
    async loadJSZip() {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js';
            script.onload = () => {
                console.log('✅ JSZip 라이브러리 로드 완료');
                resolve();
            };
            script.onerror = () => {
                console.error('❌ JSZip 라이브러리 로드 실패');
                reject(new Error('JSZip 라이브러리를 로드할 수 없습니다.'));
            };
            document.head.appendChild(script);
        });
    }

    // 고급 다운로드 패키지 생성
    async generateAdvancedDownloadPackage() {
        const zip = new JSZip();

        // 1. HTML 파일 처리 (커스터마이저 패널 제거)
        const cleanHTML = this.getCleanHTML();
        zip.file('index.html', cleanHTML);

        // 2. 최적화된 CSS 생성
        const optimizedCSS = await this.generateOptimizedCSS();
        zip.file('css/styles.min.css', optimizedCSS);

        // 3. 설정 파일 생성
        const configFile = this.generateConfigFile();
        zip.file('config.json', configFile);

        // 4. README 파일 생성
        const readme = this.generateReadme();
        zip.file('README.md', readme);

        // 5. 배포 가이드 생성
        const deployGuide = this.generateDeployGuide();
        zip.file('deployment-guide.md', deployGuide);

        // 6. 로고 파일 추가 (있는 경우)
        if (this.currentData.logo) {
            const logoBlob = await this.dataURLToBlob(this.currentData.logo);
            zip.file('assets/images/logo.png', logoBlob);
        }

        // 7. 기본 CSS 파일들 추가
        await this.addCSSFilesToZip(zip);

        // 다운로드 실행
        const content = await zip.generateAsync({type: 'blob'});
        this.downloadFile(content, `${this.currentData.companyName}-website.zip`);
    }

    // 커스터마이저 패널과 관련 스크립트 제거한 깨끗한 HTML 반환
    getCleanHTML() {
        const htmlClone = document.documentElement.cloneNode(true);
        const customizer = htmlClone.querySelector('#customizer-panel');
        const floatingBtn = htmlClone.querySelector('.customizer-toggle');

        if (customizer) customizer.remove();
        if (floatingBtn) floatingBtn.remove();

        // 커스터마이징 관련 스크립트 제거
        const scriptsToRemove = htmlClone.querySelectorAll('script[src*="customizer"], script[src*="industry-content"], script[src*="brand-dna-system"], script[src*="industry-templates"]');
        scriptsToRemove.forEach(script => script.remove());

        return '<!DOCTYPE html>\n' + htmlClone.outerHTML;
    }

    generateConfigFile() {
        return JSON.stringify({
            ...this.currentData,
            generatedAt: new Date().toISOString(),
            version: '1.0.0',
            templateType: 'IT Company Website'
        }, null, 2);
    }

    generateReadme() {
        return `# ${this.currentData.companyName} 웹사이트

이 웹사이트는 자동화된 템플릿 시스템으로 생성되었습니다.

## 설정 정보
- 회사명: ${this.currentData.companyName}
- 업종: ${this.currentData.industry}
- 생성일: ${new Date().toLocaleDateString()}

## 사용법
1. 웹 서버에 파일들을 업로드하세요
2. config.json에서 추가 설정을 변경할 수 있습니다
3. images/ 폴더에 추가 이미지를 넣으세요

## 지원
문의사항이 있으시면 개발팀에 연락주세요.
`;
    }

    generateDeployGuide() {
        return `# 배포 가이드

## 웹 호스팅 서비스 배포

### 1. Netlify 배포
1. [netlify.com](https://netlify.com)에서 계정 생성
2. 'New site from Git' 또는 드래그 앤 드롭으로 파일들 업로드
3. 자동으로 배포 완료

### 2. Vercel 배포
1. [vercel.com](https://vercel.com)에서 계정 생성
2. 'New Project'로 파일들 업로드
3. 자동으로 배포 완료

### 3. GitHub Pages 배포
1. GitHub 저장소 생성
2. 파일들을 저장소에 푸시
3. Settings > Pages에서 배포 설정

## 설정 변경
- config.json 파일을 수정하여 사이트 설정 변경 가능
- CSS 파일을 수정하여 디자인 커스터마이징 가능

## 문의사항
개발팀: support@yourcompany.com
`;
    }

    async generateOptimizedCSS() {
        // 현재 적용된 CSS를 최적화하여 반환
        const cssFiles = [
            'css/variables.css',
            'css/base.css',
            'css/components.css',
            'css/layout.css',
            'css/pages.css',
            'css/utilities.css'
        ];

        let combinedCSS = '';
        for (const file of cssFiles) {
            try {
                const response = await fetch(file);
                if (response.ok) {
                    const css = await response.text();
                    combinedCSS += `/* ${file} */\n${css}\n\n`;
                }
            } catch (error) {
                console.warn(`CSS 파일 로드 실패: ${file}`);
            }
        }

        // 현재 적용된 CSS 변수들 추가
        const cssVars = `:root {
    --color-primary-500: ${this.currentData.colors.primary};
    --color-secondary-500: ${this.currentData.colors.secondary};
    --color-accent-500: ${this.currentData.colors.accent};
}\n\n`;

        return cssVars + combinedCSS;
    }

    downloadFile(content, filename) {
        const url = URL.createObjectURL(content);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    // CSS 파일들을 ZIP에 추가
    async addCSSFilesToZip(zip) {
        const cssFiles = [
            'css/variables.css',
            'css/main.css',
            'css/components.css',
            'css/responsive.css',
            'css/components-fix.css',
            'css/customizer.css',
            'css/industry-sections.css'
        ];

        for (const cssFile of cssFiles) {
            try {
                const response = await fetch(cssFile);
                if (response.ok) {
                    const cssContent = await response.text();
                    zip.file(cssFile, cssContent);
                }
            } catch (error) {
                console.warn(`CSS 파일을 가져올 수 없습니다: ${cssFile}`);
            }
        }
    }

\`\`\`
${this.currentData.companyName.toLowerCase()}_website/
├── index.html          # 메인 웹페이지
├── css/
│   └── styles.min.css  # 통합 스타일시트
├── js/
│   └── main.js        # 메인 JavaScript
├── assets/
│   └── images/        # 이미지 파일들
├── config.json        # 웹사이트 설정 정보
└── README.md          # 이 파일
\`\`\`

## 🎨 커스터마이징 정보

### 색상 팔레트
- **Primary**: ${this.currentData.colors.primary}
- **Secondary**: ${this.currentData.colors.secondary}
- **Accent**: ${this.currentData.colors.accent}

### 적용된 기능
- ✅ 반응형 디자인
- ✅ 업종별 최적화된 콘텐츠
- ✅ 커스텀 색상 팔레트
${this.currentData.logo ? '- ✅ 로고 업로드 및 적용' : ''}

## 🖥️ 사용 방법

1. 웹 서버에 모든 파일을 업로드하세요
2. index.html을 메인 페이지로 설정하세요
3. 필요에 따라 css/styles.min.css에서 추가 커스터마이징을 진행하세요

## 📞 지원

이 웹사이트는 Claude Code를 통해 자동 생성되었습니다.
추가 커스터마이징이나 기능 개선이 필요하시면 개발팀에 문의해주세요.

---

© ${new Date().getFullYear()} ${this.currentData.companyName}. All rights reserved.
Generated with ❤️ by Claude Code Website Builder.`;
    }

    // DataURL을 Blob으로 변환
    dataURLToBlob(dataURL) {
        const arr = dataURL.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: mime });
    }

    // Blob 다운로드
    downloadBlob(blob, filename) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    updatePortfolioFilters(industry) {
        // 포트폴리오 필터 버튼에 업종별 필터 추가
        const filterContainer = document.querySelector('.portfolio__filter');
        if (!filterContainer) return;

        // 업종별 필터 버튼이 없으면 추가
        const industryFilterId = `filter-${industry}`;
        let industryFilter = document.getElementById(industryFilterId);

        if (!industryFilter) {
            industryFilter = document.createElement('button');
            industryFilter.id = industryFilterId;
            industryFilter.className = 'filter__btn';
            industryFilter.setAttribute('data-filter', industry);

            const industryNames = {
                enterprise: '기업용',
                startup: '스타트업',
                healthcare: '의료',
                fintech: '핀테크',
                ecommerce: '이커머스',
                saas: 'SaaS'
            };

            industryFilter.textContent = industryNames[industry] || industry;
            filterContainer.appendChild(industryFilter);

            // 필터 버튼 이벤트 추가
            industryFilter.addEventListener('click', () => {
                this.filterPortfolioItems(industry);
                this.updateActiveFilter(industryFilter);
            });
        }

        // 새로 추가된 업종 필터를 활성화
        setTimeout(() => {
            this.filterPortfolioItems(industry);
            this.updateActiveFilter(industryFilter);
        }, 500);
    }

    filterPortfolioItems(filter) {
        const portfolioItems = document.querySelectorAll('.portfolio__item');

        portfolioItems.forEach(item => {
            const categories = item.getAttribute('data-category');

            if (filter === 'all' || categories.includes(filter)) {
                item.style.display = 'block';
                item.style.animation = 'fadeIn 0.5s ease';
            } else {
                item.style.display = 'none';
            }
        });
    }

    updateActiveFilter(activeButton) {
        // 모든 필터 버튼에서 active 클래스 제거
        document.querySelectorAll('.filter__btn').forEach(btn => {
            btn.classList.remove('active');
        });

        // 선택된 버튼에 active 클래스 추가
        activeButton.classList.add('active');
    }

    // 미리보기 모드 토글
    togglePreviewMode() {
        const panel = document.getElementById('customizer-panel');
        const toggleBtn = document.getElementById('customizer-toggle');

        if (panel.classList.contains('active')) {
            panel.classList.remove('active');
            setTimeout(() => panel.classList.add('hidden'), 300);
            toggleBtn.innerHTML = '<i class="fas fa-palette"></i><span>커스터마이징</span>';
            this.showNotification('미리보기 모드가 활성화되었습니다.', 'success');
        } else {
            panel.classList.remove('hidden');
            panel.classList.add('active');
            toggleBtn.innerHTML = '<i class="fas fa-eye"></i><span>미리보기</span>';
        }
    }

    // 개선된 색상 추출 및 적용
    async extractAndApplyColors() {
        if (!this.currentData.logo) {
            this.showNotification('먼저 로고를 업로드해주세요.', 'error');
            return;
        }

        try {
            this.showNotification('로고에서 색상을 추출하고 있습니다...', 'info');

            if (this.brandExtractor) {
                // 로고 파일을 File 객체로 변환
                const logoFile = await this.dataURLToFile(this.currentData.logo, 'logo.png');
                const colors = await this.brandExtractor.extractColorsFromLogo(logoFile);

                if (colors) {
                    this.applyExtractedColors(colors);
                    this.showNotification('로고에서 색상을 추출했습니다.', 'success');
                } else {
                    this.showNotification('색상 추출에 실패했습니다.', 'error');
                }
            }
        } catch (error) {
            console.error('색상 추출 오류:', error);
            this.showNotification('색상 추출 중 오류가 발생했습니다.', 'error');
        }
    }

    // DataURL을 File 객체로 변환하는 유틸리티 함수
    async dataURLToFile(dataURL, filename) {
        const response = await fetch(dataURL);
        const blob = await response.blob();
        return new File([blob], filename, { type: blob.type });
    }

    // 템플릿 미리보기 초기화
    initializeTemplatePreview() {
        if (!this.contentMapper) return;

        const previewContainer = document.getElementById('template-previews');
        if (!previewContainer) return;

        const industries = ['enterprise', 'startup', 'healthcare', 'fintech', 'ecommerce', 'saas'];

        industries.forEach(industry => {
            const content = this.contentMapper.getIndustryContent(industry);
            const previewItem = this.createTemplatePreviewItem(industry, content);
            previewContainer.appendChild(previewItem);
        });
    }

    // 템플릿 미리보기 아이템 생성
    createTemplatePreviewItem(industry, content) {
        const item = document.createElement('div');
        item.className = 'template-preview-item';
        item.setAttribute('data-industry', industry);

        if (industry === this.currentData.industry) {
            item.classList.add('active');
        }

        // 업종별 색상 가져오기
        const industryTemplate = this.templateSystem?.industrySystem?.templates?.[industry];
        const colors = industryTemplate?.colors || {
            primary: '#007bff',
            secondary: '#6c757d',
            accent: '#28a745'
        };

        item.innerHTML = `
            <div class="template-preview-name">${content.name}</div>
            <div class="template-preview-description">${content.companyDescription}</div>
            <div class="template-preview-colors">
                <div class="template-preview-color" style="background-color: ${colors.primary}"></div>
                <div class="template-preview-color" style="background-color: ${colors.secondary}"></div>
                <div class="template-preview-color" style="background-color: ${colors.accent}"></div>
            </div>
        `;

        // 클릭 이벤트 추가
        item.addEventListener('click', () => {
            this.selectTemplatePreview(industry, item);
        });

        return item;
    }

    // 템플릿 미리보기 선택
    async selectTemplatePreview(industry, selectedItem) {
        // 기존 활성 아이템에서 active 클래스 제거
        document.querySelectorAll('.template-preview-item').forEach(item => {
            item.classList.remove('active');
        });

        // 선택된 아이템에 active 클래스 추가
        selectedItem.classList.add('active');

        // 업종 선택박스 업데이트
        const industrySelect = document.getElementById('industry-select');
        if (industrySelect) {
            industrySelect.value = industry;
        }

        // 현재 데이터 업데이트
        this.currentData.industry = industry;

        // 템플릿 적용
        await this.applyIndustryTemplate(industry);
    }

    // 알림 메시지에 info 타입 추가
    showNotification(message, type = 'success') {
        // 알림 생성
        const notification = document.createElement('div');
        notification.className = `customizer-notification ${type} show`;
        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 8px;">
                ${type === 'success' ? '<i class="fas fa-check-circle"></i>' :
                  type === 'error' ? '<i class="fas fa-exclamation-circle"></i>' :
                  type === 'info' ? '<i class="fas fa-info-circle"></i>' : ''}
                <span>${message}</span>
            </div>
        `;

        document.body.appendChild(notification);

        // 3초 후 제거
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    generateDownloadHTML() {
        // 현재 문서의 복사본 생성
        const docClone = document.cloneNode(true);

        // 커스터마이징 패널 제거
        const customizerPanel = docClone.getElementById('customizer-panel');
        const customizerToggle = docClone.getElementById('customizer-toggle');

        if (customizerPanel) customizerPanel.remove();
        if (customizerToggle) customizerToggle.remove();

        // 커스터마이징 관련 스크립트 제거
        const customizerScripts = docClone.querySelectorAll('script[src*="customizer"], script[src*="brand-dna"], script[src*="industry-templates"]');
        customizerScripts.forEach(script => script.remove());

        // 인라인 스타일 추가 (현재 CSS 변수 값들)
        const root = getComputedStyle(document.documentElement);
        const inlineStyles = `
            <style>
                :root {
                    --color-primary-500: ${root.getPropertyValue('--color-primary-500').trim()};
                    --color-secondary-500: ${root.getPropertyValue('--color-secondary-500').trim()};
                    --color-accent-500: ${root.getPropertyValue('--color-accent-500').trim()};
                    --primary-color: ${root.getPropertyValue('--primary-color').trim()};
                }
            </style>
        `;

        docClone.head.insertAdjacentHTML('beforeend', inlineStyles);

        return '<!DOCTYPE html>\n' + docClone.documentElement.outerHTML;
    }

    showNotification(message, type = 'success') {
        // 알림 생성
        const notification = document.createElement('div');
        notification.className = `customizer-notification ${type} show`;
        notification.textContent = message;

        document.body.appendChild(notification);

        // 3초 후 제거
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// DOM 로드 후 초기화
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 DOM 로드 완료, 커스터마이징 시스템 초기화 시작');
    window.realtimeCustomizer = new RealtimeCustomizer();
});

// 페이지가 완전히 로드된 후에도 한번 더 시도
window.addEventListener('load', () => {
    if (!window.realtimeCustomizer) {
        console.log('🔄 페이지 로드 완료 후 커스터마이징 시스템 재시도');
        window.realtimeCustomizer = new RealtimeCustomizer();
    }
});

// 전역 함수로 내보내기
window.RealtimeCustomizer = RealtimeCustomizer;

// 즉시 실행 (이미 DOM이 로드된 경우)
if (document.readyState === 'loading') {
    console.log('📝 문서 로딩 중...');
} else {
    console.log('📋 문서 이미 로드됨, 즉시 초기화');
    window.realtimeCustomizer = new RealtimeCustomizer();
}
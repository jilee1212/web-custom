# 1단계 자동화 시스템 구현 완전 가이드

## 프로젝트 현재 상태 분석

**루트 폴더**: `project/`
**설계 파일 위치**: `project/설계/`
**참고 파일들**:
- `설계/brand-dna-system.js` - 자동 브랜드 적용 엔진
- `설계/industry-templates.js` - 업종별 변형 시스템
- `설계/real-time-customizer.html` - 실시간 커스터마이징 UI
- `설계/claude-code-workflow.sh` - 자동화 스크립트
- `설계/tech_design_system.html` - 디자인 시스템 완본

## 구현 목표

현재 기본 템플릿에 자동화 레이어를 추가하여:
1. 로고 업로드 → 즉시 반영 + 자동 색상 추출
2. 업종 선택 → 자동 테마/콘텐츠 변경
3. 실시간 미리보기 + 편집
4. 완성된 파일 다운로드

## Phase 1: 기본 연동 구현

### 1.1 HTML 파일 수정 (index.html)

기존 HTML에 data-content 속성과 커스터마이징 패널 추가:

```html
<!-- HEAD에 추가 -->
<script src="설계/brand-dna-system.js"></script>
<script src="설계/industry-templates.js"></script>

<!-- BODY 상단에 커스터마이징 패널 추가 -->
<div id="customizer-panel" class="customizer-panel hidden">
  <div class="customizer-header">
    <h3>실시간 커스터마이징</h3>
    <button id="customizer-toggle" class="btn btn--ghost">
      <i class="fas fa-palette"></i>
    </button>
  </div>
  
  <div class="customizer-content">
    <!-- 기본 정보 -->
    <div class="customizer-section">
      <h4>기본 정보</h4>
      <div class="form-group">
        <label>회사명</label>
        <input type="text" id="company-name" placeholder="회사명을 입력하세요" value="TechCorp">
      </div>
      <div class="form-group">
        <label>업종</label>
        <select id="industry-select">
          <option value="enterprise">Enterprise B2B</option>
          <option value="startup">Startup/Innovation</option>
          <option value="healthcare">Healthcare/Medical</option>
          <option value="fintech">Fintech/Finance</option>
          <option value="ecommerce">E-commerce/Retail</option>
          <option value="saas">SaaS/Software</option>
        </select>
      </div>
    </div>

    <!-- 로고 업로드 -->
    <div class="customizer-section">
      <h4>로고</h4>
      <div class="logo-upload-area" id="logo-upload">
        <input type="file" id="logo-file" accept="image/*" hidden>
        <div class="upload-placeholder">
          <i class="fas fa-cloud-upload-alt"></i>
          <p>로고 파일을 드래그하거나 클릭하여 업로드</p>
        </div>
      </div>
    </div>

    <!-- 색상 커스터마이징 -->
    <div class="customizer-section">
      <h4>색상</h4>
      <div class="color-picker-group">
        <div class="color-picker-item">
          <label>Primary</label>
          <input type="color" id="primary-color" value="#2563eb">
        </div>
        <div class="color-picker-item">
          <label>Secondary</label>
          <input type="color" id="secondary-color" value="#10b981">
        </div>
        <div class="color-picker-item">
          <label>Accent</label>
          <input type="color" id="accent-color" value="#f59e0b">
        </div>
      </div>
    </div>

    <!-- 액션 버튼들 -->
    <div class="customizer-actions">
      <button id="preview-btn" class="btn btn--primary">미리보기</button>
      <button id="download-btn" class="btn btn--secondary">다운로드</button>
      <button id="reset-btn" class="btn btn--outline">초기화</button>
    </div>
  </div>
</div>

<!-- 기존 nav__logo에 data-content 추가 -->
<a href="#" class="nav__logo" data-content="company-logo">
  <i class="fas fa-code nav__logo-icon"></i>
  <span class="nav__logo-text" data-content="company-name">TechCorp</span>
</a>

<!-- 기존 hero__title에 data-content 추가 -->
<h1 class="hero__title" data-content="hero-title">
  <span class="text-gradient">혁신적인 IT 솔루션</span>으로<br>
  비즈니스 성장을 가속화하세요
</h1>

<!-- 기존 hero__description에 data-content 추가 -->
<p class="hero__description" data-content="hero-description">
  최신 기술과 전문 경험을 바탕으로 고객의 디지털 전환을 성공적으로 지원합니다.
  맞춤형 솔루션으로 비즈니스 효율성을 극대화하세요.
</p>
```

### 1.2 CSS 파일 추가 (css/customizer.css)

새로운 CSS 파일 생성:

```css
/* Customizer Panel Styles */
.customizer-panel {
  position: fixed;
  top: 0;
  right: -400px;
  width: 400px;
  height: 100vh;
  background: var(--color-white);
  border-left: 1px solid var(--color-gray-200);
  box-shadow: var(--shadow-xl);
  z-index: var(--z-fixed);
  transition: var(--transition-base);
  overflow-y: auto;
}

.customizer-panel.show {
  right: 0;
}

.customizer-panel.hidden {
  right: -400px;
}

.customizer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-6);
  border-bottom: 1px solid var(--color-gray-200);
  background: var(--color-gray-50);
}

.customizer-header h3 {
  margin: 0;
  color: var(--color-text-primary);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
}

.customizer-content {
  padding: var(--space-6);
}

.customizer-section {
  margin-bottom: var(--space-8);
}

.customizer-section h4 {
  margin: 0 0 var(--space-4) 0;
  color: var(--color-text-primary);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.form-group {
  margin-bottom: var(--space-4);
}

.form-group label {
  display: block;
  margin-bottom: var(--space-2);
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
}

.form-group input,
.form-group select {
  width: 100%;
  padding: var(--space-3);
  border: 1px solid var(--color-gray-300);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-base);
  transition: var(--transition-fast);
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px var(--color-primary-100);
}

/* Logo Upload Area */
.logo-upload-area {
  border: 2px dashed var(--color-gray-300);
  border-radius: var(--radius-lg);
  padding: var(--space-8);
  text-align: center;
  cursor: pointer;
  transition: var(--transition-fast);
}

.logo-upload-area:hover {
  border-color: var(--color-primary);
  background: var(--color-primary-50);
}

.upload-placeholder i {
  font-size: var(--font-size-3xl);
  color: var(--color-gray-400);
  margin-bottom: var(--space-3);
}

.upload-placeholder p {
  margin: 0;
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
}

/* Color Picker */
.color-picker-group {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-3);
}

.color-picker-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.color-picker-item label {
  margin: 0;
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.color-picker-item input[type="color"] {
  width: 50px;
  height: 30px;
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
}

/* Action Buttons */
.customizer-actions {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  margin-top: var(--space-8);
  padding-top: var(--space-6);
  border-top: 1px solid var(--color-gray-200);
}

/* Floating Customizer Toggle */
.customizer-toggle-floating {
  position: fixed;
  bottom: var(--space-6);
  right: var(--space-6);
  width: 60px;
  height: 60px;
  background: var(--color-primary);
  color: var(--color-white);
  border: none;
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-xl);
  cursor: pointer;
  box-shadow: var(--shadow-lg);
  transition: var(--transition-base);
  z-index: var(--z-fixed);
}

.customizer-toggle-floating:hover {
  background: var(--color-primary-dark);
  transform: translateY(-2px);
  box-shadow: var(--shadow-xl);
}

/* Preview Mode */
.preview-mode {
  margin-right: 400px;
  transition: margin-right var(--transition-base);
}

/* Real-time Updates */
.updating {
  transition: all 0.3s ease;
}

/* Responsive */
@media (max-width: 768px) {
  .customizer-panel {
    width: 100%;
    right: -100%;
  }
  
  .preview-mode {
    margin-right: 0;
  }
}
```

### 1.3 JavaScript 파일 수정 (js/automation.js)

새로운 JavaScript 파일 생성:

```javascript
// Automation System Integration
class TemplateAutomation {
  constructor() {
    this.brandApplicator = new window.AutoBrandApplicator();
    this.industrySystem = new window.IndustryTemplateSystem();
    this.currentConfig = {
      companyName: 'TechCorp',
      industry: 'enterprise',
      colors: {
        primary: '#2563eb',
        secondary: '#10b981',
        accent: '#f59e0b'
      },
      logo: null
    };
    
    this.init();
  }

  init() {
    this.setupUI();
    this.bindEvents();
    this.loadInitialConfig();
  }

  setupUI() {
    // Add floating toggle button
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'customizer-toggle-floating';
    toggleBtn.innerHTML = '<i class="fas fa-palette"></i>';
    toggleBtn.addEventListener('click', () => this.toggleCustomizer());
    document.body.appendChild(toggleBtn);

    // Get panel element
    this.customizerPanel = document.getElementById('customizer-panel');
  }

  bindEvents() {
    // Company name input
    document.getElementById('company-name').addEventListener('input', (e) => {
      this.updateCompanyName(e.target.value);
    });

    // Industry selection
    document.getElementById('industry-select').addEventListener('change', (e) => {
      this.updateIndustry(e.target.value);
    });

    // Color pickers
    ['primary', 'secondary', 'accent'].forEach(colorType => {
      document.getElementById(`${colorType}-color`).addEventListener('change', (e) => {
        this.updateColor(colorType, e.target.value);
      });
    });

    // Logo upload
    const logoUpload = document.getElementById('logo-upload');
    const logoFile = document.getElementById('logo-file');
    
    logoUpload.addEventListener('click', () => logoFile.click());
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
      if (files.length > 0) {
        this.handleLogoUpload(files[0]);
      }
    });
    logoFile.addEventListener('change', (e) => {
      if (e.target.files.length > 0) {
        this.handleLogoUpload(e.target.files[0]);
      }
    });

    // Action buttons
    document.getElementById('preview-btn').addEventListener('click', () => {
      this.togglePreviewMode();
    });
    document.getElementById('download-btn').addEventListener('click', () => {
      this.downloadTemplate();
    });
    document.getElementById('reset-btn').addEventListener('click', () => {
      this.resetToDefault();
    });
  }

  loadInitialConfig() {
    // Apply initial configuration
    this.updateCompanyName(this.currentConfig.companyName);
    this.updateIndustry(this.currentConfig.industry);
    Object.entries(this.currentConfig.colors).forEach(([type, color]) => {
      this.updateColor(type, color);
    });
  }

  toggleCustomizer() {
    this.customizerPanel.classList.toggle('show');
    this.customizerPanel.classList.toggle('hidden');
  }

  updateCompanyName(name) {
    this.currentConfig.companyName = name;
    
    // Update all elements with data-content="company-name"
    document.querySelectorAll('[data-content="company-name"]').forEach(el => {
      el.textContent = name;
    });

    // Update title
    document.title = `${name} - 전문 기술 서비스`;
  }

  updateIndustry(industry) {
    this.currentConfig.industry = industry;
    
    // Apply industry template using industry-templates.js
    if (this.industrySystem) {
      const result = this.industrySystem.applyIndustryTemplate(industry);
      
      // Update colors based on industry
      if (result && result.applied) {
        const template = this.industrySystem.templates[industry];
        if (template) {
          // Update color pickers
          document.getElementById('primary-color').value = template.colors.primary;
          document.getElementById('secondary-color').value = template.colors.secondary;
          document.getElementById('accent-color').value = template.colors.accent;
          
          // Apply colors
          this.updateColor('primary', template.colors.primary);
          this.updateColor('secondary', template.colors.secondary);
          this.updateColor('accent', template.colors.accent);
        }
      }
    }
  }

  updateColor(colorType, colorValue) {
    this.currentConfig.colors[colorType] = colorValue;
    
    // Update CSS variables
    const colorMap = {
      primary: ['--color-primary', '--color-primary-500', '--color-primary-600'],
      secondary: ['--color-secondary', '--color-secondary-500', '--color-secondary-600'],
      accent: ['--color-accent', '--color-accent-500']
    };

    if (colorMap[colorType]) {
      colorMap[colorType].forEach(cssVar => {
        document.documentElement.style.setProperty(cssVar, colorValue);
      });
    }

    // Update gradient
    const gradient = `linear-gradient(135deg, ${this.currentConfig.colors.primary}, ${this.currentConfig.colors.secondary})`;
    document.documentElement.style.setProperty('--tech-gradient', gradient);
    document.documentElement.style.setProperty('--gradient-tech', gradient);
  }

  async handleLogoUpload(file) {
    if (!file.type.startsWith('image/')) {
      alert('이미지 파일만 업로드 가능합니다.');
      return;
    }

    // Create image preview
    const reader = new FileReader();
    reader.onload = (e) => {
      this.currentConfig.logo = e.target.result;
      
      // Update logo preview in upload area
      const uploadArea = document.getElementById('logo-upload');
      uploadArea.innerHTML = `
        <img src="${e.target.result}" alt="Logo Preview" style="max-width: 100%; max-height: 100px; object-fit: contain;">
        <p style="margin-top: 8px; font-size: 12px; color: #666;">클릭하여 변경</p>
      `;

      // Update logo in navigation
      const logoIcon = document.querySelector('.nav__logo-icon');
      if (logoIcon) {
        logoIcon.style.backgroundImage = `url(${e.target.result})`;
        logoIcon.style.backgroundSize = 'contain';
        logoIcon.style.backgroundRepeat = 'no-repeat';
        logoIcon.style.backgroundPosition = 'center';
        logoIcon.innerHTML = ''; // Remove icon content
      }

      // Extract colors from logo using brand-dna-system.js
      if (this.brandApplicator) {
        this.brandApplicator.applyBrandColors({
          logo: file,
          companyInfo: {
            name: this.currentConfig.companyName
          }
        });
      }
    };
    reader.readAsDataURL(file);
  }

  togglePreviewMode() {
    document.body.classList.toggle('preview-mode');
    const btn = document.getElementById('preview-btn');
    if (document.body.classList.contains('preview-mode')) {
      btn.textContent = '편집 모드';
      this.customizerPanel.classList.add('show');
      this.customizerPanel.classList.remove('hidden');
    } else {
      btn.textContent = '미리보기';
    }
  }

  downloadTemplate() {
    // Create downloadable package
    this.generateDownloadPackage();
  }

  async generateDownloadPackage() {
    const zip = new JSZip();
    
    // Get current HTML
    const html = document.documentElement.outerHTML;
    zip.file('index.html', html);
    
    // Get CSS files
    const cssFiles = ['variables.css', 'main.css', 'components.css', 'responsive.css', 'customizer.css'];
    for (const cssFile of cssFiles) {
      try {
        const response = await fetch(`css/${cssFile}`);
        const cssContent = await response.text();
        zip.file(`css/${cssFile}`, cssContent);
      } catch (error) {
        console.warn(`Could not fetch ${cssFile}`);
      }
    }
    
    // Get JS files
    try {
      const response = await fetch('js/main.js');
      const jsContent = await response.text();
      zip.file('js/main.js', jsContent);
    } catch (error) {
      console.warn('Could not fetch main.js');
    }

    // Add logo if exists
    if (this.currentConfig.logo) {
      // Convert base64 to blob
      const logoBlob = this.dataURLtoBlob(this.currentConfig.logo);
      zip.file('images/logo.png', logoBlob);
    }

    // Add config file
    zip.file('config.json', JSON.stringify(this.currentConfig, null, 2));

    // Generate and download
    const content = await zip.generateAsync({type: 'blob'});
    const url = URL.createObjectURL(content);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${this.currentConfig.companyName}-website.zip`;
    a.click();
    URL.revokeObjectURL(url);
  }

  dataURLtoBlob(dataURL) {
    const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type: mime});
  }

  resetToDefault() {
    if (confirm('모든 설정을 초기화하시겠습니까?')) {
      // Reset config
      this.currentConfig = {
        companyName: 'TechCorp',
        industry: 'enterprise',
        colors: {
          primary: '#2563eb',
          secondary: '#10b981',
          accent: '#f59e0b'
        },
        logo: null
      };

      // Reset UI
      document.getElementById('company-name').value = 'TechCorp';
      document.getElementById('industry-select').value = 'enterprise';
      document.getElementById('primary-color').value = '#2563eb';
      document.getElementById('secondary-color').value = '#10b981';
      document.getElementById('accent-color').value = '#f59e0b';

      // Reset logo upload area
      document.getElementById('logo-upload').innerHTML = `
        <div class="upload-placeholder">
          <i class="fas fa-cloud-upload-alt"></i>
          <p>로고 파일을 드래그하거나 클릭하여 업로드</p>
        </div>
      `;

      // Apply reset
      this.loadInitialConfig();
      
      // Reload page to ensure clean state
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Add JSZip library for download functionality
  if (!window.JSZip) {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js';
    script.onload = () => {
      window.templateAutomation = new TemplateAutomation();
    };
    document.head.appendChild(script);
  } else {
    window.templateAutomation = new TemplateAutomation();
  }
});
```

### 1.4 HTML 파일 업데이트 (index.html)

기존 index.html의 head 섹션에 추가:

```html
<!-- 기존 CSS 다음에 추가 -->
<link rel="stylesheet" href="css/customizer.css">

<!-- 기존 JS 다음에 추가 -->
<script src="js/automation.js"></script>
```

## Phase 2: 업종별 자동화 구현

### 2.1 industry-templates.js 활성화

`설계/industry-templates.js` 파일을 `js/` 폴더로 복사하고 index.html에 추가:

```html
<script src="js/industry-templates.js"></script>
```

### 2.2 업종별 콘텐츠 매핑

각 업종별로 자동 변경될 콘텐츠 정의:

```javascript
// automation.js에 추가
const industryContent = {
  healthcare: {
    heroTitle: "안전하고 혁신적인 의료 IT 솔루션으로<br>환자 중심의 의료 서비스를 구현하세요",
    heroDescription: "최첨단 의료 기술과 안전한 데이터 관리 시스템으로 의료진과 환자 모두에게 최고의 경험을 제공합니다.",
    services: [
      {title: "병원 정보 시스템", icon: "fas fa-hospital"},
      {title: "원격 진료 플랫폼", icon: "fas fa-video"},
      {title: "의료 데이터 분석", icon: "fas fa-chart-line"},
      {title: "의료진 교육 시스템", icon: "fas fa-graduation-cap"}
    ]
  },
  fintech: {
    heroTitle: "신뢰할 수 있는 금융 기술로<br>디지털 금융 혁신을 이끌어가세요",
    heroDescription: "보안과 투명성을 바탕으로 한 금융 기술 솔루션으로 고객의 자산 관리와 투자를 안전하게 지원합니다.",
    services: [
      {title: "디지털 뱅킹", icon: "fas fa-university"},
      {title: "투자 플랫폼", icon: "fas fa-chart-pie"},
      {title: "결제 시스템", icon: "fas fa-credit-card"},
      {title: "리스크 관리", icon: "fas fa-shield-alt"}
    ]
  }
  // 다른 업종들도 추가...
};
```

## Phase 3: UI 통합 및 최적화

### 3.1 반응형 커스터마이저

모바일에서도 사용 가능한 커스터마이저 UI:

```css
@media (max-width: 768px) {
  .customizer-panel {
    width: 100%;
    right: -100%;
  }
  
  .customizer-panel.show {
    right: 0;
  }
  
  .preview-mode {
    margin-right: 0;
  }
  
  .customizer-toggle-floating {
    bottom: var(--space-4);
    right: var(--space-4);
    width: 50px;
    height: 50px;
    font-size: var(--font-size-lg);
  }
}
```

### 3.2 실시간 미리보기 최적화

```javascript
// 디바운스 함수로 성능 최적화
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

// 색상 업데이트에 디바운스 적용
const debouncedColorUpdate = debounce((colorType, colorValue) => {
  this.updateColor(colorType, colorValue);
}, 100);
```

## Phase 4: 내보내기 시스템 완성

### 4.1 고급 다운로드 기능

```javascript
// automation.js의 generateDownloadPackage 함수 확장
async generateDownloadPackage() {
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
  
  // 다운로드 실행
  const content = await zip.generateAsync({type: 'blob'});
  this.downloadFile(content, `${this.currentConfig.companyName}-website.zip`);
}

getCleanHTML() {
  // 커스터마이저 패널과 관련 스크립트 제거한 깨끗한 HTML 반환
  const htmlClone = document.documentElement.cloneNode(true);
  const customizer = htmlClone.querySelector('#customizer-panel');
  const floatingBtn = htmlClone.querySelector('.customizer-toggle-floating');
  
  if (customizer) customizer.remove();
  if (floatingBtn) floatingBtn.remove();
  
  return htmlClone.outerHTML;
}

generateConfigFile() {
  return JSON.stringify({
    ...this.currentConfig,
    generatedAt: new Date().toISOString(),
    version: '1.0.0',
    templateType: 'IT Company Website'
  }, null, 2);
}

generateReadme() {
  return `# ${this.currentConfig.companyName} 웹사이트

이 웹사이트는 자동화된 템플릿 시스템으로 생성되었습니다.

## 설정 정보
- 회사명: ${this.currentConfig.companyName}
- 업종: ${this.currentConfig.industry}
- 생성일: ${new Date().toLocaleDateString()}

## 사용법
1. 웹 서버에 파일들을 업로드하세요
2. config.json에서 추가 설정을 변경할 수 있습니다
3. images/ 폴더에 추가 이미지를 넣으세요

## 지원
문의사항이 있으시면 개발팀에 연락주세요.
`;
}
```

## 테스트 시나리오

### 기본 기능 테스트
1. 페이지 로드 → 커스터마이저 패널이 숨겨진 상태로 시작
2. 팔레트 버튼 클릭 → 커스터마이저 패널 슬라이드인
3. 회사명 변경 → 네비게이션과 제목에 즉시 반영
4. 색상 변경 → 전체 사이트 색상 즉시 변경
5. 업종 변경 → 테마와 콘텐츠 자동 변경
6. 로고 업로드 → 로고 즉시 교체 및 색상 자동 추출

### 고급 기능 테스트
1. 미리보기 모드 → 커스터마이저가 보인 상태로 편집
2. 다운로드 → ZIP 파일로 완성된 웹사이트 다운로드
3. 초기화 → 모든 설정이 기본값으로 복원
4. 반응형 → 모바일에서도 커스터마이저 정상 작동

## 완성 후 기대 효과

이 시스템이 완성되면:

1. **고객 관점**: 10분만에 전문적인 웹사이트 완성
2. **개발자 관점**: 수작업 90% 감소, 생산성 10배 향상
3. **비즈니스 관점**: 더 많은 프로젝트, 더 높은 수익성

Claude Code에게 이 가이드를 전달하여 단계별로 구현해주세요.
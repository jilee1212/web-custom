# SYCROS 기반 템플릿 개발 계획서 💻

## 📁 프로젝트 파일 구조

```
sycros-template/
├── README.md                   # 프로젝트 가이드
├── package.json               # 의존성 관리
├── vite.config.js            # 빌드 설정
├── .claude-code.json         # Claude Code 설정
├── src/
│   ├── index.html            # 메인 페이지
│   ├── assets/
│   │   ├── css/
│   │   │   ├── main.css      # 메인 스타일시트
│   │   │   ├── components/   # 컴포넌트별 CSS
│   │   │   │   ├── header.css
│   │   │   │   ├── hero.css
│   │   │   │   ├── services.css
│   │   │   │   ├── dashboard.css
│   │   │   │   └── footer.css
│   │   │   ├── base/
│   │   │   │   ├── variables.css    # CSS 변수
│   │   │   │   ├── reset.css        # CSS 리셋
│   │   │   │   └── typography.css   # 타이포그래피
│   │   │   └── utilities/
│   │   │       ├── spacing.css      # 간격 유틸리티
│   │   │       ├── colors.css       # 색상 유틸리티
│   │   │       └── responsive.css   # 반응형 유틸리티
│   │   ├── js/
│   │   │   ├── main.js          # 메인 JavaScript
│   │   │   ├── components/      # 컴포넌트 JS
│   │   │   │   ├── navigation.js
│   │   │   │   ├── dashboard.js
│   │   │   │   ├── forms.js
│   │   │   │   └── animations.js
│   │   │   ├── utils/
│   │   │   │   ├── helpers.js
│   │   │   │   └── config.js
│   │   │   └── modules/
│   │   │       ├── theme.js     # 테마 시스템
│   │   │       └── customizer.js # 커스터마이징 도구
│   │   ├── images/
│   │   │   ├── heroes/          # 히어로 이미지
│   │   │   ├── services/        # 서비스 이미지
│   │   │   ├── icons/           # 아이콘 세트
│   │   │   └── placeholders/    # 플레이스홀더 이미지
│   │   └── fonts/               # 웹폰트 파일
│   ├── components/              # HTML 컴포넌트
│   │   ├── header.html
│   │   ├── hero.html
│   │   ├── services.html
│   │   ├── dashboard.html
│   │   ├── about.html
│   │   ├── contact.html
│   │   └── footer.html
│   └── config/
│       ├── brand-config.js      # 브랜드 설정
│       ├── content-config.js    # 콘텐츠 설정
│       └── template-config.js   # 템플릿 설정
├── dist/                        # 빌드 결과물
├── docs/                        # 문서화
│   ├── setup-guide.md
│   ├── customization-guide.md
│   └── deployment-guide.md
└── tools/                       # 개발 도구
    ├── claude-code-helpers/     # Claude Code 헬퍼
    ├── build-scripts/           # 빌드 스크립트
    └── deployment/              # 배포 도구
```

## ⚙️ Claude Code 최적화 설정

### .claude-code.json 설정파일
```json
{
  "project": {
    "name": "sycros-template",
    "type": "web-template",
    "description": "IT 기업용 웹사이트 템플릿",
    "framework": "vanilla"
  },
  "structure": {
    "src": "소스 파일 디렉토리",
    "assets": "정적 자산 (CSS, JS, 이미지)",
    "components": "재사용 가능한 HTML 컴포넌트",
    "config": "설정 파일들"
  },
  "tasks": {
    "dev": "npm run dev",
    "build": "npm run build",
    "preview": "npm run preview",
    "customize": "node tools/customizer.js"
  },
  "features": {
    "hot-reload": true,
    "component-based": true,
    "css-variables": true,
    "responsive": true,
    "customizable": true
  }
}
```

## 🎨 CSS 아키텍처 전략

### 1. CSS 변수 기반 테마 시스템
```css
/* variables.css - 브랜드 중립적 기본 값 */
:root {
  /* === 브랜드 컬러 (커스터마이징 대상) === */
  --brand-primary: #3b82f6;
  --brand-secondary: #a855f7;
  --brand-accent: #10b981;
  
  /* === IT 업종 특화 컬러 === */
  --tech-gradient: linear-gradient(135deg, var(--brand-primary), var(--brand-secondary));
  --glass-bg: rgba(255, 255, 255, 0.1);
  --dashboard-bg: #0f1419;
  --console-green: #00ff88;
  --warning-amber: #fbbf24;
  --error-red: #ef4444;
  
  /* === 타이포그래피 === */
  --font-primary: 'Inter', -apple-system, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;
  --font-korean: 'Pretendard', 'Noto Sans KR', sans-serif;
  
  /* === 간격 시스템 === */
  --space-unit: 1rem;
  --space-xs: calc(var(--space-unit) * 0.25);
  --space-sm: calc(var(--space-unit) * 0.5);
  --space-md: calc(var(--space-unit) * 1);
  --space-lg: calc(var(--space-unit) * 1.5);
  --space-xl: calc(var(--space-unit) * 2);
  --space-2xl: calc(var(--space-unit) * 3);
  
  /* === 반응형 브레이크포인트 === */
  --bp-sm: 640px;
  --bp-md: 768px;
  --bp-lg: 1024px;
  --bp-xl: 1280px;
}
```

### 2. 컴포넌트 기반 CSS 구조
```css
/* components/dashboard.css - IT 특화 대시보드 */
.dashboard {
  background: var(--dashboard-bg);
  border-radius: var(--radius-lg);
  padding: var(--space-lg);
  position: relative;
  overflow: hidden;
}

.dashboard::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--tech-gradient);
}

.dashboard__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--space-md);
}

.dashboard__card {
  background: var(--glass-bg);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-md);
  padding: var(--space-md);
  transition: all 0.3s ease;
}

.dashboard__card:hover {
  transform: translateY(-4px);
  border-color: var(--brand-primary);
  box-shadow: 0 10px 30px rgba(59, 130, 246, 0.2);
}
```

## 🔧 JavaScript 모듈 설계

### 1. 메인 초기화 시스템
```javascript
// main.js - Claude Code 최적화된 엔트리포인트
import { TemplateEngine } from './modules/template-engine.js';
import { ThemeManager } from './modules/theme.js';
import { ComponentLoader } from './modules/component-loader.js';
import { BrandCustomizer } from './modules/customizer.js';

class SycrosTemplate {
  constructor() {
    this.engine = new TemplateEngine();
    this.theme = new ThemeManager();
    this.loader = new ComponentLoader();
    this.customizer = new BrandCustomizer();
    
    this.init();
  }
  
  async init() {
    // Claude Code 환경 감지
    this.isClaudeCode = window.claudeCode || false;
    
    try {
      // 컴포넌트 로드
      await this.loader.loadComponents();
      
      // 테마 초기화
      this.theme.initialize();
      
      // 브랜드 커스터마이징 준비
      this.customizer.setup();
      
      // 이벤트 리스너 등록
      this.bindEvents();
      
      console.log('✅ Sycros Template 초기화 완료');
    } catch (error) {
      console.error('❌ 템플릿 초기화 실패:', error);
    }
  }
  
  bindEvents() {
    // 반응형 네비게이션
    document.addEventListener('click', this.handleNavigation.bind(this));
    
    // 폼 제출
    document.addEventListener('submit', this.handleForms.bind(this));
    
    // 스크롤 효과
    window.addEventListener('scroll', this.handleScroll.bind(this));
  }
}

// 자동 초기화
document.addEventListener('DOMContentLoaded', () => {
  window.sycrosTemplate = new SycrosTemplate();
});
```

### 2. 브랜드 커스터마이징 시스템
```javascript
// modules/customizer.js - 브랜드 적용 자동화
export class BrandCustomizer {
  constructor() {
    this.config = {};
  }
  
  // 브랜드 컬러 적용
  applyBrandColors(colors) {
    const root = document.documentElement;
    
    if (colors.primary) {
      root.style.setProperty('--brand-primary', colors.primary);
    }
    if (colors.secondary) {
      root.style.setProperty('--brand-secondary', colors.secondary);
    }
    if (colors.accent) {
      root.style.setProperty('--brand-accent', colors.accent);
    }
    
    // 그라데이션 자동 업데이트
    const gradient = `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`;
    root.style.setProperty('--tech-gradient', gradient);
  }
  
  // 로고 교체
  async replaceLogo(logoFile) {
    const logoElements = document.querySelectorAll('[data-logo]');
    
    logoElements.forEach(element => {
      if (element.tagName === 'IMG') {
        element.src = logoFile;
      } else {
        element.style.backgroundImage = `url(${logoFile})`;
      }
    });
  }
  
  // 회사 정보 교체
  replaceCompanyInfo(companyData) {
    // 회사명
    document.querySelectorAll('[data-company-name]').forEach(el => {
      el.textContent = companyData.name;
    });
    
    // 주소
    document.querySelectorAll('[data-company-address]').forEach(el => {
      el.textContent = companyData.address;
    });
    
    // 연락처
    document.querySelectorAll('[data-company-phone]').forEach(el => {
      el.textContent = companyData.phone;
      el.href = `tel:${companyData.phone}`;
    });
    
    // 이메일
    document.querySelectorAll('[data-company-email]').forEach(el => {
      el.textContent = companyData.email;
      el.href = `mailto:${companyData.email}`;
    });
  }
}
```

## 📱 반응형 디자인 전략

### 모바일 퍼스트 접근법
```css
/* responsive.css - IT 업종 특화 반응형 */

/* 기본: 모바일 (320px~) */
.hero {
  padding: var(--space-lg) var(--space-md);
  text-align: center;
}

.hero__title {
  font-size: 2rem;
  line-height: 1.2;
}

.services__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-md);
}

.dashboard {
  padding: var(--space-md);
}

/* 태블릿 (768px~) */
@media (min-width: 768px) {
  .hero {
    padding: var(--space-xl) var(--space-lg);
  }
  
  .hero__title {
    font-size: 3rem;
  }
  
  .services__grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .dashboard__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* 데스크톱 (1024px~) */
@media (min-width: 1024px) {
  .hero {
    text-align: left;
    padding: var(--space-2xl) 0;
  }
  
  .hero__title {
    font-size: 4rem;
  }
  
  .services__grid {
    grid-template-columns: repeat(3, 1fr);
  }
  
  .dashboard__grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

/* 대형 화면 (1280px~) */
@media (min-width: 1280px) {
  .container {
    max-width: 1200px;
  }
  
  .dashboard__grid {
    grid-template-columns: repeat(6, 1fr);
  }
}
```

## 🚀 빌드 및 개발 환경

### package.json 설정
```json
{
  "name": "sycros-template",
  "version": "1.0.0",
  "description": "IT 기업용 웹사이트 템플릿",
  "main": "src/index.html",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "optimize": "node tools/optimizer.js",
    "customize": "node tools/customizer.js",
    "deploy": "npm run build && node tools/deploy.js"
  },
  "devDependencies": {
    "vite": "^4.4.0",
    "autoprefixer": "^10.4.0",
    "cssnano": "^6.0.0",
    "postcss": "^8.4.0"
  },
  "claudeCode": {
    "optimized": true,
    "hotReload": true,
    "componentBased": true
  }
}
```

### Vite 설정 (Claude Code 최적화)
```javascript
// vite.config.js
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: 'src',
  base: './',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html')
      }
    }
  },
  server: {
    open: true,
    port: 3000,
    hmr: {
      overlay: false
    }
  },
  css: {
    postcss: {
      plugins: [
        require('autoprefixer'),
        require('cssnano')({
          preset: 'default'
        })
      ]
    }
  }
});
```

## 🎯 IT 업종 특화 컴포넌트

### 1. 대시보드 시각화 컴포넌트
```javascript
// components/dashboard.js - 실시간 모니터링 대시보드
export class DashboardComponent {
  constructor(element) {
    this.element = element;
    this.data = {
      servers: 156,
      uptime: 99.9,
      responseTime: 45,
      activeUsers: 2847
    };
    this.init();
  }
  
  init() {
    this.render();
    this.startRealTimeUpdates();
  }
  
  render() {
    this.element.innerHTML = `
      <div class="dashboard">
        <div class="dashboard__grid">
          <div class="dashboard__card">
            <div class="stat">
              <div class="stat__value">${this.data.servers}</div>
              <div class="stat__label">서버</div>
              <div class="stat__indicator stat__indicator--success"></div>
            </div>
          </div>
          <div class="dashboard__card">
            <div class="stat">
              <div class="stat__value">${this.data.uptime}%</div>
              <div class="stat__label">가동률</div>
              <div class="stat__indicator stat__indicator--success"></div>
            </div>
          </div>
          <div class="dashboard__card">
            <div class="stat">
              <div class="stat__value">${this.data.responseTime}ms</div>
              <div class="stat__label">응답시간</div>
              <div class="stat__indicator stat__indicator--warning"></div>
            </div>
          </div>
          <div class="dashboard__card">
            <div class="stat">
              <div class="stat__value">${this.data.activeUsers.toLocaleString()}</div>
              <div class="stat__label">활성 사용자</div>
              <div class="stat__indicator stat__indicator--info"></div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
  
  startRealTimeUpdates() {
    setInterval(() => {
      this.updateStats();
    }, 5000);
  }
  
  updateStats() {
    // 실시간 데이터 시뮬레이션
    this.data.responseTime = Math.floor(Math.random() * 100) + 20;
    this.data.activeUsers += Math.floor(Math.random() * 100) - 50;
    this.render();
  }
}
```

### 2. 테크니컬 서비스 카드
```html
<!-- components/services.html -->
<section class="services" id="services">
  <div class="container">
    <div class="section-header">
      <h2 class="section-title" data-content="services-title">통합 IT 관제 서비스</h2>
      <p class="section-subtitle" data-content="services-subtitle">
        첨단 기술로 안정적인 IT 인프라를 구축합니다
      </p>
    </div>
    
    <div class="services__grid">
      <div class="service-card" data-aos="fade-up" data-aos-delay="100">
        <div class="service-card__icon">
          <svg class="icon icon--lg">
            <use href="#icon-server"></use>
          </svg>
        </div>
        <h3 class="service-card__title" data-content="service-1-title">서버 모니터링</h3>
        <p class="service-card__description" data-content="service-1-desc">
          24/7 실시간 서버 상태 모니터링 및 장애 예방 시스템
        </p>
        <ul class="service-card__features">
          <li>실시간 성능 모니터링</li>
          <li>자동 장애 감지</li>
          <li>예측 분석 리포트</li>
        </ul>
      </div>
      
      <div class="service-card" data-aos="fade-up" data-aos-delay="200">
        <div class="service-card__icon">
          <svg class="icon icon--lg">
            <use href="#icon-network"></use>
          </svg>
        </div>
        <h3 class="service-card__title" data-content="service-2-title">네트워크 관제</h3>
        <p class="service-card__description" data-content="service-2-desc">
          네트워크 트래픽 분석 및 보안 위협 실시간 대응
        </p>
        <ul class="service-card__features">
          <li>트래픽 분석</li>
          <li>보안 위협 탐지</li>
          <li>성능 최적화</li>
        </ul>
      </div>
      
      <div class="service-card" data-aos="fade-up" data-aos-delay="300">
        <div class="service-card__icon">
          <svg class="icon icon--lg">
            <use href="#icon-dashboard"></use>
          </svg>
        </div>
        <h3 class="service-card__title" data-content="service-3-title">통합 시각화</h3>
        <p class="service-card__description" data-content="service-3-desc">
          직관적인 대시보드를 통한 종합적 IT 현황 파악
        </p>
        <ul class="service-card__features">
          <li>실시간 대시보드</li>
          <li>커스텀 리포트</li>
          <li>모바일 접근</li>
        </ul>
      </div>
    </div>
  </div>
</section>
```

## 🛠️ Claude Code 연동 최적화

### 1. 개발 워크플로우 자동화
```javascript
// tools/claude-code-helpers/auto-sync.js
class ClaudeCodeSync {
  constructor() {
    this.watchFiles = [
      'src/**/*.html',
      'src/**/*.css',
      'src/**/*.js',
      'config/**/*.js'
    ];
  }
  
  // 파일 변경 감지 및 자동 빌드
  startWatch() {
    const chokidar = require('chokidar');
    const watcher = chokidar.watch(this.watchFiles);
    
    watcher.on('change', (path) => {
      console.log(`📝 파일 변경 감지: ${path}`);
      this.handleFileChange(path);
    });
  }
  
  handleFileChange(filePath) {
    if (filePath.includes('config/')) {
      this.rebuildConfig();
    } else if (filePath.includes('.css')) {
      this.recompileStyles();
    } else if (filePath.includes('.js')) {
      this.rebundleScripts();
    }
  }
}
```

### 2. 컴포넌트 자동 생성 도구
```javascript
// tools/component-generator.js - Claude Code 최적화
class ComponentGenerator {
  static createComponent(name, type = 'section') {
    const templates = {
      section: this.sectionTemplate(name),
      card: this.cardTemplate(name),
      form: this.formTemplate(name)
    };
    
    return templates[type] || templates.section;
  }
  
  static sectionTemplate(name) {
    return {
      html: `
<!-- components/${name}.html -->
<section class="${name}" id="${name}">
  <div class="container">
    <div class="section-header">
      <h2 class="section-title" data-content="${name}-title">[제목]</h2>
      <p class="section-subtitle" data-content="${name}-subtitle">[부제목]</p>
    </div>
    <div class="${name}__content">
      <!-- 콘텐츠 영역 -->
    </div>
  </div>
</section>`,
      css: `
/* components/${name}.css */
.${name} {
  padding: var(--space-xl) 0;
}

.${name}__content {
  margin-top: var(--space-lg);
}`,
      js: `
// components/${name}.js
export class ${name.charAt(0).toUpperCase() + name.slice(1)}Component {
  constructor(element) {
    this.element = element;
    this.init();
  }
  
  init() {
    this.bindEvents();
  }
  
  bindEvents() {
    // 이벤트 리스너 등록
  }
}`
    };
  }
}
```

## 📚 문서화 및 가이드

### 커스터마이징 가이드
```markdown
# 브랜드 커스터마이징 가이드

## 1. 색상 변경
config/brand-config.js 파일에서 색상을 변경하세요:
```javascript
export const brandConfig = {
  colors: {
    primary: '#your-primary-color',
    secondary: '#your-secondary-color',
    accent: '#your-accent-color'
  }
};
```

## 2. 로고 교체
assets/images/ 폴더에 로고 파일을 추가하고 config에서 경로를 설정하세요.

## 3. 콘텐츠 변경
config/content-config.js에서 모든 텍스트 콘텐츠를 관리합니다.
```

### 배포 가이드
```markdown
# 배포 가이드

## 빌드 명령어
```bash
npm run build
```

## 최적화 명령어
```bash
npm run optimize
```

## 배포 명령어
```bash
npm run deploy
```
```

이제 Sycros 기반 템플릿을 VSCode + Claude Code 환경에서 효율적으로 개발할 수 있는 완전한 시스템이 준비되었습니다. 모듈화된 구조와 자동화 도구를 통해 빠르고 안전한 개발이 가능합니다.
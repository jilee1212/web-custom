# 🔧 조합형 자동 템플릿 생성 시스템 설계

## 🎯 핵심 아이디어
**4개 베이스 × 8개 업종 × 3개 스타일 = 96개 템플릿 자동 생성!**

```javascript
// 수학적 조합
const templateCombinations = {
  bases: 4,           // 기본 레이아웃 구조
  industries: 8,      // 업종별 특화
  styles: 3,          // 디자인 스타일
  total: 4 × 8 × 3    // = 96개 유니크 템플릿!
};
```

## 🏗️ 베이스 템플릿 구조 (Foundation Layer)

### Base 1: Corporate (기업형)
```html
<!-- 신뢰성과 전문성을 강조하는 기업용 레이아웃 -->
<div class="base-corporate">
  <header class="header-corporate">
    <nav class="nav-horizontal"></nav>
  </header>
  
  <main>
    <section class="hero-professional">
      <div class="hero-content">
        <h1>{{COMPANY_NAME}}</h1>
        <p>{{PROFESSIONAL_TAGLINE}}</p>
        <div class="cta-buttons">
          <button class="btn-primary">{{PRIMARY_CTA}}</button>
          <button class="btn-secondary">{{SECONDARY_CTA}}</button>
        </div>
      </div>
    </section>
    
    <section class="services-grid">
      <div class="service-card" data-repeat="services">
        <div class="service-icon">{{SERVICE_ICON}}</div>
        <h3>{{SERVICE_TITLE}}</h3>
        <p>{{SERVICE_DESCRIPTION}}</p>
      </div>
    </section>
    
    <section class="about-company">
      <div class="company-stats">
        <div class="stat-item" data-repeat="stats">
          <span class="stat-number">{{STAT_NUMBER}}</span>
          <span class="stat-label">{{STAT_LABEL}}</span>
        </div>
      </div>
    </section>
    
    <section class="contact-professional">
      <form class="contact-form-business"></form>
    </section>
  </main>
  
  <footer class="footer-corporate"></footer>
</div>
```

### Base 2: Creative (크리에이티브형)
```html
<!-- 창의성과 개성을 강조하는 포트폴리오 레이아웃 -->
<div class="base-creative">
  <header class="header-creative">
    <nav class="nav-artistic"></nav>
  </header>
  
  <main>
    <section class="hero-artistic">
      <div class="hero-visual">
        <div class="creative-animation">{{ANIMATED_ELEMENT}}</div>
        <h1 class="title-artistic">{{CREATIVE_TITLE}}</h1>
      </div>
    </section>
    
    <section class="portfolio-showcase">
      <div class="portfolio-grid">
        <div class="portfolio-item" data-repeat="portfolio">
          <img src="{{PORTFOLIO_IMAGE}}" alt="{{PORTFOLIO_TITLE}}">
          <div class="portfolio-overlay">
            <h3>{{PORTFOLIO_TITLE}}</h3>
            <p>{{PORTFOLIO_CATEGORY}}</p>
          </div>
        </div>
      </div>
    </section>
    
    <section class="creative-about">
      <div class="artist-profile">
        <img src="{{ARTIST_PHOTO}}" class="artist-image">
        <div class="artist-story">{{ARTIST_STORY}}</div>
      </div>
    </section>
  </main>
</div>
```

### Base 3: Commerce (상업형)
```html
<!-- 판매와 전환에 최적화된 이커머스 레이아웃 -->
<div class="base-commerce">
  <header class="header-shop">
    <nav class="nav-commerce">
      <div class="cart-icon">🛒 {{CART_COUNT}}</div>
    </nav>
  </header>
  
  <main>
    <section class="hero-sales">
      <div class="offer-banner">
        <h1>{{MAIN_OFFER}}</h1>
        <div class="price-display">
          <span class="price-original">{{ORIGINAL_PRICE}}</span>
          <span class="price-sale">{{SALE_PRICE}}</span>
        </div>
        <button class="btn-buy-now">{{BUY_NOW_TEXT}}</button>
      </div>
    </section>
    
    <section class="product-features">
      <div class="feature-grid">
        <div class="feature-item" data-repeat="features">
          <div class="feature-icon">{{FEATURE_ICON}}</div>
          <h3>{{FEATURE_TITLE}}</h3>
        </div>
      </div>
    </section>
    
    <section class="social-proof">
      <div class="testimonial-slider">
        <div class="testimonial" data-repeat="testimonials">
          <p>"{{TESTIMONIAL_TEXT}}"</p>
          <cite>{{CUSTOMER_NAME}}</cite>
        </div>
      </div>
    </section>
  </main>
</div>
```

### Base 4: Landing (랜딩형)
```html
<!-- 전환율에 최적화된 단일 목적 랜딩 페이지 -->
<div class="base-landing">
  <header class="header-minimal">
    <div class="logo-only">{{LOGO}}</div>
  </header>
  
  <main class="single-focus">
    <section class="hero-conversion">
      <div class="value-proposition">
        <h1>{{MAIN_HEADLINE}}</h1>
        <p class="sub-headline">{{SUB_HEADLINE}}</p>
        <form class="lead-capture">
          <input type="email" placeholder="{{EMAIL_PLACEHOLDER}}">
          <button class="btn-convert">{{CONVERSION_BUTTON}}</button>
        </form>
      </div>
    </section>
    
    <section class="benefits-list">
      <div class="benefit-item" data-repeat="benefits">
        <h3>{{BENEFIT_TITLE}}</h3>
        <p>{{BENEFIT_DESCRIPTION}}</p>
      </div>
    </section>
    
    <section class="urgency-scarcity">
      <div class="countdown">{{COUNTDOWN_TIMER}}</div>
      <div class="limited-offer">{{SCARCITY_MESSAGE}}</div>
    </section>
  </main>
</div>
```

## 🏢 업종별 특화 콘텐츠 (Industry Layer)

### Industry 1: Healthcare (의료)
```javascript
const healthcareContent = {
  company_types: ["병원", "치과", "한의원", "피부과", "성형외과"],
  
  content_templates: {
    COMPANY_NAME: "{{병원명}} 의료원",
    PROFESSIONAL_TAGLINE: "환자 중심의 의료 서비스",
    PRIMARY_CTA: "진료 예약",
    SECONDARY_CTA: "상담 문의",
    
    services: [
      { title: "일반진료", icon: "🩺", description: "종합적인 건강 관리" },
      { title: "건강검진", icon: "📋", description: "정기적인 건강 체크" },
      { title: "응급진료", icon: "🚨", description: "24시간 응급 처치" },
      { title: "전문진료", icon: "👨‍⚕️", description: "전문의 맞춤 진료" }
    ],
    
    stats: [
      { number: "15년", label: "경력" },
      { number: "1만+", label: "치료 사례" },
      { number: "95%", label: "만족도" },
      { number: "24시간", label: "응급 대응" }
    ]
  },
  
  color_palette: {
    primary: "#10b981",     // 안정감 있는 녹색
    secondary: "#3b82f6",   // 신뢰감 있는 파란색
    accent: "#ffffff",      // 깨끗한 흰색
    text: "#1f2937"         // 읽기 쉬운 검은색
  },
  
  typography: {
    primary: "Noto Sans KR",
    style: "clean_professional"
  }
};
```

### Industry 2: Restaurant (레스토랑)
```javascript
const restaurantContent = {
  company_types: ["레스토랑", "카페", "베이커리", "바", "패스트푸드"],
  
  content_templates: {
    COMPANY_NAME: "{{레스토랑명}}",
    CREATIVE_TITLE: "맛있는 경험을 선사합니다",
    MAIN_OFFER: "오늘의 특선 메뉴",
    
    portfolio: [
      { image: "signature-dish.jpg", title: "시그니처 요리", category: "메인" },
      { image: "dessert.jpg", title: "수제 디저트", category: "디저트" },
      { image: "interior.jpg", title: "아늑한 분위기", category: "인테리어" },
      { image: "chef.jpg", title: "셰프의 정성", category: "스토리" }
    ],
    
    features: [
      { title: "신선한 재료", icon: "🥬" },
      { title: "수제 요리", icon: "👨‍🍳" },
      { title: "아늑한 분위기", icon: "🕯️" },
      { title: "합리적 가격", icon: "💰" }
    ]
  },
  
  color_palette: {
    primary: "#f59e0b",     // 따뜻한 오렌지
    secondary: "#dc2626",   // 식욕을 돋우는 빨간색
    accent: "#92400e",      // 고급스러운 브라운
    text: "#1f2937"
  }
};
```

### Industry 3: Technology (기술)
```javascript
const technologyContent = {
  company_types: ["IT회사", "소프트웨어", "앱개발", "AI", "스타트업"],
  
  content_templates: {
    COMPANY_NAME: "{{회사명}} Tech",
    MAIN_HEADLINE: "혁신으로 미래를 만듭니다",
    SUB_HEADLINE: "최신 기술로 비즈니스 혁신을 이끕니다",
    
    services: [
      { title: "웹 개발", icon: "💻", description: "모던 웹 솔루션" },
      { title: "앱 개발", icon: "📱", description: "iOS/Android 앱" },
      { title: "AI 솔루션", icon: "🤖", description: "인공지능 적용" },
      { title: "클라우드", icon: "☁️", description: "클라우드 인프라" }
    ],
    
    benefits: [
      { title: "최신 기술 스택", description: "React, Node.js, AWS" },
      { title: "애자일 개발", description: "빠른 프로토타이핑" },
      { title: "24/7 지원", description: "지속적인 유지보수" }
    ]
  },
  
  color_palette: {
    primary: "#6366f1",     // 혁신적인 보라색
    secondary: "#1f2937",   // 기술적인 다크 그레이
    accent: "#fbbf24",      // 하이라이트 노란색
    text: "#ffffff"
  }
};
```

## 🎨 디자인 스타일 (Style Layer)

### Style 1: Modern (모던)
```css
.style-modern {
  /* 깔끔하고 미니멀한 현대적 디자인 */
  --border-radius: 12px;
  --spacing: 2rem;
  --font-weight: 400;
  --shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  --transition: all 0.3s ease;
  
  /* 타이포그래피 */
  --font-primary: 'Inter', sans-serif;
  --font-size-h1: 3rem;
  --line-height: 1.5;
  
  /* 레이아웃 */
  --container-max-width: 1200px;
  --grid-gap: 2rem;
  
  /* 애니메이션 */
  --hover-transform: translateY(-4px);
}
```

### Style 2: Classic (클래식)
```css
.style-classic {
  /* 전통적이고 우아한 클래식 디자인 */
  --border-radius: 4px;
  --spacing: 1.5rem;
  --font-weight: 500;
  --shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  --transition: all 0.2s ease;
  
  /* 타이포그래피 */
  --font-primary: 'Georgia', serif;
  --font-size-h1: 2.5rem;
  --line-height: 1.6;
  
  /* 장식 요소 */
  --border-style: 2px solid;
  --decoration: geometric-pattern;
  
  /* 레이아웃 */
  --container-max-width: 1100px;
  --grid-gap: 1.5rem;
}
```

### Style 3: Bold (대담한)
```css
.style-bold {
  /* 강렬하고 인상적인 대담한 디자인 */
  --border-radius: 20px;
  --spacing: 3rem;
  --font-weight: 700;
  --shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  --transition: all 0.4s ease;
  
  /* 타이포그래피 */
  --font-primary: 'Poppins', sans-serif;
  --font-size-h1: 4rem;
  --line-height: 1.2;
  
  /* 시각 효과 */
  --gradient: linear-gradient(135deg, var(--primary), var(--accent));
  --hover-scale: scale(1.05);
  
  /* 레이아웃 */
  --container-max-width: 1300px;
  --grid-gap: 3rem;
}
```

## ⚙️ 조합형 생성 엔진

### 템플릿 생성기 코어
```javascript
class CombinatorialTemplateGenerator {
  constructor() {
    this.bases = ['corporate', 'creative', 'commerce', 'landing'];
    this.industries = ['healthcare', 'restaurant', 'technology', 'education', 'finance', 'realestate', 'legal', 'fitness'];
    this.styles = ['modern', 'classic', 'bold'];
  }
  
  // 모든 조합 생성
  generateAllCombinations() {
    const templates = [];
    
    for (const base of this.bases) {
      for (const industry of this.industries) {
        for (const style of this.styles) {
          const template = this.createTemplate(base, industry, style);
          templates.push(template);
        }
      }
    }
    
    console.log(`Generated ${templates.length} unique templates!`);
    return templates; // 4 × 8 × 3 = 96개!
  }
  
  // 개별 템플릿 생성
  createTemplate(base, industry, style) {
    const templateId = `${base}-${industry}-${style}`;
    
    // 1. 베이스 HTML 구조 로드
    const baseHtml = this.loadBaseTemplate(base);
    
    // 2. 업종별 콘텐츠 적용
    const industryData = this.getIndustryContent(industry);
    const contentHtml = this.applyIndustryContent(baseHtml, industryData);
    
    // 3. 스타일 적용
    const styleCSS = this.getStyleCSS(style, industryData.color_palette);
    
    // 4. 메타데이터 생성
    const metadata = this.generateMetadata(base, industry, style);
    
    return {
      id: templateId,
      name: `${this.getIndustryName(industry)} ${this.getStyleName(style)} (${this.getBaseName(base)})`,
      html: contentHtml,
      css: styleCSS,
      metadata: metadata,
      category: industry,
      style: style,
      base: base
    };
  }
  
  // 베이스 템플릿 로드
  loadBaseTemplate(baseType) {
    const baseTemplates = {
      corporate: this.getCorporateHTML(),
      creative: this.getCreativeHTML(),
      commerce: this.getCommerceHTML(),
      landing: this.getLandingHTML()
    };
    
    return baseTemplates[baseType];
  }
  
  // 업종별 콘텐츠 적용
  applyIndustryContent(html, industryData) {
    let processedHtml = html;
    
    // 템플릿 변수 교체
    Object.entries(industryData.content_templates).forEach(([key, value]) => {
      const regex = new RegExp(`{{${key}}}`, 'g');
      processedHtml = processedHtml.replace(regex, value);
    });
    
    // 반복 섹션 처리 (서비스, 포트폴리오 등)
    processedHtml = this.processRepeatingElements(processedHtml, industryData);
    
    return processedHtml;
  }
  
  // 스타일 CSS 생성
  getStyleCSS(styleType, colorPalette) {
    const baseStyles = this.getBaseStyleCSS(styleType);
    const colorStyles = this.generateColorCSS(colorPalette);
    
    return `
      ${baseStyles}
      
      /* Industry-specific colors */
      :root {
        --color-primary: ${colorPalette.primary};
        --color-secondary: ${colorPalette.secondary};
        --color-accent: ${colorPalette.accent};
        --color-text: ${colorPalette.text};
      }
      
      ${colorStyles}
    `;
  }
  
  // 메타데이터 생성
  generateMetadata(base, industry, style) {
    return {
      id: `${base}-${industry}-${style}`,
      name: this.generateTemplateName(base, industry, style),
      description: this.generateDescription(base, industry, style),
      category: industry,
      tags: this.generateTags(base, industry, style),
      preview: `previews/${base}-${industry}-${style}.jpg`,
      created: new Date().toISOString(),
      customizable: {
        colors: true,
        content: true,
        layout: base === 'corporate' || base === 'creative',
        components: true
      }
    };
  }
}
```

### 생성 실행 시스템
```javascript
// 템플릿 대량 생성 실행
class TemplateGenerator {
  async generateTemplateLibrary() {
    console.log('🚀 조합형 템플릿 생성 시작...');
    
    const generator = new CombinatorialTemplateGenerator();
    const templates = generator.generateAllCombinations();
    
    // 각 템플릿을 파일로 저장
    for (const template of templates) {
      await this.saveTemplate(template);
      await this.generatePreviewImage(template);
      console.log(`✅ ${template.name} 생성 완료`);
    }
    
    // 템플릿 인덱스 생성
    await this.generateTemplateIndex(templates);
    
    console.log(`🎉 총 ${templates.length}개 템플릿 생성 완료!`);
    
    return templates;
  }
  
  async saveTemplate(template) {
    const templateDir = `templates/${template.category}/${template.id}`;
    
    // 폴더 생성
    await fs.mkdir(templateDir, { recursive: true });
    
    // 파일들 저장
    await fs.writeFile(`${templateDir}/index.html`, template.html);
    await fs.writeFile(`${templateDir}/style.css`, template.css);
    await fs.writeFile(`${templateDir}/template.json`, JSON.stringify(template.metadata, null, 2));
  }
  
  async generatePreviewImage(template) {
    // Puppeteer로 스크린샷 생성
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    await page.setContent(template.html + `<style>${template.css}</style>`);
    await page.setViewport({ width: 1200, height: 800 });
    
    const screenshot = await page.screenshot({
      path: `templates/${template.category}/${template.id}/preview.jpg`,
      type: 'jpeg',
      quality: 85
    });
    
    await browser.close();
  }
}
```

## 📊 예상 결과

### 생성될 템플릿 조합 예시
```javascript
const exampleCombinations = [
  // Healthcare 조합들 (12개)
  "corporate-healthcare-modern",    // 현대적인 병원 홈페이지
  "corporate-healthcare-classic",   // 전통적인 의료원 사이트
  "corporate-healthcare-bold",      // 임팩트 있는 성형외과
  "creative-healthcare-modern",     // 모던한 피부과 포트폴리오
  "commerce-healthcare-modern",     // 건강용품 쇼핑몰
  "landing-healthcare-bold",        // 다이어트 프로그램 랜딩페이지
  // ... 6개 더
  
  // Restaurant 조합들 (12개)
  "creative-restaurant-bold",       // 대담한 파인다이닝 사이트
  "commerce-restaurant-modern",     // 현대적인 음식 주문 사이트
  "landing-restaurant-classic",     // 클래식한 카페 프로모션
  // ... 9개 더
  
  // Technology 조합들 (12개)
  "corporate-technology-modern",    // 현대적인 IT 기업 사이트
  "landing-technology-bold",        // 임팩트 있는 SaaS 랜딩페이지
  "creative-technology-modern",     // 모던한 개발자 포트폴리오
  // ... 9개 더
  
  // 총 96개 유니크 템플릿!
];
```

## 🎯 실행 계획

### 1단계: 베이스 템플릿 4개 완성 (1주)
- Corporate, Creative, Commerce, Landing 베이스
- 템플릿 변수 시스템 구축
- 반응형 레이아웃 완성

### 2단계: 업종 콘텐츠 8개 작성 (1주)
- Healthcare, Restaurant, Technology, Education, Finance, Real Estate, Legal, Fitness
- 각 업종별 콘텐츠 템플릿, 색상 팔레트, 아이콘 세트

### 3단계: 스타일 시스템 3개 구축 (3일)
- Modern, Classic, Bold 스타일 CSS
- 각 스타일별 타이포그래피, 색상 시스템, 레이아웃 규칙

### 4단계: 자동 생성 시스템 구현 (3일)
- 조합형 생성 엔진 코딩
- 프리뷰 이미지 자동 생성
- 메타데이터 자동 생성

### 5단계: 대량 생성 실행 (1일)
- 96개 템플릿 자동 생성
- 품질 검증 및 수정
- 템플릿 갤러리 업데이트

## 🎉 예상 성과

**2-3주 만에:**
- ✅ **96개 고품질 템플릿** 확보
- ✅ **8개 주요 업종** 모두 커버
- ✅ **다양한 스타일** 선택권 제공
- ✅ **사용자 만족도** 극대화
- ✅ **플랫폼 경쟁력** 확보

**가장 효율적이고 확장 가능한 방법**입니다! 한 번 시스템을 구축하면 새로운 베이스나 업종을 추가할 때마다 기하급수적으로 템플릿이 늘어나게 됩니다! 🚀
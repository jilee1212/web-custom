// 업종별 자동 변형 템플릿 시스템
class IndustryTemplateSystem {
  constructor() {
    this.templates = this.initializeTemplates();
  }

  initializeTemplates() {
    return {
      enterprise: {
        name: 'Enterprise B2B',
        colors: {
          primary: '#1e40af',
          secondary: '#64748b', 
          accent: '#10b981',
          background: '#f8fafc'
        },
        typography: {
          primary: 'Inter, -apple-system, sans-serif',
          headingWeight: '600',
          bodyWeight: '400',
          lineHeight: '1.6'
        },
        components: {
          buttons: 'conservative',
          cards: 'minimal',
          forms: 'structured'
        },
        layout: {
          borderRadius: '8px',
          spacing: 'generous',
          grid: 'symmetrical'
        },
        messaging: {
          tone: 'professional',
          cta: ['Request Demo', 'Contact Sales', 'Schedule Consultation'],
          heroFocus: 'reliability and expertise'
        },
        features: ['case-studies', 'certifications', 'enterprise-dashboard']
      },

      startup: {
        name: 'Startup/Innovation',
        colors: {
          primary: '#6366f1',
          secondary: '#f59e0b',
          accent: '#ef4444',
          background: '#ffffff'
        },
        typography: {
          primary: 'Inter, sans-serif',
          headingWeight: '700',
          bodyWeight: '500',
          lineHeight: '1.5'
        },
        components: {
          buttons: 'bold',
          cards: 'elevated',
          forms: 'streamlined'
        },
        layout: {
          borderRadius: '16px',
          spacing: 'dynamic',
          grid: 'asymmetrical'
        },
        messaging: {
          tone: 'innovative',
          cta: ['Get Started', 'Join Beta', 'Try Free'],
          heroFocus: 'disruption and growth'
        },
        features: ['growth-metrics', 'investor-info', 'product-roadmap']
      },

      healthcare: {
        name: 'Healthcare/Medical',
        colors: {
          primary: '#10b981',
          secondary: '#3b82f6',
          accent: '#ffffff',
          background: '#f9fafb'
        },
        typography: {
          primary: 'Inter, sans-serif',
          headingWeight: '600',
          bodyWeight: '400',
          lineHeight: '1.7'
        },
        components: {
          buttons: 'gentle',
          cards: 'soft',
          forms: 'accessible'
        },
        layout: {
          borderRadius: '12px',
          spacing: 'comfortable',
          grid: 'clean'
        },
        messaging: {
          tone: 'caring',
          cta: ['Book Appointment', 'Learn More', 'Contact Us'],
          heroFocus: 'trust and care'
        },
        features: ['appointment-booking', 'doctor-profiles', 'patient-testimonials']
      },

      fintech: {
        name: 'Fintech/Finance',
        colors: {
          primary: '#1f2937',
          secondary: '#fbbf24',
          accent: '#3b82f6',
          background: '#ffffff'
        },
        typography: {
          primary: 'Inter, sans-serif',
          headingWeight: '700',
          bodyWeight: '500',
          lineHeight: '1.6'
        },
        components: {
          buttons: 'secure',
          cards: 'premium',
          forms: 'protected'
        },
        layout: {
          borderRadius: '6px',
          spacing: 'precise',
          grid: 'structured'
        },
        messaging: {
          tone: 'trustworthy',
          cta: ['Start Investing', 'Open Account', 'Get Quote'],
          heroFocus: 'security and returns'
        },
        features: ['security-badges', 'financial-charts', 'compliance-info']
      },

      ecommerce: {
        name: 'E-commerce/Retail',
        colors: {
          primary: '#dc2626',
          secondary: '#059669',
          accent: '#f59e0b',
          background: '#ffffff'
        },
        typography: {
          primary: 'Inter, sans-serif',
          headingWeight: '700',
          bodyWeight: '400',
          lineHeight: '1.5'
        },
        components: {
          buttons: 'action-oriented',
          cards: 'product-focused',
          forms: 'conversion-optimized'
        },
        layout: {
          borderRadius: '8px',
          spacing: 'compact',
          grid: 'product-grid'
        },
        messaging: {
          tone: 'persuasive',
          cta: ['Shop Now', 'Add to Cart', 'Buy Today'],
          heroFocus: 'products and offers'
        },
        features: ['product-showcase', 'reviews', 'shopping-cart']
      },

      saas: {
        name: 'SaaS/Software',
        colors: {
          primary: '#0f172a',
          secondary: '#00ff88',
          accent: '#fbbf24',
          background: '#ffffff'
        },
        typography: {
          primary: 'Inter, JetBrains Mono, monospace',
          headingWeight: '600',
          bodyWeight: '400',
          lineHeight: '1.6'
        },
        components: {
          buttons: 'tech-focused',
          cards: 'feature-rich',
          forms: 'developer-friendly'
        },
        layout: {
          borderRadius: '4px',
          spacing: 'minimal',
          grid: 'code-like'
        },
        messaging: {
          tone: 'technical',
          cta: ['Start Free Trial', 'View Documentation', 'Install Now'],
          heroFocus: 'features and integration'
        },
        features: ['api-docs', 'integration-guides', 'developer-portal']
      }
    };
  }

  // 업종에 따른 자동 템플릿 적용
  applyIndustryTemplate(industry, customizations = {}) {
    const template = this.templates[industry];
    if (!template) {
      console.warn(`업종 '${industry}'를 찾을 수 없습니다. 기본 템플릿을 사용합니다.`);
      return this.applyDefaultTemplate();
    }

    console.log(`🎨 ${template.name} 템플릿 적용 중...`);

    // 1. 색상 시스템 적용
    this.applyColorSystem(template.colors, customizations.colors);
    
    // 2. 타이포그래피 적용
    this.applyTypography(template.typography, customizations.typography);
    
    // 3. 컴포넌트 스타일 적용
    this.applyComponentStyles(template.components);
    
    // 4. 레이아웃 설정
    this.applyLayoutSettings(template.layout);
    
    // 5. 메시징 및 콘텐츠 적용
    this.applyMessaging(template.messaging, customizations.messaging);
    
    // 6. 업종별 특수 기능 적용
    this.applyIndustryFeatures(template.features);

    return {
      applied: true,
      template: template.name,
      industry: industry,
      customizations: customizations
    };
  }

  applyColorSystem(colors, customColors = {}) {
    const finalColors = { ...colors, ...customColors };
    const root = document.documentElement;

    // 메인 색상 적용
    root.style.setProperty('--color-primary-500', finalColors.primary);
    root.style.setProperty('--color-secondary-500', finalColors.secondary);
    root.style.setProperty('--color-accent-500', finalColors.accent);
    root.style.setProperty('--color-background', finalColors.background);

    // 자동 그라데이션 생성
    const gradient = `linear-gradient(135deg, ${finalColors.primary} 0%, ${finalColors.secondary} 100%)`;
    root.style.setProperty('--gradient-primary', gradient);

    // 상태별 색상 변형 생성
    this.generateColorVariants(finalColors.primary, 'primary');
    this.generateColorVariants(finalColors.secondary, 'secondary');
    this.generateColorVariants(finalColors.accent, 'accent');
  }

  generateColorVariants(baseColor, colorName) {
    const root = document.documentElement;
    const variations = this.createColorScale(baseColor);
    
    Object.entries(variations).forEach(([shade, color]) => {
      root.style.setProperty(`--color-${colorName}-${shade}`, color);
    });
  }

  createColorScale(baseColor) {
    // 색상을 HSL로 변환하여 명도 조절
    const hsl = this.hexToHsl(baseColor);
    const scale = {};
    
    const lightnesses = {
      50: 95, 100: 90, 200: 80, 300: 70, 400: 60,
      500: 50, 600: 40, 700: 30, 800: 20, 900: 10
    };

    Object.entries(lightnesses).forEach(([shade, lightness]) => {
      scale[shade] = this.hslToHex(hsl.h, hsl.s, lightness);
    });

    return scale;
  }

  applyTypography(typography, customTypography = {}) {
    const finalTypography = { ...typography, ...customTypography };
    const root = document.documentElement;

    root.style.setProperty('--font-family-primary', finalTypography.primary);
    root.style.setProperty('--font-weight-heading', finalTypography.headingWeight);
    root.style.setProperty('--font-weight-body', finalTypography.bodyWeight);
    root.style.setProperty('--line-height-base', finalTypography.lineHeight);

    // Body 요소에 직접 적용
    document.body.style.fontFamily = finalTypography.primary;
    document.body.style.fontWeight = finalTypography.bodyWeight;
    document.body.style.lineHeight = finalTypography.lineHeight;
  }

  applyComponentStyles(components) {
    // 버튼 스타일 적용
    this.applyButtonStyles(components.buttons);
    
    // 카드 스타일 적용
    this.applyCardStyles(components.cards);
    
    // 폼 스타일 적용
    this.applyFormStyles(components.forms);
  }

  applyButtonStyles(style) {
    const root = document.documentElement;
    
    const buttonStyles = {
      conservative: {
        borderRadius: '8px',
        padding: '12px 24px',
        fontWeight: '500',
        textTransform: 'none'
      },
      bold: {
        borderRadius: '16px',
        padding: '16px 32px',
        fontWeight: '700',
        textTransform: 'uppercase'
      },
      gentle: {
        borderRadius: '25px',
        padding: '14px 28px',
        fontWeight: '500',
        textTransform: 'none'
      },
      secure: {
        borderRadius: '6px',
        padding: '12px 24px',
        fontWeight: '600',
        textTransform: 'none'
      },
      'action-oriented': {
        borderRadius: '8px',
        padding: '14px 28px',
        fontWeight: '700',
        textTransform: 'none'
      },
      'tech-focused': {
        borderRadius: '4px',
        padding: '10px 20px',
        fontWeight: '500',
        textTransform: 'none'
      }
    };

    const settings = buttonStyles[style] || buttonStyles.conservative;
    
    Object.entries(settings).forEach(([property, value]) => {
      const cssProperty = `--btn-${property.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
      root.style.setProperty(cssProperty, value);
    });
  }

  applyCardStyles(style) {
    const root = document.documentElement;
    
    const cardStyles = {
      minimal: {
        borderRadius: '8px',
        shadow: '0 1px 3px rgba(0,0,0,0.1)',
        border: '1px solid #e2e8f0'
      },
      elevated: {
        borderRadius: '16px',
        shadow: '0 10px 30px rgba(0,0,0,0.1)',
        border: 'none'
      },
      soft: {
        borderRadius: '12px',
        shadow: '0 4px 20px rgba(0,0,0,0.08)',
        border: '1px solid #f1f5f9'
      },
      premium: {
        borderRadius: '6px',
        shadow: '0 8px 25px rgba(0,0,0,0.15)',
        border: '1px solid #374151'
      },
      'product-focused': {
        borderRadius: '8px',
        shadow: '0 2px 8px rgba(0,0,0,0.1)',
        border: '1px solid #e5e7eb'
      },
      'feature-rich': {
        borderRadius: '4px',
        shadow: '0 1px 4px rgba(0,0,0,0.1)',
        border: '1px solid #d1d5db'
      }
    };

    const settings = cardStyles[style] || cardStyles.minimal;
    
    root.style.setProperty('--card-border-radius', settings.borderRadius);
    root.style.setProperty('--card-shadow', settings.shadow);
    root.style.setProperty('--card-border', settings.border);
  }

  applyFormStyles(style) {
    const root = document.documentElement;
    
    const formStyles = {
      structured: {
        borderRadius: '8px',
        padding: '12px 16px',
        borderWidth: '1px'
      },
      streamlined: {
        borderRadius: '12px',
        padding: '16px 20px',
        borderWidth: '2px'
      },
      accessible: {
        borderRadius: '8px',
        padding: '14px 18px',
        borderWidth: '1px'
      },
      protected: {
        borderRadius: '6px',
        padding: '12px 16px',
        borderWidth: '2px'
      },
      'conversion-optimized': {
        borderRadius: '8px',
        padding: '16px 20px',
        borderWidth: '2px'
      },
      'developer-friendly': {
        borderRadius: '4px',
        padding: '10px 14px',
        borderWidth: '1px'
      }
    };

    const settings = formStyles[style] || formStyles.structured;
    
    Object.entries(settings).forEach(([property, value]) => {
      const cssProperty = `--form-${property.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
      root.style.setProperty(cssProperty, value);
    });
  }

  applyLayoutSettings(layout) {
    const root = document.documentElement;
    
    root.style.setProperty('--layout-border-radius', layout.borderRadius);
    
    // 간격 설정
    const spacingMultipliers = {
      generous: 1.5,
      dynamic: 1.2,
      comfortable: 1.3,
      precise: 1.0,
      compact: 0.8,
      minimal: 0.6
    };
    
    const multiplier = spacingMultipliers[layout.spacing] || 1.0;
    root.style.setProperty('--spacing-multiplier', multiplier);
  }

  applyMessaging(messaging, customMessaging = {}) {
    const finalMessaging = { ...messaging, ...customMessaging };
    
    // CTA 버튼 텍스트 업데이트
    document.querySelectorAll('[data-cta]').forEach((element, index) => {
      if (finalMessaging.cta[index]) {
        element.textContent = finalMessaging.cta[index];
      }
    });

    // 히어로 메시지 톤 반영
    const heroElement = document.querySelector('.hero');
    if (heroElement) {
      heroElement.setAttribute('data-tone', finalMessaging.tone);
    }
  }

  applyIndustryFeatures(features) {
    // 업종별 특수 기능 활성화
    features.forEach(feature => {
      this.activateFeature(feature);
    });
  }

  activateFeature(feature) {
    const featureConfig = {
      'case-studies': () => this.addCaseStudiesSection(),
      'certifications': () => this.addCertificationsBar(),
      'enterprise-dashboard': () => this.addDashboardPreview(),
      'growth-metrics': () => this.addMetricsSection(),
      'investor-info': () => this.addInvestorSection(),
      'product-roadmap': () => this.addRoadmapSection(),
      'appointment-booking': () => this.addBookingWidget(),
      'doctor-profiles': () => this.addDoctorProfiles(),
      'patient-testimonials': () => this.addTestimonials(),
      'security-badges': () => this.addSecurityBadges(),
      'financial-charts': () => this.addChartSection(),
      'compliance-info': () => this.addComplianceInfo(),
      'product-showcase': () => this.addProductShowcase(),
      'reviews': () => this.addReviewsSection(),
      'shopping-cart': () => this.addCartFeatures(),
      'api-docs': () => this.addAPIDocumentation(),
      'integration-guides': () => this.addIntegrationSection(),
      'developer-portal': () => this.addDeveloperPortal()
    };

    const activator = featureConfig[feature];
    if (activator) {
      activator();
    }
  }

  // 업종별 특수 섹션 추가 메서드들
  addCaseStudiesSection() {
    const section = document.createElement('section');
    section.className = 'case-studies';
    section.innerHTML = `
      <div class="container">
        <h2>고객 성공 사례</h2>
        <div class="case-studies-grid">
          <div class="case-study-card">
            <h3>대기업 A사</h3>
            <p>효율성 300% 향상</p>
          </div>
          <div class="case-study-card">
            <h3>중견기업 B사</h3>
            <p>비용 절감 50% 달성</p>
          </div>
        </div>
      </div>
    `;
    this.insertSection(section);
  }

  addMetricsSection() {
    const section = document.createElement('section');
    section.className = 'growth-metrics';
    section.innerHTML = `
      <div class="container">
        <h2>성장 지표</h2>
        <div class="metrics-grid">
          <div class="metric-card">
            <div class="metric-value">500%</div>
            <div class="metric-label">성장률</div>
          </div>
          <div class="metric-card">
            <div class="metric-value">10K+</div>
            <div class="metric-label">사용자</div>
          </div>
        </div>
      </div>
    `;
    this.insertSection(section);
  }

  addBookingWidget() {
    const widget = document.createElement('div');
    widget.className = 'booking-widget';
    widget.innerHTML = `
      <h3>진료 예약</h3>
      <form class="booking-form">
        <input type="text" placeholder="성함" required>
        <input type="tel" placeholder="연락처" required>
        <select required>
          <option value="">진료과 선택</option>
          <option value="internal">내과</option>
          <option value="dermatology">피부과</option>
        </select>
        <button type="submit" class="btn btn--primary">예약하기</button>
      </form>
    `;
    
    const sidebar = document.querySelector('.sidebar') || document.querySelector('.hero');
    if (sidebar) {
      sidebar.appendChild(widget);
    }
  }

  addAPIDocumentation() {
    const section = document.createElement('section');
    section.className = 'api-docs section';
    section.innerHTML = `
      <div class="container">
        <div class="section__header">
          <h2 class="section__title">API 문서</h2>
          <p class="section__subtitle">개발자를 위한 완전한 API 레퍼런스</p>
        </div>
        <div class="api-grid">
          <div class="api-endpoint">
            <h3>GET /api/users</h3>
            <p>사용자 목록 조회</p>
            <pre><code>curl -X GET https://api.example.com/users</code></pre>
          </div>
          <div class="api-endpoint">
            <h3>POST /api/auth</h3>
            <p>사용자 인증</p>
            <pre><code>curl -X POST https://api.example.com/auth</code></pre>
          </div>
        </div>
      </div>
    `;
    this.insertSection(section);
  }

  addDoctorProfiles() {
    const section = document.createElement('section');
    section.className = 'doctor-profiles section';
    section.innerHTML = `
      <div class="container">
        <div class="section__header">
          <h2 class="section__title">전문의 소개</h2>
          <p class="section__subtitle">경험 많은 전문의들이 최고의 의료 서비스를 제공합니다</p>
        </div>
        <div class="doctors-grid">
          <div class="doctor-card">
            <div class="doctor-avatar">
              <i class="fas fa-user-md"></i>
            </div>
            <h3>김의사</h3>
            <p class="specialty">내과 전문의</p>
            <p class="experience">15년 경력</p>
          </div>
          <div class="doctor-card">
            <div class="doctor-avatar">
              <i class="fas fa-user-md"></i>
            </div>
            <h3>이의사</h3>
            <p class="specialty">외과 전문의</p>
            <p class="experience">20년 경력</p>
          </div>
        </div>
      </div>
    `;
    this.insertSection(section);
  }

  addChartSection() {
    const section = document.createElement('section');
    section.className = 'financial-charts section';
    section.innerHTML = `
      <div class="container">
        <div class="section__header">
          <h2 class="section__title">실시간 금융 차트</h2>
          <p class="section__subtitle">시장 동향을 한눈에 파악하세요</p>
        </div>
        <div class="charts-grid">
          <div class="chart-container">
            <h3>주식 시장</h3>
            <div class="chart-placeholder">
              <i class="fas fa-chart-line"></i>
              <p>실시간 차트</p>
            </div>
          </div>
          <div class="chart-container">
            <h3>암호화폐</h3>
            <div class="chart-placeholder">
              <i class="fas fa-chart-bar"></i>
              <p>가격 동향</p>
            </div>
          </div>
        </div>
      </div>
    `;
    this.insertSection(section);
  }

  addTestimonials() {
    const section = document.createElement('section');
    section.className = 'testimonials section';
    section.innerHTML = `
      <div class="container">
        <div class="section__header">
          <h2 class="section__title">환자 후기</h2>
          <p class="section__subtitle">실제 환자분들의 생생한 후기입니다</p>
        </div>
        <div class="testimonials-grid">
          <div class="testimonial-card">
            <div class="testimonial-content">
              <p>"친절하고 정확한 진료에 매우 만족합니다."</p>
            </div>
            <div class="testimonial-author">
              <strong>김○○님</strong>
              <span>내과 진료</span>
            </div>
          </div>
          <div class="testimonial-card">
            <div class="testimonial-content">
              <p>"최신 시설과 전문적인 치료로 빠르게 회복했습니다."</p>
            </div>
            <div class="testimonial-author">
              <strong>이○○님</strong>
              <span>외과 수술</span>
            </div>
          </div>
        </div>
      </div>
    `;
    this.insertSection(section);
  }

  addCertificationsBar() {
    const bar = document.createElement('div');
    bar.className = 'certifications-bar';
    bar.innerHTML = `
      <div class="container">
        <div class="certifications-list">
          <div class="certification-item">
            <i class="fas fa-certificate"></i>
            <span>ISO 27001</span>
          </div>
          <div class="certification-item">
            <i class="fas fa-shield-alt"></i>
            <span>보안 인증</span>
          </div>
          <div class="certification-item">
            <i class="fas fa-award"></i>
            <span>품질 인증</span>
          </div>
        </div>
      </div>
    `;

    // 헤더 다음에 삽입
    const header = document.querySelector('header');
    if (header && header.nextSibling) {
      header.parentNode.insertBefore(bar, header.nextSibling);
    } else {
      document.body.appendChild(bar);
    }
  }

  addDashboardPreview() {
    const section = document.createElement('section');
    section.className = 'dashboard-preview section';
    section.innerHTML = `
      <div class="container">
        <div class="section__header">
          <h2 class="section__title">관리 대시보드</h2>
          <p class="section__subtitle">실시간 비즈니스 인사이트</p>
        </div>
        <div class="dashboard-mockup">
          <div class="dashboard-widget">
            <h4>매출 현황</h4>
            <div class="metric-value">₩125,000,000</div>
          </div>
          <div class="dashboard-widget">
            <h4>활성 사용자</h4>
            <div class="metric-value">1,234</div>
          </div>
        </div>
      </div>
    `;
    this.insertSection(section);
  }

  addInvestorSection() {
    const section = document.createElement('section');
    section.className = 'investor-info section';
    section.innerHTML = `
      <div class="container">
        <div class="section__header">
          <h2 class="section__title">투자자 정보</h2>
          <p class="section__subtitle">투명한 경영과 지속가능한 성장</p>
        </div>
        <div class="investor-grid">
          <div class="investor-card">
            <h3>시리즈 A</h3>
            <p class="amount">$5M</p>
            <p class="date">2023년 진행</p>
          </div>
          <div class="investor-card">
            <h3>시드 라운드</h3>
            <p class="amount">$1.5M</p>
            <p class="date">2022년 완료</p>
          </div>
        </div>
      </div>
    `;
    this.insertSection(section);
  }

  addRoadmapSection() {
    const section = document.createElement('section');
    section.className = 'roadmap section';
    section.innerHTML = `
      <div class="container">
        <div class="section__header">
          <h2 class="section__title">제품 로드맵</h2>
          <p class="section__subtitle">앞으로의 개발 계획을 확인하세요</p>
        </div>
        <div class="roadmap-timeline">
          <div class="roadmap-item completed">
            <h4>Q1 2024</h4>
            <p>MVP 출시</p>
          </div>
          <div class="roadmap-item current">
            <h4>Q2 2024</h4>
            <p>베타 서비스</p>
          </div>
          <div class="roadmap-item planned">
            <h4>Q3 2024</h4>
            <p>정식 출시</p>
          </div>
        </div>
      </div>
    `;
    this.insertSection(section);
  }

  addComplianceInfo() {
    const section = document.createElement('section');
    section.className = 'compliance-info section';
    section.innerHTML = `
      <div class="container">
        <div class="section__header">
          <h2 class="section__title">규정 준수</h2>
          <p class="section__subtitle">엄격한 보안과 규제 준수</p>
        </div>
        <div class="compliance-grid">
          <div class="compliance-item">
            <i class="fas fa-gavel"></i>
            <h4>금융위원회 인가</h4>
            <p>정식 허가받은 금융 서비스</p>
          </div>
          <div class="compliance-item">
            <i class="fas fa-lock"></i>
            <h4>개인정보보호</h4>
            <p>GDPR, CCPA 완전 준수</p>
          </div>
        </div>
      </div>
    `;
    this.insertSection(section);
  }

  addReviewsSection() {
    const section = document.createElement('section');
    section.className = 'reviews section';
    section.innerHTML = `
      <div class="container">
        <div class="section__header">
          <h2 class="section__title">고객 리뷰</h2>
          <p class="section__subtitle">실제 고객들의 솔직한 평가</p>
        </div>
        <div class="reviews-grid">
          <div class="review-card">
            <div class="rating">
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
            </div>
            <p>"배송이 빠르고 상품 품질이 우수합니다."</p>
            <div class="reviewer">김○○님</div>
          </div>
        </div>
      </div>
    `;
    this.insertSection(section);
  }

  addCartFeatures() {
    const cartWidget = document.createElement('div');
    cartWidget.className = 'cart-features';
    cartWidget.innerHTML = `
      <div class="cart-summary">
        <h4>장바구니</h4>
        <div class="cart-items">
          <p>상품 0개</p>
          <p class="total">총 ₩0</p>
        </div>
      </div>
    `;

    // 사이드바나 헤더에 추가
    const nav = document.querySelector('nav');
    if (nav) {
      nav.appendChild(cartWidget);
    }
  }

  addIntegrationSection() {
    const section = document.createElement('section');
    section.className = 'integrations section';
    section.innerHTML = `
      <div class="container">
        <div class="section__header">
          <h2 class="section__title">통합 서비스</h2>
          <p class="section__subtitle">다양한 플랫폼과 seamless 연동</p>
        </div>
        <div class="integrations-grid">
          <div class="integration-item">
            <i class="fab fa-slack"></i>
            <h4>Slack</h4>
          </div>
          <div class="integration-item">
            <i class="fab fa-github"></i>
            <h4>GitHub</h4>
          </div>
          <div class="integration-item">
            <i class="fab fa-google"></i>
            <h4>Google Workspace</h4>
          </div>
        </div>
      </div>
    `;
    this.insertSection(section);
  }

  addDeveloperPortal() {
    const section = document.createElement('section');
    section.className = 'developer-portal section';
    section.innerHTML = `
      <div class="container">
        <div class="section__header">
          <h2 class="section__title">개발자 포털</h2>
          <p class="section__subtitle">개발자를 위한 모든 리소스</p>
        </div>
        <div class="developer-resources">
          <div class="resource-card">
            <i class="fas fa-code"></i>
            <h4>SDK & 라이브러리</h4>
            <p>다양한 언어 지원</p>
          </div>
          <div class="resource-card">
            <i class="fas fa-book"></i>
            <h4>문서화</h4>
            <p>상세한 API 가이드</p>
          </div>
        </div>
      </div>
    `;
    this.insertSection(section);
  }

  addSecurityBadges() {
    const badges = document.createElement('div');
    badges.className = 'security-badges';
    badges.innerHTML = `
      <div class="badge-grid">
        <div class="security-badge">
          <img src="assets/icons/ssl-secure.svg" alt="SSL 보안">
          <span>SSL 암호화</span>
        </div>
        <div class="security-badge">
          <img src="assets/icons/bank-grade.svg" alt="은행급 보안">
          <span>은행급 보안</span>
        </div>
        <div class="security-badge">
          <img src="assets/icons/compliance.svg" alt="규정 준수">
          <span>금융위 인가</span>
        </div>
      </div>
    `;
    
    const footer = document.querySelector('footer') || document.body;
    footer.insertBefore(badges, footer.firstChild);
  }

  addProductShowcase() {
    const section = document.createElement('section');
    section.className = 'product-showcase';
    section.innerHTML = `
      <div class="container">
        <h2>인기 상품</h2>
        <div class="product-grid">
          <div class="product-card">
            <img src="assets/images/product1.jpg" alt="상품 1">
            <h3>프리미엄 제품</h3>
            <div class="price">₩99,000</div>
            <button class="btn btn--primary">장바구니</button>
          </div>
          <div class="product-card">
            <img src="assets/images/product2.jpg" alt="상품 2">
            <h3>베스트셀러</h3>
            <div class="price">₩79,000</div>
            <button class="btn btn--primary">장바구니</button>
          </div>
        </div>
      </div>
    `;
    this.insertSection(section);
  }

  insertSection(section) {
    const main = document.querySelector('main') || document.body;
    const footer = document.querySelector('footer');

    try {
      if (footer && footer.parentNode === main) {
        main.insertBefore(section, footer);
      } else {
        // footer가 없거나 main의 직접적인 자식이 아닌 경우
        main.appendChild(section);
      }
    } catch (error) {
      console.warn('섹션 삽입 중 오류 발생, appendChild로 대체:', error);
      main.appendChild(section);
    }
  }

  // 유틸리티 메서드들
  hexToHsl(hex) {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return { h: h * 360, s: s * 100, l };
  }

  hslToHex(h, s, l) {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = n => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  }

  // 템플릿 미리보기 생성
  generatePreview(industry) {
    const template = this.templates[industry];
    if (!template) return null;

    return {
      name: template.name,
      colors: template.colors,
      preview: `
        <div style="
          background: ${template.colors.background};
          color: ${template.colors.primary};
          font-family: ${template.typography.primary};
          padding: 20px;
          border-radius: ${template.layout.borderRadius};
          border: 1px solid #e2e8f0;
        ">
          <h3 style="color: ${template.colors.primary}; margin: 0 0 10px 0;">
            ${template.name}
          </h3>
          <p style="margin: 0 0 15px 0; color: #64748b;">
            ${template.messaging.heroFocus} 중심의 디자인
          </p>
          <button style="
            background: ${template.colors.primary};
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: ${template.layout.borderRadius};
            font-weight: ${template.typography.headingWeight};
          ">
            ${template.messaging.cta[0]}
          </button>
        </div>
      `
    };
  }
}

// 클라이언트 맞춤 적용 워크플로우
class ClientCustomizationWorkflow {
  constructor() {
    this.industrySystem = new IndustryTemplateSystem();
    this.steps = [
      'analyze_client',
      'select_template', 
      'apply_branding',
      'customize_content',
      'optimize_features',
      'validate_output'
    ];
    this.currentStep = 0;
  }

  async startCustomization(clientData) {
    console.log('🚀 클라이언트 커스터마이징 워크플로우 시작');
    
    try {
      // 1. 클라이언트 분석
      const analysis = await this.analyzeClient(clientData);
      
      // 2. 템플릿 선택
      const selectedTemplate = this.selectTemplate(analysis);
      
      // 3. 브랜딩 적용
      const brandingResult = await this.applyBranding(selectedTemplate, clientData);
      
      // 4. 콘텐츠 커스터마이징
      const contentResult = this.customizeContent(clientData);
      
      // 5. 기능 최적화
      const featureResult = this.optimizeFeatures(analysis);
      
      // 6. 최종 검증
      const validation = this.validateOutput();
      
      return {
        success: true,
        results: {
          analysis,
          template: selectedTemplate,
          branding: brandingResult,
          content: contentResult,
          features: featureResult,
          validation
        }
      };
      
    } catch (error) {
      console.error('❌ 커스터마이징 실패:', error);
      return { success: false, error: error.message };
    }
  }

  analyzeClient(clientData) {
    const analysis = {
      industry: clientData.industry || 'enterprise',
      companySize: this.determineCompanySize(clientData),
      targetAudience: this.analyzeTargetAudience(clientData),
      brandMaturity: this.assessBrandMaturity(clientData),
      technicalNeeds: this.assessTechnicalNeeds(clientData)
    };

    console.log('📊 클라이언트 분석 결과:', analysis);
    return analysis;
  }

  determineCompanySize(clientData) {
    // 제공된 정보를 바탕으로 회사 규모 추정
    if (clientData.employees) {
      if (clientData.employees < 10) return 'startup';
      if (clientData.employees < 100) return 'small';
      if (clientData.employees < 1000) return 'medium';
      return 'enterprise';
    }
    
    // 업종으로 추정
    if (clientData.industry === 'startup') return 'startup';
    return 'medium'; // 기본값
  }

  analyzeTargetAudience(clientData) {
    const audienceMap = {
      'enterprise': 'decision_makers',
      'startup': 'investors_early_adopters',
      'healthcare': 'patients_families',
      'fintech': 'investors_traders',
      'ecommerce': 'consumers',
      'saas': 'developers_technical'
    };
    
    return audienceMap[clientData.industry] || 'general_business';
  }

  assessBrandMaturity(clientData) {
    let score = 0;
    
    if (clientData.logo) score += 2;
    if (clientData.brandColors) score += 2;
    if (clientData.brandGuidelines) score += 3;
    if (clientData.existingWebsite) score += 1;
    
    if (score >= 6) return 'mature';
    if (score >= 3) return 'developing';
    return 'early';
  }

  assessTechnicalNeeds(clientData) {
    const needs = [];
    
    if (clientData.industry === 'saas') needs.push('api_integration');
    if (clientData.industry === 'ecommerce') needs.push('payment_system');
    if (clientData.industry === 'healthcare') needs.push('appointment_booking');
    if (clientData.targetAudience === 'mobile_first') needs.push('mobile_optimization');
    
    return needs;
  }

  selectTemplate(analysis) {
    const template = analysis.industry;
    console.log(`🎨 템플릿 선택: ${template}`);
    
    // 업종별 템플릿 적용
    const result = this.industrySystem.applyIndustryTemplate(template);
    
    return {
      industry: template,
      applied: result.applied,
      customizations: this.getRecommendedCustomizations(analysis)
    };
  }

  getRecommendedCustomizations(analysis) {
    const customizations = {};
    
    // 회사 규모에 따른 조정
    if (analysis.companySize === 'startup') {
      customizations.colors = { accent: '#f59e0b' }; // 더 활기찬 색상
      customizations.messaging = { 
        tone: 'energetic',
        cta: ['Join Beta', 'Get Started', 'Try Free']
      };
    }
    
    // 브랜드 성숙도에 따른 조정
    if (analysis.brandMaturity === 'early') {
      customizations.layout = { borderRadius: '12px' }; // 더 친근한 느낌
    }
    
    return customizations;
  }

  async applyBranding(selectedTemplate, clientData) {
    console.log('🎨 브랜딩 적용 중...');
    
    const brandingData = {
      logo: clientData.logo,
      colors: clientData.brandColors,
      fonts: clientData.preferredFonts,
      companyInfo: {
        name: clientData.companyName,
        industry: clientData.businessType,
        heroMessage: clientData.mainMessage,
        about: clientData.aboutText,
        phone: clientData.contactInfo?.phone,
        email: clientData.contactInfo?.email,
        address: clientData.contactInfo?.address
      }
    };

    // 자동 브랜딩 시스템 활용
    if (window.AutoBrandApplicator) {
      const applicator = new window.AutoBrandApplicator();
      return await applicator.applyBrandingPackage(brandingData);
    }
    
    return { applied: true, method: 'manual' };
  }

  customizeContent(clientData) {
    console.log('📝 콘텐츠 커스터마이징 중...');
    
    const contentMap = {
      heroTitle: clientData.mainMessage || clientData.companyName,
      heroSubtitle: clientData.tagline || `${clientData.businessType} 전문 기업`,
      aboutText: clientData.aboutText || `${clientData.companyName}는 전문적인 서비스를 제공합니다.`,
      services: clientData.services || [],
      contact: clientData.contactInfo || {}
    };

    // DOM에서 콘텐츠 교체
    Object.entries(contentMap).forEach(([key, value]) => {
      const elements = document.querySelectorAll(`[data-content="${key}"]`);
      elements.forEach(element => {
        if (typeof value === 'string') {
          element.textContent = value;
        } else if (Array.isArray(value)) {
          // 서비스 목록 등 배열 데이터 처리
          this.populateArrayContent(element, value);
        } else if (typeof value === 'object') {
          // 연락처 정보 등 객체 데이터 처리
          this.populateObjectContent(element, value);
        }
      });
    });

    return { applied: true, contentMap };
  }

  populateArrayContent(element, array) {
    if (element.tagName === 'UL' || element.tagName === 'OL') {
      element.innerHTML = array.map(item => `<li>${item}</li>`).join('');
    } else {
      element.textContent = array.join(', ');
    }
  }

  populateObjectContent(element, object) {
    const content = Object.entries(object)
      .map(([key, value]) => `${key}: ${value}`)
      .join('\n');
    element.textContent = content;
  }

  optimizeFeatures(analysis) {
    console.log('⚡ 기능 최적화 중...');
    
    const optimizations = [];
    
    // 기술적 요구사항에 따른 최적화
    analysis.technicalNeeds.forEach(need => {
      switch (need) {
        case 'mobile_optimization':
          this.optimizeForMobile();
          optimizations.push('mobile_responsive');
          break;
        case 'api_integration':
          this.prepareAPIIntegration();
          optimizations.push('api_ready');
          break;
        case 'payment_system':
          this.preparePaymentIntegration();
          optimizations.push('payment_ready');
          break;
      }
    });

    return { optimizations, applied: true };
  }

  optimizeForMobile() {
    // 모바일 최적화 CSS 추가
    const mobileCSS = `
      @media (max-width: 768px) {
        .container { padding: 0 1rem; }
        .hero { padding: 2rem 0; }
        .btn { width: 100%; margin: 0.5rem 0; }
      }
    `;
    
    const style = document.createElement('style');
    style.textContent = mobileCSS;
    document.head.appendChild(style);
  }

  prepareAPIIntegration() {
    // API 통합을 위한 구조 준비
    const apiSection = document.createElement('div');
    apiSection.id = 'api-integration-point';
    apiSection.style.display = 'none';
    document.body.appendChild(apiSection);
  }

  preparePaymentIntegration() {
    // 결제 시스템 통합 포인트 준비
    const paymentSection = document.createElement('div');
    paymentSection.id = 'payment-integration-point';
    paymentSection.className = 'payment-ready';
    document.body.appendChild(paymentSection);
  }

  validateOutput() {
    console.log('✅ 최종 검증 중...');
    
    const validation = {
      responsive: this.checkResponsiveness(),
      accessibility: this.checkAccessibility(),
      performance: this.checkPerformance(),
      seo: this.checkSEO(),
      branding: this.checkBrandingConsistency()
    };

    const score = Object.values(validation).filter(Boolean).length;
    const total = Object.keys(validation).length;
    
    return {
      score: `${score}/${total}`,
      percentage: Math.round((score / total) * 100),
      details: validation,
      passed: score >= total * 0.8 // 80% 이상 통과
    };
  }

  checkResponsiveness() {
    // 반응형 디자인 확인
    const viewport = document.querySelector('meta[name="viewport"]');
    const mediaQueries = Array.from(document.styleSheets)
      .some(sheet => {
        try {
          return Array.from(sheet.cssRules || [])
            .some(rule => rule.type === CSSRule.MEDIA_RULE);
        } catch (e) {
          return false;
        }
      });
    
    return viewport && mediaQueries;
  }

  checkAccessibility() {
    // 기본적인 접근성 확인
    const images = document.querySelectorAll('img');
    const imagesWithAlt = Array.from(images).every(img => img.alt);
    
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const hasHeadingStructure = headings.length > 0;
    
    return imagesWithAlt && hasHeadingStructure;
  }

  checkPerformance() {
    // 기본적인 성능 확인
    const images = document.querySelectorAll('img').length;
    const scripts = document.querySelectorAll('script').length;
    const styles = document.querySelectorAll('style, link[rel="stylesheet"]').length;
    
    // 간단한 성능 지표 (실제로는 더 정교한 측정 필요)
    return images < 20 && scripts < 10 && styles < 5;
  }

  checkSEO() {
    // 기본적인 SEO 확인
    const title = document.querySelector('title');
    const description = document.querySelector('meta[name="description"]');
    const h1 = document.querySelector('h1');
    
    return title && description && h1;
  }

  checkBrandingConsistency() {
    // 브랜딩 일관성 확인
    const primaryColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--color-primary-500').trim();
    const font = getComputedStyle(document.body).fontFamily;
    
    return primaryColor && font;
  }
}

// 사용 예시 및 통합 실행
class TemplateCustomizerApp {
  constructor() {
    this.workflow = new ClientCustomizationWorkflow();
  }

  async customizeForClient(clientData) {
    console.log('🎯 클라이언트 맞춤 커스터마이징 시작');
    
    const result = await this.workflow.startCustomization(clientData);
    
    if (result.success) {
      console.log('✅ 커스터마이징 성공적으로 완료');
      console.log('📊 최종 점수:', result.results.validation.percentage + '%');
      return result;
    } else {
      console.error('❌ 커스터마이징 실패:', result.error);
      return result;
    }
  }

  generatePreview(industry) {
    return this.workflow.industrySystem.generatePreview(industry);
  }
}

// 글로벌 인스턴스 생성
window.TemplateCustomizer = new TemplateCustomizerApp();

// ES6 모듈과 글로벌 모두 지원
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { IndustryTemplateSystem, ClientCustomizationWorkflow, TemplateCustomizerApp };
} else {
    window.IndustryTemplateSystem = IndustryTemplateSystem;
    window.ClientCustomizationWorkflow = ClientCustomizationWorkflow;
    window.TemplateCustomizerApp = TemplateCustomizerApp;
}
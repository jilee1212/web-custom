// 브랜드 DNA 추출 및 자동 적용 시스템
class BrandDNAExtractor {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
  }

  // 로고에서 주요 색상 추출
  async extractColorsFromLogo(logoFile) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        this.canvas.width = img.width;
        this.canvas.height = img.height;
        this.ctx.drawImage(img, 0, 0);
        
        const colors = this.analyzeColors();
        resolve(this.generateColorPalette(colors));
      };
      img.src = URL.createObjectURL(logoFile);
    });
  }

  analyzeColors() {
    const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    const colorMap = new Map();
    
    // 색상 빈도 분석
    for (let i = 0; i < imageData.data.length; i += 4) {
      const r = imageData.data[i];
      const g = imageData.data[i + 1];
      const b = imageData.data[i + 2];
      const a = imageData.data[i + 3];
      
      if (a > 128) { // 투명하지 않은 픽셀만
        const hex = this.rgbToHex(r, g, b);
        colorMap.set(hex, (colorMap.get(hex) || 0) + 1);
      }
    }
    
    // 가장 많이 사용된 색상들 반환
    return Array.from(colorMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([color]) => color);
  }

  generateColorPalette(dominantColors) {
    const primary = dominantColors[0];
    const secondary = this.generateComplementary(primary);
    const accent = this.generateTriadic(primary);
    
    return {
      primary: primary,
      secondary: secondary,
      accent: accent,
      gradients: {
        main: `linear-gradient(135deg, ${primary} 0%, ${secondary} 100%)`,
        tech: `linear-gradient(135deg, ${primary} 0%, ${accent} 100%)`
      }
    };
  }

  rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }

  generateComplementary(hex) {
    const rgb = this.hexToRgb(hex);
    return this.rgbToHex(255 - rgb.r, 255 - rgb.g, 255 - rgb.b);
  }

  generateTriadic(hex) {
    const hsl = this.hexToHsl(hex);
    const newHue = (hsl.h + 120) % 360;
    return this.hslToHex(newHue, hsl.s, hsl.l);
  }

  hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  hexToHsl(hex) {
    const rgb = this.hexToRgb(hex);
    const r = rgb.r / 255;
    const g = rgb.g / 255;
    const b = rgb.b / 255;
    
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
    
    return { h: h * 360, s: s * 100, l: l * 100 };
  }

  hslToHex(h, s, l) {
    h /= 360;
    s /= 100;
    l /= 100;
    
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };
    
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    const r = hue2rgb(p, q, h + 1/3);
    const g = hue2rgb(p, q, h);
    const b = hue2rgb(p, q, h - 1/3);
    
    return this.rgbToHex(
      Math.round(r * 255),
      Math.round(g * 255),
      Math.round(b * 255)
    );
  }
}

// 자동 브랜드 적용 시스템
class AutoBrandApplicator {
  constructor() {
    this.extractor = new BrandDNAExtractor();
  }

  // 완전 자동 브랜딩 적용
  async applyBrandingPackage(brandAssets) {
    const results = {
      colors: null,
      fonts: null,
      content: null,
      layout: null
    };

    try {
      // 1. 색상 시스템 생성
      if (brandAssets.logo) {
        results.colors = await this.extractor.extractColorsFromLogo(brandAssets.logo);
        this.applyCSSColors(results.colors);
      }

      // 2. 타이포그래피 적용
      if (brandAssets.preferredFont) {
        results.fonts = this.applyFontSystem(brandAssets.preferredFont);
      }

      // 3. 콘텐츠 교체
      if (brandAssets.companyInfo) {
        results.content = this.replaceContent(brandAssets.companyInfo);
      }

      // 4. 업종별 레이아웃 조정
      if (brandAssets.industry) {
        results.layout = this.applyIndustryLayout(brandAssets.industry);
      }

      return results;
    } catch (error) {
      console.error('브랜딩 적용 실패:', error);
      return null;
    }
  }

  applyCSSColors(colorPalette) {
    const root = document.documentElement;
    
    // 메인 색상 적용
    root.style.setProperty('--color-primary-500', colorPalette.primary);
    root.style.setProperty('--color-secondary-500', colorPalette.secondary);
    root.style.setProperty('--color-accent-500', colorPalette.accent);
    
    // 그라데이션 적용
    root.style.setProperty('--gradient-tech', colorPalette.gradients.main);
    root.style.setProperty('--gradient-hero', colorPalette.gradients.tech);
    
    // 자동 색상 변형 생성 (라이트/다크 변형)
    this.generateColorVariants(colorPalette.primary, 'primary');
    this.generateColorVariants(colorPalette.secondary, 'secondary');
    this.generateColorVariants(colorPalette.accent, 'accent');
  }

  generateColorVariants(baseColor, colorName) {
    const root = document.documentElement;
    const rgb = this.extractor.hexToRgb(baseColor);
    
    // 50부터 900까지 변형 생성
    const variants = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
    
    variants.forEach((variant, index) => {
      const factor = index < 5 ? (5 - index) * 0.2 : (index - 4) * 0.2;
      const isLighter = index < 5;
      
      const r = isLighter ? 
        Math.min(255, rgb.r + (255 - rgb.r) * factor) :
        Math.max(0, rgb.r - rgb.r * factor);
      const g = isLighter ? 
        Math.min(255, rgb.g + (255 - rgb.g) * factor) :
        Math.max(0, rgb.g - rgb.g * factor);
      const b = isLighter ? 
        Math.min(255, rgb.b + (255 - rgb.b) * factor) :
        Math.max(0, rgb.b - rgb.b * factor);
      
      const variantHex = this.extractor.rgbToHex(
        Math.round(r), Math.round(g), Math.round(b)
      );
      
      root.style.setProperty(`--color-${colorName}-${variant}`, variantHex);
    });
  }

  applyFontSystem(preferredFont) {
    const root = document.documentElement;
    
    // 한글 폰트 매핑
    const fontMapping = {
      'modern': 'Pretendard, -apple-system, sans-serif',
      'classic': 'Noto Sans KR, Arial, sans-serif',
      'tech': 'Inter, Roboto, sans-serif',
      'creative': 'Noto Sans KR, Georgia, serif'
    };
    
    const fontFamily = fontMapping[preferredFont] || fontMapping.modern;
    root.style.setProperty('--font-family-primary', fontFamily);
    
    return { applied: fontFamily };
  }

  replaceContent(companyInfo) {
    const replacements = {
      '[회사명]': companyInfo.name || '회사명',
      '[Your Company]': companyInfo.name || 'Your Company',
      '[사업분야]': companyInfo.industry || '사업분야',
      '[대표메시지]': companyInfo.heroMessage || '대표메시지',
      '[회사소개]': companyInfo.about || '회사소개',
      '[연락처]': companyInfo.phone || '02-0000-0000',
      '[이메일]': companyInfo.email || 'info@company.com',
      '[주소]': companyInfo.address || '서울시 강남구'
    };

    // 모든 텍스트 노드에서 플레이스홀더 교체
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );

    const textNodes = [];
    let node;
    while (node = walker.nextNode()) {
      textNodes.push(node);
    }

    textNodes.forEach(textNode => {
      let content = textNode.textContent;
      Object.entries(replacements).forEach(([placeholder, replacement]) => {
        content = content.replace(new RegExp(placeholder, 'g'), replacement);
      });
      textNode.textContent = content;
    });

    return replacements;
  }

  applyIndustryLayout(industry) {
    const body = document.body;
    
    // 기존 업종 클래스 제거
    body.classList.remove('industry-enterprise', 'industry-startup', 'industry-developer');
    
    // 새 업종 클래스 추가
    body.classList.add(`industry-${industry}`);
    
    // 업종별 특별 설정
    switch (industry) {
      case 'enterprise':
        this.applyEnterpriseLayout();
        break;
      case 'startup':
        this.applyStartupLayout();
        break;
      case 'developer':
        this.applyDeveloperLayout();
        break;
    }
    
    return { industry, applied: true };
  }

  applyEnterpriseLayout() {
    // 기업용: 보수적이고 신뢰감 있는 레이아웃
    document.documentElement.style.setProperty('--border-radius-base', '8px');
    document.documentElement.style.setProperty('--animation-duration', '300ms');
  }

  applyStartupLayout() {
    // 스타트업: 역동적이고 현대적인 레이아웃
    document.documentElement.style.setProperty('--border-radius-base', '16px');
    document.documentElement.style.setProperty('--animation-duration', '200ms');
  }

  applyDeveloperLayout() {
    // 개발자 도구: 기능 중심의 심플한 레이아웃
    document.documentElement.style.setProperty('--border-radius-base', '4px');
    document.documentElement.style.setProperty('--animation-duration', '150ms');
  }
}

// Claude Code 연동 자동화 헬퍼
class ClaudeCodeHelper {
  constructor() {
    this.brandApplicator = new AutoBrandApplicator();
  }

  // 프로젝트 자동 설정
  async setupProject(clientData) {
    const projectConfig = {
      name: clientData.companyName,
      type: 'website-customization',
      industry: clientData.industry,
      assets: clientData.assets
    };

    // 브랜딩 자동 적용
    const brandingResults = await this.brandApplicator.applyBrandingPackage(clientData.assets);
    
    // 결과 로깅
    console.log('🎨 브랜딩 적용 완료:', brandingResults);
    
    return {
      project: projectConfig,
      branding: brandingResults,
      status: 'ready'
    };
  }

  // 실시간 프리뷰 생성
  generatePreview() {
    const previewData = {
      timestamp: new Date().toISOString(),
      colors: this.extractCurrentColors(),
      fonts: this.extractCurrentFonts(),
      layout: this.extractCurrentLayout()
    };

    return previewData;
  }

  extractCurrentColors() {
    const root = getComputedStyle(document.documentElement);
    return {
      primary: root.getPropertyValue('--color-primary-500').trim(),
      secondary: root.getPropertyValue('--color-secondary-500').trim(),
      accent: root.getPropertyValue('--color-accent-500').trim()
    };
  }

  extractCurrentFonts() {
    const root = getComputedStyle(document.documentElement);
    return {
      primary: root.getPropertyValue('--font-family-primary').trim()
    };
  }

  extractCurrentLayout() {
    return {
      borderRadius: getComputedStyle(document.documentElement).getPropertyValue('--border-radius-base').trim(),
      industry: Array.from(document.body.classList).find(cls => cls.startsWith('industry-'))?.replace('industry-', '')
    };
  }
}

// 사용 예시
const claudeHelper = new ClaudeCodeHelper();

// 클라이언트 데이터 예시
const exampleClientData = {
  companyName: 'TechCorp Solutions',
  industry: 'enterprise',
  assets: {
    logo: null, // File 객체
    preferredFont: 'tech',
    companyInfo: {
      name: 'TechCorp Solutions',
      industry: 'IT 솔루션',
      heroMessage: '혁신적인 기술로 미래를 만듭니다',
      about: '20년 경험의 IT 솔루션 전문기업',
      phone: '02-1234-5678',
      email: 'info@techcorp.com',
      address: '서울시 강남구 테헤란로 123'
    }
  }
};

// 자동 브랜딩 적용
// claudeHelper.setupProject(exampleClientData);

// ES6 모듈과 글로벌 모두 지원
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { BrandDNAExtractor, AutoBrandApplicator, ClaudeCodeHelper };
} else {
    window.BrandDNAExtractor = BrandDNAExtractor;
    window.AutoBrandApplicator = AutoBrandApplicator;
    window.ClaudeCodeHelper = ClaudeCodeHelper;
}
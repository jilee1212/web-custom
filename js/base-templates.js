// 🏗️ 베이스 템플릿 시스템 - 4개 기본 구조
class BaseTemplateSystem {
    constructor() {
        this.baseTemplates = {
            corporate: 'Corporate (기업형)',
            creative: 'Creative (크리에이티브형)',
            commerce: 'Commerce (상업형)',
            landing: 'Landing (랜딩형)'
        };

        console.log('🏗️ 베이스 템플릿 시스템 초기화 완료');
    }

    // Corporate (기업형) 베이스 - 신뢰성과 전문성 강조
    getCorporateHTML() {
        return `
        <div class="base-corporate" data-base-type="corporate">
            <header class="header-corporate">
                <nav class="nav-horizontal">
                    <div class="logo-section">
                        <img src="{{LOGO_URL}}" alt="{{COMPANY_NAME}}" class="company-logo">
                        <span class="company-name">{{COMPANY_NAME}}</span>
                    </div>
                    <div class="nav-menu">
                        <a href="#home">홈</a>
                        <a href="#about">회사소개</a>
                        <a href="#services">서비스</a>
                        <a href="#contact">연락처</a>
                    </div>
                </nav>
            </header>

            <main>
                <section class="hero-professional">
                    <div class="container">
                        <div class="hero-content">
                            <h1 class="hero-title">{{COMPANY_NAME}}</h1>
                            <p class="hero-subtitle">{{PROFESSIONAL_TAGLINE}}</p>
                            <div class="cta-buttons">
                                <button class="btn btn-primary">{{PRIMARY_CTA}}</button>
                                <button class="btn btn-secondary">{{SECONDARY_CTA}}</button>
                            </div>
                        </div>
                        <div class="hero-image">
                            <img src="{{HERO_IMAGE}}" alt="{{COMPANY_NAME}} 대표 이미지">
                        </div>
                    </div>
                </section>

                <section class="services-grid">
                    <div class="container">
                        <div class="section-header">
                            <h2>우리의 서비스</h2>
                            <p>전문적이고 신뢰할 수 있는 서비스를 제공합니다</p>
                        </div>
                        <div class="service-cards" data-repeat="services">
                            <div class="service-card">
                                <div class="service-icon">{{SERVICE_ICON}}</div>
                                <h3>{{SERVICE_TITLE}}</h3>
                                <p>{{SERVICE_DESCRIPTION}}</p>
                                <a href="#" class="service-link">자세히 보기 →</a>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="about-company">
                    <div class="container">
                        <div class="company-stats">
                            <div class="stat-item" data-repeat="stats">
                                <span class="stat-number">{{STAT_NUMBER}}</span>
                                <span class="stat-label">{{STAT_LABEL}}</span>
                            </div>
                        </div>
                        <div class="company-story">
                            <h2>{{COMPANY_NAME}} 소개</h2>
                            <p>{{COMPANY_STORY}}</p>
                        </div>
                    </div>
                </section>

                <section class="contact-professional">
                    <div class="container">
                        <h2>문의하기</h2>
                        <form class="contact-form-business">
                            <div class="form-group">
                                <input type="text" placeholder="성함" required>
                            </div>
                            <div class="form-group">
                                <input type="email" placeholder="이메일" required>
                            </div>
                            <div class="form-group">
                                <textarea placeholder="문의 내용" required></textarea>
                            </div>
                            <button type="submit" class="btn btn-primary">문의 보내기</button>
                        </form>
                    </div>
                </section>
            </main>

            <footer class="footer-corporate">
                <div class="container">
                    <div class="footer-content">
                        <div class="footer-section">
                            <h3>{{COMPANY_NAME}}</h3>
                            <p>{{FOOTER_DESCRIPTION}}</p>
                        </div>
                        <div class="footer-section">
                            <h3>연락처</h3>
                            <p>{{CONTACT_INFO}}</p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>`;
    }

    // Creative (크리에이티브형) 베이스 - 창의성과 개성 강조
    getCreativeHTML() {
        return `
        <div class="base-creative" data-base-type="creative">
            <header class="header-creative">
                <nav class="nav-artistic">
                    <div class="logo-artistic">{{LOGO_ARTISTIC}}</div>
                    <div class="nav-menu-creative">
                        <a href="#portfolio">포트폴리오</a>
                        <a href="#about">소개</a>
                        <a href="#contact">연락처</a>
                    </div>
                </nav>
            </header>

            <main>
                <section class="hero-artistic">
                    <div class="container">
                        <div class="hero-visual">
                            <div class="creative-animation">{{ANIMATED_ELEMENT}}</div>
                            <h1 class="title-artistic">{{CREATIVE_TITLE}}</h1>
                            <p class="creative-subtitle">{{CREATIVE_DESCRIPTION}}</p>
                        </div>
                    </div>
                </section>

                <section class="portfolio-showcase">
                    <div class="container">
                        <h2>포트폴리오</h2>
                        <div class="portfolio-grid">
                            <div class="portfolio-item" data-repeat="portfolio">
                                <img src="{{PORTFOLIO_IMAGE}}" alt="{{PORTFOLIO_TITLE}}">
                                <div class="portfolio-overlay">
                                    <h3>{{PORTFOLIO_TITLE}}</h3>
                                    <p>{{PORTFOLIO_CATEGORY}}</p>
                                    <button class="portfolio-btn">자세히 보기</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="creative-about">
                    <div class="container">
                        <div class="artist-profile">
                            <img src="{{ARTIST_PHOTO}}" class="artist-image" alt="작가 프로필">
                            <div class="artist-story">
                                <h2>작가 소개</h2>
                                <p>{{ARTIST_STORY}}</p>
                                <div class="artist-skills">
                                    <span class="skill-tag" data-repeat="skills">{{SKILL_NAME}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="creative-contact">
                    <div class="container">
                        <h2>함께 작업해요</h2>
                        <form class="contact-form-creative">
                            <input type="text" placeholder="프로젝트명" required>
                            <textarea placeholder="프로젝트 설명" required></textarea>
                            <button type="submit" class="btn btn-creative">프로젝트 문의</button>
                        </form>
                    </div>
                </section>
            </main>
        </div>`;
    }

    // Commerce (상업형) 베이스 - 판매와 전환에 최적화
    getCommerceHTML() {
        return `
        <div class="base-commerce" data-base-type="commerce">
            <header class="header-shop">
                <nav class="nav-commerce">
                    <div class="logo-shop">{{SHOP_LOGO}}</div>
                    <div class="nav-menu-shop">
                        <a href="#products">상품</a>
                        <a href="#about">소개</a>
                        <div class="cart-icon">
                            🛒 <span class="cart-count">{{CART_COUNT}}</span>
                        </div>
                    </div>
                </nav>
            </header>

            <main>
                <section class="hero-sales">
                    <div class="container">
                        <div class="offer-banner">
                            <h1 class="main-offer">{{MAIN_OFFER}}</h1>
                            <div class="price-display">
                                <span class="price-original">{{ORIGINAL_PRICE}}</span>
                                <span class="price-sale">{{SALE_PRICE}}</span>
                                <span class="discount-badge">{{DISCOUNT_PERCENT}}% 할인</span>
                            </div>
                            <button class="btn-buy-now">{{BUY_NOW_TEXT}}</button>
                            <p class="urgency-text">{{URGENCY_MESSAGE}}</p>
                        </div>
                        <div class="product-hero-image">
                            <img src="{{HERO_PRODUCT_IMAGE}}" alt="{{MAIN_OFFER}}">
                        </div>
                    </div>
                </section>

                <section class="product-features">
                    <div class="container">
                        <h2>제품 특징</h2>
                        <div class="feature-grid">
                            <div class="feature-item" data-repeat="features">
                                <div class="feature-icon">{{FEATURE_ICON}}</div>
                                <h3>{{FEATURE_TITLE}}</h3>
                                <p>{{FEATURE_DESCRIPTION}}</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="social-proof">
                    <div class="container">
                        <h2>고객 후기</h2>
                        <div class="testimonial-slider">
                            <div class="testimonial" data-repeat="testimonials">
                                <div class="rating">
                                    <span class="stars">{{RATING_STARS}}</span>
                                </div>
                                <p class="testimonial-text">"{{TESTIMONIAL_TEXT}}"</p>
                                <cite class="customer-name">{{CUSTOMER_NAME}}</cite>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="final-cta">
                    <div class="container">
                        <div class="cta-content">
                            <h2>{{FINAL_CTA_TITLE}}</h2>
                            <p>{{FINAL_CTA_DESCRIPTION}}</p>
                            <button class="btn-final-purchase">{{FINAL_CTA_BUTTON}}</button>
                        </div>
                    </div>
                </section>
            </main>
        </div>`;
    }

    // Landing (랜딩형) 베이스 - 전환율 최적화
    getLandingHTML() {
        return `
        <div class="base-landing" data-base-type="landing">
            <header class="header-minimal">
                <div class="logo-only">{{LOGO}}</div>
                <div class="trust-badges">
                    <span class="trust-badge" data-repeat="trust_signals">{{TRUST_BADGE}}</span>
                </div>
            </header>

            <main class="single-focus">
                <section class="hero-conversion">
                    <div class="container">
                        <div class="value-proposition">
                            <h1 class="main-headline">{{MAIN_HEADLINE}}</h1>
                            <p class="sub-headline">{{SUB_HEADLINE}}</p>
                            <div class="social-proof-mini">
                                <span>{{SOCIAL_PROOF_TEXT}}</span>
                            </div>

                            <form class="lead-capture">
                                <div class="form-row">
                                    <input type="email" placeholder="{{EMAIL_PLACEHOLDER}}" required>
                                    <button type="submit" class="btn-convert">{{CONVERSION_BUTTON}}</button>
                                </div>
                                <p class="privacy-note">{{PRIVACY_TEXT}}</p>
                            </form>
                        </div>
                        <div class="hero-media">
                            <img src="{{HERO_MEDIA}}" alt="{{MAIN_HEADLINE}}">
                        </div>
                    </div>
                </section>

                <section class="benefits-list">
                    <div class="container">
                        <h2>왜 선택해야 할까요?</h2>
                        <div class="benefits-grid">
                            <div class="benefit-item" data-repeat="benefits">
                                <div class="benefit-icon">{{BENEFIT_ICON}}</div>
                                <h3>{{BENEFIT_TITLE}}</h3>
                                <p>{{BENEFIT_DESCRIPTION}}</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="how-it-works">
                    <div class="container">
                        <h2>간단한 3단계</h2>
                        <div class="steps-process">
                            <div class="step-item" data-repeat="steps">
                                <div class="step-number">{{STEP_NUMBER}}</div>
                                <h3>{{STEP_TITLE}}</h3>
                                <p>{{STEP_DESCRIPTION}}</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="urgency-scarcity">
                    <div class="container">
                        <div class="urgency-box">
                            <div class="countdown-timer">{{COUNTDOWN_TIMER}}</div>
                            <div class="limited-offer">{{SCARCITY_MESSAGE}}</div>
                            <button class="btn-urgent">{{URGENT_CTA_BUTTON}}</button>
                        </div>
                    </div>
                </section>

                <section class="final-conversion">
                    <div class="container">
                        <h2>{{FINAL_HEADLINE}}</h2>
                        <form class="final-lead-capture">
                            <input type="email" placeholder="{{EMAIL_PLACEHOLDER}}" required>
                            <button type="submit" class="btn-final-convert">{{FINAL_CONVERSION_BUTTON}}</button>
                        </form>
                    </div>
                </section>
            </main>

            <footer class="footer-minimal">
                <div class="container">
                    <p>{{FOOTER_TEXT}}</p>
                </div>
            </footer>
        </div>`;
    }

    // 베이스 템플릿 가져오기
    getBaseTemplate(baseType) {
        const templates = {
            corporate: this.getCorporateHTML(),
            creative: this.getCreativeHTML(),
            commerce: this.getCommerceHTML(),
            landing: this.getLandingHTML()
        };

        return templates[baseType] || templates.corporate;
    }

    // 베이스 템플릿 목록 반환
    getAvailableBases() {
        return Object.keys(this.baseTemplates).map(key => ({
            id: key,
            name: this.baseTemplates[key],
            description: this.getBaseDescription(key)
        }));
    }

    // 베이스 설명
    getBaseDescription(baseType) {
        const descriptions = {
            corporate: '신뢰성과 전문성을 강조하는 기업용 레이아웃. 서비스 소개, 회사 통계, 전문적인 문의 양식이 포함됩니다.',
            creative: '창의성과 개성을 강조하는 포트폴리오 레이아웃. 작품 갤러리, 작가 소개, 프로젝트 문의 기능을 제공합니다.',
            commerce: '판매와 전환에 최적화된 이커머스 레이아웃. 상품 진열, 고객 후기, 구매 유도 요소가 포함됩니다.',
            landing: '전환율에 최적화된 단일 목적 랜딩 페이지. 리드 수집, 긴급성 조성, 명확한 CTA에 집중합니다.'
        };

        return descriptions[baseType] || '';
    }

    // 베이스별 필수 변수 목록
    getRequiredVariables(baseType) {
        const variables = {
            corporate: [
                'COMPANY_NAME', 'PROFESSIONAL_TAGLINE', 'PRIMARY_CTA', 'SECONDARY_CTA',
                'HERO_IMAGE', 'COMPANY_STORY', 'FOOTER_DESCRIPTION', 'CONTACT_INFO'
            ],
            creative: [
                'CREATIVE_TITLE', 'CREATIVE_DESCRIPTION', 'ARTIST_PHOTO', 'ARTIST_STORY',
                'LOGO_ARTISTIC', 'ANIMATED_ELEMENT'
            ],
            commerce: [
                'MAIN_OFFER', 'ORIGINAL_PRICE', 'SALE_PRICE', 'DISCOUNT_PERCENT',
                'BUY_NOW_TEXT', 'URGENCY_MESSAGE', 'HERO_PRODUCT_IMAGE'
            ],
            landing: [
                'MAIN_HEADLINE', 'SUB_HEADLINE', 'EMAIL_PLACEHOLDER', 'CONVERSION_BUTTON',
                'SOCIAL_PROOF_TEXT', 'FINAL_HEADLINE', 'SCARCITY_MESSAGE'
            ]
        };

        return variables[baseType] || [];
    }
}

// 전역 객체로 등록
window.BaseTemplateSystem = BaseTemplateSystem;

console.log('🏗️ 베이스 템플릿 시스템 로드 완료');
// ⚙️ 조합형 템플릿 생성 엔진 - 4×8×3 = 96개 템플릿 자동 생성!
class CombinatorialTemplateGenerator {
    constructor() {
        // 4개 베이스 × 8개 업종 × 3개 스타일 = 96개 조합!
        this.bases = ['corporate', 'creative', 'commerce', 'landing'];
        this.industries = ['healthcare', 'restaurant', 'technology', 'education', 'finance', 'realestate', 'legal', 'fitness'];
        this.styles = ['modern', 'classic', 'bold'];

        // 의존성 시스템들
        this.baseSystem = null;
        this.industryMapper = null;

        // 생성된 템플릿 캐시
        this.generatedTemplates = new Map();

        console.log(`🚀 조합형 템플릿 생성 엔진 초기화`);
        console.log(`📊 가능한 조합: ${this.bases.length} × ${this.industries.length} × ${this.styles.length} = ${this.getTotalCombinations()}개`);
    }

    // 의존성 초기화 및 대기
    async initialize() {
        try {
            await this.waitForDependencies();
            this.baseSystem = new BaseTemplateSystem();
            this.industryMapper = new ExtendedIndustryContentMapper();

            console.log('✅ 조합형 템플릿 생성 엔진 초기화 완료');
            return true;
        } catch (error) {
            console.error('❌ 초기화 실패:', error);
            return false;
        }
    }

    async waitForDependencies() {
        return new Promise((resolve, reject) => {
            let attempts = 0;
            const maxAttempts = 30;

            const checkDependencies = () => {
                attempts++;

                if (window.BaseTemplateSystem && window.ExtendedIndustryContentMapper) {
                    resolve();
                } else if (attempts >= maxAttempts) {
                    reject(new Error('Dependencies timeout'));
                } else {
                    setTimeout(checkDependencies, 100);
                }
            };

            checkDependencies();
        });
    }

    // 전체 조합 수 계산
    getTotalCombinations() {
        return this.bases.length * this.industries.length * this.styles.length;
    }

    // 모든 조합 생성 (96개!)
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

        console.log(`🎉 ${templates.length}개의 유니크 템플릿 생성 완료!`);
        return templates;
    }

    // 개별 템플릿 생성
    createTemplate(base, industry, style) {
        const templateId = `${base}-${industry}-${style}`;

        // 캐시 확인
        if (this.generatedTemplates.has(templateId)) {
            return this.generatedTemplates.get(templateId);
        }

        try {
            // 1. 베이스 HTML 구조 로드
            const baseHtml = this.baseSystem.getBaseTemplate(base);

            // 2. 업종별 콘텐츠 데이터 가져오기
            const industryData = this.industryMapper.getIndustryContent(industry);

            // 3. 베이스와 업종 조합 콘텐츠 생성
            const combinedContent = this.industryMapper.generateCombinedContent(base, industry);

            // 4. 업종별 콘텐츠 적용
            const contentHtml = this.applyIndustryContent(baseHtml, combinedContent);

            // 5. 스타일 CSS 생성
            const styleCSS = this.generateStyleCSS(style, industryData.color_palette);

            // 6. 메타데이터 생성
            const metadata = this.generateMetadata(base, industry, style, industryData);

            const template = {
                id: templateId,
                name: this.generateTemplateName(base, industry, style),
                description: this.generateTemplateDescription(base, industry, style),
                html: contentHtml,
                css: styleCSS,
                metadata: metadata,
                category: industry,
                style: style,
                base: base,
                industry: industryData,
                combinations: { base, industry, style },
                created: new Date().toISOString()
            };

            // 캐시에 저장
            this.generatedTemplates.set(templateId, template);

            return template;

        } catch (error) {
            console.error(`템플릿 생성 실패 (${templateId}):`, error);
            return null;
        }
    }

    // 업종별 콘텐츠를 HTML에 적용
    applyIndustryContent(html, combinedContent) {
        let processedHtml = html;

        // 1. 기본 변수 교체
        Object.entries(combinedContent.variables).forEach(([key, value]) => {
            const regex = new RegExp(`{{${key}}}`, 'g');
            processedHtml = processedHtml.replace(regex, value);
        });

        // 2. 반복 섹션 처리 (서비스, 포트폴리오 등)
        processedHtml = this.processRepeatingElements(processedHtml, combinedContent);

        // 3. 로고 및 이미지 플레이스홀더 설정
        processedHtml = this.processImagePlaceholders(processedHtml, combinedContent.industry);

        // 4. 남은 변수들 기본값으로 처리
        processedHtml = this.fillDefaultVariables(processedHtml, combinedContent.industry);

        return processedHtml;
    }

    // 반복 요소 처리 (data-repeat 속성)
    processRepeatingElements(html, combinedContent) {
        let processedHtml = html;

        // 서비스 카드 반복
        if (combinedContent.services && combinedContent.services.length > 0) {
            const serviceCards = combinedContent.services.map(service => `
                <div class="service-card">
                    <div class="service-icon">${service.icon}</div>
                    <h3>${service.title}</h3>
                    <p>${service.description}</p>
                    <a href="#" class="service-link">자세히 보기 →</a>
                </div>
            `).join('');

            processedHtml = processedHtml.replace(
                /<div class="service-cards" data-repeat="services">[\s\S]*?<\/div>/,
                `<div class="service-cards">${serviceCards}</div>`
            );
        }

        // 통계 정보 반복
        if (combinedContent.stats && combinedContent.stats.length > 0) {
            const statsItems = combinedContent.stats.map(stat => `
                <div class="stat-item">
                    <span class="stat-number">${stat.number}</span>
                    <span class="stat-label">${stat.label}</span>
                </div>
            `).join('');

            processedHtml = processedHtml.replace(
                /<div class="stat-item" data-repeat="stats">[\s\S]*?<\/div>/,
                statsItems
            );
        }

        // 포트폴리오 아이템 반복 (Creative 베이스용)
        if (combinedContent.portfolio && combinedContent.portfolio.length > 0) {
            const portfolioItems = combinedContent.portfolio.map(item => `
                <div class="portfolio-item">
                    <img src="assets/images/${item.image}" alt="${item.title}">
                    <div class="portfolio-overlay">
                        <h3>${item.title}</h3>
                        <p>${item.category}</p>
                        <button class="portfolio-btn">자세히 보기</button>
                    </div>
                </div>
            `).join('');

            processedHtml = processedHtml.replace(
                /<div class="portfolio-item" data-repeat="portfolio">[\s\S]*?<\/div>/,
                portfolioItems
            );
        }

        return processedHtml;
    }

    // 이미지 플레이스홀더 처리
    processImagePlaceholders(html, industryData) {
        const imageMap = {
            '{{LOGO_URL}}': `assets/images/${industryData.name.toLowerCase()}-logo.png`,
            '{{HERO_IMAGE}}': `assets/images/${industryData.name.toLowerCase()}-hero.jpg`,
            '{{HERO_PRODUCT_IMAGE}}': `assets/images/${industryData.name.toLowerCase()}-product.jpg`,
            '{{HERO_MEDIA}}': `assets/images/${industryData.name.toLowerCase()}-media.jpg`,
            '{{ARTIST_PHOTO}}': `assets/images/${industryData.name.toLowerCase()}-artist.jpg`
        };

        let processedHtml = html;
        Object.entries(imageMap).forEach(([placeholder, imagePath]) => {
            const regex = new RegExp(placeholder.replace(/[{}]/g, '\\$&'), 'g');
            processedHtml = processedHtml.replace(regex, imagePath);
        });

        return processedHtml;
    }

    // 기본값으로 남은 변수 채우기
    fillDefaultVariables(html, industryData) {
        const defaultValues = {
            '{{COMPANY_NAME}}': `${industryData.name} 샘플`,
            '{{LOGO_ARTISTIC}}': industryData.name,
            '{{SHOP_LOGO}}': industryData.name,
            '{{CART_COUNT}}': '0',
            '{{ANIMATED_ELEMENT}}': '✨',
            '{{EMAIL_PLACEHOLDER}}': '이메일을 입력하세요',
            '{{PRIVACY_TEXT}}': '개인정보 보호정책에 따라 처리됩니다.',
            '{{FOOTER_TEXT}}': `© 2024 ${industryData.name}. All rights reserved.`,
            '{{COUNTDOWN_TIMER}}': '03:45:22',
            '{{LOGO}}': industryData.name
        };

        let processedHtml = html;
        Object.entries(defaultValues).forEach(([placeholder, defaultValue]) => {
            const regex = new RegExp(placeholder.replace(/[{}]/g, '\\$&'), 'g');
            processedHtml = processedHtml.replace(regex, defaultValue);
        });

        // 남은 모든 {{}} 변수를 기본 텍스트로 교체
        processedHtml = processedHtml.replace(/\{\{[^}]+\}\}/g, '[샘플 텍스트]');

        return processedHtml;
    }

    // 스타일 CSS 생성
    generateStyleCSS(styleType, colorPalette) {
        const baseStyleClass = `.style-${styleType}`;

        const colorVars = `
            :root {
                --color-primary: ${colorPalette.primary};
                --color-secondary: ${colorPalette.secondary};
                --color-accent: ${colorPalette.accent};
                --color-text: ${colorPalette.text};
            }
        `;

        // 스타일별 추가 CSS
        const styleSpecificCSS = this.getStyleSpecificCSS(styleType, colorPalette);

        return `
            ${colorVars}

            /* ${styleType} 스타일 적용 */
            .base-template {
                ${baseStyleClass === '.style-modern' ? 'font-family: Inter, sans-serif;' : ''}
                ${baseStyleClass === '.style-classic' ? 'font-family: Georgia, serif;' : ''}
                ${baseStyleClass === '.style-bold' ? 'font-family: Poppins, sans-serif;' : ''}
            }

            ${styleSpecificCSS}
        `;
    }

    // 스타일별 특수 CSS
    getStyleSpecificCSS(styleType, colorPalette) {
        const styles = {
            modern: `
                .base-template .btn {
                    border-radius: 12px;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    transition: all 0.3s ease;
                }
                .base-template .btn:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
                }
                .base-template .card {
                    border-radius: 12px;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                }
            `,
            classic: `
                .base-template .btn {
                    border-radius: 4px;
                    border: 2px solid ${colorPalette.primary};
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                }
                .base-template h1:after {
                    content: '';
                    display: block;
                    width: 60px;
                    height: 3px;
                    background: #d4af37;
                    margin: 1rem auto;
                }
                .base-template .section:nth-child(even) {
                    background: #f8f6f0;
                }
            `,
            bold: `
                .base-template .btn {
                    border-radius: 20px;
                    text-transform: uppercase;
                    font-weight: 800;
                    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
                    background: linear-gradient(135deg, ${colorPalette.primary}, ${colorPalette.accent});
                }
                .base-template h1 {
                    font-size: 4rem;
                    font-weight: 900;
                    text-transform: uppercase;
                    background: linear-gradient(135deg, ${colorPalette.primary}, ${colorPalette.accent});
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                .base-template .card:hover {
                    transform: scale(1.05) rotate(-2deg);
                }
            `
        };

        return styles[styleType] || styles.modern;
    }

    // 메타데이터 생성
    generateMetadata(base, industry, style, industryData) {
        return {
            id: `${base}-${industry}-${style}`,
            name: this.generateTemplateName(base, industry, style),
            description: this.generateTemplateDescription(base, industry, style),
            category: industry,
            industryName: industryData.name,
            tags: this.generateTags(base, industry, style),
            preview: `assets/previews/${base}-${industry}-${style}.jpg`,
            base: {
                type: base,
                name: this.getBaseName(base),
                description: this.getBaseDescription(base)
            },
            industry: {
                type: industry,
                name: industryData.name,
                description: this.getIndustryDescription(industry)
            },
            style: {
                type: style,
                name: this.getStyleName(style),
                description: this.getStyleDescription(style)
            },
            features: this.generateFeatureList(base, industry, style),
            created: new Date().toISOString(),
            version: '1.0.0',
            customizable: {
                colors: true,
                content: true,
                layout: base === 'corporate' || base === 'creative',
                components: true,
                logo: true
            }
        };
    }

    // 템플릿 이름 생성
    generateTemplateName(base, industry, style) {
        const baseNames = {
            corporate: '기업형',
            creative: '크리에이티브',
            commerce: '상업형',
            landing: '랜딩페이지'
        };

        const industryNames = {
            healthcare: '의료',
            restaurant: '레스토랑',
            technology: '기술',
            education: '교육',
            finance: '금융',
            realestate: '부동산',
            legal: '법무',
            fitness: '헬스'
        };

        const styleNames = {
            modern: '모던',
            classic: '클래식',
            bold: '대담한'
        };

        return `${industryNames[industry]} ${styleNames[style]} ${baseNames[base]}`;
    }

    // 템플릿 설명 생성
    generateTemplateDescription(base, industry, style) {
        const descriptions = {
            corporate: '전문적이고 신뢰할 수 있는 기업 홈페이지',
            creative: '개성과 창의성을 강조하는 포트폴리오',
            commerce: '판매 전환에 최적화된 이커머스 사이트',
            landing: '명확한 목적을 가진 랜딩 페이지'
        };

        return `${this.industryMapper.getIndustryContent(industry).name} 업종을 위한 ${descriptions[base]}입니다.`;
    }

    // 태그 생성
    generateTags(base, industry, style) {
        const baseTags = {
            corporate: ['기업', '비즈니스', '전문적', '신뢰성'],
            creative: ['크리에이티브', '포트폴리오', '예술적', '개성'],
            commerce: ['쇼핑몰', '이커머스', '판매', '전환'],
            landing: ['랜딩페이지', '전환율', '마케팅', 'CTA']
        };

        const styleTags = {
            modern: ['모던', '깔끔한', '미니멀'],
            classic: ['클래식', '전통적', '우아한'],
            bold: ['대담한', '임팩트', '강렬한']
        };

        return [
            ...baseTags[base],
            ...styleTags[style],
            industry,
            `${base}-${industry}-${style}`
        ];
    }

    // 기능 목록 생성
    generateFeatureList(base, industry, style) {
        const baseFeatures = {
            corporate: ['회사 소개', '서비스 목록', '연락처 폼', '통계 섹션'],
            creative: ['포트폴리오 갤러리', '작가 소개', '프로젝트 문의'],
            commerce: ['상품 진열', '고객 후기', '구매 버튼', '긴급성 요소'],
            landing: ['리드 캡처 폼', '혜택 목록', '사회적 증명', '긴급성']
        };

        const styleFeatures = {
            modern: ['부드러운 애니메이션', '그라디언트 효과', '모던 타이포그래피'],
            classic: ['우아한 장식 요소', '세리프 폰트', '골드 액센트'],
            bold: ['강렬한 색상', '큰 타이포그래피', '네온 효과']
        };

        return [...baseFeatures[base], ...styleFeatures[style]];
    }

    // 헬퍼 메서드들
    getBaseName(base) {
        const names = {
            corporate: '기업형',
            creative: '크리에이티브형',
            commerce: '상업형',
            landing: '랜딩형'
        };
        return names[base];
    }

    getBaseDescription(base) {
        return this.baseSystem ? this.baseSystem.getBaseDescription(base) : '';
    }

    getStyleName(style) {
        const names = { modern: '모던', classic: '클래식', bold: '대담한' };
        return names[style];
    }

    getStyleDescription(style) {
        const descriptions = {
            modern: '깔끔하고 현대적인 디자인',
            classic: '전통적이고 우아한 디자인',
            bold: '강렬하고 임팩트 있는 디자인'
        };
        return descriptions[style];
    }

    getIndustryDescription(industry) {
        return this.industryMapper ? this.industryMapper.getIndustryDescription(industry) : '';
    }

    // 특정 조합으로 템플릿 가져오기
    getTemplate(base, industry, style) {
        const templateId = `${base}-${industry}-${style}`;
        return this.generatedTemplates.get(templateId) || this.createTemplate(base, industry, style);
    }

    // 카테고리별 템플릿 목록
    getTemplatesByCategory(category) {
        const templates = [];
        for (const base of this.bases) {
            for (const style of this.styles) {
                if (category === 'all' || category === this.industries.find(ind => ind === category)) {
                    templates.push(this.getTemplate(base, category === 'all' ? this.industries[0] : category, style));
                }
            }
        }
        return templates.filter(t => t !== null);
    }

    // 전체 템플릿 통계
    getGenerationStats() {
        return {
            totalCombinations: this.getTotalCombinations(),
            bases: this.bases.length,
            industries: this.industries.length,
            styles: this.styles.length,
            generated: this.generatedTemplates.size,
            cached: this.generatedTemplates.size
        };
    }
}

// 전역 객체로 등록
window.CombinatorialTemplateGenerator = CombinatorialTemplateGenerator;

console.log('⚙️ 조합형 템플릿 생성 엔진 로드 완료');
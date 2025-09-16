// 업종별 자동 콘텐츠 매핑 시스템
class IndustryContentMapper {
    constructor() {
        this.contentMap = this.initializeContentMap();
    }

    initializeContentMap() {
        return {
            enterprise: {
                name: 'Enterprise B2B',
                heroTitle: '기업용 맞춤 솔루션으로<br>비즈니스 성장을 가속화하세요',
                heroDescription: '대기업과 중견기업을 위한 안전하고 확장 가능한 IT 솔루션으로 디지털 전환을 성공적으로 지원합니다.',
                companyDescription: '기업 고객을 위한 전문적이고 신뢰할 수 있는 IT 솔루션 파트너입니다.',
                services: [
                    {
                        title: '엔터프라이즈 시스템 통합',
                        description: '대규모 기업 환경에 최적화된 시스템 통합 및 아키텍처 설계',
                        icon: 'fas fa-building',
                        features: ['레거시 시스템 연동', 'API 게이트웨이', '마이크로서비스', '데이터 통합']
                    },
                    {
                        title: '클라우드 엔터프라이즈',
                        description: '기업 규모에 맞는 클라우드 인프라 설계 및 마이그레이션',
                        icon: 'fas fa-cloud',
                        features: ['하이브리드 클라우드', '멀티 클라우드', '컴플라이언스', '거버넌스']
                    },
                    {
                        title: '보안 컨설팅',
                        description: '기업 보안 정책 수립 및 보안 시스템 구축',
                        icon: 'fas fa-shield-alt',
                        features: ['제로 트러스트', 'IAM 시스템', '보안 감사', '취약점 분석']
                    },
                    {
                        title: '디지털 전환 컨설팅',
                        description: '비즈니스 프로세스 디지털화 및 자동화 컨설팅',
                        icon: 'fas fa-digital-tachograph',
                        features: ['프로세스 분석', '워크플로우 자동화', 'RPA 도입', 'AI/ML 활용']
                    }
                ],
                portfolio: [
                    {
                        title: '대기업 ERP 통합 프로젝트',
                        description: '글로벌 제조업체의 전사 시스템 통합',
                        category: 'enterprise',
                        tech: ['SAP', 'Oracle', 'Kubernetes', 'Microservices']
                    },
                    {
                        title: '금융권 클라우드 전환',
                        description: '은행 시스템의 AWS 클라우드 마이그레이션',
                        category: 'cloud enterprise',
                        tech: ['AWS', 'Docker', 'Terraform', 'Compliance']
                    }
                ]
            },

            startup: {
                name: 'Startup/Innovation',
                heroTitle: '혁신적인 스타트업을 위한<br>빠르고 확장 가능한 기술 솔루션',
                heroDescription: '스타트업의 빠른 성장을 지원하는 민첩하고 비용 효율적인 개발 및 인프라 솔루션을 제공합니다.',
                companyDescription: '스타트업과 혁신 기업의 성장을 기술로 가속화하는 파트너입니다.',
                services: [
                    {
                        title: 'MVP 개발',
                        description: '빠른 시장 검증을 위한 최소 기능 제품 개발',
                        icon: 'fas fa-rocket',
                        features: ['애자일 개발', '프로토타이핑', '사용자 피드백', '반복 개발']
                    },
                    {
                        title: '클라우드 네이티브',
                        description: '확장성과 비용 효율성을 고려한 클라우드 아키텍처',
                        icon: 'fas fa-cloud-upload-alt',
                        features: ['서버리스', '컨테이너', 'CI/CD', '오토스케일링']
                    },
                    {
                        title: '데이터 분석',
                        description: '성장 지표 추적 및 데이터 기반 의사결정 지원',
                        icon: 'fas fa-chart-line',
                        features: ['실시간 분석', '대시보드', 'A/B 테스트', '예측 모델링']
                    },
                    {
                        title: '성장 엔진 구축',
                        description: '사용자 확보 및 유지를 위한 기술 솔루션',
                        icon: 'fas fa-users',
                        features: ['마케팅 자동화', '개인화', '추천 시스템', '사용자 경험']
                    }
                ],
                portfolio: [
                    {
                        title: '핀테크 스타트업 플랫폼',
                        description: 'P2P 대출 플랫폼 MVP 개발',
                        category: 'startup fintech',
                        tech: ['React', 'Node.js', 'AWS Lambda', 'DynamoDB']
                    },
                    {
                        title: '이커머스 모바일 앱',
                        description: '개인화 쇼핑 추천 앱 개발',
                        category: 'startup mobile',
                        tech: ['React Native', 'Firebase', 'ML Kit', 'Analytics']
                    }
                ]
            },

            healthcare: {
                name: 'Healthcare/Medical',
                heroTitle: '안전하고 혁신적인 의료 IT 솔루션으로<br>환자 중심의 의료 서비스를 구현하세요',
                heroDescription: '최첨단 의료 기술과 안전한 데이터 관리로 의료진과 환자 모두에게 최고의 경험을 제공합니다.',
                companyDescription: '의료 분야의 디지털 혁신을 이끄는 전문 IT 솔루션 제공업체입니다.',
                services: [
                    {
                        title: '병원 정보 시스템(HIS)',
                        description: '통합 병원 관리 시스템 및 전자의무기록 솔루션',
                        icon: 'fas fa-hospital',
                        features: ['EMR/EHR', '처방 관리', '진료 스케줄', '병원 운영 관리']
                    },
                    {
                        title: '원격 진료 플랫폼',
                        description: '안전하고 편리한 화상 진료 및 모니터링 시스템',
                        icon: 'fas fa-video',
                        features: ['화상 진료', '원격 모니터링', '디지털 처방전', '의료진 협업']
                    },
                    {
                        title: '의료 데이터 분석',
                        description: 'AI 기반 의료 데이터 분석 및 진단 보조 시스템',
                        icon: 'fas fa-brain',
                        features: ['진단 AI', '예측 분석', '임상 연구 지원', '개인맞춤의료']
                    },
                    {
                        title: '의료 IoT 솔루션',
                        description: '의료기기 연동 및 실시간 환자 모니터링',
                        icon: 'fas fa-heartbeat',
                        features: ['생체신호 모니터링', '의료기기 통합', 'FHIR 표준', '알림 시스템']
                    }
                ],
                portfolio: [
                    {
                        title: '종합병원 HIS 구축',
                        description: '1000병상 규모 병원 정보시스템 구축',
                        category: 'healthcare enterprise',
                        tech: ['HL7 FHIR', 'Java Spring', 'Oracle', 'Vue.js']
                    },
                    {
                        title: '원격 진료 모바일 앱',
                        description: '환자-의사 매칭 원격진료 플랫폼',
                        category: 'healthcare mobile',
                        tech: ['Flutter', 'WebRTC', 'Firebase', 'Node.js']
                    }
                ]
            },

            fintech: {
                name: 'Fintech/Finance',
                heroTitle: '신뢰할 수 있는 금융 기술로<br>디지털 금융 혁신을 이끌어가세요',
                heroDescription: '보안과 컴플라이언스를 바탕으로 한 혁신적인 금융 기술 솔루션으로 금융 서비스를 혁신합니다.',
                companyDescription: '금융업계의 디지털 전환을 선도하는 핀테크 전문 기술 파트너입니다.',
                services: [
                    {
                        title: '디지털 뱅킹 플랫폼',
                        description: '모바일 퍼스트 디지털 은행 시스템 구축',
                        icon: 'fas fa-university',
                        features: ['모바일 뱅킹', '오픈뱅킹', 'API 은행', '디지털 온보딩']
                    },
                    {
                        title: '투자 플랫폼',
                        description: '로보어드바이저 및 디지털 자산 관리 솔루션',
                        icon: 'fas fa-chart-pie',
                        features: ['로보어드바이저', '포트폴리오 관리', '리스크 분석', '자동 리밸런싱']
                    },
                    {
                        title: '결제 시스템',
                        description: '안전하고 빠른 디지털 결제 및 송금 솔루션',
                        icon: 'fas fa-credit-card',
                        features: ['간편결제', '블록체인 송금', 'QR코드 결제', '가맹점 관리']
                    },
                    {
                        title: '규제 준수 시스템',
                        description: 'RegTech 솔루션으로 금융 규제 자동화',
                        icon: 'fas fa-gavel',
                        features: ['KYC/AML', '실시간 모니터링', '리포팅 자동화', '컴플라이언스 관리']
                    }
                ],
                portfolio: [
                    {
                        title: '디지털 은행 플랫폼',
                        description: '인터넷 전문은행 코어뱅킹 시스템',
                        category: 'fintech enterprise',
                        tech: ['Microservices', 'Kafka', 'Redis', 'PostgreSQL']
                    },
                    {
                        title: '암호화폐 거래소',
                        description: '고성능 암호화폐 거래 플랫폼',
                        category: 'fintech blockchain',
                        tech: ['Blockchain', 'WebSocket', 'Redis', 'Security']
                    }
                ]
            },

            ecommerce: {
                name: 'E-commerce/Retail',
                heroTitle: '고객 경험을 혁신하는<br>차세대 이커머스 솔루션',
                heroDescription: '개인화된 쇼핑 경험과 효율적인 운영 관리로 온라인 비즈니스 성공을 가속화합니다.',
                companyDescription: '이커머스와 리테일 업계의 디지털 혁신을 이끄는 전문 기술 파트너입니다.',
                services: [
                    {
                        title: '이커머스 플랫폼',
                        description: '확장 가능한 온라인 쇼핑몰 및 마켓플레이스 구축',
                        icon: 'fas fa-shopping-cart',
                        features: ['멀티 채널', '재고 관리', '주문 처리', '고객 관리']
                    },
                    {
                        title: '개인화 추천 엔진',
                        description: 'AI 기반 상품 추천 및 개인화 마케팅',
                        icon: 'fas fa-magic',
                        features: ['머신러닝 추천', '행동 분석', '개인화 콘텐츠', 'A/B 테스트']
                    },
                    {
                        title: '옴니채널 솔루션',
                        description: '온라인-오프라인 통합 고객 경험 관리',
                        icon: 'fas fa-store',
                        features: ['O2O 연동', '통합 재고', 'POS 연동', '고객 여정 관리']
                    },
                    {
                        title: '물류 최적화',
                        description: '배송 및 물류 프로세스 자동화 솔루션',
                        icon: 'fas fa-truck',
                        features: ['배송 최적화', '창고 관리', '실시간 추적', '반품 처리']
                    }
                ],
                portfolio: [
                    {
                        title: '글로벌 이커머스 플랫폼',
                        description: '다국가 지원 B2C 쇼핑몰 구축',
                        category: 'ecommerce web',
                        tech: ['Magento', 'AWS', 'Elasticsearch', 'Redis']
                    },
                    {
                        title: '패션 큐레이션 앱',
                        description: 'AI 기반 패션 추천 모바일 앱',
                        category: 'ecommerce mobile',
                        tech: ['React Native', 'TensorFlow', 'Firebase', 'GraphQL']
                    }
                ]
            },

            saas: {
                name: 'SaaS/Software',
                heroTitle: '확장 가능한 SaaS 플랫폼으로<br>비즈니스 효율성을 극대화하세요',
                heroDescription: '클라우드 네이티브 아키텍처와 API 퍼스트 접근으로 강력하고 유연한 SaaS 솔루션을 제공합니다.',
                companyDescription: 'SaaS 및 소프트웨어 개발 전문 기업으로 확장 가능한 클라우드 솔루션을 제공합니다.',
                services: [
                    {
                        title: '멀티테넌트 SaaS 플랫폼',
                        description: '확장 가능한 B2B SaaS 애플리케이션 개발',
                        icon: 'fas fa-cubes',
                        features: ['멀티테넌시', '자동 스케일링', 'API 게이트웨이', '테넌트 관리']
                    },
                    {
                        title: 'API 플랫폼',
                        description: '개발자 친화적인 API 및 SDK 개발',
                        icon: 'fas fa-code',
                        features: ['RESTful API', 'GraphQL', 'SDK 제공', 'API 문서화']
                    },
                    {
                        title: '개발자 도구',
                        description: '개발 생산성 향상을 위한 도구 및 플랫폼',
                        icon: 'fas fa-tools',
                        features: ['CI/CD 파이프라인', '모니터링', '로깅', '성능 분석']
                    },
                    {
                        title: '통합 솔루션',
                        description: '제3자 시스템과의 원활한 통합 지원',
                        icon: 'fas fa-link',
                        features: ['웹훅', 'OAuth 2.0', 'SAML SSO', '데이터 동기화']
                    }
                ],
                portfolio: [
                    {
                        title: 'CRM SaaS 플랫폼',
                        description: '중소기업용 클라우드 CRM 시스템',
                        category: 'saas enterprise',
                        tech: ['Node.js', 'MongoDB', 'React', 'Docker']
                    },
                    {
                        title: '개발자 API 플랫폼',
                        description: '개발자 도구 통합 API 서비스',
                        category: 'saas developer',
                        tech: ['Go', 'Kubernetes', 'Istio', 'Prometheus']
                    }
                ]
            }
        };
    }

    getIndustryContent(industry) {
        return this.contentMap[industry] || this.contentMap.enterprise;
    }

    applyContentToDOM(industry) {
        const content = this.getIndustryContent(industry);

        // Hero 섹션 업데이트
        this.updateHeroContent(content);

        // 서비스 섹션 업데이트
        this.updateServicesContent(content);

        // 포트폴리오 섹션 업데이트
        this.updatePortfolioContent(content);

        // 회사 설명 업데이트
        this.updateCompanyDescription(content);

        // 페이지 타이틀 업데이트
        this.updatePageTitle(content);
    }

    updateHeroContent(content) {
        const heroTitle = document.querySelector('[data-content="hero-title"]');
        const heroDescription = document.querySelector('[data-content="hero-description"]');

        if (heroTitle) {
            heroTitle.innerHTML = content.heroTitle;
        }

        if (heroDescription) {
            heroDescription.textContent = content.heroDescription;
        }
    }

    updateServicesContent(content) {
        const servicesGrid = document.querySelector('.services__grid');
        if (!servicesGrid || !content.services) return;

        servicesGrid.innerHTML = '';

        content.services.forEach(service => {
            const serviceCard = this.createServiceCard(service);
            servicesGrid.appendChild(serviceCard);
        });
    }

    createServiceCard(service) {
        const card = document.createElement('div');
        card.className = 'service__card';

        card.innerHTML = `
            <div class="service__icon">
                <i class="${service.icon}"></i>
            </div>
            <h3 class="service__title">${service.title}</h3>
            <p class="service__description">${service.description}</p>
            <ul class="service__features">
                ${service.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
            <a href="#" class="service__link">자세히 보기 <i class="fas fa-arrow-right"></i></a>
        `;

        return card;
    }

    updatePortfolioContent(content) {
        const portfolioGrid = document.querySelector('.portfolio__grid');
        if (!portfolioGrid || !content.portfolio) return;

        // 기존 포트폴리오 아이템 유지하고 새로운 것 추가
        const existingItems = portfolioGrid.querySelectorAll('.portfolio__item');

        content.portfolio.forEach(project => {
            const portfolioItem = this.createPortfolioItem(project);
            portfolioGrid.appendChild(portfolioItem);
        });
    }

    createPortfolioItem(project) {
        const item = document.createElement('div');
        item.className = 'portfolio__item';
        item.setAttribute('data-category', project.category);

        item.innerHTML = `
            <div class="portfolio__image">
                <div class="portfolio__placeholder">
                    <i class="fas fa-laptop-code"></i>
                </div>
            </div>
            <div class="portfolio__content">
                <h3 class="portfolio__title">${project.title}</h3>
                <p class="portfolio__description">${project.description}</p>
                <div class="portfolio__tech">
                    ${project.tech.map(tech => `<span class="tech__tag">${tech}</span>`).join('')}
                </div>
            </div>
        `;

        return item;
    }

    updateCompanyDescription(content) {
        const companyDesc = document.querySelector('[data-content="company-description"]');
        if (companyDesc) {
            companyDesc.textContent = content.companyDescription;
        }
    }

    updatePageTitle(content) {
        const titleElement = document.querySelector('title');
        if (titleElement) {
            const companyName = document.querySelector('[data-content="company-name"]')?.textContent || 'TechCorp';
            titleElement.textContent = `${companyName} - ${content.name} 전문 기술 서비스`;
        }
    }

    // 업종별 메타 태그 업데이트
    updateMetaTags(industry, companyName) {
        const content = this.getIndustryContent(industry);

        // Description 메타 태그 업데이트
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.setAttribute('content', `${companyName} - ${content.companyDescription}`);
        }

        // Keywords 메타 태그 업데이트
        const metaKeywords = document.querySelector('meta[name="keywords"]');
        if (metaKeywords) {
            const keywords = this.generateKeywordsForIndustry(industry);
            metaKeywords.setAttribute('content', keywords);
        }
    }

    generateKeywordsForIndustry(industry) {
        const keywordMap = {
            enterprise: 'Enterprise, B2B, 기업솔루션, 시스템통합, 클라우드, 보안컨설팅',
            startup: 'Startup, MVP, 스타트업, 애자일개발, 클라우드네이티브, 성장엔진',
            healthcare: 'Healthcare, 의료IT, HIS, 원격진료, 의료데이터, IoT헬스케어',
            fintech: 'Fintech, 핀테크, 디지털뱅킹, 블록체인, 결제시스템, RegTech',
            ecommerce: 'E-commerce, 이커머스, 온라인쇼핑몰, 개인화추천, 옴니채널, 물류',
            saas: 'SaaS, 클라우드소프트웨어, API플랫폼, 멀티테넌트, 개발자도구, 통합솔루션'
        };

        return keywordMap[industry] || keywordMap.enterprise;
    }
}

// 전역으로 사용 가능하게 내보내기
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { IndustryContentMapper };
} else {
    window.IndustryContentMapper = IndustryContentMapper;
}
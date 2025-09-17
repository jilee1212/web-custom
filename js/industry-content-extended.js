// 🏢 확장된 업종별 콘텐츠 매핑 시스템 - 8개 업종
class ExtendedIndustryContentMapper {
    constructor() {
        // 8개 주요 업종 정의
        this.industries = {
            healthcare: 'Healthcare (의료)',
            restaurant: 'Restaurant (레스토랑)',
            technology: 'Technology (기술)',
            education: 'Education (교육)',
            finance: 'Finance (금융)',
            realestate: 'Real Estate (부동산)',
            legal: 'Legal (법무)',
            fitness: 'Fitness (헬스/피트니스)'
        };

        // 업종별 콘텐츠 데이터
        this.industryContent = this.initializeIndustryContent();
        console.log('🏢 확장된 업종별 콘텐츠 시스템 초기화 완료 (8개 업종)');
    }

    initializeIndustryContent() {
        return {
            // Healthcare (의료) - 안전하고 신뢰할 수 있는
            healthcare: {
                name: '의료/헬스케어',
                company_types: ['병원', '치과', '한의원', '피부과', '성형외과', '동물병원'],

                content_templates: {
                    // Corporate 베이스용
                    COMPANY_NAME: '{{병원명}} 의료센터',
                    PROFESSIONAL_TAGLINE: '환자 중심의 전문 의료 서비스',
                    PRIMARY_CTA: '진료 예약',
                    SECONDARY_CTA: '상담 문의',
                    HERO_IMAGE: 'assets/images/healthcare-hero.jpg',
                    COMPANY_STORY: '15년간 지역 주민의 건강을 책임져온 {{병원명}}은 최신 의료 장비와 풍부한 경험을 바탕으로 최고 수준의 진료 서비스를 제공합니다.',
                    FOOTER_DESCRIPTION: '건강한 삶의 동반자',
                    CONTACT_INFO: 'Tel: 02-123-4567 | Email: info@hospital.com',

                    // Creative 베이스용 (성형외과, 피부과용)
                    CREATIVE_TITLE: '아름다움을 완성하는 전문가',
                    CREATIVE_DESCRIPTION: '개인별 맞춤 케어로 자연스러운 아름다움을 선사합니다',
                    ARTIST_STORY: '20년 경력의 전문의가 직접 상담부터 시술까지 책임지며, 고객 한분 한분의 아름다움을 완성해갑니다.',

                    // Commerce 베이스용 (건강용품, 의료기기)
                    MAIN_OFFER: '프리미엄 건강관리 솔루션',
                    ORIGINAL_PRICE: '₩299,000',
                    SALE_PRICE: '₩199,000',
                    DISCOUNT_PERCENT: '33',
                    BUY_NOW_TEXT: '건강 지키기',
                    URGENCY_MESSAGE: '건강한 오늘을 놓치지 마세요!',

                    // Landing 베이스용 (건강검진, 상담)
                    MAIN_HEADLINE: '30초 건강 체크로 시작하는 건강 관리',
                    SUB_HEADLINE: '간단한 설문으로 맞춤형 건강 솔루션을 추천받으세요',
                    EMAIL_PLACEHOLDER: '연락받을 이메일 주소',
                    CONVERSION_BUTTON: '무료 건강 상담 받기',
                    SOCIAL_PROOF_TEXT: '이미 10,000명이 참여했습니다'
                },

                services: [
                    { title: '일반진료', icon: '🩺', description: '종합적인 건강 관리와 질병 진단' },
                    { title: '건강검진', icon: '📋', description: '정기적인 건강 상태 체크업' },
                    { title: '응급진료', icon: '🚨', description: '24시간 응급 상황 대응' },
                    { title: '전문진료', icon: '👨‍⚕️', description: '전문의 맞춤 진료 서비스' },
                    { title: '재활치료', icon: '🏃‍♂️', description: '물리치료 및 재활 프로그램' },
                    { title: '예방접종', icon: '💉', description: '각종 백신 및 예방 접종' }
                ],

                stats: [
                    { number: '15년', label: '운영 경력' },
                    { number: '50,000+', label: '치료 사례' },
                    { number: '95%', label: '환자 만족도' },
                    { number: '24시간', label: '응급 대응' }
                ],

                color_palette: {
                    primary: '#10b981',    // 안정감 있는 녹색
                    secondary: '#3b82f6',  // 신뢰감 있는 파란색
                    accent: '#ffffff',     // 깨끗한 흰색
                    text: '#1f2937'        // 읽기 쉬운 다크 그레이
                },

                typography: {
                    primary: 'Noto Sans KR',
                    style: 'clean_professional'
                }
            },

            // Restaurant (레스토랑) - 따뜻하고 맛있는
            restaurant: {
                name: '레스토랑/음식점',
                company_types: ['파인다이닝', '캐주얼 레스토랑', '카페', '베이커리', '바', '패스트푸드'],

                content_templates: {
                    COMPANY_NAME: '{{레스토랑명}}',
                    PROFESSIONAL_TAGLINE: '특별한 맛의 경험을 선사합니다',
                    PRIMARY_CTA: '예약하기',
                    SECONDARY_CTA: '메뉴 보기',
                    CREATIVE_TITLE: '미식의 예술, 당신을 위한 특별한 경험',
                    CREATIVE_DESCRIPTION: '신선한 재료와 정성으로 만드는 요리의 예술',
                    MAIN_OFFER: '시그니처 코스 메뉴',
                    MAIN_HEADLINE: '잊을 수 없는 맛의 여행이 시작됩니다',
                    SUB_HEADLINE: '셰프 특선 요리와 함께하는 미식의 순간'
                },

                services: [
                    { title: '파인다이닝', icon: '🍽️', description: '셰프 특선 코스 메뉴' },
                    { title: '와인 페어링', icon: '🍷', description: '요리와 완벽하게 어울리는 와인' },
                    { title: '프라이빗 다이닝', icon: '👥', description: '특별한 날을 위한 전용 공간' },
                    { title: '케이터링', icon: '🎉', description: '이벤트 및 파티 케이터링' },
                    { title: '테이크아웃', icon: '🥡', description: '집에서도 즐기는 맛집 요리' },
                    { title: '디저트', icon: '🧁', description: '수제 디저트와 베이커리' }
                ],

                portfolio: [
                    { image: 'signature-dish.jpg', title: '시그니처 요리', category: '메인 디쉬' },
                    { image: 'dessert.jpg', title: '수제 디저트', category: '디저트' },
                    { image: 'interior.jpg', title: '아늑한 분위기', category: '인테리어' },
                    { image: 'chef.jpg', title: '셰프의 정성', category: '스토리' }
                ],

                color_palette: {
                    primary: '#f59e0b',    // 따뜻한 오렌지
                    secondary: '#dc2626',  // 식욕을 돋우는 빨간색
                    accent: '#92400e',     // 고급스러운 브라운
                    text: '#1f2937'
                }
            },

            // Technology (기술) - 혁신적이고 미래지향적
            technology: {
                name: '기술/IT',
                company_types: ['소프트웨어 개발', '앱 개발', 'AI/머신러닝', '블록체인', '클라우드', 'SaaS'],

                content_templates: {
                    COMPANY_NAME: '{{회사명}} Tech',
                    PROFESSIONAL_TAGLINE: '혁신 기술로 미래를 만들어갑니다',
                    PRIMARY_CTA: '솔루션 보기',
                    SECONDARY_CTA: '상담 요청',
                    CREATIVE_TITLE: '기술로 세상을 바꾸는 혁신',
                    MAIN_HEADLINE: '디지털 혁신의 파트너',
                    SUB_HEADLINE: '최신 기술로 비즈니스의 미래를 설계합니다'
                },

                services: [
                    { title: '웹 개발', icon: '💻', description: '모던 웹 애플리케이션 개발' },
                    { title: '앱 개발', icon: '📱', description: 'iOS/Android 네이티브 앱' },
                    { title: 'AI 솔루션', icon: '🤖', description: '인공지능 기반 맞춤 솔루션' },
                    { title: '클라우드', icon: '☁️', description: '클라우드 인프라 구축' },
                    { title: 'DevOps', icon: '🔧', description: '개발 및 운영 자동화' },
                    { title: '데이터 분석', icon: '📊', description: '빅데이터 분석 및 시각화' }
                ],

                color_palette: {
                    primary: '#6366f1',    // 혁신적인 보라색
                    secondary: '#1f2937',  // 기술적인 다크 그레이
                    accent: '#fbbf24',     // 하이라이트 노란색
                    text: '#ffffff'
                }
            },

            // Education (교육) - 성장하고 배우는
            education: {
                name: '교육',
                company_types: ['온라인 강의', '학원', '과외', '직업교육', '어학원', '예술 교육'],

                content_templates: {
                    COMPANY_NAME: '{{교육기관명}} 아카데미',
                    PROFESSIONAL_TAGLINE: '꿈을 현실로 만드는 교육',
                    PRIMARY_CTA: '수강 신청',
                    SECONDARY_CTA: '커리큘럼 보기',
                    MAIN_HEADLINE: '성공으로 이끄는 맞춤형 교육',
                    SUB_HEADLINE: '전문 강사진과 함께하는 체계적인 학습 과정'
                },

                services: [
                    { title: '온라인 강의', icon: '💻', description: '언제 어디서나 학습 가능' },
                    { title: '1:1 멘토링', icon: '👨‍🏫', description: '개인별 맞춤 지도' },
                    { title: '실습 프로젝트', icon: '🛠️', description: '실무 중심 프로젝트 학습' },
                    { title: '취업 지원', icon: '💼', description: '이력서 첨삭 및 면접 준비' },
                    { title: '자격증 준비', icon: '📜', description: '각종 자격증 시험 대비' },
                    { title: '커뮤니티', icon: '👥', description: '학습자들 간의 네트워킹' }
                ],

                color_palette: {
                    primary: '#3b82f6',    // 학습을 상징하는 파란색
                    secondary: '#10b981',  // 성장을 의미하는 녹색
                    accent: '#f59e0b',     // 활기찬 오렌지
                    text: '#1f2937'
                }
            },

            // Finance (금융) - 신뢰할 수 있고 안전한
            finance: {
                name: '금융/투자',
                company_types: ['은행', '투자회사', '보험', '부동산투자', '핀테크', '회계사무소'],

                content_templates: {
                    COMPANY_NAME: '{{회사명}} 금융',
                    PROFESSIONAL_TAGLINE: '안전하고 수익성 높은 투자 파트너',
                    PRIMARY_CTA: '투자 상담',
                    SECONDARY_CTA: '포트폴리오 보기',
                    MAIN_HEADLINE: '스마트한 자산 관리의 시작',
                    SUB_HEADLINE: '전문가와 함께하는 맞춤형 투자 전략'
                },

                services: [
                    { title: '자산 관리', icon: '💼', description: '개인 맞춤 자산 포트폴리오' },
                    { title: '투자 자문', icon: '📈', description: '전문가의 투자 조언' },
                    { title: '보험 설계', icon: '🛡️', description: '리스크 관리 보험 상품' },
                    { title: '세무 컨설팅', icon: '📊', description: '절세 전략 및 세무 신고' },
                    { title: '부동산 투자', icon: '🏠', description: '안정적인 부동산 투자' },
                    { title: '연금 설계', icon: '⏰', description: '은퇴 후 안정적인 수입원' }
                ],

                color_palette: {
                    primary: '#1e40af',    // 신뢰할 수 있는 진한 파란색
                    secondary: '#059669',  // 안정적인 녹색
                    accent: '#d97706',     // 프리미엄 골드
                    text: '#1f2937'
                }
            },

            // Real Estate (부동산) - 안정적이고 프리미엄한
            realestate: {
                name: '부동산',
                company_types: ['부동산 중개', '건설회사', '인테리어', '부동산 투자', '임대관리'],

                content_templates: {
                    COMPANY_NAME: '{{부동산명}}',
                    PROFESSIONAL_TAGLINE: '꿈의 공간을 현실로 만듭니다',
                    PRIMARY_CTA: '매물 보기',
                    SECONDARY_CTA: '상담 예약',
                    MAIN_HEADLINE: '완벽한 공간을 찾는 여정',
                    SUB_HEADLINE: '전문가와 함께하는 부동산 솔루션'
                },

                services: [
                    { title: '매매 중개', icon: '🏠', description: '부동산 매매 전문 서비스' },
                    { title: '임대 관리', icon: '🔑', description: '임대차 계약 및 관리' },
                    { title: '투자 컨설팅', icon: '📊', description: '부동산 투자 전략 수립' },
                    { title: '시세 조회', icon: '💰', description: '정확한 부동산 시세 정보' },
                    { title: '법무 지원', icon: '⚖️', description: '부동산 관련 법률 자문' },
                    { title: '인테리어', icon: '🎨', description: '공간 설계 및 인테리어' }
                ],

                color_palette: {
                    primary: '#7c3aed',    // 프리미엄 보라색
                    secondary: '#059669',  // 안정적인 녹색
                    accent: '#f59e0b',     // 골드 액센트
                    text: '#1f2937'
                }
            },

            // Legal (법무) - 전문적이고 신뢰할 수 있는
            legal: {
                name: '법무/법률',
                company_types: ['변호사사무소', '법무법인', '특허사무소', '회계법인', '노무사', '세무사'],

                content_templates: {
                    COMPANY_NAME: '{{법무법인명}}',
                    PROFESSIONAL_TAGLINE: '정의롭고 전문적인 법률 서비스',
                    PRIMARY_CTA: '상담 예약',
                    SECONDARY_CTA: '전문 분야 보기',
                    MAIN_HEADLINE: '법률 문제의 완벽한 해결사',
                    SUB_HEADLINE: '풍부한 경험과 전문성으로 고객의 권익을 보호합니다'
                },

                services: [
                    { title: '민사소송', icon: '⚖️', description: '민사 분쟁 해결 전문' },
                    { title: '형사변호', icon: '🛡️', description: '형사사건 전문 변호' },
                    { title: '기업 법무', icon: '🏢', description: '기업 법률 자문 서비스' },
                    { title: '계약서 검토', icon: '📝', description: '각종 계약서 작성 및 검토' },
                    { title: '특허/지식재산', icon: '💡', description: '지식재산권 보호 서비스' },
                    { title: '노동법', icon: '👥', description: '노동 관련 법률 자문' }
                ],

                color_palette: {
                    primary: '#1f2937',    // 전문적인 다크 그레이
                    secondary: '#1e40af',  // 신뢰할 수 있는 파란색
                    accent: '#d97706',     // 프리미엄 골드
                    text: '#ffffff'
                }
            },

            // Fitness (헬스/피트니스) - 건강하고 활기찬
            fitness: {
                name: '헬스/피트니스',
                company_types: ['헬스장', '요가원', '필라테스', '퍼스널 트레이닝', '다이어트', '스포츠 센터'],

                content_templates: {
                    COMPANY_NAME: '{{헬스장명}} 피트니스',
                    PROFESSIONAL_TAGLINE: '건강한 변화의 시작',
                    PRIMARY_CTA: '무료 체험',
                    SECONDARY_CTA: '프로그램 보기',
                    MAIN_HEADLINE: '나만의 건강한 라이프스타일',
                    SUB_HEADLINE: '전문 트레이너와 함께하는 맞춤형 운동 프로그램'
                },

                services: [
                    { title: '퍼스널 트레이닝', icon: '💪', description: '1:1 맞춤 운동 지도' },
                    { title: '그룹 클래스', icon: '👥', description: '다양한 그룹 운동 프로그램' },
                    { title: '다이어트 관리', icon: '🥗', description: '식단 관리 및 체중 감량' },
                    { title: '체성분 분석', icon: '📊', description: '정확한 신체 성분 측정' },
                    { title: '재활 운동', icon: '🏥', description: '부상 회복 운동 프로그램' },
                    { title: '영양 상담', icon: '🍎', description: '전문 영양사 상담 서비스' }
                ],

                color_palette: {
                    primary: '#dc2626',    // 활기찬 빨간색
                    secondary: '#059669',  // 건강한 녹색
                    accent: '#f59e0b',     // 에너지 오렌지
                    text: '#1f2937'
                }
            }
        };
    }

    // 업종별 콘텐츠 가져오기
    getIndustryContent(industry) {
        return this.industryContent[industry] || this.industryContent.technology;
    }

    // 모든 업종 목록
    getAvailableIndustries() {
        return Object.keys(this.industries).map(key => ({
            id: key,
            name: this.industries[key],
            description: this.getIndustryDescription(key)
        }));
    }

    // 업종 설명
    getIndustryDescription(industry) {
        const descriptions = {
            healthcare: '의료진, 진료 과목, 예약 시스템 등 의료 서비스에 최적화된 콘텐츠',
            restaurant: '메뉴, 분위기, 예약 등 레스토랑 운영에 필요한 모든 요소',
            technology: 'IT 서비스, 기술 솔루션, 포트폴리오 등 기술 기업용 콘텐츠',
            education: '강의, 커리큘럼, 수강 신청 등 교육 기관에 특화된 구성',
            finance: '투자 상품, 자산 관리, 신뢰도 등 금융업에 최적화',
            realestate: '매물 정보, 시세, 상담 등 부동산업에 특화된 기능',
            legal: '전문 분야, 상담 예약, 신뢰성 등 법무 서비스에 최적화',
            fitness: '운동 프로그램, 트레이너, 시설 등 피트니스업에 특화'
        };

        return descriptions[industry] || '';
    }

    // 베이스 템플릿과 업종 조합으로 콘텐츠 생성
    generateCombinedContent(baseType, industry) {
        const industryData = this.getIndustryContent(industry);
        const baseRequiredVars = this.getBaseRequiredVariables(baseType);

        const combinedContent = {
            industry: industryData,
            variables: {},
            services: industryData.services || [],
            stats: industryData.stats || [],
            portfolio: industryData.portfolio || [],
            color_palette: industryData.color_palette
        };

        // 베이스 템플릿에 필요한 변수들을 업종 콘텐츠에서 추출
        baseRequiredVars.forEach(varName => {
            if (industryData.content_templates[varName]) {
                combinedContent.variables[varName] = industryData.content_templates[varName];
            }
        });

        return combinedContent;
    }

    // 베이스별 필수 변수 (base-templates.js와 연동)
    getBaseRequiredVariables(baseType) {
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
window.ExtendedIndustryContentMapper = ExtendedIndustryContentMapper;

console.log('🏢 확장된 업종별 콘텐츠 시스템 로드 완료 (8개 업종)');
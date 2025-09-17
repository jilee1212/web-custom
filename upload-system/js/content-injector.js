/**
 * Content Injection Engine
 * AI 없이 실제 컨텐츠를 템플릿에 자동으로 적용하는 엔진
 */

class ContentInjector {
    constructor() {
        this.templateSlots = {
            hero: {
                titleSelector: 'h1, .hero-title, .main-title',
                textSelector: '.hero-text, .hero-description, p',
                imageSelector: '.hero-image, .banner-image',
                videoSelector: '.hero-video'
            },
            services: {
                containerSelector: '.services, .features, .what-we-do',
                itemTemplate: `
                    <div class="service-item">
                        <h3>{TITLE}</h3>
                        <p>{DESCRIPTION}</p>
                    </div>
                `,
                titleSelector: '.service-title h2',
                itemSelector: '.service-item, .feature-item'
            },
            team: {
                containerSelector: '.team, .speakers, .our-team',
                itemTemplate: `
                    <div class="team-member">
                        <img src="{IMAGE}" alt="{NAME}">
                        <h4>{NAME}</h4>
                        <p>{POSITION}</p>
                        <p>{DESCRIPTION}</p>
                    </div>
                `,
                titleSelector: '.team-title h2',
                itemSelector: '.team-member, .speaker'
            },
            contact: {
                phoneSelector: '.phone, [href^="tel:"]',
                emailSelector: '.email, [href^="mailto:"]',
                addressSelector: '.address, .location',
                containerSelector: '.contact-info, .contact'
            }
        };

        this.keywordPatterns = {
            hero: [
                '회사', '기업', '소개', '비전', '미션', '대표', 'CEO', 'company', 'about', 'vision', 'mission'
            ],
            services: [
                '서비스', '솔루션', '업무', '사업', '제품', '기능', 'service', 'solution', 'business', 'product'
            ],
            team: [
                '팀', '직원', '구성원', '인력', '조직', '대표', '임원', 'team', 'staff', 'member', 'employee', 'CEO', 'CTO'
            ],
            contact: [
                '연락처', '주소', '전화', '이메일', '문의', 'contact', 'address', 'phone', 'email', 'location'
            ]
        };

        this.regexPatterns = {
            phone: /(\d{2,3}[-\s]?\d{3,4}[-\s]?\d{4})/g,
            email: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
            address: /(서울|부산|대구|인천|광주|대전|울산|세종|수원|고양|용인|창원|성남|청주|전주|안산|천안|평택|안양|포항|시흥|의정부|원주|춘천|진주|순천|목포|여수|광주|구미|김해|제주)[\s\S]*?(\d+층|\d+호|번지|\d+동|\d+-\d+)/g,
            companyName: /([가-힣\w\s]+)(?:\s*(?:주식회사|㈜|회사|기업|그룹|코퍼레이션|Corporation|Inc|LLC|Ltd))/g
        };
    }

    /**
     * 안전하게 텍스트 추출하는 헬퍼 함수
     */
    safeExtractText(text, pattern, groupIndex = 1) {
        if (!text || typeof text !== 'string') return null;
        const match = text.match(pattern);
        return (match && match[groupIndex]) ? match[groupIndex].trim() : null;
    }

    /**
     * 메인 컨텐츠 주입 함수
     */
    async injectContent(templateHTML, uploadedFiles) {
        console.log('🔄 컨텐츠 주입 시작...');

        try {
            // 1. 파일들을 분석해서 구조화된 데이터로 변환
            const structuredContent = this.analyzeAndStructureContent(uploadedFiles);

            // 데이터 유효성 검사
            if (!structuredContent) {
                throw new Error('컨텐츠 분석 결과가 없습니다');
            }

            // 2. 템플릿 HTML에 실제로 컨텐츠 적용
            let modifiedHTML = await this.applyContentToTemplate(templateHTML, structuredContent);

            // 3. 이미지 데이터 URL 처리
            modifiedHTML = this.injectImages(modifiedHTML, structuredContent.images);

            console.log('✅ 컨텐츠 주입 완료');
            return {
                success: true,
                html: modifiedHTML,
                appliedContent: structuredContent,
                summary: this.generateSummary(structuredContent)
            };

        } catch (error) {
            console.error('❌ 컨텐츠 주입 실패:', error);
            return {
                success: false,
                error: error.message,
                html: templateHTML // 원본 반환
            };
        }
    }

    /**
     * 업로드된 파일들을 분석해서 구조화된 데이터로 변환
     */
    analyzeAndStructureContent(files) {
        const structured = {
            company: { name: '', description: '' },
            hero: { title: '', text: '', images: [], videos: [] },
            services: [],
            team: [],
            contact: { phone: '', email: '', address: '' },
            images: { logos: [], banners: [], team: [], general: [] },
            unmapped: []
        };

        files.forEach(file => {
            const section = this.detectSection(file);

            switch (section) {
                case 'hero':
                    this.processHeroContent(file, structured);
                    break;
                case 'services':
                    this.processServicesContent(file, structured);
                    break;
                case 'team':
                    this.processTeamContent(file, structured);
                    break;
                case 'contact':
                    this.processContactContent(file, structured);
                    break;
                case 'image':
                    this.processImageContent(file, structured);
                    break;
                case 'video':
                    this.processVideoContent(file, structured);
                    break;
                default:
                    structured.unmapped.push(file);
            }
        });

        // 후처리: 데이터 정제 및 보완
        this.postProcessStructuredContent(structured);

        return structured;
    }

    /**
     * 파일이 어떤 섹션에 속하는지 감지
     */
    detectSection(file) {
        const fileName = file.name.toLowerCase();
        const content = file.content?.text?.toLowerCase() || '';

        // 파일 타입별 1차 분류
        if (file.type === 'image') {
            if (fileName.includes('logo')) return 'logo';
            if (fileName.includes('team') || fileName.includes('팀') || fileName.includes('직원')) return 'team';
            return 'image';
        }

        if (file.type === 'video') {
            return 'video';
        }

        // 파일명 기반 섹션 감지
        for (const [sectionName, keywords] of Object.entries(this.keywordPatterns)) {
            if (keywords.some(keyword => fileName.includes(keyword))) {
                return sectionName;
            }
        }

        // 컨텐츠 내용 기반 섹션 감지 (더 정교한 분석)
        if (content) {
            const scores = {};

            for (const [sectionName, keywords] of Object.entries(this.keywordPatterns)) {
                scores[sectionName] = keywords.reduce((score, keyword) => {
                    const matches = (content.match(new RegExp(keyword, 'g')) || []).length;
                    return score + matches;
                }, 0);
            }

            // 가장 높은 점수의 섹션 반환
            const bestSection = Object.entries(scores)
                .sort(([,a], [,b]) => b - a)[0];

            if (bestSection[1] > 0) {
                return bestSection[0];
            }
        }

        return 'general';
    }

    /**
     * Hero 섹션 컨텐츠 처리
     */
    processHeroContent(file, structured) {
        if (file.content?.text) {
            const text = file.content.text;

            // 회사명 추출
            const companyName = this.safeExtractText(text, this.regexPatterns.companyName);
            if (companyName && !structured.company.name) {
                structured.company.name = companyName;
            }

            // 첫 번째 문단을 제목으로, 나머지를 설명으로
            const lines = text.split('\n').filter(line => line.trim());
            if (lines.length > 0) {
                structured.hero.title = structured.hero.title || lines[0].replace(/[=\-#*]/g, '').trim();
                structured.hero.text = lines.slice(1).join(' ').substring(0, 300) + '...';
            }
        }
    }

    /**
     * Services 섹션 컨텐츠 처리
     */
    processServicesContent(file, structured) {
        if (file.content?.text) {
            const text = file.content.text;
            const services = this.extractServices(text);
            structured.services.push(...services);
        }
    }

    /**
     * 서비스 목록 추출
     */
    extractServices(text) {
        const services = [];
        const lines = text.split('\n').filter(line => line.trim());

        let currentService = null;

        lines.forEach(line => {
            line = line.trim();

            // 숫자로 시작하거나 특수문자로 구분된 항목들을 서비스로 인식
            if (/^\d+\./.test(line) || /^[-*•]/.test(line)) {
                if (currentService) {
                    services.push(currentService);
                }
                currentService = {
                    title: line.replace(/^[\d\.\-*•\s]+/, '').trim(),
                    description: ''
                };
            } else if (currentService && line && !line.match(/^[=\-#]/)) {
                currentService.description += (currentService.description ? ' ' : '') + line;
            }
        });

        if (currentService) {
            services.push(currentService);
        }

        return services.slice(0, 6); // 최대 6개 서비스만
    }

    /**
     * Team 섹션 컨텐츠 처리
     */
    processTeamContent(file, structured) {
        if (file.type === 'image') {
            structured.team.push({
                name: this.extractNameFromFilename(file.name),
                image: file.content.dataUrl,
                position: '',
                description: ''
            });
        } else if (file.content?.text) {
            const teamMembers = this.extractTeamMembers(file.content.text);
            structured.team.push(...teamMembers);
        }
    }

    /**
     * 팀 구성원 정보 추출
     */
    extractTeamMembers(text) {
        const members = [];
        const sections = text.split(/\n\s*\n/); // 빈 줄로 구분된 섹션들

        sections.forEach(section => {
            const lines = section.split('\n').filter(line => line.trim());
            if (lines.length >= 2) {
                const memberName = this.safeExtractText(lines[0], /([가-힣]{2,4}|[A-Za-z\s]{2,20})/);
                if (memberName) {
                    members.push({
                        name: memberName,
                        position: this.extractPosition(section),
                        description: lines.slice(1).join(' ').substring(0, 150) + '...',
                        image: null
                    });
                }
            }
        });

        return members.slice(0, 6); // 최대 6명
    }

    /**
     * 직책 추출
     */
    extractPosition(text) {
        const positions = ['대표이사', '이사', '팀장', '부장', '과장', 'CEO', 'CTO', 'CFO', 'Director', 'Manager'];
        for (const position of positions) {
            if (text.includes(position)) {
                return position;
            }
        }
        return '구성원';
    }

    /**
     * Contact 섹션 컨텐츠 처리
     */
    processContactContent(file, structured) {
        if (file.content?.text) {
            const text = file.content.text;

            const phone = text.match(this.regexPatterns.phone)?.[0];
            const email = text.match(this.regexPatterns.email)?.[0];
            const address = text.match(this.regexPatterns.address)?.[0];

            if (phone) structured.contact.phone = phone;
            if (email) structured.contact.email = email;
            if (address) structured.contact.address = address;
        }
    }

    /**
     * 이미지 컨텐츠 처리
     */
    processImageContent(file, structured) {
        const fileName = file.name.toLowerCase();

        if (fileName.includes('logo')) {
            structured.images.logos.push(file);
        } else if (fileName.includes('banner') || fileName.includes('hero')) {
            structured.images.banners.push(file);
        } else if (fileName.includes('team') || fileName.includes('팀')) {
            structured.images.team.push(file);
        } else {
            // 이미지 비율로 용도 추정
            const aspectRatio = file.content.aspectRatio;
            if (aspectRatio > 2) {
                structured.images.banners.push(file); // 배너형
            } else if (aspectRatio < 0.8) {
                structured.images.team.push(file); // 세로형 (인물)
            } else {
                structured.images.general.push(file); // 일반
            }
        }
    }

    /**
     * 비디오 컨텐츠 처리
     */
    processVideoContent(file, structured) {
        structured.hero.videos.push(file);
    }

    /**
     * 실제 템플릿 HTML에 컨텐츠 적용
     */
    async applyContentToTemplate(templateHTML, content) {
        let html = templateHTML;

        // Hero 섹션 적용
        html = this.applyHeroSection(html, content);

        // Services 섹션 적용
        html = this.applyServicesSection(html, content);

        // Team 섹션 적용
        html = this.applyTeamSection(html, content);

        // Contact 섹션 적용
        html = this.applyContactSection(html, content);

        // 회사명 전역 적용
        if (content.company.name) {
            html = html.replace(/Business Solutions Conference/g, `${content.company.name} Conference`);
            html = html.replace(/Eventre/g, content.company.name);
        }

        return html;
    }

    /**
     * Hero 섹션 적용
     */
    applyHeroSection(html, content) {
        if (content.hero.title) {
            // 메인 제목 교체
            html = html.replace(
                /<h1[^>]*class="[^"]*banner-title[^"]*"[^>]*>[\s\S]*?<\/h1>/gi,
                `<h1 class="banner-title">${content.hero.title}</h1>`
            );
        }

        if (content.hero.text) {
            // 설명 텍스트 교체
            html = html.replace(
                /<p[^>]*class="[^"]*banner-text[^"]*"[^>]*>[\s\S]*?<\/p>/gi,
                `<p class="banner-text">${content.hero.text}</p>`
            );
        }

        return html;
    }

    /**
     * Services 섹션 적용
     */
    applyServicesSection(html, content) {
        if (content.services.length > 0) {
            const servicesHTML = content.services.map(service => `
                <div class="col-lg-4 col-md-6">
                    <div class="feature-item">
                        <i class="fa fa-cogs"></i>
                        <h4>${service.title}</h4>
                        <p>${service.description}</p>
                    </div>
                </div>
            `).join('');

            // Services 컨테이너 찾아서 교체
            html = html.replace(
                /(<div[^>]*class="[^"]*row[^"]*"[^>]*>)([\s\S]*?)(<\/div>)/gi,
                (match, openTag, content, closeTag) => {
                    if (match.includes('feature-item') || match.includes('service')) {
                        return openTag + servicesHTML + closeTag;
                    }
                    return match;
                }
            );
        }

        return html;
    }

    /**
     * Team 섹션 적용
     */
    applyTeamSection(html, content) {
        if (content.team.length > 0) {
            const teamHTML = content.team.map(member => `
                <div class="col-lg-3 col-md-6">
                    <div class="speaker-item">
                        ${member.image ? `<img src="${member.image}" alt="${member.name}">` : '<img src="images/team-placeholder.jpg" alt="팀멤버">'}
                        <div class="speaker-content">
                            <h4>${member.name}</h4>
                            <span>${member.position}</span>
                            <p>${member.description}</p>
                        </div>
                    </div>
                </div>
            `).join('');

            // Team/Speaker 섹션 교체
            html = html.replace(
                /(<div[^>]*class="[^"]*row[^"]*"[^>]*>)([\s\S]*?)(<\/div>)/gi,
                (match, openTag, content, closeTag) => {
                    if (match.includes('speaker-item') || match.includes('team-member')) {
                        return openTag + teamHTML + closeTag;
                    }
                    return match;
                }
            );
        }

        return html;
    }

    /**
     * Contact 섹션 적용
     */
    applyContactSection(html, content) {
        const contact = content.contact;

        if (contact.phone) {
            html = html.replace(/\+\d{1,3}\s?\(\d{3}\)\s?\d{3}-\d{4}/g, contact.phone);
            html = html.replace(/tel:\+\d+/g, `tel:${contact.phone.replace(/\D/g, '')}`);
        }

        if (contact.email) {
            html = html.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, contact.email);
        }

        if (contact.address) {
            html = html.replace(
                /\d+\s+[A-Za-z\s]+,\s*[A-Za-z\s]+,\s*[A-Z]{2}\s+\d{5}/g,
                contact.address
            );
        }

        return html;
    }

    /**
     * 이미지 데이터 URL 주입
     */
    injectImages(html, images) {
        // 로고 이미지 교체
        if (images.logos.length > 0) {
            const logoDataUrl = images.logos[0].content.dataUrl;
            html = html.replace(
                /src="[^"]*logo[^"]*"/gi,
                `src="${logoDataUrl}"`
            );
        }

        // 배너 이미지 교체
        if (images.banners.length > 0) {
            const bannerDataUrl = images.banners[0].content.dataUrl;
            html = html.replace(
                /src="[^"]*banner[^"]*"/gi,
                `src="${bannerDataUrl}"`
            );
        }

        return html;
    }

    /**
     * 유틸리티 함수들
     */
    extractNameFromFilename(filename) {
        const nameMatch = filename.replace(/\.[^/.]+$/, "").match(/([가-힣]{2,4}|[A-Za-z\s]{2,20})/);
        return nameMatch ? nameMatch[1] : '팀원';
    }

    postProcessStructuredContent(structured) {
        // 기본값 설정
        if (!structured.hero.title && structured.company.name) {
            structured.hero.title = `${structured.company.name}에 오신 것을 환영합니다`;
        }

        if (!structured.hero.text && structured.services.length > 0) {
            structured.hero.text = `최고 품질의 ${structured.services[0].title} 서비스를 제공합니다.`;
        }

        // 팀 이미지와 정보 매칭
        this.matchTeamImagesWithInfo(structured);
    }

    matchTeamImagesWithInfo(structured) {
        const teamImages = structured.images.team;
        const teamInfo = structured.team.filter(member => !member.image);

        teamImages.forEach((image, index) => {
            if (teamInfo[index]) {
                teamInfo[index].image = image.content.dataUrl;
            } else {
                // 새로운 팀원 추가
                structured.team.push({
                    name: this.extractNameFromFilename(image.name),
                    position: '팀원',
                    description: '함께 성장하는 우수한 인재입니다.',
                    image: image.content.dataUrl
                });
            }
        });
    }

    generateSummary(content) {
        return {
            companyName: content.company.name,
            sectionsApplied: [
                content.hero.title ? 'Hero' : null,
                content.services.length > 0 ? 'Services' : null,
                content.team.length > 0 ? 'Team' : null,
                content.contact.phone || content.contact.email ? 'Contact' : null
            ].filter(Boolean),
            totalContent: {
                services: content.services.length,
                teamMembers: content.team.length,
                images: Object.values(content.images).flat().length
            }
        };
    }
}

// 전역 인스턴스 생성
window.contentInjector = new ContentInjector();
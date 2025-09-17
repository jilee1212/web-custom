/**
 * Ollama Local AI Engine
 * 로컬 AI를 이용한 고급 컨텐츠 분석 및 템플릿 적용 시스템
 */

class OllamaAIEngine {
    constructor() {
        this.baseUrl = 'http://localhost:11434';
        this.defaultModel = 'llama3.1:8b';
        this.isConnected = false;
        this.analysisPrompts = {
            sectionClassification: `당신은 웹사이트 컨텐츠 분석 전문가입니다. 주어진 회사 소개 문서를 자세히 분석하여 웹사이트의 각 섹션에 배치할 수 있는 모든 정보를 추출해주세요.

다음 정보들을 모두 찾아서 추출해주세요:
1. 회사 기본 정보: 회사명, 업종, 핵심 비즈니스
2. 메인 메시지: 회사 소개, 핵심 가치, 비전, 미션
3. 서비스/제품: 제공하는 모든 서비스, 기술, 솔루션
4. 경쟁 우위: 차별화 포인트, 핵심 기술, 강점
5. 연락처: 웹사이트, 이메일, 전화번호, 주소
6. 기타: 향후 계획, 목표, 특징

응답 형식 (반드시 유효한 JSON으로):
{
    "company": {
        "name": "회사명",
        "industry": "업종/분야",
        "description": "회사 핵심 소개"
    },
    "hero": {
        "title": "메인 제목 (임팩트 있게)",
        "subtitle": "부제목 (핵심 가치)",
        "description": "회사 소개 (200자 이내)"
    },
    "services": [
        {
            "title": "서비스명",
            "description": "상세 설명",
            "features": ["주요 기능들"],
            "benefits": "고객 혜택"
        }
    ],
    "about": {
        "vision": "비전",
        "mission": "미션",
        "values": ["핵심 가치들"],
        "strengths": ["경쟁 우위들"]
    },
    "contact": {
        "website": "웹사이트 URL",
        "email": "이메일",
        "phone": "전화번호",
        "address": "주소"
    },
    "confidence": 0.95
}

분석할 텍스트:`,

            serviceExtraction: `다음 텍스트에서 제공하는 서비스나 제품을 추출하고, 각각을 웹사이트의 서비스 섹션에 적합하게 구조화해주세요.

응답 형식 (반드시 유효한 JSON으로):
{
    "services": [
        {
            "title": "서비스명",
            "description": "서비스 설명 (100자 이내)",
            "features": ["주요 기능1", "주요 기능2"],
            "benefits": "고객 혜택 (80자 이내)"
        }
    ]
}

분석할 텍스트:`,

            teamExtraction: `다음 텍스트에서 팀원이나 직원 정보를 추출하고, 웹사이트의 팀 섹션에 적합하게 구조화해주세요.

응답 형식 (반드시 유효한 JSON으로):
{
    "teamMembers": [
        {
            "name": "이름",
            "position": "직책",
            "description": "소개 (100자 이내)",
            "expertise": ["전문분야1", "전문분야2"]
        }
    ]
}

분석할 텍스트:`,

            contactExtraction: `다음 텍스트에서 연락처 정보를 추출하고 정리해주세요.

응답 형식 (반드시 유효한 JSON으로):
{
    "contact": {
        "company": "회사명",
        "phone": "전화번호",
        "email": "이메일",
        "address": "주소",
        "website": "웹사이트",
        "businessHours": "운영시간"
    }
}

분석할 텍스트:`
        };
    }

    /**
     * Ollama 서버 연결 확인
     */
    async checkConnection() {
        try {
            const response = await fetch(`${this.baseUrl}/api/tags`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.ok) {
                const data = await response.json();
                this.isConnected = true;
                console.log('✅ Ollama 서버 연결 성공');
                console.log('📋 사용 가능한 모델:', data.models?.map(m => m.name).join(', '));
                return { connected: true, models: data.models };
            }
        } catch (error) {
            console.error('❌ Ollama 서버 연결 실패:', error.message);
            this.isConnected = false;
            return { connected: false, error: error.message };
        }
    }

    /**
     * 필요한 모델 다운로드
     */
    async downloadModel(model = this.defaultModel) {
        console.log(`📥 모델 다운로드 시작: ${model}`);

        try {
            const response = await fetch(`${this.baseUrl}/api/pull`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: model })
            });

            if (!response.ok) {
                throw new Error(`모델 다운로드 실패: ${response.statusText}`);
            }

            // 스트리밍 응답 처리
            const reader = response.body.getReader();
            let progress = 0;

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = new TextDecoder().decode(value);
                const lines = chunk.split('\n').filter(line => line.trim());

                for (const line of lines) {
                    try {
                        const data = JSON.parse(line);
                        if (data.status) {
                            console.log(`📥 ${data.status}`);
                            if (data.completed && data.total) {
                                progress = Math.round((data.completed / data.total) * 100);
                                console.log(`📥 다운로드 진행률: ${progress}%`);
                            }
                        }
                    } catch (e) {
                        // JSON 파싱 실패 무시
                    }
                }
            }

            console.log('✅ 모델 다운로드 완료');
            return { success: true };

        } catch (error) {
            console.error('❌ 모델 다운로드 실패:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * AI를 이용한 고급 컨텐츠 분석
     */
    async analyzeContentWithAI(uploadedFiles) {
        if (!this.isConnected) {
            const connection = await this.checkConnection();
            if (!connection.connected) {
                throw new Error('Ollama 서버에 연결할 수 없습니다. Ollama가 실행 중인지 확인하세요.');
            }
        }

        console.log('🤖 AI 컨텐츠 분석 시작...');

        const results = {
            company: { name: '', description: '', industry: '' },
            hero: { title: '', subtitle: '', text: '', confidence: 0 },
            about: { vision: '', mission: '', values: [], strengths: [] },
            services: [],
            team: [],
            contact: {},
            images: { logos: [], banners: [], team: [], general: [] },
            analysisLog: []
        };

        // 1. 텍스트 파일들 분석
        const textFiles = uploadedFiles.filter(file =>
            file.type === 'document' && file.content?.text
        );

        for (const file of textFiles) {
            console.log(`📄 분석 중: ${file.name}`);

            try {
                // 전체 문서 종합 분석
                const comprehensiveAnalysis = await this.classifySection(file.content.text);

                if (comprehensiveAnalysis.success) {
                    const data = comprehensiveAnalysis.data;
                    results.analysisLog.push(`${file.name}: 종합 분석 완료 (${Math.round((data.confidence || 0.9) * 100)}%)`);

                    // 회사 정보 업데이트
                    if (data.company) {
                        results.company.name = data.company.name || results.company.name;
                        results.company.description = data.company.description || results.company.description;
                        results.company.industry = data.company.industry || results.company.industry;
                    }

                    // Hero 섹션 업데이트
                    if (data.hero) {
                        results.hero.title = data.hero.title || results.hero.title;
                        results.hero.subtitle = data.hero.subtitle || results.hero.subtitle;
                        results.hero.text = data.hero.description || results.hero.text;
                        results.hero.confidence = data.confidence || 0.9;
                    }

                    // 서비스 정보 추가
                    if (data.services && Array.isArray(data.services)) {
                        results.services.push(...data.services);
                    }

                    // About 정보 업데이트
                    if (data.about) {
                        results.about = data.about;
                    }

                    // 연락처 정보 업데이트
                    if (data.contact) {
                        results.contact = { ...results.contact, ...data.contact };
                }

            } catch (error) {
                console.error(`❌ ${file.name} 분석 실패:`, error);
                results.analysisLog.push(`${file.name}: 분석 실패 (${error.message})`);
            }
        }

        // 2. 이미지 파일들 처리 (기존 로직 유지)
        this.processImages(uploadedFiles, results);

        // 3. 후처리 및 최적화
        this.optimizeResults(results);

        console.log('✅ AI 분석 완료');
        return results;
    }

    /**
     * 텍스트를 AI로 섹션 분류
     */
    async classifySection(text) {
        try {
            const prompt = this.analysisPrompts.sectionClassification + '\n\n' + text;

            const response = await this.generateWithAI(prompt);

            if (response.success) {
                const jsonMatch = response.text.match(/\{[\s\S]*\}/);
                if (jsonMatch) {
                    const data = JSON.parse(jsonMatch[0]);
                    return { success: true, data };
                }
            }

            return { success: false, error: 'JSON 응답 파싱 실패' };

        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    /**
     * 서비스 정보 추출
     */
    async extractServices(text) {
        try {
            const prompt = this.analysisPrompts.serviceExtraction + '\n\n' + text;
            const response = await this.generateWithAI(prompt);

            if (response.success) {
                const jsonMatch = response.text.match(/\{[\s\S]*\}/);
                if (jsonMatch) {
                    const data = JSON.parse(jsonMatch[0]);
                    return { success: true, data };
                }
            }

            return { success: false, error: 'JSON 응답 파싱 실패' };

        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    /**
     * 팀원 정보 추출
     */
    async extractTeamMembers(text) {
        try {
            const prompt = this.analysisPrompts.teamExtraction + '\n\n' + text;
            const response = await this.generateWithAI(prompt);

            if (response.success) {
                const jsonMatch = response.text.match(/\{[\s\S]*\}/);
                if (jsonMatch) {
                    const data = JSON.parse(jsonMatch[0]);
                    return { success: true, data };
                }
            }

            return { success: false, error: 'JSON 응답 파싱 실패' };

        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    /**
     * 연락처 정보 추출
     */
    async extractContactInfo(text) {
        try {
            const prompt = this.analysisPrompts.contactExtraction + '\n\n' + text;
            const response = await this.generateWithAI(prompt);

            if (response.success) {
                const jsonMatch = response.text.match(/\{[\s\S]*\}/);
                if (jsonMatch) {
                    const data = JSON.parse(jsonMatch[0]);
                    return { success: true, data };
                }
            }

            return { success: false, error: 'JSON 응답 파싱 실패' };

        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    /**
     * 회사명 추출
     */
    async extractCompanyName(text) {
        try {
            const prompt = `다음 텍스트에서 회사명을 추출해주세요. 회사명만 반환하고 다른 설명은 하지 마세요.\n\n${text.substring(0, 1000)}`;
            const response = await this.generateWithAI(prompt);

            if (response.success) {
                // 간단한 회사명 추출 (첫 줄에서)
                const lines = response.text.split('\n');
                const companyName = lines[0].trim().replace(/['"()]/g, '');
                if (companyName.length > 2 && companyName.length < 50) {
                    return companyName;
                }
            }

            return null;

        } catch (error) {
            console.error('회사명 추출 실패:', error);
            return null;
        }
    }

    /**
     * AI 모델에 텍스트 생성 요청
     */
    async generateWithAI(prompt, model = this.defaultModel) {
        try {
            const response = await fetch(`${this.baseUrl}/api/generate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model: model,
                    prompt: prompt,
                    stream: false,
                    options: {
                        temperature: 0.3,  // 일관된 결과를 위해 낮은 온도
                        top_p: 0.9,
                        top_k: 40
                    }
                })
            });

            if (!response.ok) {
                throw new Error(`AI 생성 실패: ${response.statusText}`);
            }

            const data = await response.json();

            if (data.response) {
                return { success: true, text: data.response };
            } else {
                throw new Error('AI 응답이 비어있습니다');
            }

        } catch (error) {
            console.error('AI 생성 오류:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * 이미지 처리 (기존 로직 유지)
     */
    processImages(uploadedFiles, results) {
        const imageFiles = uploadedFiles.filter(file => file.type === 'image');

        imageFiles.forEach(file => {
            const fileName = file.name.toLowerCase();

            if (fileName.includes('logo')) {
                results.images.logos.push(file);
            } else if (fileName.includes('team') || fileName.includes('팀')) {
                results.images.team.push(file);
            } else if (fileName.includes('banner') || fileName.includes('hero')) {
                results.images.banners.push(file);
            } else {
                const aspectRatio = file.content?.aspectRatio || 1;
                if (aspectRatio > 2) {
                    results.images.banners.push(file);
                } else if (aspectRatio < 0.8) {
                    results.images.team.push(file);
                } else {
                    results.images.general.push(file);
                }
            }
        });
    }

    /**
     * 결과 최적화 및 후처리
     */
    optimizeResults(results) {
        // Hero 섹션 기본값 설정
        if (!results.hero.title && results.company.name) {
            results.hero.title = `${results.company.name}에 오신 것을 환영합니다`;
        }

        if (!results.hero.text && results.services.length > 0) {
            results.hero.text = `최고 품질의 ${results.services[0].title} 서비스를 제공하는 전문 기업입니다.`;
        }

        // 서비스 중복 제거
        const uniqueServices = [];
        const seenTitles = new Set();

        results.services.forEach(service => {
            if (!seenTitles.has(service.title)) {
                seenTitles.add(service.title);
                uniqueServices.push(service);
            }
        });

        results.services = uniqueServices.slice(0, 6); // 최대 6개

        // 팀원 중복 제거
        const uniqueTeam = [];
        const seenNames = new Set();

        results.team.forEach(member => {
            if (!seenNames.has(member.name)) {
                seenNames.add(member.name);
                uniqueTeam.push(member);
            }
        });

        results.team = uniqueTeam.slice(0, 8); // 최대 8명

        // 팀 이미지와 정보 매칭
        this.matchTeamImagesWithInfo(results);
    }

    /**
     * 팀 이미지와 정보 매칭
     */
    matchTeamImagesWithInfo(results) {
        const teamImages = results.images.team;

        teamImages.forEach((image, index) => {
            if (results.team[index]) {
                results.team[index].image = image.content?.dataUrl;
            } else {
                // 새로운 팀원 추가
                results.team.push({
                    name: this.extractNameFromFilename(image.name),
                    position: '팀원',
                    description: '함께 성장하는 우수한 인재입니다.',
                    image: image.content?.dataUrl,
                    expertise: ['전문성', '협업']
                });
            }
        });
    }

    /**
     * 파일명에서 이름 추출
     */
    extractNameFromFilename(filename) {
        const nameMatch = filename.replace(/\.[^/.]+$/, "").match(/([가-힣]{2,4}|[A-Za-z\s]{2,20})/);
        return nameMatch ? nameMatch[1] : '팀원';
    }

    /**
     * AI 분석 상태 확인
     */
    async getStatus() {
        const connection = await this.checkConnection();
        return {
            connected: connection.connected,
            model: this.defaultModel,
            available: this.isConnected,
            error: connection.error
        };
    }
}

// 전역 인스턴스 생성
window.ollamaAI = new OllamaAIEngine();
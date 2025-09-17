/**
 * Content Analysis System
 * 업로드된 파일의 내용을 분석하고 템플릿 섹션에 자동 매칭
 */

class ContentAnalyzer {
    constructor() {
        this.sectionMappings = {
            // 템플릿 섹션별 키워드 매핑
            hero: {
                keywords: ['회사소개', '메인', '대표', '비전', '미션', '소개', 'about', 'vision', 'mission', 'company'],
                priority: 10,
                type: 'text'
            },
            services: {
                keywords: ['서비스', '솔루션', '업무', '기능', '제품', 'service', 'solution', 'product', 'feature'],
                priority: 9,
                type: 'text'
            },
            portfolio: {
                keywords: ['포트폴리오', '프로젝트', '사례', '실적', '결과', 'portfolio', 'project', 'case', 'work'],
                priority: 8,
                type: 'mixed'
            },
            team: {
                keywords: ['팀', '직원', '구성원', '인력', '조직', 'team', 'staff', 'member', 'employee'],
                priority: 7,
                type: 'mixed'
            },
            testimonials: {
                keywords: ['후기', '리뷰', '평가', '고객', '만족', 'review', 'testimonial', 'feedback', 'customer'],
                priority: 6,
                type: 'text'
            },
            contact: {
                keywords: ['연락처', '주소', '전화', '이메일', '문의', 'contact', 'address', 'phone', 'email'],
                priority: 8,
                type: 'text'
            },
            gallery: {
                keywords: ['갤러리', '사진', '이미지', '앨범', 'gallery', 'photo', 'image', 'album'],
                priority: 5,
                type: 'image'
            },
            news: {
                keywords: ['뉴스', '소식', '공지', '업데이트', 'news', 'notice', 'update', 'announcement'],
                priority: 4,
                type: 'text'
            }
        };

        this.contentTypes = {
            text: ['documents'],
            image: ['images'],
            video: ['videos'],
            mixed: ['documents', 'images', 'videos']
        };

        this.analysisResults = {
            sections: {},
            unmatchedContent: [],
            confidence: 0
        };
    }

    /**
     * 전체 컨텐츠 분석 및 매칭
     */
    async analyzeContent(processedFiles) {
        console.log('🔍 컨텐츠 분석 시작...');

        this.analysisResults = {
            sections: {},
            unmatchedContent: [],
            confidence: 0
        };

        try {
            // 1. 문서 컨텐츠 분석
            await this.analyzeDocuments(processedFiles.documents || []);

            // 2. 이미지 컨텐츠 분석
            await this.analyzeImages(processedFiles.images || []);

            // 3. 비디오 컨텐츠 분석
            await this.analyzeVideos(processedFiles.videos || []);

            // 4. 섹션별 컨텐츠 매칭
            await this.matchContentToSections();

            // 5. 신뢰도 계산
            this.calculateConfidence();

            console.log('✅ 컨텐츠 분석 완료');
            return this.analysisResults;

        } catch (error) {
            console.error('❌ 컨텐츠 분석 실패:', error);
            throw error;
        }
    }

    /**
     * 문서 컨텐츠 분석
     */
    async analyzeDocuments(documents) {
        for (const doc of documents) {
            if (!doc.content || !doc.content.textContent) continue;

            const analysis = await this.analyzeTextContent(doc.content.textContent, doc.name);

            analysis.sourceFile = doc.name;
            analysis.fileId = doc.id;
            analysis.contentType = 'document';

            // 매칭된 섹션별로 분류
            for (const match of analysis.sectionMatches) {
                if (!this.analysisResults.sections[match.section]) {
                    this.analysisResults.sections[match.section] = [];
                }

                this.analysisResults.sections[match.section].push({
                    ...analysis,
                    matchConfidence: match.confidence,
                    matchedKeywords: match.keywords
                });
            }

            if (analysis.sectionMatches.length === 0) {
                this.analysisResults.unmatchedContent.push(analysis);
            }
        }
    }

    /**
     * 이미지 컨텐츠 분석
     */
    async analyzeImages(images) {
        for (const img of images) {
            const analysis = {
                sourceFile: img.name,
                fileId: img.id,
                contentType: 'image',
                dimensions: img.content.dimensions,
                aspectRatio: img.content.aspectRatio,
                dataUrl: img.content.dataUrl,
                suggestedSections: this.suggestImageSections(img),
                metadata: {
                    size: img.size,
                    uploadTime: img.uploadTime
                }
            };

            // 이미지 파일명에서 힌트 추출
            const nameAnalysis = this.analyzeFileName(img.name);
            analysis.nameHints = nameAnalysis;

            // 적절한 섹션에 자동 배치
            const bestSection = this.getBestSectionForImage(analysis);
            if (bestSection) {
                if (!this.analysisResults.sections[bestSection]) {
                    this.analysisResults.sections[bestSection] = [];
                }
                this.analysisResults.sections[bestSection].push(analysis);
            } else {
                this.analysisResults.unmatchedContent.push(analysis);
            }
        }
    }

    /**
     * 비디오 컨텐츠 분석
     */
    async analyzeVideos(videos) {
        for (const video of videos) {
            const analysis = {
                sourceFile: video.name,
                fileId: video.id,
                contentType: 'video',
                duration: video.content.duration,
                dimensions: video.content.dimensions,
                dataUrl: video.content.dataUrl,
                suggestedSections: ['hero', 'portfolio', 'gallery'],
                metadata: {
                    size: video.size,
                    uploadTime: video.uploadTime
                }
            };

            // 비디오 파일명에서 힌트 추출
            const nameAnalysis = this.analyzeFileName(video.name);
            analysis.nameHints = nameAnalysis;

            // 비디오는 주로 hero나 portfolio 섹션에 배치
            const bestSection = this.getBestSectionForVideo(analysis);
            if (!this.analysisResults.sections[bestSection]) {
                this.analysisResults.sections[bestSection] = [];
            }
            this.analysisResults.sections[bestSection].push(analysis);
        }
    }

    /**
     * 텍스트 컨텐츠 분석
     */
    async analyzeTextContent(text, fileName) {
        const analysis = {
            originalText: text,
            processedText: this.preprocessText(text),
            wordCount: text.split(/\s+/).length,
            sentences: this.extractSentences(text),
            keywords: this.extractKeywords(text),
            sectionMatches: [],
            fileName: fileName
        };

        // 각 섹션별 매칭 점수 계산
        for (const [sectionName, sectionConfig] of Object.entries(this.sectionMappings)) {
            const matchScore = this.calculateSectionMatch(analysis.processedText, sectionConfig);

            if (matchScore.confidence > 0.3) {
                analysis.sectionMatches.push({
                    section: sectionName,
                    confidence: matchScore.confidence,
                    keywords: matchScore.matchedKeywords,
                    priority: sectionConfig.priority
                });
            }
        }

        // 매칭 결과를 신뢰도 순으로 정렬
        analysis.sectionMatches.sort((a, b) => b.confidence - a.confidence);

        return analysis;
    }

    /**
     * 파일명 분석
     */
    analyzeFileName(fileName) {
        const baseName = fileName.toLowerCase().replace(/\.[^/.]+$/, "");
        const hints = [];

        for (const [sectionName, sectionConfig] of Object.entries(this.sectionMappings)) {
            for (const keyword of sectionConfig.keywords) {
                if (baseName.includes(keyword.toLowerCase())) {
                    hints.push({
                        section: sectionName,
                        keyword: keyword,
                        confidence: 0.8
                    });
                }
            }
        }

        return hints;
    }

    /**
     * 섹션 매칭 점수 계산
     */
    calculateSectionMatch(text, sectionConfig) {
        const matchedKeywords = [];
        let totalScore = 0;

        for (const keyword of sectionConfig.keywords) {
            const regex = new RegExp(keyword, 'gi');
            const matches = text.match(regex);

            if (matches) {
                matchedKeywords.push({
                    keyword: keyword,
                    count: matches.length
                });
                totalScore += matches.length;
            }
        }

        const confidence = Math.min(totalScore / 10, 1); // 최대 1.0으로 정규화

        return {
            confidence: confidence,
            matchedKeywords: matchedKeywords
        };
    }

    /**
     * 이미지에 적합한 섹션 제안
     */
    getBestSectionForImage(imageAnalysis) {
        // 파일명 힌트 우선 고려
        if (imageAnalysis.nameHints && imageAnalysis.nameHints.length > 0) {
            return imageAnalysis.nameHints[0].section;
        }

        // 종횡비 기반 섹션 제안
        const aspectRatio = imageAnalysis.aspectRatio;

        if (aspectRatio > 2) {
            return 'hero'; // 배너형 이미지
        } else if (aspectRatio > 1.3) {
            return 'portfolio'; // 가로형 이미지
        } else if (aspectRatio < 0.8) {
            return 'team'; // 세로형 이미지 (인물사진)
        } else {
            return 'gallery'; // 정사각형에 가까운 이미지
        }
    }

    /**
     * 비디오에 적합한 섹션 제안
     */
    getBestSectionForVideo(videoAnalysis) {
        // 파일명 힌트 우선 고려
        if (videoAnalysis.nameHints && videoAnalysis.nameHints.length > 0) {
            return videoAnalysis.nameHints[0].section;
        }

        // 길이 기반 제안
        if (videoAnalysis.duration > 60) {
            return 'portfolio'; // 긴 비디오는 포트폴리오
        } else {
            return 'hero'; // 짧은 비디오는 메인
        }
    }

    /**
     * 컨텐츠를 섹션에 매칭
     */
    async matchContentToSections() {
        // 우선순위 기반으로 컨텐츠 재배치
        const prioritizedSections = Object.entries(this.sectionMappings)
            .sort(([, a], [, b]) => b.priority - a.priority)
            .map(([name]) => name);

        // 각 섹션별로 최적의 컨텐츠 선택
        for (const sectionName of prioritizedSections) {
            if (this.analysisResults.sections[sectionName]) {
                this.analysisResults.sections[sectionName] =
                    this.analysisResults.sections[sectionName]
                        .sort((a, b) => (b.matchConfidence || 0) - (a.matchConfidence || 0))
                        .slice(0, 3); // 섹션당 최대 3개 컨텐츠
            }
        }
    }

    /**
     * 전체 분석 신뢰도 계산
     */
    calculateConfidence() {
        const totalSections = Object.keys(this.sectionMappings).length;
        const matchedSections = Object.keys(this.analysisResults.sections).length;
        const unmatchedCount = this.analysisResults.unmatchedContent.length;

        const sectionCoverage = matchedSections / totalSections;
        const matchAccuracy = unmatchedCount > 0 ? 0.8 : 1.0;

        this.analysisResults.confidence = sectionCoverage * matchAccuracy;
    }

    /**
     * 텍스트 전처리
     */
    preprocessText(text) {
        return text
            .toLowerCase()
            .replace(/[^\w\s가-힣]/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
    }

    /**
     * 문장 추출
     */
    extractSentences(text) {
        return text
            .split(/[.!?]+/)
            .map(s => s.trim())
            .filter(s => s.length > 10);
    }

    /**
     * 키워드 추출
     */
    extractKeywords(text) {
        const words = this.preprocessText(text).split(/\s+/);
        const wordCount = {};

        words.forEach(word => {
            if (word.length > 2) {
                wordCount[word] = (wordCount[word] || 0) + 1;
            }
        });

        return Object.entries(wordCount)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 20)
            .map(([word, count]) => ({ word, count }));
    }

    /**
     * 분석 결과 조회
     */
    getAnalysisResults() {
        return this.analysisResults;
    }

    /**
     * 특정 섹션의 컨텐츠 조회
     */
    getSectionContent(sectionName) {
        return this.analysisResults.sections[sectionName] || [];
    }

    /**
     * 매칭되지 않은 컨텐츠 조회
     */
    getUnmatchedContent() {
        return this.analysisResults.unmatchedContent;
    }

    /**
     * 분석 통계
     */
    getAnalysisStats() {
        const stats = {
            totalSections: Object.keys(this.sectionMappings).length,
            matchedSections: Object.keys(this.analysisResults.sections).length,
            totalContent: 0,
            unmatchedContent: this.analysisResults.unmatchedContent.length,
            confidence: this.analysisResults.confidence
        };

        for (const contents of Object.values(this.analysisResults.sections)) {
            stats.totalContent += contents.length;
        }

        return stats;
    }
}

// 전역 인스턴스 생성
window.contentAnalyzer = new ContentAnalyzer();
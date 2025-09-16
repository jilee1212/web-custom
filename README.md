# IT Company Website Template

브랜드 중립적인 IT 기업 웹사이트 템플릿으로, 법적으로 안전하고 쉽게 커스터마이징이 가능합니다.

## 🚀 특징

- **브랜드 중립적**: 특정 브랜드 요소 없이 범용적으로 사용 가능
- **법적 안전성**: 저작권 이슈 없는 안전한 템플릿
- **반응형 디자인**: 모든 디바이스에서 완벽하게 작동
- **쉬운 커스터마이징**: CSS 변수와 JSON 설정으로 간편한 수정
- **최신 기술**: HTML5, CSS3, Vanilla JavaScript 사용
- **접근성**: WCAG 가이드라인 준수

## 📁 프로젝트 구조

```
project/
├── index.html              # 메인 페이지
├── config.json            # 사이트 설정 파일
├── README.md              # 프로젝트 문서
├── css/
│   ├── variables.css      # CSS 변수 (디자인 시스템)
│   ├── main.css          # 메인 스타일
│   ├── components.css    # 컴포넌트 스타일
│   └── responsive.css    # 반응형 스타일
├── js/
│   └── main.js           # 메인 JavaScript
├── images/               # 이미지 파일
└── assets/              # 기타 자산
```

## 🛠️ 설치 및 실행

1. **파일 다운로드**
   ```bash
   # 프로젝트 파일을 원하는 디렉토리에 복사
   ```

2. **웹 서버 실행**
   ```bash
   # Python 3 사용 시
   python -m http.server 8000

   # Python 2 사용 시
   python -m SimpleHTTPServer 8000

   # Node.js 사용 시 (serve 패키지 설치 필요)
   npx serve
   ```

3. **브라우저에서 확인**
   ```
   http://localhost:8000
   ```

## 🎨 커스터마이징 가이드

### 1. 기본 정보 변경

`config.json` 파일을 수정하여 회사 정보를 변경:

```json
{
  "site": {
    "name": "귀하의 회사명",
    "title": "귀하의 웹사이트 제목",
    "description": "귀하의 회사 설명"
  },
  "contact": {
    "address": {
      "street": "귀하의 주소",
      "building": "건물명"
    },
    "phone": {
      "main": "전화번호"
    },
    "email": {
      "info": "info@yourcompany.com"
    }
  }
}
```

### 2. 색상 변경

`css/variables.css` 파일에서 색상 변경:

```css
:root {
  --color-primary: #2563eb;      /* 주 색상 */
  --color-secondary: #10b981;    /* 보조 색상 */
  --color-accent: #f59e0b;       /* 강조 색상 */
}
```

### 3. 폰트 변경

```css
:root {
  --font-primary: 'Roboto', sans-serif;
  --font-korean: 'Noto Sans KR', sans-serif;
}
```

### 4. 서비스 섹션 수정

`config.json`에서 서비스 내용 변경:

```json
"services": [
  {
    "id": "your-service",
    "icon": "fas fa-your-icon",
    "title": "서비스 제목",
    "description": "서비스 설명",
    "features": ["특징1", "특징2", "특징3"]
  }
]
```

### 5. 포트폴리오 항목 수정

```json
"portfolio": [
  {
    "id": "project-1",
    "title": "프로젝트 제목",
    "description": "프로젝트 설명",
    "category": ["web", "mobile"],
    "technologies": ["React", "Node.js"],
    "image": "path/to/image.jpg"
  }
]
```

## 🔧 고급 커스터마이징

### CSS 변수 활용

모든 디자인 요소는 CSS 변수로 정의되어 있어 쉽게 수정 가능:

```css
/* 간격 조정 */
:root {
  --space-custom: 2.5rem;
}

/* 그림자 효과 */
:root {
  --shadow-custom: 0 10px 25px rgba(0, 0, 0, 0.1);
}

/* 테두리 반경 */
:root {
  --radius-custom: 16px;
}
```

### JavaScript 기능 수정

`js/main.js`에서 다음 기능들을 커스터마이징 가능:

- 네비게이션 동작
- 스크롤 효과
- 포트폴리오 필터링
- 폼 처리
- 애니메이션

## 📱 반응형 디자인

다음 브레이크포인트를 사용:

- **Mobile**: < 640px
- **Tablet**: 640px - 1023px
- **Desktop**: 1024px - 1279px
- **Large Desktop**: 1280px+

### 반응형 수정 방법

`css/responsive.css`에서 각 브레이크포인트별 스타일 수정:

```css
/* 태블릿 */
@media (max-width: 1023px) {
  .your-element {
    /* 태블릿용 스타일 */
  }
}

/* 모바일 */
@media (max-width: 767px) {
  .your-element {
    /* 모바일용 스타일 */
  }
}
```

## 🎯 SEO 최적화

### 1. 메타 태그 수정

`index.html`의 `<head>` 섹션:

```html
<title>귀하의 페이지 제목</title>
<meta name="description" content="귀하의 페이지 설명">
<meta name="keywords" content="관련, 키워드, 목록">
```

### 2. 구조화된 데이터 추가

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "귀하의 회사명",
  "url": "https://yourwebsite.com",
  "description": "회사 설명"
}
</script>
```

## 🔒 보안 고려사항

1. **폼 보안**: 실제 서비스에서는 서버측 폼 검증 구현
2. **HTTPS 사용**: 프로덕션 환경에서는 HTTPS 필수
3. **CSP 헤더**: Content Security Policy 설정 권장
4. **입력 검증**: 모든 사용자 입력에 대한 검증 구현

## 🚀 배포 가이드

### 정적 호스팅 서비스

- **GitHub Pages**: 무료, 간단한 설정
- **Netlify**: 자동 배포, CDN 포함
- **Vercel**: Next.js 최적화
- **AWS S3**: 확장성 좋음

### 배포 전 체크리스트

- [ ] 모든 링크가 올바르게 작동하는지 확인
- [ ] 이미지 경로가 정확한지 확인
- [ ] 폼이 올바르게 작동하는지 테스트
- [ ] 모든 브라우저에서 테스트
- [ ] 모바일 디바이스에서 테스트
- [ ] 페이지 로딩 속도 확인

## 📊 성능 최적화

### 이미지 최적화

```html
<!-- WebP 형식 사용 -->
<picture>
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="설명">
</picture>
```

### CSS 최적화

```bash
# CSS 압축 (postcss 사용)
npx postcss css/*.css --use autoprefixer --use cssnano -d dist/css/
```

### JavaScript 최적화

```bash
# JavaScript 압축 (terser 사용)
npx terser js/main.js -o dist/js/main.min.js -c -m
```

## 🎨 디자인 가이드라인

### 색상 팔레트

- **Primary**: 신뢰성과 전문성을 나타내는 블루
- **Secondary**: 성장과 혁신을 나타내는 그린
- **Accent**: 에너지와 활력을 나타내는 오렌지

### 타이포그래피

- **제목**: Inter 폰트 (영문), Noto Sans KR (한글)
- **본문**: 가독성 높은 폰트 사용
- **코드**: Fira Code 모노스페이스 폰트

### 간격 시스템

8px 기반 간격 시스템 사용:
- 8px, 16px, 24px, 32px, 40px, 48px, 64px, 80px

## 🤝 기여하기

1. 이슈 리포트: 버그나 개선사항 제안
2. 풀 리퀘스트: 코드 기여
3. 문서 개선: README나 주석 개선

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## ⚠️ 면책 조항

- 이 템플릿은 교육 및 개발 목적으로 제공됩니다
- 상업적 사용 시 추가적인 라이선스 검토가 필요할 수 있습니다
- 모든 외부 라이브러리의 라이선스를 확인하세요

## 🆘 지원

문제가 발생하거나 질문이 있으시면:

1. 이슈 트래커에 문제 제기
2. 문서 재검토
3. 커뮤니티 포럼 참여

---

**Happy Coding! 🚀**
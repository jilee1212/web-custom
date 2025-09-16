# Claude Code 커스터마이징 워크플로우 스크립트

# ===================================
# 1. 프로젝트 초기 설정
# ===================================

# 새 클라이언트 프로젝트 생성
create_client_project() {
    local client_name=$1
    local industry=$2
    
    echo "🎯 새 클라이언트 프로젝트 생성: $client_name"
    
    # 프로젝트 디렉토리 생성
    mkdir -p "clients/$client_name"
    cd "clients/$client_name"
    
    # Sycros 템플릿 복사
    cp -r "../../templates/sycros-base" "./"
    
    # 클라이언트 설정 파일 생성
    cat > "client-config.json" << EOF
{
  "clientName": "$client_name",
  "industry": "$industry",
  "createdAt": "$(date -Iseconds)",
  "templateBase": "sycros",
  "status": "in-progress"
}
EOF
    
    echo "✅ 프로젝트 디렉토리 생성 완료"
}

# ===================================
# 2. 브랜드 에셋 처리
# ===================================

# 로고 파일 최적화 및 적용
process_logo() {
    local logo_file=$1
    
    echo "🎨 로고 파일 처리 중..."
    
    # SVG로 변환 (가능한 경우)
    if [[ $logo_file == *.ai ]] || [[ $logo_file == *.eps ]]; then
        # Adobe Illustrator나 EPS 파일을 SVG로 변환
        inkscape --file="$logo_file" --export-plain-svg="assets/logo.svg"
    fi
    
    # PNG 버전 생성 (여러 크기)
    convert "$logo_file" -resize 200x200 "assets/logo-200.png"
    convert "$logo_file" -resize 100x100 "assets/logo-100.png"
    convert "$logo_file" -resize 50x50 "assets/logo-50.png"
    
    # 파비콘 생성
    convert "$logo_file" -resize 32x32 "assets/favicon.ico"
    
    echo "✅ 로고 최적화 완료"
}

# 브랜드 컬러 추출
extract_brand_colors() {
    local logo_file=$1
    
    echo "🎨 브랜드 컬러 추출 중..."
    
    # ImageMagick을 사용한 주요 색상 추출
    local colors=$(convert "$logo_file" -colors 5 -unique-colors txt:- | grep -o '#[0-9A-Fa-f]\{6\}')
    
    # CSS 변수 파일 생성
    cat > "assets/css/brand-colors.css" << EOF
/* 자동 추출된 브랜드 컬러 */
:root {
  /* 추출된 주요 색상들 */
$(echo "$colors" | head -3 | nl -w2 -s' ' | awk '{print "  --brand-color-" $1 ": " $2 ";"}')
  
  /* Sycros 템플릿 기본 색상 오버라이드 */
  --color-primary-500: $(echo "$colors" | head -1);
  --color-secondary-500: $(echo "$colors" | head -2 | tail -1);
  --color-accent-500: $(echo "$colors" | head -3 | tail -1);
}
EOF
    
    echo "✅ 브랜드 컬러 추출 완료"
}

# ===================================
# 3. 콘텐츠 자동 교체
# ===================================

# 회사 정보 일괄 교체
replace_company_info() {
    local config_file="client-config.json"
    local company_name=$(jq -r '.clientName' "$config_file")
    
    echo "📝 회사 정보 교체 중..."
    
    # HTML 파일들에서 플레이스홀더 교체
    find . -name "*.html" -type f -exec sed -i.bak \
        -e "s/\[회사명\]/$company_name/g" \
        -e "s/\[Your Company\]/$company_name/g" \
        -e "s/SYCROS/$company_name/g" \
        -e "s/Sycros/$company_name/g" \
        {} \;
    
    # CSS 파일들에서 클래스명 교체 (브랜드 중립화)
    find . -name "*.css" -type f -exec sed -i.bak \
        -e "s/sycros-/custom-/g" \
        -e "s/\.sycros/\.custom/g" \
        {} \;
    
    # JavaScript 파일들에서 함수명/변수명 교체
    find . -name "*.js" -type f -exec sed -i.bak \
        -e "s/Sycros/Custom/g" \
        -e "s/sycros/custom/g" \
        {} \;
    
    # 백업 파일 정리
    find . -name "*.bak" -delete
    
    echo "✅ 회사 정보 교체 완료"
}

# 콘텐츠 파일 기반 교체
apply_content_from_file() {
    local content_file=$1
    
    if [[ ! -f "$content_file" ]]; then
        echo "⚠️ 콘텐츠 파일을 찾을 수 없습니다: $content_file"
        return 1
    fi
    
    echo "📄 콘텐츠 파일 적용 중..."
    
    # JSON 형태의 콘텐츠 파일 읽기
    local hero_title=$(jq -r '.heroTitle // empty' "$content_file")
    local hero_subtitle=$(jq -r '.heroSubtitle // empty' "$content_file")
    local about_text=$(jq -r '.aboutText // empty' "$content_file")
    
    # HTML 파일에 콘텐츠 적용
    if [[ -n "$hero_title" ]]; then
        sed -i "s/\[대표 메시지\]/$hero_title/g" index.html
    fi
    
    if [[ -n "$hero_subtitle" ]]; then
        sed -i "s/\[부제목\]/$hero_subtitle/g" index.html
    fi
    
    if [[ -n "$about_text" ]]; then
        sed -i "s/\[회사 소개\]/$about_text/g" index.html
    fi
    
    echo "✅ 콘텐츠 적용 완료"
}

# ===================================
# 4. 업종별 커스터마이징
# ===================================

# 업종별 스타일 적용
apply_industry_style() {
    local industry=$1
    
    echo "🏭 업종별 스타일 적용: $industry"
    
    case $industry in
        "enterprise")
            apply_enterprise_theme
            ;;
        "startup")
            apply_startup_theme
            ;;
        "healthcare")
            apply_healthcare_theme
            ;;
        "fintech")
            apply_fintech_theme
            ;;
        *)
            echo "⚠️ 알 수 없는 업종: $industry. 기본 테마 유지"
            ;;
    esac
    
    echo "✅ 업종별 스타일 적용 완료"
}

apply_enterprise_theme() {
    cat >> "assets/css/industry-theme.css" << EOF
/* Enterprise B2B Theme */
:root {
  --color-primary-500: #1e40af;
  --color-secondary-500: #64748b;
  --color-accent-500: #10b981;
  --border-radius-base: 8px;
  --font-weight-base: 400;
}

body {
  font-family: 'Inter', -apple-system, sans-serif;
}

.btn--primary {
  background: linear-gradient(135deg, var(--color-primary-500), var(--color-secondary-500));
  box-shadow: 0 4px 12px rgba(30, 64, 175, 0.3);
}

.hero {
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
}
EOF
}

apply_startup_theme() {
    cat >> "assets/css/industry-theme.css" << EOF
/* Startup/Innovation Theme */
:root {
  --color-primary-500: #6366f1;
  --color-secondary-500: #f59e0b;
  --color-accent-500: #ef4444;
  --border-radius-base: 16px;
  --font-weight-base: 500;
}

body {
  font-family: 'Inter', sans-serif;
  font-weight: var(--font-weight-base);
}

.btn--primary {
  background: linear-gradient(135deg, var(--color-primary-500), var(--color-secondary-500));
  transform: translateY(0);
  transition: transform 0.2s ease;
}

.btn--primary:hover {
  transform: translateY(-3px);
}

.hero {
  background: radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.1) 0%, transparent 50%);
}
EOF
}

apply_healthcare_theme() {
    cat >> "assets/css/industry-theme.css" << EOF
/* Healthcare Theme */
:root {
  --color-primary-500: #10b981;
  --color-secondary-500: #3b82f6;
  --color-accent-500: #ffffff;
  --border-radius-base: 12px;
  --font-weight-base: 400;
}

body {
  font-family: 'Inter', sans-serif;
  line-height: 1.7;
}

.btn--primary {
  background: linear-gradient(135deg, var(--color-primary-500), var(--color-secondary-500));
  border-radius: 25px;
}

.card {
  border-radius: var(--border-radius-base);
  box-shadow: 0 4px 20px rgba(16, 185, 129, 0.1);
}
EOF
}

apply_fintech_theme() {
    cat >> "assets/css/industry-theme.css" << EOF
/* Fintech Theme */
:root {
  --color-primary-500: #1f2937;
  --color-secondary-500: #fbbf24;
  --color-accent-500: #3b82f6;
  --border-radius-base: 6px;
  --font-weight-base: 500;
}

body {
  font-family: 'Inter', sans-serif;
  font-weight: var(--font-weight-base);
}

.btn--primary {
  background: linear-gradient(135deg, var(--color-primary-500), var(--color-secondary-500));
  border: 2px solid var(--color-secondary-500);
}

.hero {
  background: linear-gradient(135deg, #1f2937 0%, #374151 100%);
  color: white;
}

.card {
  border: 1px solid #374151;
  background: rgba(255, 255, 255, 0.95);
}
EOF
}

# ===================================
# 5. 자동화 빌드 프로세스
# ===================================

# 전체 커스터마이징 프로세스 실행
run_full_customization() {
    local client_name=$1
    local industry=$2
    local logo_file=$3
    local content_file=$4
    
    echo "🚀 전체 커스터마이징 프로세스 시작"
    echo "클라이언트: $client_name"
    echo "업종: $industry"
    
    # 1. 프로젝트 생성
    create_client_project "$client_name" "$industry"
    
    # 2. 로고 처리 (있는 경우)
    if [[ -n "$logo_file" && -f "$logo_file" ]]; then
        process_logo "$logo_file"
        extract_brand_colors "$logo_file"
    fi
    
    # 3. 회사 정보 교체
    replace_company_info
    
    # 4. 콘텐츠 적용 (있는 경우)
    if [[ -n "$content_file" && -f "$content_file" ]]; then
        apply_content_from_file "$content_file"
    fi
    
    # 5. 업종별 테마 적용
    apply_industry_style "$industry"
    
    # 6. 최종 빌드
    build_final_website
    
    echo "✅ 전체 커스터마이징 완료!"
    echo "📂 결과물 위치: $(pwd)"
}

# 최종 웹사이트 빌드
build_final_website() {
    echo "🔨 최종 웹사이트 빌드 중..."
    
    # CSS 파일들 통합
    cat assets/css/main.css \
        assets/css/brand-colors.css \
        assets/css/industry-theme.css \
        > assets/css/final.css
    
    # HTML에서 CSS 링크 업데이트
    sed -i 's|assets/css/main.css|assets/css/final.css|g' index.html
    
    # 이미지 최적화
    if command -v optipng &> /dev/null; then
        find assets/images -name "*.png" -exec optipng -o2 {} \;
    fi
    
    # 최종 검증
    validate_final_output
    
    echo "✅ 빌드 완료"
}

# 최종 결과물 검증
validate_final_output() {
    echo "🔍 최종 결과물 검증 중..."
    
    local errors=0
    
    # HTML 파일 존재 확인
    if [[ ! -f "index.html" ]]; then
        echo "❌ index.html 파일이 없습니다"
        ((errors++))
    fi
    
    # CSS 파일 존재 확인
    if [[ ! -f "assets/css/final.css" ]]; then
        echo "❌ CSS 파일이 없습니다"
        ((errors++))
    fi
    
    # 로고 파일 확인
    if [[ ! -f "assets/logo.svg" && ! -f "assets/logo.png" ]]; then
        echo "⚠️ 로고 파일이 없습니다"
    fi
    
    # SYCROS 잔여 텍스트 확인
    local sycros_count=$(grep -r "SYCROS\|Sycros\|sycros" . --exclude-dir=node_modules | wc -l)
    if [[ $sycros_count -gt 0 ]]; then
        echo "⚠️ SYCROS 관련 텍스트가 $sycros_count 개 남아있습니다"
        grep -r "SYCROS\|Sycros\|sycros" . --exclude-dir=node_modules
    fi
    
    if [[ $errors -eq 0 ]]; then
        echo "✅ 검증 완료 - 문제없음"
        return 0
    else
        echo "❌ 검증 실패 - $errors 개 오류"
        return 1
    fi
}

# ===================================
# 6. 빠른 실행 명령어들
# ===================================

# 빠른 커스터마이징 (최소 정보만으로)
quick_customize() {
    local client_name=$1
    local industry=${2:-"enterprise"}
    
    echo "⚡ 빠른 커스터마이징: $client_name"
    
    create_client_project "$client_name" "$industry"
    replace_company_info
    apply_industry_style "$industry"
    build_final_website
    
    echo "✅ 빠른 커스터마이징 완료"
}

# 프리뷰 서버 시작
start_preview() {
    echo "🌐 프리뷰 서버 시작..."
    
    if command -v python3 &> /dev/null; then
        python3 -m http.server 8000
    elif command -v php &> /dev/null; then
        php -S localhost:8000
    else
        echo "❌ Python3 또는 PHP가 필요합니다"
        return 1
    fi
}

# 메인 실행 함수
main() {
    case "${1:-}" in
        "create")
            create_client_project "$2" "$3"
            ;;
        "logo")
            process_logo "$2"
            ;;
        "colors")
            extract_brand_colors "$2"
            ;;
        "content")
            apply_content_from_file "$2"
            ;;
        "theme")
            apply_industry_style "$2"
            ;;
        "full")
            run_full_customization "$2" "$3" "$4" "$5"
            ;;
        "quick")
            quick_customize "$2" "$3"
            ;;
        "preview")
            start_preview
            ;;
        "validate")
            validate_final_output
            ;;
        *)
            cat << EOF
🎛 Claude Code 커스터마이징 도구

사용법:
  $0 create <클라이언트명> <업종>           # 프로젝트 생성
  $0 logo <로고파일>                       # 로고 처리
  $0 colors <로고파일>                     # 컬러 추출
  $0 content <콘텐츠파일>                  # 콘텐츠 적용
  $0 theme <업종>                          # 테마 적용
  $0 full <클라이언트명> <업종> [로고] [콘텐츠]  # 전체 프로세스
  $0 quick <클라이언트명> [업종]           # 빠른 커스터마이징
  $0 preview                               # 프리뷰 서버
  $0 validate                              # 결과물 검증

업종 옵션:
  enterprise, startup, healthcare, fintech

예시:
  $0 full "TechCorp" "enterprise" "logo.ai" "content.json"
  $0 quick "StartupABC" "startup"
EOF
            ;;
    esac
}

# 스크립트가 직접 실행된 경우에만 main 함수 호출
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    main "$@"
fi
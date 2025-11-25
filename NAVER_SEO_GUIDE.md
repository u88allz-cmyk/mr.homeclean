# 네이버 서치어드바이저 등록 가이드

## 📋 사전 준비

도메인 구매 후 다음 파일들의 `YOUR_DOMAIN.com` 부분을 실제 도메인으로 변경해주세요:

1. `client/public/robots.txt`
2. `client/public/sitemap.xml`
3. `client/index.html` (여러 곳)

## 🔍 네이버 서치어드바이저 등록 방법

### Step 1: 서치어드바이저 접속
1. https://searchadvisor.naver.com/ 접속
2. 네이버 계정으로 로그인

### Step 2: 사이트 등록
1. "웹마스터 도구" 클릭
2. "사이트 추가" 버튼 클릭
3. 도메인 입력 (예: `https://misterhomeclean.com`)

### Step 3: 소유권 확인 (2가지 방법 중 선택)

#### 방법 1: HTML 태그 추가 (권장)
1. 네이버에서 제공하는 메타 태그 복사
2. `client/index.html`에서 아래 주석 해제 후 코드 교체:
```html
<!-- 이 줄의 주석을 해제하고 코드 교체 -->
<meta name="naver-site-verification" content="YOUR_NAVER_VERIFICATION_CODE" />
```
3. 재배포 후 "확인" 버튼 클릭

#### 방법 2: HTML 파일 업로드
1. 네이버에서 제공하는 HTML 파일 다운로드
2. `client/public/` 폴더에 파일 추가
3. 재배포 후 "확인" 버튼 클릭

### Step 4: 사이트맵 제출
1. 소유권 확인 완료 후
2. "요청" → "사이트맵 제출" 클릭
3. 사이트맵 URL 입력: `https://YOUR_DOMAIN.com/sitemap.xml`
4. "확인" 클릭

### Step 5: RSS 제출 (선택사항)
- 블로그 등 RSS가 있는 경우 제출

### Step 6: 수집 요청
1. "요청" → "웹 페이지 수집" 클릭
2. 메인 페이지 URL 입력
3. "확인" 클릭

## 📊 SEO 최적화 현황

### ✅ 적용된 최적화

| 항목 | 상태 | 설명 |
|------|------|------|
| robots.txt | ✅ | 검색 엔진 크롤링 허용 |
| sitemap.xml | ✅ | 사이트 구조 제공 |
| 메타 title | ✅ | "미스터홈클린 - 입주청소, 이사청소, 사무실청소 전문" |
| 메타 description | ✅ | 서비스 설명 + CTA 포함 |
| 메타 keywords | ✅ | 주요 키워드 11개 포함 |
| Open Graph | ✅ | SNS 공유 시 최적화 |
| Twitter Card | ✅ | 트위터 공유 최적화 |
| JSON-LD | ✅ | 구조화된 데이터 (LocalBusiness) |
| Canonical URL | ✅ | 중복 콘텐츠 방지 |
| 한국어 설정 | ✅ | lang="ko" 적용 |

### 🎯 타겟 키워드

**주요 키워드:**
- 미스터홈클린
- 입주청소
- 이사청소
- 사무실청소

**보조 키워드:**
- 거주청소
- 특수청소
- 외창청소
- 청소업체
- 청소대행
- 전문청소
- 프리미엄청소

## 📝 도메인 등록 후 할 일

도메인 구매 후 다음 파일들을 업데이트해야 합니다:

### 1. robots.txt 수정
```
Sitemap: https://실제도메인.com/sitemap.xml
```

### 2. sitemap.xml 수정
모든 `YOUR_DOMAIN.com`을 실제 도메인으로 변경

### 3. index.html 수정
- `og:url`
- `og:image`
- `twitter:url`
- `twitter:image`
- `canonical` URL
- JSON-LD의 `url`

### 4. OG 이미지 추가
- `client/public/og-image.png` 파일 추가 (권장 크기: 1200x630px)
- 미스터홈클린 로고 + 대표 이미지 조합 권장

## 🕐 검색 노출 예상 시간

- **네이버**: 등록 후 1-2주 내 색인
- **구글**: 등록 후 1-4주 내 색인

### 노출 가속화 방법
1. 네이버 블로그에 사이트 링크 포함 글 작성
2. 네이버 카페에 사이트 소개
3. 네이버 플레이스 등록 (사업장이 있는 경우)

## 📞 문의

도메인 구매 후 알려주시면 모든 URL을 업데이트해드리겠습니다!

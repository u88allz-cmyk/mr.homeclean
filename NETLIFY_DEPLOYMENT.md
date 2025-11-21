# Netlify 배포 가이드

## 📋 배포 전 준비사항

### 1. GitHub 레포지토리 생성 및 푸시
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

### 2. Aligo SMS API 계정 설정 ⚠️ **필수!**

1. **Aligo 회원가입**: https://smartsms.aligo.in/
2. **발신번호 등록** (가장 중요!):
   - 로그인 → "환경설정" → "발신번호 관리"
   - 사장님 휴대폰 번호(010-9121-1744) 등록
   - 인증 절차 완료 (통화 또는 문자 인증)
   - ⚠️ **주의**: 070 번호는 SMS 수신이 불가능하므로 반드시 010 번호 사용!
3. **API 키 발급받기**:
   - "내정보" → "API KEY" 확인
   - "USER ID" 확인
4. **충전**:
   - SMS 발송 비용 선불 충전 (8.4원/건)
   - 테스트용으로 5,000원 정도 충전 권장

## 🚀 Netlify 배포 방법

### Step 1: Netlify 계정 연동
1. https://www.netlify.com/ 접속 및 로그인 (GitHub 계정 연동 권장)
2. "Add new site" → "Import an existing project" 클릭
3. GitHub 연동 후 미스터홈클린 레포지토리 선택

### Step 2: 빌드 설정
배포 설정은 `netlify.toml` 파일에 모두 정의되어 있으므로 자동으로 인식됩니다.

확인 사항:
- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Functions directory**: `netlify/functions`

### Step 3: 환경 변수 설정 ⚠️ **중요**

Netlify 대시보드에서 다음 환경 변수를 추가해야 합니다:

1. Site settings → Environment variables로 이동
2. "Add a variable" 클릭하여 다음 변수들을 추가:

| 변수명 | 값 | 설명 |
|--------|-----|------|
| `ALIGO_API_KEY` | `your_aligo_api_key` | Aligo에서 발급받은 API 키 |
| `ALIGO_USER_ID` | `your_aligo_user_id` | Aligo 사용자 ID |
| `ALIGO_SENDER` | `01091211744` | 발신번호 (하이픈 제거, Aligo에 등록된 번호) |
| `OWNER_PHONE` | `010-9121-1744` | 사장님 연락처 (SMS 수신번호) |
| `NODE_ENV` | `production` | 프로덕션 환경 설정 |

### Step 4: 배포 실행
"Deploy site" 버튼 클릭 → 자동 빌드 및 배포 시작

## ⚠️ 중요: 데이터 저장 방식

### Netlify 배포 시 데이터 저장
Netlify Functions는 **서버리스 환경**이므로, 상담 신청 데이터는 **영구 저장되지 않습니다**.

- ✅ **SMS 발송**: 상담 신청 시 사장님 번호로 SMS가 발송됩니다
- ❌ **데이터 저장**: 상담 데이터는 Netlify Functions에 저장되지 않습니다
- 💡 **해결 방법**: 필요 시 PostgreSQL 등 외부 데이터베이스를 연동할 수 있습니다

### 로컬 개발 환경
- Express 서버를 사용하므로 메모리 저장소(MemStorage)에 데이터가 임시 저장됩니다
- 서버 재시작 시 데이터는 사라집니다

## 🔍 배포 후 확인사항

### 1. 사이트 접속 확인
- Netlify에서 제공하는 URL로 접속 (예: `https://your-site-name.netlify.app`)
- 모든 섹션이 정상적으로 표시되는지 확인

### 2. 상담 신청 테스트
1. 웹사이트에서 "상담문의" 버튼 클릭
2. 상담 신청 폼 작성 및 제출
3. **사장님 번호(010-9121-1744)로 SMS 수신 확인** ← 가장 중요!

### 3. Netlify Functions 로그 확인
- Netlify 대시보드 → Functions → consultations 클릭
- 함수 실행 로그 및 에러 확인

## 🔧 문제 해결

### SMS가 발송되지 않는 경우
1. **발신번호 확인** (가장 흔한 문제):
   - 010-9121-1744가 Aligo에 등록 및 **인증**되었는지 확인
   - 인증 상태: Aligo 로그인 → "발신번호 관리"에서 "인증완료" 상태 확인
2. **환경 변수 확인**: 
   - Netlify 환경 변수가 올바르게 설정되었는지 확인
   - `ALIGO_SENDER`는 하이픈 없이: `01091211744`
   - `OWNER_PHONE`는 하이픈 포함: `010-9121-1744`
3. **Aligo 잔액 확인**: Aligo 계정 잔액이 충분한지 확인
4. **Functions 로그 확인**: Netlify Functions 로그에서 에러 메시지 확인
5. **테스트 모드 확인**: 
   - 개발 환경에서는 `testmode_yn="Y"`로 설정되어 실제 발송 안 됨
   - 프로덕션에서는 `NODE_ENV=production`으로 설정 필요

### 404 에러 발생 시
- `netlify.toml`의 리다이렉트 설정 확인
- Netlify에서 자동으로 SPA 리다이렉트 처리됨

### 빌드 실패 시
1. Node.js 버전 확인 (20.x 사용)
2. 로컬에서 `npm run build` 실행하여 빌드 에러 확인
3. Netlify 빌드 로그에서 에러 메시지 확인

## 📱 커스텀 도메인 설정 (선택사항)

1. Netlify 대시보드 → Domain settings
2. "Add custom domain" 클릭
3. 소유한 도메인 입력 (예: misterhomeclean.com)
4. DNS 설정 업데이트 (네임서버 또는 CNAME 레코드)

## 🔄 자동 배포 설정

GitHub와 연동하면 자동 배포가 설정됩니다:
- `main` 브랜치에 푸시할 때마다 자동 배포
- Pull Request 생성 시 미리보기 배포

## 💰 비용 안내

### Netlify 무료 플랜 제한
- 월 300분 빌드 시간
- 월 100GB 대역폭
- Serverless Functions: 월 125,000 요청, 실행 시간 100시간

### Aligo SMS 비용
- SMS(단문): 8.4원/건
- 테스트 모드: 무료 (실제 발송 안됨)
- 충전 방식: 선불 충전 후 사용

## 📞 지원

문제 발생 시:
- Netlify 지원: https://www.netlify.com/support/
- Aligo 고객센터: 1661-9889

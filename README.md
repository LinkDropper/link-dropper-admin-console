# 링크 드라퍼 관리자 콘솔 (Link Dropper Admin Console)

링크 드라퍼 서비스의 내부 운영을 위한 관리자 콘솔입니다. 운영자가 사용자, 링크, 폴더, 신고, 결제 등을 효율적으로 관리할 수 있도록 설계된 웹 애플리케이션입니다.

## ✨ 주요 기능

- **📊 대시보드**: 실시간 서비스 지표 및 현황
- **👥 사용자 관리**: 계정 상태, 활동 로그, 권한 관리
- **🔗 링크 관리**: 링크 검토, 상태 변경, 신고 처리
- **📁 폴더 관리**: 폴더 상태 관리 및 일괄 처리
- **🛡️ 신고 관리**: 정책 위반 검토 및 조치
- **💳 결제 관리**: 구독 및 환불 처리
- **📋 운영 로그**: 모든 관리 활동 추적

## 🎨 UI/UX 개선사항

### 색상 시스템
- **브랜드 컬러**: #0000ee (PRD 요구사항 반영)
- **의미적 상태 컬러**: 성공, 위험, 경고, 정보를 명확히 구분
- **계층적 배경**: Primary, Secondary, Tertiary로 정보 구조화
- **다크모드 지원**: 운영자 눈의 피로감 최소화

### 타이포그래피
- **폰트**: Pretendard + Inter 조합으로 한글/영문 최적화
- **정보 밀도**: 운영툴에 맞는 폰트 크기 체계
- **가독성**: 줄 높이, 글자 간격 최적화

### 레이아웃
- **사이드바**: 접기/펼치기 지원, 상태 시각화
- **메인 콘텐츠**: 최대 활용 가능한 공간 설계
- **카드 시스템**: 정보 그룹화 및 시각적 계층 구조

### 컴포넌트
- **통계 카드**: 대형 숫자 표시, 변화율 시각화
- **활동 피드**: 실시간 업데이트, 스크롤 최적화
- **드롭다운**: 부드러운 애니메이션, 접근성 향상

### 반응형 디자인
- **모바일 최적화**: 태블릿/모바일 환경 지원
- **유연한 그리드**: 화면 크기에 따른 레이아웃 조정
- **터치 친화적**: 버튼 크기 및 간격 최적화

---

This project is built with [Next.js](https://nextjs.org) and optimized for administrative operations.

## 🔧 환경설정

### OAuth 설정

로그인 기능을 위해 `.env.local` 파일에 다음 환경변수를 설정하세요:

```bash
# 카카오 OAuth
NEXT_PUBLIC_KAKAO_CLIENT_ID=your_kakao_rest_api_key
KAKAO_CLIENT_SECRET=your_kakao_client_secret

# 구글 OAuth  
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_client_secret

# JWT
JWT_SECRET=your_jwt_secret_key
```

- **카카오**: [카카오 개발자 콘솔](https://developers.kakao.com/)에서 앱 생성 후 REST API 키 사용
- **구글**: [구글 클라우드 콘솔](https://console.cloud.google.com/)에서 OAuth 2.0 클라이언트 ID 생성

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

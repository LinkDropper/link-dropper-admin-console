# 📄 프론트엔드 개발명세서 – 링크 드라퍼 내부 운영툴

## 목차
1. [프로젝트 개요](#1-프로젝트-개요)
2. [기술 스택](#2-기술-스택)
3. [프로젝트 구조](#3-프로젝트-구조)
4. [컴포넌트 아키텍처](#4-컴포넌트-아키텍처)
5. [화면별 상세 명세](#5-화면별-상세-명세)
6. [API 연동 가이드](#6-api-연동-가이드)
7. [상태 관리](#7-상태-관리)
8. [스타일링 가이드](#8-스타일링-가이드)
9. [인증 및 권한 관리](#9-인증-및-권한-관리)
10. [성능 최적화](#10-성능-최적화)
11. [배포 설정](#11-배포-설정)
12. [개발 체크리스트](#12-개발-체크리스트)

---

## 1. 프로젝트 개요

### 1.1 프로젝트명
링크 드라퍼 내부 운영툴 (Link Dropper Admin Console)

### 1.2 기술적 목표
- 반응형 웹 어플리케이션으로 PC/태블릿 환경 최적화
- 실시간 데이터 업데이트 및 시각화
- 직관적이고 효율적인 관리자 UX/UI 제공
- 대량 데이터 처리를 위한 성능 최적화
- 안전한 인증 및 권한 관리 시스템

### 1.3 브랜드 아이덴티티
- **주 색상**: `#0000ee` (서비스 정체성 컬러)
- **보조 색상**: `#f8f9fa`, `#6c757d`, `#dc3545`, `#28a745`
- **폰트**: Inter, system-ui 기반
- **아이콘**: Lucide React 사용

---

## 2. 기술 스택

### 2.1 Core Framework
- **Next.js 14** (App Router)
- **TypeScript 5.x**
- **React 18**

### 2.2 UI/UX Framework
- **shadcn/ui** (Radix UI 기반 컴포넌트)
- **Tailwind CSS** (유틸리티 클래스)
- **CSS Modules** (컴포넌트별 스타일)

### 2.3 상태 관리
- **Zustand** (전역 상태 관리)
- **React Query (TanStack Query)** (서버 상태 관리)

### 2.4 데이터 시각화
- **Recharts** (차트 라이브러리)
- **React Table (TanStack Table)** (테이블 관리)

### 2.5 개발 도구
- **ESLint** + **Prettier** (코드 품질)
- **Husky** + **lint-staged** (Git hooks)
- **Jest** + **React Testing Library** (테스트)

### 2.6 기타 라이브러리
- **axios** (HTTP 클라이언트)
- **date-fns** (날짜 처리)
- **react-hook-form** (폼 관리)
- **zod** (스키마 검증)

---

## 3. 프로젝트 구조

```
link-dropper-admin-console/
├── public/
│   ├── icons/
│   └── images/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── (auth)/         # 인증 관련 라우트
│   │   ├── dashboard/      # 대시보드
│   │   ├── users/          # 사용자 관리
│   │   ├── links/          # 링크 관리
│   │   ├── folders/        # 폴더 관리
│   │   ├── reports/        # 신고 관리
│   │   ├── payments/       # 결제 관리
│   │   ├── logs/           # 운영 로그
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/         # 공통 컴포넌트
│   │   ├── ui/            # shadcn/ui 컴포넌트
│   │   ├── layout/        # 레이아웃 컴포넌트
│   │   ├── charts/        # 차트 컴포넌트
│   │   ├── tables/        # 테이블 컴포넌트
│   │   └── forms/         # 폼 컴포넌트
│   ├── lib/               # 유틸리티 함수
│   │   ├── api.ts         # API 클라이언트
│   │   ├── auth.ts        # 인증 로직
│   │   ├── utils.ts       # 공통 유틸
│   │   └── validations.ts # 스키마 검증
│   ├── hooks/             # 커스텀 훅
│   ├── store/             # 상태 관리
│   ├── types/             # TypeScript 타입 정의
│   └── styles/            # 글로벌 스타일
├── package.json
├── tailwind.config.js
├── next.config.js
└── tsconfig.json
```

---

## 4. 컴포넌트 아키텍처

### 4.1 레이아웃 컴포넌트

#### MainLayout
```tsx
// components/layout/MainLayout.tsx
- TopNavigation (상단 네비게이션)
- Sidebar (좌측 사이드바)
- MainContent (메인 콘텐츠 영역)
- Footer (하단 푸터)
```

#### TopNavigation
```tsx
// components/layout/TopNavigation.tsx
- Logo
- NavigationMenu
- UserDropdown
- NotificationBell
- ThemeToggle
```

#### Sidebar
```tsx
// components/layout/Sidebar.tsx
- NavigationLinks
- FilterPanel (페이지별 필터)
- CollapseToggle
```

### 4.2 공통 UI 컴포넌트

#### DataTable
```tsx
// components/tables/DataTable.tsx
- 페이지네이션
- 정렬 기능
- 필터링
- 검색
- 액션 버튼
- 대량 선택
```

#### StatCard
```tsx
// components/charts/StatCard.tsx
- 지표 표시
- 전일 대비 변화율
- 아이콘
- 링크 연결
```

#### Chart Components
```tsx
// components/charts/
- LineChart (꺾은선 차트)
- BarChart (막대 차트)
- PieChart (원형 차트)
- AreaChart (영역 차트)
```

---

## 5. 화면별 상세 명세

### 5.1 대시보드 (`/dashboard`)

#### 5.1.1 레이아웃
- **상단**: 주요 지표 카드 (4개 행)
- **중단**: 차트 영역 (2x2 그리드)
- **하단**: 최근 활동 로그 테이블

#### 5.1.2 주요 지표 카드
```tsx
// 표시 지표
1. 총 가입자 수 (전일 대비 증감)
2. 활성 사용자 수 (DAU/MAU)
3. 총 링크 수 (신규 등록 수)
4. 총 폴더 수 (최근 생성 수)
5. 결제 매출 (월/일 단위)
6. 신고/차단 현황
```

#### 5.1.3 차트 영역
```tsx
// 차트 구성
1. 사용자 활동 추이 (LineChart)
2. 링크 등록 현황 (BarChart)
3. 매출 분석 (AreaChart)
4. 신고 유형별 분포 (PieChart)
```

#### 5.1.4 파일 구조
```
app/dashboard/
├── page.tsx
├── components/
│   ├── DashboardStats.tsx
│   ├── DashboardCharts.tsx
│   └── RecentActivity.tsx
└── dashboard.module.css
```

### 5.2 사용자 관리 (`/users`)

#### 5.2.1 기능 구성
- **검색 필터**: 이메일, 닉네임, 사용자 ID, 가입일, 상태
- **테이블 컬럼**: ID, 이메일, 닉네임, 가입일, 마지막 접속, 상태, 액션
- **상세 모달**: 사용자 정보 + 활동 로그 + 관련 데이터

#### 5.2.2 액션 기능
```tsx
// 가능한 액션
1. 사용자 상세 보기
2. 계정 상태 변경 (활성/정지/탈퇴)
3. 사용자 링크/폴더 조회
4. 결제 내역 조회
5. 활동 로그 조회
```

#### 5.2.3 파일 구조
```
app/users/
├── page.tsx
├── [id]/
│   └── page.tsx
├── components/
│   ├── UserTable.tsx
│   ├── UserFilter.tsx
│   ├── UserDetail.tsx
│   └── UserActions.tsx
└── users.module.css
```

### 5.3 링크 관리 (`/links`)

#### 5.3.1 기능 구성
- **검색 필터**: URL, 제목, 소유자, 등록일, 상태, 신고 여부
- **테이블 컬럼**: 썸네일, 제목, URL, 소유자, 등록일, 상태, 신고수, 액션
- **상세 모달**: 링크 메타데이터 + 신고 내역

#### 5.3.2 액션 기능
```tsx
// 가능한 액션
1. 링크 상태 변경 (정상/차단)
2. 메타데이터 수정
3. 신고 내역 조회
4. 소유자 정보 조회
5. 폴더 정보 조회
```

### 5.4 폴더 관리 (`/folders`)

#### 5.4.1 기능 구성
- **검색 필터**: 폴더명, 소유자, 생성일, 상태, 공개여부
- **테이블 컬럼**: 폴더명, 소유자, 링크수, 생성일, 상태, 공개여부, 액션
- **상세 모달**: 폴더 정보 + 포함된 링크 목록

### 5.5 신고/정책 위반 관리 (`/reports`)

#### 5.5.1 기능 구성
- **검색 필터**: 신고 사유, 신고자, 대상 유형, 처리 상태, 신고일
- **테이블 컬럼**: 신고 대상, 신고 사유, 신고자, 신고일, 처리 상태, 액션
- **상세 모달**: 신고 상세 내용 + 처리 기록

#### 5.5.2 처리 액션
```tsx
// 처리 옵션
1. 무혐의 처리
2. 경고 조치
3. 콘텐츠 삭제
4. 사용자 제재
5. 차단 처리
```

### 5.6 결제/구독 관리 (`/payments`)

#### 5.6.1 기능 구성
- **검색 필터**: 사용자, 결제일, 금액 범위, 결제 수단, 상태
- **테이블 컬럼**: 사용자, 상품, 금액, 결제일, 결제 수단, 상태, 액션
- **상세 모달**: 결제 상세 + 환불 내역

### 5.7 운영 로그 (`/logs`)

#### 5.7.1 기능 구성
- **검색 필터**: 작업 유형, 담당자, 기간, 대상
- **테이블 컬럼**: 시간, 담당자, 작업 유형, 대상, 변경 내용, IP
- **내보내기**: CSV 다운로드

---

## 6. API 연동 가이드

### 6.1 API 클라이언트 설정

```typescript
// lib/api.ts
import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
});

// 요청 인터셉터
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 응답 인터셉터
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // 토큰 만료 처리
      localStorage.removeItem('adminToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

### 6.2 API 엔드포인트 정의

```typescript
// lib/api.ts
export const API_ENDPOINTS = {
  // 인증
  auth: {
    login: '/auth/admin/login',
    logout: '/auth/admin/logout',
    refresh: '/auth/admin/refresh',
    profile: '/auth/admin/profile',
  },
  
  // 대시보드
  dashboard: {
    stats: '/admin/dashboard/stats',
    charts: '/admin/dashboard/charts',
    activities: '/admin/dashboard/activities',
  },
  
  // 사용자 관리
  users: {
    list: '/admin/users',
    detail: (id: string) => `/admin/users/${id}`,
    update: (id: string) => `/admin/users/${id}`,
    activities: (id: string) => `/admin/users/${id}/activities`,
  },
  
  // 링크 관리
  links: {
    list: '/admin/links',
    detail: (id: string) => `/admin/links/${id}`,
    update: (id: string) => `/admin/links/${id}`,
    reports: (id: string) => `/admin/links/${id}/reports`,
  },
  
  // 폴더 관리
  folders: {
    list: '/admin/folders',
    detail: (id: string) => `/admin/folders/${id}`,
    update: (id: string) => `/admin/folders/${id}`,
    links: (id: string) => `/admin/folders/${id}/links`,
  },
  
  // 신고 관리
  reports: {
    list: '/admin/reports',
    detail: (id: string) => `/admin/reports/${id}`,
    process: (id: string) => `/admin/reports/${id}/process`,
  },
  
  // 결제 관리
  payments: {
    list: '/admin/payments',
    detail: (id: string) => `/admin/payments/${id}`,
    refund: (id: string) => `/admin/payments/${id}/refund`,
  },
  
  // 운영 로그
  logs: {
    list: '/admin/logs',
    export: '/admin/logs/export',
  },
};
```

### 6.3 React Query 훅

```typescript
// hooks/useApi.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// 대시보드 통계
export const useDashboardStats = () => {
  return useQuery({
    queryKey: ['dashboard', 'stats'],
    queryFn: () => apiClient.get(API_ENDPOINTS.dashboard.stats),
    refetchInterval: 30000, // 30초마다 갱신
  });
};

// 사용자 목록
export const useUsers = (params: UserListParams) => {
  return useQuery({
    queryKey: ['users', params],
    queryFn: () => apiClient.get(API_ENDPOINTS.users.list, { params }),
  });
};

// 사용자 상태 변경
export const useUpdateUserStatus = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      apiClient.patch(API_ENDPOINTS.users.update(id), { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};
```

---

## 7. 상태 관리

### 7.1 Zustand 스토어 구조

```typescript
// store/authStore.ts
interface AuthState {
  user: AdminUser | null;
  token: string | null;
  isAuthenticated: boolean;
  permissions: string[];
  login: (token: string, user: AdminUser) => void;
  logout: () => void;
  checkPermission: (permission: string) => boolean;
}

// store/uiStore.ts
interface UIState {
  sidebarCollapsed: boolean;
  theme: 'light' | 'dark';
  notifications: Notification[];
  toggleSidebar: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
  addNotification: (notification: Notification) => void;
  removeNotification: (id: string) => void;
}

// store/filterStore.ts
interface FilterState {
  userFilters: UserFilters;
  linkFilters: LinkFilters;
  folderFilters: FolderFilters;
  reportFilters: ReportFilters;
  paymentFilters: PaymentFilters;
  logFilters: LogFilters;
  setUserFilters: (filters: UserFilters) => void;
  // ... 기타 setter 함수들
}
```

---

## 8. 스타일링 가이드

### 8.1 Tailwind CSS 설정

```javascript
// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0000ee',
        secondary: '#6c757d',
        success: '#28a745',
        danger: '#dc3545',
        warning: '#ffc107',
        info: '#17a2b8',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
```

### 8.2 CSS Modules 패턴

```css
/* components/layout/MainLayout.module.css */
.container {
  @apply min-h-screen bg-gray-50;
}

.header {
  @apply sticky top-0 z-50 bg-white border-b border-gray-200;
}

.sidebar {
  @apply fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200;
  transition: transform 0.3s ease-in-out;
}

.sidebarCollapsed {
  @apply -translate-x-full lg:translate-x-0 lg:w-16;
}

.content {
  @apply flex-1 lg:ml-64 p-6;
}

.contentCollapsed {
  @apply lg:ml-16;
}
```

### 8.3 반응형 브레이크포인트

```css
/* 브레이크포인트 가이드 */
/* sm: 640px ~ */
/* md: 768px ~ */
/* lg: 1024px ~ */
/* xl: 1280px ~ */
/* 2xl: 1536px ~ */

/* 예시: 테이블 반응형 */
.table {
  @apply w-full border-collapse;
}

.tableResponsive {
  @apply block lg:table overflow-x-auto whitespace-nowrap;
}

.tableRow {
  @apply block lg:table-row border-b border-gray-200;
}

.tableCell {
  @apply block lg:table-cell px-4 py-2 text-sm;
}

@media (max-width: 1023px) {
  .tableCell::before {
    content: attr(data-label) ': ';
    @apply font-semibold;
  }
}
```

---

## 9. 인증 및 권한 관리

### 9.1 인증 플로우

```typescript
// lib/auth.ts
interface AuthConfig {
  tokenKey: string;
  refreshTokenKey: string;
  loginUrl: string;
  dashboardUrl: string;
}

export class AuthManager {
  private config: AuthConfig;
  
  constructor(config: AuthConfig) {
    this.config = config;
  }
  
  async login(email: string, password: string): Promise<AuthResult> {
    const response = await apiClient.post('/auth/admin/login', {
      email,
      password,
    });
    
    const { token, refreshToken, user } = response.data;
    
    localStorage.setItem(this.config.tokenKey, token);
    localStorage.setItem(this.config.refreshTokenKey, refreshToken);
    
    return { token, user };
  }
  
  async refreshToken(): Promise<string> {
    const refreshToken = localStorage.getItem(this.config.refreshTokenKey);
    if (!refreshToken) throw new Error('No refresh token');
    
    const response = await apiClient.post('/auth/admin/refresh', {
      refreshToken,
    });
    
    const { token } = response.data;
    localStorage.setItem(this.config.tokenKey, token);
    
    return token;
  }
  
  logout(): void {
    localStorage.removeItem(this.config.tokenKey);
    localStorage.removeItem(this.config.refreshTokenKey);
    window.location.href = this.config.loginUrl;
  }
}
```

### 9.2 권한 기반 접근 제어

```typescript
// components/auth/PermissionGuard.tsx
interface PermissionGuardProps {
  permission: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const PermissionGuard: React.FC<PermissionGuardProps> = ({
  permission,
  children,
  fallback = null,
}) => {
  const { checkPermission } = useAuthStore();
  
  if (!checkPermission(permission)) {
    return <>{fallback}</>;
  }
  
  return <>{children}</>;
};

// 사용 예시
<PermissionGuard permission="users.update">
  <Button onClick={handleUpdateUser}>사용자 정보 수정</Button>
</PermissionGuard>
```

### 9.3 라우트 보호

```typescript
// app/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('adminToken');
  const isAuthPage = request.nextUrl.pathname.startsWith('/login');
  
  if (!token && !isAuthPage) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
```

---

## 10. 성능 최적화

### 10.1 코드 분할

```typescript
// 동적 임포트를 통한 코드 분할
const UserDetail = dynamic(() => import('./components/UserDetail'), {
  loading: () => <Skeleton className="h-96" />,
});

const DashboardCharts = dynamic(() => import('./components/DashboardCharts'), {
  ssr: false, // 클라이언트 사이드에서만 렌더링
});
```

### 10.2 이미지 최적화

```typescript
// next/image 사용
import Image from 'next/image';

<Image
  src={user.avatar}
  alt={user.name}
  width={40}
  height={40}
  className="rounded-full"
  priority={index < 10} // 상위 10개 이미지는 우선 로딩
/>
```

### 10.3 테이블 가상화

```typescript
// 대량 데이터 테이블 가상화
import { useVirtualizer } from '@tanstack/react-virtual';

const TableVirtualized: React.FC<{ data: any[] }> = ({ data }) => {
  const parentRef = useRef<HTMLDivElement>(null);
  
  const virtualizer = useVirtualizer({
    count: data.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50,
  });
  
  return (
    <div ref={parentRef} className="h-96 overflow-auto">
      <div style={{ height: virtualizer.getTotalSize() }}>
        {virtualizer.getVirtualItems().map((virtualItem) => (
          <div
            key={virtualItem.key}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: virtualItem.size,
              transform: `translateY(${virtualItem.start}px)`,
            }}
          >
            <TableRow data={data[virtualItem.index]} />
          </div>
        ))}
      </div>
    </div>
  );
};
```

---

## 11. 배포 설정

### 11.1 환경 변수

```bash
# .env.local
NEXT_PUBLIC_API_URL=https://api.linkdropper.com
NEXT_PUBLIC_APP_ENV=development
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
```

```bash
# .env.production
NEXT_PUBLIC_API_URL=https://api.linkdropper.com
NEXT_PUBLIC_APP_ENV=production
NEXTAUTH_SECRET=production-secret-key
NEXTAUTH_URL=https://admin.linkdropper.com
```

### 11.2 Next.js 설정

```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['api.linkdropper.com', 'cdn.linkdropper.com'],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL}/api/:path*`,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
```

---

## 12. 개발 체크리스트

### 12.1 프로젝트 설정 (1일차)
- [ ] Next.js 14 프로젝트 초기화
- [ ] TypeScript 설정
- [ ] Tailwind CSS + shadcn/ui 설치 및 설정
- [ ] ESLint + Prettier 설정
- [ ] 프로젝트 폴더 구조 생성
- [ ] Git 저장소 설정 및 Husky 설정

### 12.2 기본 레이아웃 및 컴포넌트 (2-3일차)
- [ ] MainLayout 컴포넌트 구현
- [ ] TopNavigation 컴포넌트 구현
- [ ] Sidebar 컴포넌트 구현
- [ ] 라우팅 구조 설정
- [ ] 기본 페이지 템플릿 생성
- [ ] 반응형 레이아웃 테스트

### 12.3 인증 시스템 (4일차)
- [ ] 로그인 페이지 구현
- [ ] AuthManager 클래스 구현
- [ ] 인증 상태 관리 (Zustand)
- [ ] 라우트 보호 미들웨어 구현
- [ ] 권한 기반 컴포넌트 가드 구현
- [ ] 토큰 자동 갱신 로직 구현

### 12.4 API 연동 기반 구축 (5일차)
- [ ] Axios 클라이언트 설정
- [ ] API 엔드포인트 정의
- [ ] React Query 설정
- [ ] 공통 API 훅 구현
- [ ] 에러 처리 및 로딩 상태 관리
- [ ] API 응답 타입 정의

### 12.5 대시보드 구현 (6-7일차)
- [ ] 대시보드 메인 페이지 레이아웃
- [ ] StatCard 컴포넌트 구현
- [ ] Recharts 차트 컴포넌트 구현
  - [ ] LineChart (사용자 활동 추이)
  - [ ] BarChart (링크 등록 현황)
  - [ ] AreaChart (매출 분석)
  - [ ] PieChart (신고 유형별 분포)
- [ ] 최근 활동 로그 테이블
- [ ] 실시간 데이터 업데이트
- [ ] 대시보드 반응형 최적화

### 12.6 사용자 관리 페이지 (8-9일차)
- [ ] 사용자 목록 페이지 레이아웃
- [ ] UserFilter 컴포넌트 구현
- [ ] UserTable 컴포넌트 구현
- [ ] 페이지네이션 구현
- [ ] 사용자 상세 모달 구현
- [ ] 사용자 상태 변경 기능
- [ ] 사용자 검색 및 필터링
- [ ] 사용자 활동 로그 조회
- [ ] 관련 데이터 조회 (링크/폴더/결제)

### 12.7 링크 관리 페이지 (10-11일차)
- [ ] 링크 목록 페이지 레이아웃
- [ ] LinkFilter 컴포넌트 구현
- [ ] LinkTable 컴포넌트 구현
- [ ] 링크 썸네일 표시
- [ ] 링크 상세 모달 구현
- [ ] 링크 상태 변경 기능
- [ ] 메타데이터 수정 기능
- [ ] 신고 내역 조회
- [ ] 링크 검색 및 필터링

### 12.8 폴더 관리 페이지 (12일차)
- [ ] 폴더 목록 페이지 레이아웃
- [ ] FolderFilter 컴포넌트 구현
- [ ] FolderTable 컴포넌트 구현
- [ ] 폴더 상세 모달 구현
- [ ] 폴더 상태 변경 기능
- [ ] 폴더 내 링크 조회
- [ ] 폴더 검색 및 필터링

### 12.9 신고 관리 페이지 (13-14일차)
- [ ] 신고 목록 페이지 레이아웃
- [ ] ReportFilter 컴포넌트 구현
- [ ] ReportTable 컴포넌트 구현
- [ ] 신고 상세 모달 구현
- [ ] 신고 처리 액션 구현
  - [ ] 무혐의 처리
  - [ ] 경고 조치
  - [ ] 콘텐츠 삭제
  - [ ] 사용자 제재
  - [ ] 차단 처리
- [ ] 신고 검색 및 필터링
- [ ] 처리 상태 관리

### 12.10 결제 관리 페이지 (15일차)
- [ ] 결제 목록 페이지 레이아웃
- [ ] PaymentFilter 컴포넌트 구현
- [ ] PaymentTable 컴포넌트 구현
- [ ] 결제 상세 모달 구현
- [ ] 환불 처리 기능
- [ ] 구독 상태 관리
- [ ] 결제 검색 및 필터링

### 12.11 운영 로그 페이지 (16일차)
- [ ] 로그 목록 페이지 레이아웃
- [ ] LogFilter 컴포넌트 구현
- [ ] LogTable 컴포넌트 구현
- [ ] 로그 검색 및 필터링
- [ ] CSV 내보내기 기능
- [ ] 로그 상세 보기

### 12.12 공통 컴포넌트 완성 (17일차)
- [ ] DataTable 컴포넌트 최적화
- [ ] 페이지네이션 컴포넌트
- [ ] 검색 컴포넌트
- [ ] 필터 컴포넌트
- [ ] 모달 컴포넌트
- [ ] 알림 시스템
- [ ] 로딩 상태 컴포넌트

### 12.13 성능 최적화 (18일차)
- [ ] 코드 분할 적용
- [ ] 이미지 최적화
- [ ] 테이블 가상화 (대량 데이터)
- [ ] 메모이제이션 적용
- [ ] 번들 크기 최적화
- [ ] 렌더링 성능 측정 및 개선

### 12.14 테스트 작성 (19일차)
- [ ] 컴포넌트 단위 테스트
- [ ] API 훅 테스트
- [ ] 통합 테스트
- [ ] E2E 테스트 (주요 플로우)
- [ ] 접근성 테스트
- [ ] 성능 테스트

### 12.15 배포 준비 (20일차)
- [ ] 환경별 설정 파일 작성
- [ ] 빌드 최적화
- [ ] Docker 설정 (필요시)
- [ ] CI/CD 파이프라인 설정
- [ ] 환경별 배포 테스트
- [ ] 프로덕션 배포 및 모니터링 설정

### 12.16 문서화 및 마무리 (21일차)
- [ ] 컴포넌트 문서화 (Storybook)
- [ ] API 문서 연동
- [ ] 사용자 가이드 작성
- [ ] 코드 리뷰 및 리팩토링
- [ ] 최종 테스트 및 QA
- [ ] 운영 가이드 작성

### 12.17 추가 기능 및 개선사항
- [ ] 다크 모드 지원
- [ ] 국제화 (i18n) 지원
- [ ] 실시간 알림 (WebSocket)
- [ ] 고급 필터링 옵션
- [ ] 데이터 내보내기 (Excel, PDF)
- [ ] 대시보드 커스터마이징
- [ ] 모바일 반응형 개선
- [ ] 접근성 (a11y) 개선

---

## 13. 주요 고려사항

### 13.1 보안
- XSS 방지를 위한 입력값 검증
- CSRF 토큰 사용
- 안전한 토큰 저장 (httpOnly 쿠키)
- 권한별 데이터 접근 제어
- 감사 로그 기록

### 13.2 사용성
- 직관적인 네비게이션
- 빠른 검색 및 필터링
- 일관된 UI/UX 패턴
- 접근성 준수 (WCAG 2.1)
- 키보드 네비게이션 지원

### 13.3 성능
- 서버 사이드 렌더링 활용
- 적절한 캐싱 전략
- 이미지 및 에셋 최적화
- 코드 분할 및 레이지 로딩
- API 응답 최적화

### 13.4 유지보수성
- 컴포넌트 재사용성
- 타입 안정성 (TypeScript)
- 테스트 커버리지
- 명확한 폴더 구조
- 문서화

---

이 개발명세서는 링크 드라퍼 내부 운영툴의 프론트엔드 개발을 위한 상세한 가이드입니다. 각 단계별로 체크리스트를 완료하면서 진행하시기 바랍니다.

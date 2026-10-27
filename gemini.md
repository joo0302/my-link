# MyLink — Gemini 컨텍스트 파일

> 이 파일은 Antigravity(AI 코딩 어시스턴트)가 프로젝트를 빠르게 파악하기 위한 요약 문서입니다.
> 상세 기획은 `PRD.md`, 디자인 규격은 `design.md`를 참조하세요.

---

## 프로젝트 개요

- **서비스명**: 마이링크 (MyLink) — Linktree 클론 서비스
- **개발자**: 양민주 (Frontend Developer)
- **현재 단계**: Phase 1 — LocalStorage 기반 모바일 프로필 페이지 (서버 없음)
- **디자인 철학**: shadcn/ui를 엔지니어링 기반으로, 토스 디자인 시스템(TDS)을 시각적 목표로 삼음

---

## 기술 스택

| 항목 | 버전/선택 |
|------|-----------|
| 프레임워크 | Next.js 15 (App Router) |
| 언어 | TypeScript |
| 스타일링 | Tailwind CSS 4 (`globals.css`의 `@theme inline`으로 관리, `tailwind.config.ts` 없음) |
| UI 컴포넌트 | shadcn/ui (new-york 스타일) → `src/components/ui/` |
| 아이콘 | lucide-react |
| 상태 관리 | React useState + 커스텀 훅 (`useMyLinkData`) |
| 스토리지 | `window.localStorage` (key: `mylink_profile_data`) |
| 런타임 | Node.js v24, pnpm |

---

## 폴더 구조

```
src/
├── app/
│   ├── globals.css          # TDS 토큰 정의 (@theme inline), 라이트/다크 변수
│   ├── layout.tsx
│   ├── page.tsx             # 메인 페이지 (모든 컴포넌트 조합)
│   └── api/
│       ├── links/route.ts   # Mock GET /api/links, POST /api/links
│       └── profile/route.ts # Mock GET /api/profile
├── components/
│   ├── ProfileHeader.tsx    # 프로필 카드 (아바타, 이름, 뱃지)
│   ├── SocialBar.tsx        # 소셜 아이콘 바
│   ├── LinkList.tsx         # 링크 목록 + 추가 버튼
│   ├── ContactBottomSheet.tsx # 커피챗 바텀시트 (Sheet 기반)
│   ├── AddLinkDialog.tsx    # 링크 추가 다이얼로그 (Dialog 기반)
│   └── ui/                  # shadcn/ui 컴포넌트 (TDS 커스터마이징)
│       ├── avatar.tsx
│       ├── badge.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── dialog.tsx
│       ├── input.tsx
│       ├── label.tsx
│       └── sheet.tsx
├── data/
│   └── links.json           # 기본 Mock 데이터 (최초 시딩 소스)
├── hooks/
│   └── useMyLinkData.ts     # 데이터 로드/저장/addLink/recordClick 훅
├── lib/
│   ├── mockData.ts          # MOCK_MYLINK_DATA, LOCAL_STORAGE_KEY, createMockApiResponse
│   └── utils.ts             # cn() 유틸
└── types/
    └── link.ts              # LinkItem, UserProfile, SocialLink, MyLinkData, ApiResponse<T>
```

---

## 핵심 데이터 구조 (`src/types/link.ts`)

```typescript
interface LinkItem {
  id: string;
  title: string;
  subtitle: string;
  url: string;
  icon: IconType | string;  // "Portfolio" | "Github" | "Blog" | "Resume" | "Mail" | "Globe" | "Figma" | ...
  tag?: string;
  category?: "featured" | "project" | "career" | "content" | "contact";
  highlight?: boolean;      // true면 토스 블루 배경 강조
  isExternal?: boolean;     // true면 새 탭으로 열기
  isActive?: boolean;
  clicks?: number;
  order?: number;
  createdAt?: string;
}
```

LocalStorage 키: `mylink_profile_data`
LocalStorage 구조: `{ profile: UserProfile, socials: SocialLink[], links: LinkItem[] }`

---

## TDS 디자인 토큰 사용법

### 색상 (globals.css `@theme inline` 정의)
```
라이트 모드 주요 토큰:
  toss-blue-500     → #3182F6 (Primary CTA, 강조)
  toss-blue-50      → #E8F3FF (Brand weak background)
  toss-grey-900     → #191F28 (Primary text)
  toss-grey-50      → #F9FAFB (Page background)
  toss-grey-100     → #F2F4F6 (Secondary surface)
  toss-semantic-red → #F04452 (Error)
  toss-semantic-green → #04B064 (Success)

다크 모드 전용 토큰:
  toss-dark-bg         → #101012
  toss-dark-card       → #202027
  toss-dark-surface    → #1C1C22
  toss-dark-elevated   → #2C2C35
  toss-dark-border     → #32323D
  toss-dark-text       → #FFFFFF
  toss-dark-subtext    → #A6A6B0
  toss-dark-muted      → #6B6B78
```

### 보더 라디우스
```
rounded-tds-xs  → 4px   (뱃지)
rounded-tds-s   → 8px   (태그)
rounded-tds-m   → 12px  (Input, M버튼)
rounded-tds-l   → 14px  (L버튼, 아이콘 컨테이너)
rounded-tds-xl  → 16px  (XL버튼, 카드)
rounded-tds-2xl → 20px  (Dialog)
rounded-tds-full → 999px (Chip, Pill)
```

### 그림자
```
shadow-tds-1 → 메뉴
shadow-tds-2 → 카드
shadow-tds-3 → Dialog
shadow-tds-toast → Toast
shadow-tds-sheet → BottomSheet
```

---

## 컴포넌트 패턴 & 코딩 컨벤션

### 공통 원칙
- **"use client"** 필수 — 모든 컴포넌트는 클라이언트 컴포넌트
- **다크모드**: Tailwind `dark:` prefix 사용. `document.documentElement.classList.add("dark")`로 토글
- **SVG 아이콘**: lucide-react 또는 인라인 SVG (w-4 h-4 / w-5 h-5 기준)
- **cn()**: `tailwind-merge` + `clsx` 래퍼. 조건부 클래스에 항상 사용
- **한국어 주석**: 코드 내 주석은 한국어로 작성

### Button 변형 (button.tsx 커스텀)
```tsx
variant: "default" | "primary" | "secondary" | "danger" | "ghost" | "outline" | "brandWeak"
size:    "default" | "xl" | "l" | "m" | "s" | "sm" | "lg" | "icon"
```

### 토스트 패턴 (page.tsx)
```tsx
const showToast = (message: string) => {
  setToastMessage(message);
  setTimeout(() => setToastMessage(null), 2400);
};
```

### 링크 아이콘 종류 (IconType)
`"Portfolio" | "Github" | "Blog" | "Resume" | "Mail" | "Globe" | "Linkedin" | "Twitter" | "Youtube" | "Figma"`

---

## 개발 서버 실행

```bash
# 프로젝트 루트: e:\myLink_minju\mylink
npm run dev   # http://localhost:3000
```

> ⚠️ `npx shadcn@latest add` 명령이 ajv 모듈 오류로 실패하는 환경입니다.
> 새 shadcn 컴포넌트 추가 시 `src/components/ui/` 에 직접 파일을 작성하세요.
> Radix UI 패키지는 `@radix-ui/react-dialog` 등 이미 설치되어 있습니다.

---

## Phase 1 구현 현황

- [x] LocalStorage 시딩 및 데이터 영속성 (`useMyLinkData`)
- [x] 모바일 프로필 페이지 레이아웃 (max-w-[430px])
- [x] 상단 앱바 (공유 버튼, 다크모드 토글, 토스트)
- [x] 프로필 헤더 (아바타, 뱃지, 이메일 복사)
- [x] 소셜 아이콘 바
- [x] 링크 목록 (하이라이트, 클릭 카운트)
- [x] 커피챗 바텀시트 CTA
- [x] **링크 추가 다이얼로그** (AddLinkDialog)
- [ ] 링크 수정/삭제
- [ ] 드래그 앤 드롭 정렬 (Phase 2)
- [ ] Firebase 연동 (Phase 3)

---

## 주의사항

- `tailwind.config.ts` 파일은 없음 (`.bak`으로 백업됨). Tailwind 설정은 `globals.css`에서만 관리
- `src/data/links.json`은 최초 시딩 소스이므로 직접 수정해도 LocalStorage에 데이터가 이미 있으면 무시됨
- 다크모드는 `localStorage.getItem("theme")`로 관리 (`mylink_profile_data`와 별도 키)

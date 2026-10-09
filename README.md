# 마이링크 (MyLink)

Next.js (App Router), TypeScript, Tailwind CSS 기반의 링크 관리 및 공유 서비스 프로젝트입니다.

## 📁 프로젝트 구조

```text
mylink/
├── src/
│   └── app/
│       ├── globals.css      # 전역 스타일 (Tailwind CSS 적용)
│       ├── layout.tsx       # 공통 루트 레이아웃
│       └── page.tsx         # 메인 홈 페이지
├── .gitignore
├── eslint.config.mjs        # ESLint 설정
├── next-env.d.ts            # Next.js TypeScript 타입 정의
├── next.config.ts           # Next.js 설정
├── package.json             # 패키지 정보 및 의존성
├── postcss.config.mjs       # PostCSS 설정
├── tailwind.config.ts       # Tailwind CSS 설정
└── tsconfig.json            # TypeScript 컴파일러 설정
```

## 🚀 시작하기

패키지 설치 및 로컬 개발 서버 실행:

```bash
# mylink 디렉토리로 이동
cd mylink

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속하여 확인하실 수 있습니다.

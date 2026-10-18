"use client";

import React, { useState, useEffect } from "react";

// TDS (Toss Design System) 사양에 맞춘 정갈한 24px 아이콘 세트 (Lucide 기반 1.75 stroke, round cap)
const TDSIcons = {
  Github: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
      />
    </svg>
  ),
  Blog: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m-6 4h4" />
    </svg>
  ),
  Portfolio: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
      <rect x="2" y="7" width="20" height="14" rx="3" strokeLinecap="round" strokeLinejoin="round" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  ),
  Resume: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" strokeLinecap="round" />
      <line x1="16" y1="17" x2="8" y2="17" strokeLinecap="round" />
      <polyline points="10 9 9 9 8 9" strokeLinecap="round" />
    </svg>
  ),
  Mail: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
      <rect width="20" height="16" x="2" y="4" rx="3" strokeLinecap="round" strokeLinejoin="round" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  ),
  Copy: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
      <rect width="14" height="14" x="8" y="8" rx="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  ),
  Share: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" strokeLinecap="round" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" strokeLinecap="round" />
    </svg>
  ),
  Sun: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="4" />
      <path strokeLinecap="round" d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41m14.14-14.14l-1.41 1.41" />
    </svg>
  ),
  Moon: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  ),
  ChevronRight: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  ),
  Check: () => (
    <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  ),
  Close: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  External: () => (
    <svg className="w-3.5 h-3.5 text-toss-grey-400 dark:text-toss-dark-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6m4-3h6v6m-11 5L21 3" />
    </svg>
  ),
};

// 링크 목록 정의
interface LinkItem {
  id: string;
  title: string;
  subtitle: string;
  tag?: string;
  url: string;
  icon: keyof typeof TDSIcons;
  isExternal: boolean;
  highlight?: boolean;
}

const LINKS: LinkItem[] = [
  {
    id: "portfolio",
    title: "프로젝트 포트폴리오",
    subtitle: "직접 개발한 웹 서비스와 인터랙티브 데모 모음",
    tag: "대표작",
    url: "https://portfolio.example.com",
    icon: "Portfolio",
    isExternal: true,
    highlight: true,
  },
  {
    id: "github",
    title: "GitHub 저장소",
    subtitle: "프로젝트 소스 코드와 오픈소스 기여 활동",
    url: "https://github.com",
    icon: "Github",
    isExternal: true,
  },
  {
    id: "blog",
    title: "기술 블로그",
    subtitle: "개발 트러블슈팅과 아키텍처 고민의 기록",
    tag: "아티클",
    url: "https://velog.io",
    icon: "Blog",
    isExternal: true,
  },
  {
    id: "resume",
    title: "이력서 및 경력기술서",
    subtitle: "기술 역량, 프로젝트 경험, 협업 히스토리",
    url: "https://notion.so",
    icon: "Resume",
    isExternal: true,
  },
  {
    id: "contact",
    title: "커피챗 및 협업 문의",
    subtitle: "가벼운 네트워킹과 기회는 언제나 환영해요",
    url: "mailto:minju@example.com",
    icon: "Mail",
    isExternal: false,
  },
];

// 기술 스택 목록
const TECH_STACKS = [
  { category: "Core", items: ["React", "Next.js", "TypeScript", "JavaScript"] },
  { category: "Styling & UI", items: ["Tailwind CSS", "Design System (TDS)", "Framer Motion"] },
  { category: "Tools & Collaboration", items: ["Git & GitHub", "Figma", "VS Code"] },
];

export default function Home() {
  const [isDark, setIsDark] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isContactSheetOpen, setIsContactSheetOpen] = useState(false);

  useEffect(() => {
    const isDarkMode =
      localStorage.getItem("theme") === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    setIsDark(isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2400);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("minju@example.com");
    showToast("이메일 주소가 복사되었어요");
  };

  const handleShare = async () => {
    const shareData = {
      title: "양민주 | 프론트엔드 개발자",
      text: "사용자 중심의 경험을 만드는 프론트엔드 개발자 양민주의 프로필 링크예요.",
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // 취소 처리
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast("프로필 링크가 복사되었어요");
    }
  };

  return (
    <div className="min-h-screen bg-toss-grey-50 dark:bg-toss-dark-bg text-toss-grey-900 dark:text-toss-dark-text flex flex-col items-center">
      {/* TDS 스타일 정갈한 토스트 알림 */}
      {toastMessage && (
        <div className="fixed top-6 z-50 animate-in fade-in slide-in-from-top-3 duration-200">
          <div className="bg-toss-grey-900 dark:bg-toss-dark-elevated text-white px-4 py-3 rounded-tds-l shadow-tds-toast flex items-center gap-2.5 text-[14px] font-medium border border-white/10">
            <span className="w-5 h-5 rounded-full bg-toss-semantic-green flex items-center justify-center shrink-0">
              <TDSIcons.Check />
            </span>
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* 중앙 단일 모바일 셸 (TDS 420px max-width) */}
      <div className="w-full max-w-[430px] flex flex-col px-4 sm:px-5 pb-32 pt-2">
        {/* 상단 앱바 (TDS TopBar, 56pt) */}
        <header className="h-14 flex items-center justify-between py-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-toss-blue-500" />
            <span className="text-[17px] font-bold tracking-tight text-toss-grey-900 dark:text-white">
              양민주
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleShare}
              aria-label="프로필 공유하기"
              className="w-10 h-10 rounded-full flex items-center justify-center text-toss-grey-600 dark:text-toss-dark-subtext hover:bg-toss-grey-100 dark:hover:bg-toss-dark-surface transition-colors active:scale-95"
            >
              <TDSIcons.Share />
            </button>
            <button
              onClick={toggleTheme}
              aria-label={isDark ? "라이트 모드로 전환" : "다크 모드로 전환"}
              className="w-10 h-10 rounded-full flex items-center justify-center text-toss-grey-600 dark:text-toss-dark-subtext hover:bg-toss-grey-100 dark:hover:bg-toss-dark-surface transition-colors active:scale-95"
            >
              {isDark ? <TDSIcons.Sun /> : <TDSIcons.Moon />}
            </button>
          </div>
        </header>

        {/* 메인 프로필 영역 (TDS 화이트 카드, 24px 라운드) */}
        <section className="bg-white dark:bg-toss-dark-card rounded-tds-3xl p-6 sm:p-7 border border-toss-grey-200/80 dark:border-toss-dark-border shadow-tds-1 mt-2 mb-4">
          <div className="flex flex-col items-center text-center">
            {/* 아바타 영역: 토스 특유의 차분한 원형 아바타 */}
            <div className="relative mb-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-b from-toss-blue-50 to-toss-blue-100 dark:from-toss-dark-elevated dark:to-toss-dark-surface flex items-center justify-center border border-toss-grey-200/60 dark:border-toss-dark-border overflow-hidden">
                <span className="text-2xl font-bold text-toss-blue-500 dark:text-toss-dark-blue select-none">
                  MJ
                </span>
              </div>
              <span className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-toss-semantic-green border-2 border-white dark:border-toss-dark-card flex items-center justify-center" title="대화 가능" />
            </div>

            {/* 타이틀 및 소개 카피 (해요체 가이드라인) */}
            <h1 className="text-[24px] font-bold text-toss-grey-900 dark:text-white tracking-tight leading-snug">
              양민주
            </h1>
            <p className="text-[15px] font-medium text-toss-grey-600 dark:text-toss-dark-subtext mt-1">
              Frontend Developer
            </p>

            {/* 상태 뱃지 풀 필 (TDS chip 스타일) */}
            <div className="mt-3.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-tds-full bg-toss-blue-50 dark:bg-toss-dark-blueWeak text-toss-blue-500 dark:text-toss-dark-blue text-[13px] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-toss-blue-500" />
              <span>새로운 기회와 커피챗을 기다려요</span>
            </div>

            {/* 소개 문구 (TDS 해요체 톤앤매너) */}
            <div className="w-full mt-5 pt-4 border-t border-toss-grey-100 dark:border-toss-dark-border text-left">
              <p className="text-[15px] leading-relaxed text-toss-grey-700 dark:text-toss-dark-subtext break-keep">
                복잡한 비즈니스 로직을 사용자가 직관적으로 이해할 수 있는 정갈한 UI로 풉니다. 세밀한 인터랙션과 완성도 높은 디자인 시스템 구축을 좋아해요.
              </p>
            </div>

            {/* 보조 액션 버튼 (TDS button-secondary 2단) */}
            <div className="w-full grid grid-cols-2 gap-2 mt-5">
              <button
                onClick={copyEmail}
                className="h-10 px-3 rounded-tds-m bg-toss-grey-100 dark:bg-toss-dark-surface hover:bg-toss-grey-200 dark:hover:bg-toss-dark-elevated text-toss-grey-900 dark:text-white text-[14px] font-semibold transition-colors active:scale-[0.98] flex items-center justify-center gap-1.5"
              >
                <TDSIcons.Copy />
                <span>이메일 복사</span>
              </button>
              <button
                onClick={() => setIsContactSheetOpen(true)}
                className="h-10 px-3 rounded-tds-m bg-toss-grey-100 dark:bg-toss-dark-surface hover:bg-toss-grey-200 dark:hover:bg-toss-dark-elevated text-toss-grey-900 dark:text-white text-[14px] font-semibold transition-colors active:scale-[0.98] flex items-center justify-center gap-1.5"
              >
                <TDSIcons.Mail />
                <span>연락처 보기</span>
              </button>
            </div>
          </div>
        </section>

        {/* 숫자 통계 하이라이트 (TDS Tabular Figure 적용) */}
        <section className="bg-white dark:bg-toss-dark-card rounded-tds-2xl p-4 border border-toss-grey-200/80 dark:border-toss-dark-border shadow-tds-1 mb-4">
          <div className="grid grid-cols-3 divide-x divide-toss-grey-200/80 dark:divide-toss-dark-border text-center">
            <div className="px-2 py-1">
              <div className="text-[20px] font-bold text-toss-grey-900 dark:text-white tabular-nums tracking-tight">
                3+<span className="text-[13px] font-medium text-toss-grey-500 ml-0.5">년</span>
              </div>
              <div className="text-[12px] font-medium text-toss-grey-500 dark:text-toss-dark-muted mt-0.5">
                개발 경험
              </div>
            </div>
            <div className="px-2 py-1">
              <div className="text-[20px] font-bold text-toss-blue-500 dark:text-toss-dark-blue tabular-nums tracking-tight">
                12+<span className="text-[13px] font-medium text-toss-grey-500 ml-0.5">개</span>
              </div>
              <div className="text-[12px] font-medium text-toss-grey-500 dark:text-toss-dark-muted mt-0.5">
                완료 프로젝트
              </div>
            </div>
            <div className="px-2 py-1">
              <div className="text-[20px] font-bold text-toss-grey-900 dark:text-white tabular-nums tracking-tight">
                99<span className="text-[13px] font-medium text-toss-grey-500 ml-0.5">%</span>
              </div>
              <div className="text-[12px] font-medium text-toss-grey-500 dark:text-toss-dark-muted mt-0.5">
                만족도
              </div>
            </div>
          </div>
        </section>

        {/* 주요 링크 섹션 (TDS ListRow 패턴) */}
        <section className="space-y-2 mb-4">
          <div className="px-1 py-1 flex items-center justify-between">
            <h2 className="text-[15px] font-bold text-toss-grey-900 dark:text-white">
              바로가기
            </h2>
            <span className="text-[13px] font-medium text-toss-grey-500 dark:text-toss-dark-muted tabular-nums">
              전체 {LINKS.length}개
            </span>
          </div>

          <div className="bg-white dark:bg-toss-dark-card rounded-tds-3xl border border-toss-grey-200/80 dark:border-toss-dark-border shadow-tds-1 overflow-hidden divide-y divide-toss-grey-100 dark:divide-toss-dark-border">
            {LINKS.map((link) => {
              const IconComp = TDSIcons[link.icon] || TDSIcons.Portfolio;
              return (
                <a
                  key={link.id}
                  href={link.url}
                  target={link.isExternal ? "_blank" : undefined}
                  rel={link.isExternal ? "noopener noreferrer" : undefined}
                  className="w-full px-5 py-4 flex items-center justify-between gap-3 text-left hover:bg-toss-grey-50 dark:hover:bg-toss-dark-surface active:bg-toss-grey-100 dark:active:bg-toss-dark-elevated transition-colors duration-150 group"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    {/* TDS 44px 둥근 아이콘 컨테이너 */}
                    <div
                      className={`w-11 h-11 rounded-tds-l flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${
                        link.highlight
                          ? "bg-toss-blue-50 dark:bg-toss-dark-blueWeak text-toss-blue-500 dark:text-toss-dark-blue"
                          : "bg-toss-grey-100 dark:bg-toss-dark-surface text-toss-grey-700 dark:text-toss-dark-subtext"
                      }`}
                    >
                      <IconComp />
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[16px] font-semibold text-toss-grey-900 dark:text-white truncate">
                          {link.title}
                        </span>
                        {link.tag && (
                          <span className="text-[11px] font-bold px-1.5 py-0.5 rounded-tds-xs bg-toss-blue-50 dark:bg-toss-dark-blueWeak text-toss-blue-500 dark:text-toss-dark-blue">
                            {link.tag}
                          </span>
                        )}
                      </div>
                      <p className="text-[13px] text-toss-grey-500 dark:text-toss-dark-muted truncate mt-0.5">
                        {link.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center pl-1 text-toss-grey-400 dark:text-toss-dark-muted group-hover:text-toss-grey-700 dark:group-hover:text-white group-hover:translate-x-0.5 transition-all">
                    {link.isExternal ? <TDSIcons.ChevronRight /> : <TDSIcons.ChevronRight />}
                  </div>
                </a>
              );
            })}
          </div>
        </section>

        {/* 기술 역량 섹션 (TDS 카드 & 정돈된 칩) */}
        <section className="bg-white dark:bg-toss-dark-card rounded-tds-3xl p-5 sm:p-6 border border-toss-grey-200/80 dark:border-toss-dark-border shadow-tds-1 mb-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[16px] font-bold text-toss-grey-900 dark:text-white">
              보유 기술
            </h2>
            <span className="text-[13px] font-medium text-toss-blue-500 dark:text-toss-dark-blue">
              주요 스택
            </span>
          </div>

          <div className="space-y-3.5">
            {TECH_STACKS.map((group) => (
              <div key={group.category}>
                <span className="text-[12px] font-semibold text-toss-grey-500 dark:text-toss-dark-muted mb-2 block">
                  {group.category}
                </span>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 rounded-tds-m bg-toss-grey-100 dark:bg-toss-dark-surface text-toss-grey-800 dark:text-toss-dark-subtext text-[13px] font-medium hover:bg-toss-grey-200 dark:hover:bg-toss-dark-elevated transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 일하는 방식 / 핵심 가치 (TDS 인포 카드) */}
        <section className="bg-white dark:bg-toss-dark-card rounded-tds-3xl p-5 sm:p-6 border border-toss-grey-200/80 dark:border-toss-dark-border shadow-tds-1 mb-6">
          <h2 className="text-[16px] font-bold text-toss-grey-900 dark:text-white mb-3">
            협업할 때 중요하게 생각해요
          </h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-toss-blue-500 mt-2 shrink-0" />
              <p className="text-[14px] text-toss-grey-700 dark:text-toss-dark-subtext leading-relaxed">
                <strong className="text-toss-grey-900 dark:text-white font-semibold">단순하고 명확한 UX:</strong> 불필요한 단계를 줄이고 사용자가 고민하지 않는 동선을 지향해요.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-toss-blue-500 mt-2 shrink-0" />
              <p className="text-[14px] text-toss-grey-700 dark:text-toss-dark-subtext leading-relaxed">
                <strong className="text-toss-grey-900 dark:text-white font-semibold">재사용 가능한 컴포넌트:</strong> 레고 블록처럼 유연하고 일관된 디자인 시스템을 만듭니다.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-toss-blue-500 mt-2 shrink-0" />
              <p className="text-[14px] text-toss-grey-700 dark:text-toss-dark-subtext leading-relaxed">
                <strong className="text-toss-grey-900 dark:text-white font-semibold">열린 소통과 신뢰:</strong> 문제를 빠르게 공유하고 동료의 관점에 귀 기울여 함께 성장해요.
              </p>
            </div>
          </div>
        </section>

        {/* 푸터 영역 */}
        <footer className="text-center py-6 text-toss-grey-500 dark:text-toss-dark-muted text-[12px] space-y-1">
          <p>© 2026 양민주 · Toss Design System 기반 제작</p>
          <p className="text-[11px] text-toss-grey-400 dark:text-toss-dark-divider">
            designed with TDS guidelines
          </p>
        </footer>
      </div>

      {/* TDS 바텀시트 (Bottom Sheet: 연락처 & 커피챗 안내) */}
      {isContactSheetOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          {/* 스크림 (Overlay Scrim) */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-[2px] transition-opacity"
            onClick={() => setIsContactSheetOpen(false)}
          />

          {/* 시트 컨테이너 */}
          <div className="relative w-full max-w-[430px] bg-white dark:bg-toss-dark-card rounded-t-tds-3xl p-6 shadow-tds-sheet z-10 animate-in slide-in-from-bottom duration-250">
            {/* 드래그 핸들 바 */}
            <div className="w-10 h-1 bg-toss-grey-300 dark:bg-toss-dark-border rounded-full mx-auto mb-5" />

            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[18px] font-bold text-toss-grey-900 dark:text-white">
                커피챗 제안하기
              </h3>
              <button
                onClick={() => setIsContactSheetOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-toss-grey-500 hover:bg-toss-grey-100 dark:hover:bg-toss-dark-surface"
              >
                <TDSIcons.Close />
              </button>
            </div>

            <p className="text-[14px] text-toss-grey-600 dark:text-toss-dark-subtext mb-5 leading-relaxed">
              가벼운 커피챗부터 프로젝트 협업, 포지션 제안까지 언제든 편하게 연락 주세요. 보통 24시간 안에 답변드려요.
            </p>

            <div className="space-y-2.5">
              <a
                href="mailto:minju@example.com"
                className="w-full h-12 rounded-tds-l bg-toss-blue-500 hover:bg-toss-blue-600 text-white font-bold text-[15px] flex items-center justify-center gap-2 transition-colors"
              >
                <TDSIcons.Mail />
                <span>메일 앱에서 작성하기</span>
              </a>
              <button
                onClick={() => {
                  copyEmail();
                  setIsContactSheetOpen(false);
                }}
                className="w-full h-12 rounded-tds-l bg-toss-grey-100 dark:bg-toss-dark-surface hover:bg-toss-grey-200 dark:hover:bg-toss-dark-elevated text-toss-grey-900 dark:text-white font-semibold text-[15px] flex items-center justify-center gap-2 transition-colors"
              >
                <TDSIcons.Copy />
                <span>이메일 주소 복사하기</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TDS 화면 최하단 고정 액션바 (BottomCTA: 56pt + 위쪽 보호 그라디언트) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 flex justify-center pointer-events-none">
        <div className="w-full max-w-[430px] px-4 pb-5 pt-6 bg-gradient-to-t from-toss-grey-50 via-toss-grey-50/90 to-transparent dark:from-toss-dark-bg dark:via-toss-dark-bg/90 pointer-events-auto">
          <button
            onClick={() => setIsContactSheetOpen(true)}
            className="w-full h-14 rounded-tds-xl bg-toss-blue-500 hover:bg-toss-blue-600 active:bg-toss-blue-700 text-white font-bold text-[17px] shadow-tds-2 transition-all active:scale-[0.985] flex items-center justify-center gap-2"
          >
            <span>함께 일하기 · 커피챗 제안</span>
          </button>
        </div>
      </div>
    </div>
  );
}

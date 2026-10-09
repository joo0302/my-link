"use client";

import React, { useState, useEffect } from "react";

// 아이콘 컴포넌트 모음 (Lucide 스타일의 인라인 SVG)
const Icons = {
  Github: () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  ),
  Blog: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
  Portfolio: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  Resume: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  Mail: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  Copy: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  ),
  Check: () => (
    <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  ),
  Share: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
    </svg>
  ),
  Sun: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
  Moon: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
  ),
  ArrowUpRight: () => (
    <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  ),
  Sparkles: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  ),
};

// 주요 링크 데이터
interface LinkItem {
  id: string;
  title: string;
  description: string;
  url: string;
  tag?: string;
  badgeColor?: string;
  icon: keyof typeof Icons;
  isExternal: boolean;
}

const LINKS: LinkItem[] = [
  {
    id: "github",
    title: "GitHub Repository",
    description: "진행했던 토이 프로젝트와 잔디 기록, 오픈소스 활동",
    url: "https://github.com",
    tag: "Code",
    badgeColor: "bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200",
    icon: "Github",
    isExternal: true,
  },
  {
    id: "blog",
    title: "기술 블로그 (Tech Blog)",
    description: "배운 지식과 문제 해결(Troubleshooting) 기록 일지",
    url: "https://velog.io",
    tag: "Blog",
    badgeColor: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300",
    icon: "Blog",
    isExternal: true,
  },
  {
    id: "portfolio",
    title: "프로젝트 포트폴리오",
    description: "실제 배포된 웹 서비스와 인터랙티브 컴포넌트 모음",
    url: "https://portfolio.example.com",
    tag: "Featured",
    badgeColor: "bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300",
    icon: "Portfolio",
    isExternal: true,
  },
  {
    id: "resume",
    title: "이력서 & 노션 소개서",
    description: "역량 및 프로젝트 상세 경험과 성장 히스토리",
    url: "https://notion.so",
    tag: "Resume",
    badgeColor: "bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300",
    icon: "Resume",
    isExternal: true,
  },
  {
    id: "contact",
    title: "커피챗 & 협업 문의",
    description: "새로운 기회와 기술 이야기 언제든 편하게 제안해주세요",
    url: "mailto:minju@example.com",
    tag: "Contact",
    badgeColor: "bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300",
    icon: "Mail",
    isExternal: false,
  },
];

// 기술 스택
const TECH_STACK = [
  { name: "React", bg: "hover:border-cyan-400" },
  { name: "Next.js", bg: "hover:border-neutral-400" },
  { name: "TypeScript", bg: "hover:border-blue-400" },
  { name: "JavaScript", bg: "hover:border-yellow-400" },
  { name: "Tailwind CSS", bg: "hover:border-teal-400" },
  { name: "HTML / CSS", bg: "hover:border-orange-400" },
  { name: "Git & GitHub", bg: "hover:border-slate-400" },
  { name: "Figma", bg: "hover:border-purple-400" },
];

export default function Home() {
  const [isDark, setIsDark] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // 시스템 테마 및 저장된 테마 감지
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

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("minju@example.com");
    showToast("✨ 이메일 주소가 클립보드에 복사되었습니다!");
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "양민주 | 프로필 & 링크",
          text: "프론트엔드 개발자 양민주의 프로필 링크입니다.",
          url: window.location.href,
        });
      } catch {
        // 취소 시 무시
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast("🔗 링크가 클립보드에 복사되었습니다!");
    }
  };

  return (
    <main className="min-h-screen relative overflow-hidden bg-slate-50 dark:bg-[#0b0f19] text-slate-800 dark:text-slate-100 transition-colors duration-300 py-12 px-4 sm:px-6">
      {/* 배경 장식 오로라 블러 효과 */}
      <div className="pointer-events-none absolute -top-40 -left-32 w-96 h-96 bg-blue-400/20 dark:bg-blue-600/15 rounded-full blur-3xl animate-pulse" />
      <div className="pointer-events-none absolute top-1/3 -right-32 w-96 h-96 bg-indigo-400/20 dark:bg-purple-600/15 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 left-1/3 w-96 h-96 bg-emerald-400/15 dark:bg-teal-600/10 rounded-full blur-3xl" />

      {/* 토스트 알림 */}
      {toastMessage && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-full bg-slate-900/90 dark:bg-slate-100/95 text-white dark:text-slate-900 text-xs sm:text-sm font-medium shadow-xl backdrop-blur-md flex items-center gap-2 animate-bounce">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 본문 컨테이너 */}
      <div className="relative max-w-lg mx-auto flex flex-col items-center">
        {/* 상단 툴바 (테마 & 공유) */}
        <header className="w-full flex justify-between items-center mb-6 px-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 dark:bg-slate-800/70 border border-slate-200/60 dark:border-slate-700/60 backdrop-blur-sm text-xs text-slate-600 dark:text-slate-300 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="font-medium">Open to collaborate</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              title="프로필 공유하기"
              className="p-2.5 rounded-full bg-white/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-700 border border-slate-200/80 dark:border-slate-700/80 text-slate-600 dark:text-slate-300 shadow-sm transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <Icons.Share />
            </button>
            <button
              onClick={toggleTheme}
              title={isDark ? "라이트 모드로 전환" : "다크 모드로 전환"}
              className="p-2.5 rounded-full bg-white/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-700 border border-slate-200/80 dark:border-slate-700/80 text-slate-600 dark:text-slate-300 shadow-sm transition-all duration-200 hover:scale-105 active:scale-95"
            >
              {isDark ? <Icons.Sun /> : <Icons.Moon />}
            </button>
          </div>
        </header>

        {/* 프로필 헤더 카드 */}
        <section className="w-full bg-white/85 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col items-center text-center transition-all duration-300 hover:shadow-md mb-6">
          {/* 아바타 영역 */}
          <div className="relative mb-5 group">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 bg-gradient-to-tr from-blue-500 via-indigo-500 to-purple-500 shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-white overflow-hidden relative">
                {/* 세련된 그라데이션 일러스트/이니셜 */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/90 to-purple-700/90 opacity-90" />
                <span className="relative text-2xl sm:text-3xl font-extrabold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-slate-200">
                  민주
                </span>
              </div>
            </div>
            {/* 상태 뱃지 링 */}
            <div className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-emerald-500 ring-4 ring-white dark:ring-slate-900 flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
            </div>
          </div>

          {/* 이름 & 핸들 */}
          <div className="space-y-1 mb-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              양민주
            </h1>
            <p className="text-xs sm:text-sm font-medium text-slate-400 dark:text-slate-400">
              @minju.yang · Frontend Developer
            </p>
          </div>

          {/* 관심사 태그 */}
          <div className="flex flex-wrap justify-center gap-1.5 mb-4">
            <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200/60 dark:border-blue-900/40">
              💻 Frontend
            </span>
            <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-900/40">
              ✨ UI/UX
            </span>
            <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 border border-purple-200/60 dark:border-purple-900/40">
              🌱 Fast Learner
            </span>
          </div>

          {/* 한 줄 자기소개 */}
          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300 max-w-sm break-keep mb-6 font-normal">
            사용자 중심의 경험을 코드로 구현하고, 직관적이면서도 아름다운 웹 인터랙션을 만들어가는 것을 좋아합니다.
          </p>

          {/* 빠른 액션 버튼 (이메일 복사 / 깃허브 바로가기) */}
          <div className="w-full flex gap-2.5">
            <button
              onClick={copyEmail}
              className="flex-1 py-2.5 px-4 rounded-xl bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-white text-white dark:text-slate-900 text-xs sm:text-sm font-medium transition-all duration-200 flex items-center justify-center gap-1.5 shadow-sm active:scale-98"
            >
              <Icons.Copy />
              <span>이메일 복사</span>
            </button>
            <a
              href="mailto:minju@example.com"
              className="py-2.5 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200/80 dark:hover:bg-slate-700/80 text-slate-700 dark:text-slate-200 text-xs sm:text-sm font-medium transition-all duration-200 flex items-center justify-center gap-1.5 active:scale-98"
            >
              <Icons.Mail />
              <span>메일 쓰기</span>
            </a>
          </div>
        </section>

        {/* 메인 링크 리스트 영역 */}
        <section className="w-full space-y-3 mb-8">
          <div className="flex items-center justify-between px-1 mb-1">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Featured Links
            </h2>
            <span className="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1">
              <Icons.Sparkles /> 5개의 채널
            </span>
          </div>

          {LINKS.map((link) => {
            const IconComponent = Icons[link.icon] || Icons.Portfolio;
            return (
              <a
                key={link.id}
                href={link.url}
                target={link.isExternal ? "_blank" : undefined}
                rel={link.isExternal ? "noopener noreferrer" : undefined}
                className="group w-full p-4 rounded-2xl bg-white/80 dark:bg-slate-900/70 hover:bg-white dark:hover:bg-slate-900 backdrop-blur-md border border-slate-200/80 dark:border-slate-800/80 hover:border-blue-400/50 dark:hover:border-blue-500/50 shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-between gap-3 text-left"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  {/* 아이콘 컨테이너 */}
                  <div className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-slate-800 group-hover:bg-blue-50 dark:group-hover:bg-blue-950/80 text-slate-700 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 flex items-center justify-center shrink-0 transition-colors duration-200">
                    <IconComponent />
                  </div>

                  {/* 텍스트 내용 */}
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-sm sm:text-base text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                        {link.title}
                      </h3>
                      {link.tag && (
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${link.badgeColor}`}
                        >
                          {link.tag}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                      {link.description}
                    </p>
                  </div>
                </div>

                {/* 우측 링크 화살표 */}
                <div className="text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 shrink-0 p-1">
                  <Icons.ArrowUpRight />
                </div>
              </a>
            );
          })}
        </section>

        {/* 기술 스택 섹션 */}
        <section className="w-full bg-white/60 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200/60 dark:border-slate-800/60 rounded-3xl p-6 shadow-sm mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm font-bold text-slate-900 dark:text-white">
              🛠️ Skills & Tech Stack
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
            주로 활용하고 관심 있게 다루는 핵심 개발 스택입니다.
          </p>
          <div className="flex flex-wrap gap-2">
            {TECH_STACK.map((tech) => (
              <span
                key={tech.name}
                className={`text-xs font-medium px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/80 shadow-xs transition-all duration-150 hover:-translate-y-0.5 hover:shadow-sm ${tech.bg}`}
              >
                {tech.name}
              </span>
            ))}
          </div>
        </section>

        {/* 어바웃 / 관심사 노트 카드 */}
        <section className="w-full bg-gradient-to-br from-blue-50/70 via-indigo-50/50 to-purple-50/70 dark:from-slate-900/70 dark:via-slate-800/50 dark:to-slate-900/70 border border-blue-100/60 dark:border-slate-800 rounded-3xl p-6 mb-8 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed space-y-2.5">
          <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
            <span>💡 Current Focus</span>
          </div>
          <p>
            새로운 웹 표준과 Next.js 최신 생태계를 탐구하고 있으며, 작은 디테일과 인터랙션이 만드는 탁월한 사용자 경험을 만들어가는 데 집중하고 있습니다.
          </p>
        </section>

        {/* 푸터 영역 */}
        <footer className="w-full text-center py-4 space-y-2 text-xs text-slate-400 dark:text-slate-500">
          <p>© 2026 Minju Yang. All rights reserved.</p>
          <p className="text-[11px]">Crafted with Next.js & Tailwind CSS</p>
        </footer>
      </div>
    </main>
  );
}

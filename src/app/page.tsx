"use client";

import React, { useState, useEffect } from "react";

// Neobrutalism 전용 볼드 아이콘 모음
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
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
  Portfolio: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  Resume: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  Mail: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  Copy: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  ),
  Share: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
    </svg>
  ),
  Sun: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
  Moon: () => (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
  ),
  ArrowRight: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  ),
  Sparkle: () => (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
    </svg>
  ),
};

// 링크 목록 (Neobrutalism 팔레트)
interface LinkItem {
  id: string;
  title: string;
  description: string;
  url: string;
  badge: string;
  badgeBg: string;
  cardBg: string;
  iconBg: string;
  icon: keyof typeof Icons;
  isExternal: boolean;
}

const LINKS: LinkItem[] = [
  {
    id: "github",
    title: "GitHub Profile",
    description: "진행한 프로젝트 소스코드와 오픈소스 활동",
    url: "https://github.com",
    badge: "CODE",
    badgeBg: "bg-white text-black",
    cardBg: "bg-[#FFE600] dark:bg-yellow-500", // 비비드 옐로우
    iconBg: "bg-white dark:bg-black text-black dark:text-white",
    icon: "Github",
    isExternal: true,
  },
  {
    id: "blog",
    title: "Tech Blog (개발일지)",
    description: "배운 지식과 트러블슈팅, 회고를 담은 기록",
    url: "https://velog.io",
    badge: "BLOG",
    badgeBg: "bg-black text-white",
    cardBg: "bg-[#A3E635] dark:bg-lime-500", // 비비드 라임
    iconBg: "bg-white dark:bg-black text-black dark:text-white",
    icon: "Blog",
    isExternal: true,
  },
  {
    id: "portfolio",
    title: "Projects Portfolio",
    description: "직접 기획하고 만든 웹 애플리케이션 쇼케이스",
    url: "https://portfolio.example.com",
    badge: "FEATURED",
    badgeBg: "bg-[#FFE600] text-black",
    cardBg: "bg-[#38BDF8] dark:bg-sky-500", // 비비드 스카이블루
    iconBg: "bg-white dark:bg-black text-black dark:text-white",
    icon: "Portfolio",
    isExternal: true,
  },
  {
    id: "resume",
    title: "Resume & CV (이력서)",
    description: "상세 기술 역량과 프로젝트 협업 경험 문서",
    url: "https://notion.so",
    badge: "CAREER",
    badgeBg: "bg-black text-white",
    cardBg: "bg-[#FF70A6] dark:bg-pink-500", // 비비드 핑크
    iconBg: "bg-white dark:bg-black text-black dark:text-white",
    icon: "Resume",
    isExternal: true,
  },
  {
    id: "contact",
    title: "커피챗 & 협업 문의",
    description: "가벼운 네트워킹과 새로운 기회는 언제나 환영해요",
    url: "mailto:minju@example.com",
    badge: "SAY HELLO",
    badgeBg: "bg-white text-black",
    cardBg: "bg-[#C084FC] dark:bg-purple-500", // 비비드 퍼플
    iconBg: "bg-white dark:bg-black text-black dark:text-white",
    icon: "Mail",
    isExternal: false,
  },
];

// 기술 스택 (Neobrutalism 스타일 배지)
const TECH_STACK = [
  { name: "React", bg: "bg-[#38BDF8] text-black" },
  { name: "Next.js", bg: "bg-black text-white dark:bg-white dark:text-black" },
  { name: "TypeScript", bg: "bg-[#60A5FA] text-black" },
  { name: "JavaScript", bg: "bg-[#FFE600] text-black" },
  { name: "Tailwind CSS", bg: "bg-[#2DD4BF] text-black" },
  { name: "HTML5/CSS3", bg: "bg-[#FB923C] text-black" },
  { name: "Git & GitHub", bg: "bg-[#F87171] text-black" },
  { name: "Figma", bg: "bg-[#C084FC] text-black" },
];

export default function Home() {
  const [isDark, setIsDark] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [imgError, setImgError] = useState(false);

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
    }, 2400);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("minju@example.com");
    showToast("🎉 이메일 주소가 복사되었습니다!");
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "양민주 | Neobrutalist Profile",
          text: "프론트엔드 개발자 양민주의 Neobrutalism 프로필 링크입니다.",
          url: window.location.href,
        });
      } catch {
        // 무시
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast("🔗 링크가 복사되었습니다!");
    }
  };

  return (
    <main className="min-h-screen relative bg-dot-pattern py-10 px-4 sm:px-6 flex flex-col items-center select-none">
      {/* 토스트 알림 (Neobrutalism 스타일) */}
      {toastMessage && (
        <div className="fixed top-6 z-50 px-5 py-3 rounded-xl border-[3px] border-black bg-[#FFE600] text-black font-black text-sm shadow-neo animate-bounce flex items-center gap-2">
          <Icons.Sparkle />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 중앙 레이아웃 래퍼 */}
      <div className="w-full max-w-md flex flex-col items-center">
        {/* 상단 전광판 티커 (Marquee Bar) */}
        <div className="w-full mb-6 overflow-hidden border-[3px] border-black dark:border-white bg-[#FFE600] dark:bg-yellow-400 text-black py-2 shadow-neo font-black text-xs uppercase tracking-wider rounded-xl">
          <div className="flex whitespace-nowrap animate-marquee">
            <span className="mx-3">✦ YANG MINJU</span>
            <span className="mx-3">⚡ FRONTEND DEVELOPER</span>
            <span className="mx-3">✿ LET&apos;S BUILD SOMETHING COOL</span>
            <span className="mx-3">★ OPEN FOR COLLAB</span>
            <span className="mx-3">✦ YANG MINJU</span>
            <span className="mx-3">⚡ FRONTEND DEVELOPER</span>
            <span className="mx-3">✿ LET&apos;S BUILD SOMETHING COOL</span>
            <span className="mx-3">★ OPEN FOR COLLAB</span>
          </div>
        </div>

        {/* 상단 네비게이션 / 유틸리티 바 */}
        <div className="w-full flex justify-between items-center mb-6">
          {/* 상태 배지 스티커 */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border-2 border-black dark:border-white bg-[#A3E635] text-black font-extrabold text-xs shadow-neo-sm -rotate-2 hover:rotate-0 transition-transform">
            <span className="w-2.5 h-2.5 rounded-full bg-black animate-ping" />
            <span>AVAILABLE FOR WORK 🟢</span>
          </div>

          {/* 액션 버튼들 */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={handleShare}
              title="프로필 공유하기"
              className="p-2.5 rounded-xl border-2 border-black dark:border-white bg-white dark:bg-neutral-800 text-black dark:text-white shadow-neo-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none active:translate-x-1 active:translate-y-1 transition-all"
            >
              <Icons.Share />
            </button>
            <button
              onClick={toggleTheme}
              title={isDark ? "라이트 모드로 전환" : "다크 모드로 전환"}
              className="p-2.5 rounded-xl border-2 border-black dark:border-white bg-[#38BDF8] text-black shadow-neo-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none active:translate-x-1 active:translate-y-1 transition-all"
            >
              {isDark ? <Icons.Sun /> : <Icons.Moon />}
            </button>
          </div>
        </div>

        {/* 메인 프로필 카드 */}
        <section className="w-full relative border-[3px] border-black dark:border-white bg-white dark:bg-neutral-900 rounded-2xl p-6 sm:p-7 shadow-neo-lg dark:shadow-neo-dark-lg mb-6 transition-all">
          {/* 우측 상단 키치 스티커 */}
          <div className="absolute -top-3.5 -right-2.5 px-3 py-1 rounded-lg border-2 border-black bg-[#FF70A6] text-black font-black text-xs shadow-neo-sm rotate-6 hover:rotate-12 transition-transform">
            HELLO! 👾
          </div>

          <div className="flex flex-col items-center text-center">
            {/* 아바타 영역 (원형 120x120 Neobrutalism 스타일) */}
            <div className="relative mb-5 group">
              <div className="w-[120px] h-[120px] rounded-full border-[3px] border-black bg-[#FFE600] flex items-center justify-center shadow-neo group-hover:scale-105 group-hover:rotate-3 transition-transform duration-200 overflow-hidden">
                {!imgError ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src="/profile.png"
                    alt="양민주 프로필 이미지"
                    width={120}
                    height={120}
                    className="w-full h-full object-cover rounded-full"
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <span className="text-4xl font-black text-black tracking-tight select-none">
                    MJ.
                  </span>
                )}
              </div>
              <div className="absolute bottom-0 right-0 px-2.5 py-0.5 rounded-full border-2 border-black bg-[#A3E635] text-[11px] font-black text-black shadow-neo-sm">
                DEV
              </div>
            </div>

            {/* 이름 및 직무 */}
            <div className="space-y-1 mb-3">
              <h1 className="text-3xl sm:text-4xl font-black text-black dark:text-white tracking-tight">
                양민주
              </h1>
              <p className="text-sm font-bold text-neutral-600 dark:text-neutral-400 font-mono">
                @minju.yang · Frontend Developer
              </p>
            </div>

            {/* 키워드 태그 뱃지 */}
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              <span className="px-2.5 py-1 text-xs font-black rounded-lg border-2 border-black bg-[#FFE600] text-black shadow-neo-sm">
                💻 FRONTEND
              </span>
              <span className="px-2.5 py-1 text-xs font-black rounded-lg border-2 border-black bg-[#38BDF8] text-black shadow-neo-sm">
                ⚡ UI / UX
              </span>
              <span className="px-2.5 py-1 text-xs font-black rounded-lg border-2 border-black bg-[#A3E635] text-black shadow-neo-sm">
                ✿ PROBLEM SOLVER
              </span>
            </div>

            {/* 소개 문구 (박스 하이라이트) */}
            <div className="w-full p-3.5 rounded-xl border-2 border-black dark:border-neutral-700 bg-[#FFFDF5] dark:bg-neutral-800 text-left text-xs sm:text-sm font-medium text-neutral-800 dark:text-neutral-200 leading-relaxed mb-5 shadow-neo-sm break-keep">
              <p>
                사용자 중심의 경험을 굵직하고 매력적인 코드로 구현합니다. 새로운 기술 스택을 탐구하고 즐겁게 협업하는 개발자입니다.
              </p>
            </div>

            {/* 빠른 액션 버튼 2종 */}
            <div className="w-full flex gap-3 font-black text-xs sm:text-sm">
              <button
                onClick={copyEmail}
                className="flex-1 py-3 px-4 rounded-xl border-2 border-black bg-[#FFE600] hover:bg-yellow-300 text-black shadow-neo hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-neo-sm active:translate-x-1 active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2"
              >
                <Icons.Copy />
                <span>이메일 복사</span>
              </button>
              <a
                href="mailto:minju@example.com"
                className="py-3 px-5 rounded-xl border-2 border-black bg-white dark:bg-neutral-800 hover:bg-neutral-100 text-black dark:text-white shadow-neo hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-neo-sm active:translate-x-1 active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2"
              >
                <Icons.Mail />
                <span>메일 쓰기</span>
              </a>
            </div>
          </div>
        </section>

        {/* 링크 카드 영역 */}
        <section className="w-full space-y-3.5 mb-8">
          <div className="flex items-center justify-between px-1 mb-1">
            <h2 className="text-xs font-black tracking-wider uppercase text-black dark:text-white flex items-center gap-1.5">
              <span>📌 FEATURED LINKS</span>
            </h2>
            <span className="text-[11px] font-black px-2 py-0.5 rounded-md border-2 border-black bg-[#FF70A6] text-black shadow-neo-sm">
              {LINKS.length} LINKS
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
                className={`group w-full p-4 rounded-2xl border-[3px] border-black dark:border-white ${link.cardBg} shadow-neo dark:shadow-neo-dark hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-neo-sm dark:hover:shadow-neo-dark-sm active:translate-x-1 active:translate-y-1 active:shadow-none transition-all duration-150 flex items-center justify-between gap-3 text-left`}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  {/* 아이콘 박스 */}
                  <div
                    className={`w-12 h-12 rounded-xl border-2 border-black ${link.iconBg} flex items-center justify-center shrink-0 shadow-neo-sm group-hover:rotate-6 transition-transform`}
                  >
                    <IconComponent />
                  </div>

                  {/* 텍스트 내용 */}
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-black text-sm sm:text-base text-black dark:text-neutral-900 truncate">
                        {link.title}
                      </h3>
                      <span
                        className={`text-[9px] font-black px-1.5 py-0.5 rounded border border-black shadow-neo-sm shrink-0 ${link.badgeBg}`}
                      >
                        {link.badge}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-black/80 dark:text-neutral-900/80 truncate mt-0.5">
                      {link.description}
                    </p>
                  </div>
                </div>

                {/* 우측 화살표 버튼 */}
                <div className="w-9 h-9 rounded-xl border-2 border-black bg-white text-black flex items-center justify-center shrink-0 shadow-neo-sm group-hover:translate-x-1 transition-transform">
                  <Icons.ArrowRight />
                </div>
              </a>
            );
          })}
        </section>

        {/* 기술 스택 섹션 */}
        <section className="w-full border-[3px] border-black dark:border-white bg-white dark:bg-neutral-900 rounded-2xl p-6 shadow-neo-lg dark:shadow-neo-dark-lg mb-8">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-black text-black dark:text-white uppercase flex items-center gap-1.5">
              <span>🛠️ TECH STACK</span>
            </h3>
            <span className="text-[10px] font-black px-2 py-0.5 rounded border border-black bg-[#FFE600] text-black shadow-neo-sm">
              EXPERTISE
            </span>
          </div>
          <p className="text-xs font-medium text-neutral-600 dark:text-neutral-400 mb-4">
            주로 다루며 문제 해결에 활용하는 개발 기술입니다.
          </p>

          <div className="flex flex-wrap gap-2.5">
            {TECH_STACK.map((tech) => (
              <span
                key={tech.name}
                className={`text-xs font-black px-3 py-1.5 rounded-xl border-2 border-black shadow-neo-sm hover:scale-105 active:scale-95 transition-transform cursor-default ${tech.bg}`}
              >
                {tech.name}
              </span>
            ))}
          </div>
        </section>

        {/* 현재 집중 분야 (Current Focus) 카드 */}
        <section className="w-full border-[3px] border-black dark:border-white bg-[#FFE600] dark:bg-yellow-500 text-black rounded-2xl p-5 shadow-neo-lg dark:shadow-neo-dark-lg mb-8">
          <div className="flex items-center gap-1.5 font-black text-sm mb-2">
            <Icons.Sparkle />
            <span>CURRENT FOCUS</span>
          </div>
          <p className="text-xs sm:text-sm font-bold leading-relaxed break-keep">
            Next.js App Router 생태계와 인터랙티브 웹 디자인, 그리고 높은 완성도의 UI 컴포넌트 시스템 구축에 몰입하고 있습니다.
          </p>
        </section>

        {/* 푸터 영역 */}
        <footer className="w-full text-center py-4 space-y-2 text-xs font-black text-black dark:text-white">
          <div className="inline-block px-3 py-1 rounded-lg border-2 border-black bg-white dark:bg-neutral-800 shadow-neo-sm">
            © 2026 YANG MINJU · ALL RIGHTS RESERVED
          </div>
          <p className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400">
            CRAFTED WITH NEOBRUTALISM STYLE ⚡
          </p>
        </footer>
      </div>
    </main>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import { useMyLinkData } from "@/hooks/useMyLinkData";
import { IconType } from "@/types/link";

// TDS (Toss Design System) 사양에 맞춘 정갈한 24px/20px 아이콘 세트 (1.8 stroke, round cap/join)
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
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"
      />
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
  Figma: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z" />
    </svg>
  ),
  Linkedin: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" rx="1" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  ),
  Globe: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
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
};

// 소셜 플랫폼 아이콘 매핑
function getSocialIcon(platform: string) {
  switch (platform.toLowerCase()) {
    case "github":
      return TDSIcons.Github;
    case "blog":
      return TDSIcons.Blog;
    case "linkedin":
      return TDSIcons.Linkedin;
    case "mail":
      return TDSIcons.Mail;
    default:
      return TDSIcons.Globe;
  }
}

// 링크 아이콘 매핑
function getLinkIcon(iconName: IconType | string) {
  const iconMap: Record<string, () => React.JSX.Element> = {
    Portfolio: TDSIcons.Portfolio,
    Github: TDSIcons.Github,
    Blog: TDSIcons.Blog,
    Resume: TDSIcons.Resume,
    Mail: TDSIcons.Mail,
    Figma: TDSIcons.Figma,
    Linkedin: TDSIcons.Linkedin,
    Globe: TDSIcons.Globe,
  };
  return iconMap[iconName] || TDSIcons.Globe;
}

export default function Home() {
  const { profile, socials, links, recordClick } = useMyLinkData();
  const [isDark, setIsDark] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isContactSheetOpen, setIsContactSheetOpen] = useState(false);

  // 다크모드 초기화
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
    if (profile.email) {
      navigator.clipboard.writeText(profile.email);
      showToast("이메일 주소가 복사되었어요");
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: `${profile.name} | ${profile.jobTitle}`,
      text: `${profile.name}님의 마이링크 프로필이에요.`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // 공유 취소
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast("프로필 링크가 복사되었어요");
    }
  };

  // 활성 링크 목록 정렬
  const activeLinks = [...links]
    .filter((item) => item.isActive !== false)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  return (
    <div className="min-h-screen bg-toss-grey-50 dark:bg-toss-dark-bg text-toss-grey-900 dark:text-toss-dark-text flex flex-col items-center">
      {/* TDS 토스트 알림 */}
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

      {/* 중앙 모바일 셸 (TDS 최대 430px 규격) */}
      <div className="w-full max-w-[430px] flex flex-col px-4 sm:px-5 pb-32 pt-2">
        {/* 상단 앱바 (TopBar - 56px) */}
        <header className="h-14 flex items-center justify-between py-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-toss-blue-500" />
            <span className="text-[17px] font-bold tracking-tight text-toss-grey-900 dark:text-white">
              마이링크
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

        {/* 1. 메인 프로필 카드 (TDS 24px Round Card) */}
        <section className="bg-white dark:bg-toss-dark-card rounded-tds-3xl p-6 sm:p-7 border border-toss-grey-200/80 dark:border-toss-dark-border shadow-tds-1 mt-2 mb-4">
          <div className="flex flex-col items-center text-center">
            {/* 원형 아바타 (MJ 이니셜 또는 사진 + 온라인 상태 뱃지) */}
            <div className="relative mb-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-b from-toss-blue-50 to-toss-blue-100 dark:from-toss-dark-elevated dark:to-toss-dark-surface flex items-center justify-center border border-toss-grey-200/60 dark:border-toss-dark-border overflow-hidden">
                {profile.avatarUrl ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={profile.avatarUrl}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-2xl font-bold text-toss-blue-500 dark:text-toss-dark-blue select-none">
                    {profile.initials || "MJ"}
                  </span>
                )}
              </div>
              <span
                className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-toss-semantic-green border-2 border-white dark:border-toss-dark-card flex items-center justify-center shadow-sm"
                title="온라인 상태"
              />
            </div>

            {/* 이름 및 직무 */}
            <h1 className="text-[22px] font-bold text-toss-grey-900 dark:text-white tracking-tight leading-snug">
              {profile.name}
            </h1>
            <p className="text-[15px] font-medium text-toss-grey-600 dark:text-toss-dark-subtext mt-1">
              {profile.jobTitle}
            </p>

            {/* 상태 배지 (Chip) */}
            {profile.badge && (
              <div className="mt-3.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-tds-full bg-toss-blue-50 dark:bg-toss-dark-blueWeak text-toss-blue-500 dark:text-toss-dark-blue text-[13px] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-toss-blue-500" />
                <span>{profile.badge}</span>
              </div>
            )}

            {/* 소개 문구 (TDS 해요체) */}
            {profile.bio && (
              <div className="w-full mt-5 pt-4 border-t border-toss-grey-100 dark:border-toss-dark-border text-left">
                <p className="text-[14.5px] leading-relaxed text-toss-grey-700 dark:text-toss-dark-subtext break-keep">
                  {profile.bio}
                </p>
              </div>
            )}

            {/* 보조 액션 버튼 2단 */}
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

        {/* 2. 소셜 아이콘 바 (SocialIconsBar) */}
        {socials && socials.length > 0 && (
          <section className="bg-white dark:bg-toss-dark-card rounded-tds-2xl p-3 border border-toss-grey-200/80 dark:border-toss-dark-border shadow-tds-1 mb-4 flex items-center justify-around">
            {socials.map((social) => {
              const Icon = getSocialIcon(social.platform);
              const isMail = social.platform === "mail" || social.url.startsWith("mailto:");
              return (
                <a
                  key={social.platform}
                  href={social.url}
                  target={isMail ? undefined : "_blank"}
                  rel={isMail ? undefined : "noopener noreferrer"}
                  aria-label={`${social.platform} 바로가기`}
                  className="w-11 h-11 rounded-full flex items-center justify-center text-toss-grey-700 dark:text-toss-dark-subtext hover:text-toss-blue-500 dark:hover:text-toss-dark-blue hover:bg-toss-blue-50 dark:hover:bg-toss-dark-blueWeak transition-all duration-150 active:scale-95"
                >
                  <Icon />
                </a>
              );
            })}
          </section>
        )}

        {/* 3. 바로가기 링크 목록 (TDS ListRow Card) */}
        <section className="space-y-2 mb-6">
          <div className="px-1 py-1 flex items-center justify-between">
            <h2 className="text-[15px] font-bold text-toss-grey-900 dark:text-white">
              바로가기
            </h2>
            <span className="text-[13px] font-medium text-toss-grey-500 dark:text-toss-dark-muted tabular-nums">
              전체 {activeLinks.length}개
            </span>
          </div>

          <div className="bg-white dark:bg-toss-dark-card rounded-tds-3xl border border-toss-grey-200/80 dark:border-toss-dark-border shadow-tds-1 overflow-hidden divide-y divide-toss-grey-100 dark:divide-toss-dark-border">
            {activeLinks.map((link) => {
              const IconComp = getLinkIcon(link.icon);
              const isMail = link.url.startsWith("mailto:");

              return (
                <a
                  key={link.id}
                  href={link.url}
                  target={link.isExternal && !isMail ? "_blank" : undefined}
                  rel={link.isExternal && !isMail ? "noopener noreferrer" : undefined}
                  onClick={() => recordClick(link.id)}
                  className={`w-full px-5 py-4 flex items-center justify-between gap-3 text-left transition-colors duration-150 group ${
                    link.highlight
                      ? "bg-toss-blue-50/40 dark:bg-toss-dark-blueWeak/30 hover:bg-toss-blue-50/70 dark:hover:bg-toss-dark-blueWeak/60"
                      : "hover:bg-toss-grey-50 dark:hover:bg-toss-dark-surface active:bg-toss-grey-100 dark:active:bg-toss-dark-elevated"
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    {/* TDS 44px 둥근 아이콘 컨테이너 */}
                    <div
                      className={`w-11 h-11 rounded-tds-l flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${
                        link.highlight
                          ? "bg-toss-blue-500 text-white shadow-sm shadow-toss-blue-500/20"
                          : "bg-toss-grey-100 dark:bg-toss-dark-surface text-toss-grey-700 dark:text-toss-dark-subtext"
                      }`}
                    >
                      <IconComp />
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[15.5px] font-semibold text-toss-grey-900 dark:text-white truncate">
                          {link.title}
                        </span>
                        {link.tag && (
                          <span
                            className={`text-[11px] font-bold px-1.5 py-0.5 rounded-tds-xs ${
                              link.highlight
                                ? "bg-toss-blue-50 dark:bg-toss-dark-blueWeak text-toss-blue-500 dark:text-toss-dark-blue border border-toss-blue-500/20"
                                : "bg-toss-grey-100 dark:bg-toss-dark-surface text-toss-grey-600 dark:text-toss-dark-subtext"
                            }`}
                          >
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
                    <TDSIcons.ChevronRight />
                  </div>
                </a>
              );
            })}
          </div>
        </section>

        {/* 푸터 영역 */}
        <footer className="text-center py-6 text-toss-grey-500 dark:text-toss-dark-muted text-[12px] space-y-1">
          <p>© 2026 {profile.name} · Toss Design System 스타일</p>
          <p className="text-[11px] text-toss-grey-400 dark:text-toss-dark-divider">
            designed with TDS guidelines
          </p>
        </footer>
      </div>

      {/* TDS 바텀시트 (커피챗 & 연락처 안내) */}
      {isContactSheetOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          {/* 스크림 (Overlay Scrim: 50% 검정 반투명 블러) */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-[2px] transition-opacity"
            onClick={() => setIsContactSheetOpen(false)}
          />

          {/* 시트 모달 컨테이너 */}
          <div className="relative w-full max-w-[430px] bg-white dark:bg-toss-dark-card rounded-t-tds-4xl p-6 shadow-tds-sheet z-10 animate-in slide-in-from-bottom duration-250 border-t border-toss-grey-200/50 dark:border-toss-dark-border">
            {/* 드래그 핸들 바 */}
            <div className="w-10 h-1 bg-toss-grey-300 dark:bg-toss-dark-border rounded-full mx-auto mb-5" />

            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[18px] font-bold text-toss-grey-900 dark:text-white">
                커피챗 제안하기
              </h3>
              <button
                onClick={() => setIsContactSheetOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-toss-grey-500 hover:bg-toss-grey-100 dark:hover:bg-toss-dark-surface transition-colors"
              >
                <TDSIcons.Close />
              </button>
            </div>

            <p className="text-[14px] text-toss-grey-600 dark:text-toss-dark-subtext mb-6 leading-relaxed break-keep">
              가벼운 커피챗부터 프로젝트 협업, 포지션 제안까지 언제든 편하게 연락 주세요. 보통 24시간 안에 답변드려요.
            </p>

            <div className="space-y-2.5">
              <a
                href={`mailto:${profile.email}`}
                className="w-full h-12 rounded-tds-l bg-toss-blue-500 hover:bg-toss-blue-600 text-white font-bold text-[15px] flex items-center justify-center gap-2 transition-colors active:scale-[0.99]"
              >
                <TDSIcons.Mail />
                <span>메일 앱에서 작성하기</span>
              </a>
              <button
                onClick={() => {
                  copyEmail();
                  setIsContactSheetOpen(false);
                }}
                className="w-full h-12 rounded-tds-l bg-toss-grey-100 dark:bg-toss-dark-surface hover:bg-toss-grey-200 dark:hover:bg-toss-dark-elevated text-toss-grey-900 dark:text-white font-semibold text-[15px] flex items-center justify-center gap-2 transition-colors active:scale-[0.99]"
              >
                <TDSIcons.Copy />
                <span>이메일 주소 복사하기</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 화면 최하단 고정 플로팅 액션바 (BottomCTA: 56px 토스 블루 + 상단 페이드 그라디언트) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 flex justify-center pointer-events-none">
        <div className="w-full max-w-[430px] px-4 pb-5 pt-6 bg-gradient-to-t from-toss-grey-50 via-toss-grey-50/90 to-transparent dark:from-toss-dark-bg dark:via-toss-dark-bg/90 pointer-events-auto">
          <button
            onClick={() => setIsContactSheetOpen(true)}
            className="w-full h-14 rounded-tds-xl bg-toss-blue-500 hover:bg-toss-blue-600 active:bg-toss-blue-700 text-white font-bold text-[16px] shadow-tds-2 transition-all active:scale-[0.985] flex items-center justify-center gap-2"
          >
            <span>함께 일하기 · 커피챗 제안</span>
          </button>
        </div>
      </div>
    </div>
  );
}

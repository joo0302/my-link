"use client";

import React, { useState, useEffect } from "react";
import { useMyLinkData } from "@/hooks/useMyLinkData";
import { Button } from "@/components/ui/button";
import { ProfileHeader } from "@/components/ProfileHeader";
import { SocialBar } from "@/components/SocialBar";
import { LinkList } from "@/components/LinkList";
import { ContactBottomSheet } from "@/components/ContactBottomSheet";

// 상단 앱바 전용 아이콘
const TopBarIcons = {
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
  Check: () => (
    <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  ),
};

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

  return (
    <div className="min-h-screen bg-toss-grey-50 dark:bg-toss-dark-bg text-toss-grey-900 dark:text-toss-dark-text flex flex-col items-center">
      {/* TDS 토스트 알림 */}
      {toastMessage && (
        <div className="fixed top-6 z-50 animate-in fade-in slide-in-from-top-3 duration-200">
          <div className="bg-toss-grey-900 dark:bg-toss-dark-elevated text-white px-4 py-3 rounded-tds-l shadow-tds-toast flex items-center gap-2.5 text-[14px] font-medium border border-white/10">
            <span className="w-5 h-5 rounded-full bg-toss-semantic-green flex items-center justify-center shrink-0">
              <TopBarIcons.Check />
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
            <Button
              variant="ghost"
              size="icon"
              onClick={handleShare}
              aria-label="프로필 공유하기"
            >
              <TopBarIcons.Share />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label={isDark ? "라이트 모드로 전환" : "다크 모드로 전환"}
            >
              {isDark ? <TopBarIcons.Sun /> : <TopBarIcons.Moon />}
            </Button>
          </div>
        </header>

        {/* 1. 재사용 가능한 프로필 헤더 (Card, Avatar, Badge, Button 기반) */}
        <ProfileHeader
          profile={profile}
          onCopyEmail={copyEmail}
          onOpenContact={() => setIsContactSheetOpen(true)}
        />

        {/* 2. 재사용 가능한 소셜 아이콘 바 (Card 기반) */}
        <SocialBar socials={socials} />

        {/* 3. 재사용 가능한 링크 목록 (Card, Badge 기반) */}
        <LinkList links={links} onLinkClick={recordClick} />

        {/* 푸터 영역 */}
        <footer className="text-center py-6 text-toss-grey-500 dark:text-toss-dark-muted text-[12px] space-y-1">
          <p>© 2026 {profile.name} · Toss Design System 스타일</p>
          <p className="text-[11px] text-toss-grey-400 dark:text-toss-dark-divider">
            built with shadcn/ui & TDS tokens
          </p>
        </footer>
      </div>

      {/* 4. 재사용 가능한 바텀시트 모달 (Sheet, Button 기반) */}
      <ContactBottomSheet
        isOpen={isContactSheetOpen}
        onOpenChange={setIsContactSheetOpen}
        email={profile.email}
        onCopyEmail={copyEmail}
      />

      {/* 화면 최하단 고정 플로팅 액션바 (BottomCTA: Button lg 기반) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 flex justify-center pointer-events-none">
        <div className="w-full max-w-[430px] px-4 pb-5 pt-6 bg-gradient-to-t from-toss-grey-50 via-toss-grey-50/90 to-transparent dark:from-toss-dark-bg dark:via-toss-dark-bg/90 pointer-events-auto">
          <Button
            variant="default"
            size="lg"
            onClick={() => setIsContactSheetOpen(true)}
            className="w-full h-14 shadow-tds-2"
          >
            <span>함께 일하기 · 커피챗 제안</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

"use client";

import React from "react";
import { UserProfile } from "@/types/link";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ProfileHeaderProps {
  profile: UserProfile;
  onCopyEmail: () => void;
  onOpenContact: () => void;
}

export function ProfileHeader({
  profile,
  onCopyEmail,
  onOpenContact,
}: ProfileHeaderProps) {
  return (
    <Card className="mt-2 mb-4 p-6 sm:p-7">
      <CardContent className="p-0 flex flex-col items-center text-center">
        {/* 원형 아바타 (MJ 이니셜 또는 사진 + 온라인 상태 뱃지) */}
        <div className="relative mb-4">
          <Avatar className="w-20 h-20">
            {profile.avatarUrl && (
              <AvatarImage src={profile.avatarUrl} alt={profile.name} />
            )}
            <AvatarFallback>{profile.initials || "MJ"}</AvatarFallback>
          </Avatar>
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

        {/* 상태 배지 (TDS Chip Badge) */}
        {profile.badge && (
          <Badge variant="default" className="mt-3.5 px-3 py-1 text-[13px]">
            <span className="w-1.5 h-1.5 rounded-full bg-toss-blue-500" />
            <span>{profile.badge}</span>
          </Badge>
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
          <Button
            variant="secondary"
            onClick={onCopyEmail}
            className="w-full gap-1.5"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <rect width="14" height="14" x="8" y="8" rx="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
            </svg>
            <span>이메일 복사</span>
          </Button>

          <Button
            variant="secondary"
            onClick={onOpenContact}
            className="w-full gap-1.5"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <rect width="20" height="16" x="2" y="4" rx="3" strokeLinecap="round" strokeLinejoin="round" />
              <path strokeLinecap="round" strokeLinejoin="round" d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            <span>연락처 보기</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

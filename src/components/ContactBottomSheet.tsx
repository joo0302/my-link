"use client";

import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

interface ContactBottomSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  email: string;
  onCopyEmail: () => void;
}

export function ContactBottomSheet({
  isOpen,
  onOpenChange,
  email,
  onCopyEmail,
}: ContactBottomSheetProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="p-6">
        {/* 드래그 핸들 바 */}
        <div className="w-10 h-1 bg-toss-grey-300 dark:bg-toss-dark-border rounded-full mx-auto mb-5" />

        <SheetHeader className="mb-3">
          <div className="flex items-center justify-between">
            <SheetTitle>커피챗 제안하기</SheetTitle>
            <SheetClose asChild>
              <Button
                variant="ghost"
                size="icon"
                className="w-8 h-8 rounded-full"
                aria-label="닫기"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </Button>
            </SheetClose>
          </div>
        </SheetHeader>

        <SheetDescription className="mb-6 break-keep">
          가벼운 커피챗부터 프로젝트 협업, 포지션 제안까지 언제든 편하게 연락 주세요.
          보통 24시간 안에 답변드려요.
        </SheetDescription>

        <div className="space-y-2.5">
          <Button
            asChild
            variant="default"
            size="lg"
            className="w-full h-12 rounded-tds-l text-[15px]"
          >
            <a href={`mailto:${email}`}>
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <rect width="20" height="16" x="2" y="4" rx="3" strokeLinecap="round" strokeLinejoin="round" />
                <path strokeLinecap="round" strokeLinejoin="round" d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              <span>메일 앱에서 작성하기</span>
            </a>
          </Button>

          <Button
            variant="secondary"
            size="lg"
            onClick={() => {
              onCopyEmail();
              onOpenChange(false);
            }}
            className="w-full h-12 rounded-tds-l text-[15px]"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <rect width="14" height="14" x="8" y="8" rx="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
            </svg>
            <span>이메일 주소 복사하기</span>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

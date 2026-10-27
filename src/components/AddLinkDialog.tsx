"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LinkItem, IconType } from "@/types/link";

// 아이콘 옵션 목록
const ICON_OPTIONS: { value: IconType; label: string }[] = [
  { value: "Globe", label: "🌐 글로브 (기본)" },
  { value: "Portfolio", label: "💼 포트폴리오" },
  { value: "Github", label: "🐙 깃허브" },
  { value: "Blog", label: "📖 블로그" },
  { value: "Resume", label: "📄 이력서" },
  { value: "Mail", label: "📧 메일" },
  { value: "Figma", label: "🎨 피그마" },
  { value: "Linkedin", label: "💼 링크드인" },
  { value: "Youtube", label: "▶️ 유튜브" },
  { value: "Twitter", label: "🐦 트위터" },
];

const CATEGORY_OPTIONS: {
  value: LinkItem["category"];
  label: string;
}[] = [
  { value: "featured", label: "대표작" },
  { value: "project", label: "프로젝트" },
  { value: "career", label: "커리어" },
  { value: "content", label: "콘텐츠" },
  { value: "contact", label: "연락처" },
];

interface AddLinkDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (
    link: Omit<LinkItem, "id" | "createdAt" | "clicks" | "order">
  ) => void;
}

const defaultForm = {
  title: "",
  subtitle: "",
  url: "",
  icon: "Globe" as IconType,
  tag: "",
  category: "project" as LinkItem["category"],
  highlight: false,
  isExternal: true,
};

export function AddLinkDialog({
  isOpen,
  onOpenChange,
  onAdd,
}: AddLinkDialogProps) {
  const [form, setForm] = useState(defaultForm);
  const [errors, setErrors] = useState<Partial<Record<keyof typeof defaultForm, string>>>({});

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!form.title.trim()) newErrors.title = "제목을 입력해주세요";
    if (!form.url.trim()) newErrors.url = "URL을 입력해주세요";
    else if (
      !form.url.startsWith("http://") &&
      !form.url.startsWith("https://") &&
      !form.url.startsWith("mailto:")
    ) {
      newErrors.url = "올바른 URL 형식을 입력해주세요 (https:// 또는 mailto:)";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    onAdd({
      title: form.title.trim(),
      subtitle: form.subtitle.trim(),
      url: form.url.trim(),
      icon: form.icon,
      tag: form.tag.trim() || undefined,
      category: form.category,
      highlight: form.highlight,
      isExternal: form.isExternal,
      isActive: true,
    });

    setForm(defaultForm);
    setErrors({});
    onOpenChange(false);
  };

  const handleClose = () => {
    setForm(defaultForm);
    setErrors({});
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle>새 링크 추가</DialogTitle>
              <DialogClose asChild>
                <Button
                  type="button"
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
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </Button>
              </DialogClose>
            </div>
            <DialogDescription>
              프로필에 새로운 링크를 추가해요.
            </DialogDescription>
          </DialogHeader>

          {/* 폼 본문 */}
          <div className="px-6 pb-2 space-y-4">
            {/* 제목 */}
            <div className="space-y-1.5">
              <Label htmlFor="link-title">
                제목 <span className="text-toss-semantic-red">*</span>
              </Label>
              <Input
                id="link-title"
                placeholder="예: 프로젝트 포트폴리오"
                value={form.title}
                onChange={(e) =>
                  setForm((f) => ({ ...f, title: e.target.value }))
                }
                aria-invalid={!!errors.title}
              />
              {errors.title && (
                <p className="text-[12px] text-toss-semantic-red">{errors.title}</p>
              )}
            </div>

            {/* 부제목 */}
            <div className="space-y-1.5">
              <Label htmlFor="link-subtitle">부제목</Label>
              <Input
                id="link-subtitle"
                placeholder="예: 직접 설계하고 개발한 웹 서비스 모음"
                value={form.subtitle}
                onChange={(e) =>
                  setForm((f) => ({ ...f, subtitle: e.target.value }))
                }
              />
            </div>

            {/* URL */}
            <div className="space-y-1.5">
              <Label htmlFor="link-url">
                URL <span className="text-toss-semantic-red">*</span>
              </Label>
              <Input
                id="link-url"
                placeholder="https://example.com 또는 mailto:email@example.com"
                value={form.url}
                onChange={(e) =>
                  setForm((f) => ({ ...f, url: e.target.value }))
                }
                aria-invalid={!!errors.url}
              />
              {errors.url && (
                <p className="text-[12px] text-toss-semantic-red">{errors.url}</p>
              )}
            </div>

            {/* 태그 */}
            <div className="space-y-1.5">
              <Label htmlFor="link-tag">태그 뱃지 (선택)</Label>
              <Input
                id="link-tag"
                placeholder="예: 대표작, New, 추천"
                value={form.tag}
                onChange={(e) =>
                  setForm((f) => ({ ...f, tag: e.target.value }))
                }
              />
            </div>

            {/* 아이콘 & 카테고리 — 나란히 */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="link-icon">아이콘</Label>
                <div className="relative">
                  <select
                    id="link-icon"
                    value={form.icon}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        icon: e.target.value as IconType,
                      }))
                    }
                    className="flex h-11 w-full appearance-none rounded-tds-m border border-toss-grey-200 dark:border-toss-dark-border bg-white dark:bg-toss-dark-surface px-3 pr-8 text-[14px] text-toss-grey-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-toss-blue-500 cursor-pointer"
                  >
                    {ICON_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <svg
                    className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-toss-grey-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="link-category">카테고리</Label>
                <div className="relative">
                  <select
                    id="link-category"
                    value={form.category}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        category: e.target.value as LinkItem["category"],
                      }))
                    }
                    className="flex h-11 w-full appearance-none rounded-tds-m border border-toss-grey-200 dark:border-toss-dark-border bg-white dark:bg-toss-dark-surface px-3 pr-8 text-[14px] text-toss-grey-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-toss-blue-500 cursor-pointer"
                  >
                    {CATEGORY_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <svg
                    className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-toss-grey-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* 토글 옵션들 */}
            <div className="space-y-2 pt-1">
              {/* 하이라이트 토글 */}
              <label className="flex items-center justify-between p-3 rounded-tds-m bg-toss-grey-50 dark:bg-toss-dark-surface cursor-pointer">
                <div>
                  <p className="text-[14px] font-semibold text-toss-grey-900 dark:text-white">
                    하이라이트
                  </p>
                  <p className="text-[12px] text-toss-grey-500 dark:text-toss-dark-muted">
                    토스 블루 배경으로 강조해요
                  </p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={form.highlight}
                  onClick={() =>
                    setForm((f) => ({ ...f, highlight: !f.highlight }))
                  }
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-toss-blue-500 focus:ring-offset-2 ${
                    form.highlight
                      ? "bg-toss-blue-500"
                      : "bg-toss-grey-200 dark:bg-toss-dark-border"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-200 ${
                      form.highlight ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </label>

              {/* 외부 링크 토글 */}
              <label className="flex items-center justify-between p-3 rounded-tds-m bg-toss-grey-50 dark:bg-toss-dark-surface cursor-pointer">
                <div>
                  <p className="text-[14px] font-semibold text-toss-grey-900 dark:text-white">
                    새 탭에서 열기
                  </p>
                  <p className="text-[12px] text-toss-grey-500 dark:text-toss-dark-muted">
                    클릭 시 새 탭으로 이동해요
                  </p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={form.isExternal}
                  onClick={() =>
                    setForm((f) => ({ ...f, isExternal: !f.isExternal }))
                  }
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-toss-blue-500 focus:ring-offset-2 ${
                    form.isExternal
                      ? "bg-toss-blue-500"
                      : "bg-toss-grey-200 dark:bg-toss-dark-border"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-200 ${
                      form.isExternal ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </label>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="secondary"
              size="m"
              onClick={handleClose}
              className="flex-1"
            >
              취소
            </Button>
            <Button
              type="submit"
              variant="default"
              size="m"
              className="flex-1"
            >
              추가하기
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

"use client";

import React from "react";
import { LinkItem, IconType } from "@/types/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const LinkSVGs = {
  Portfolio: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
      <rect x="2" y="7" width="20" height="14" rx="3" strokeLinecap="round" strokeLinejoin="round" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  ),
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
  Resume: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" strokeLinecap="round" />
      <line x1="16" y1="17" x2="8" y2="17" strokeLinecap="round" />
      <polyline points="10 9 9 9 8 9" strokeLinecap="round" />
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
  Mail: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
      <rect width="20" height="16" x="2" y="4" rx="3" strokeLinecap="round" strokeLinejoin="round" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  ),
  Globe: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  ChevronRight: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  ),
};

function getLinkIcon(iconName: IconType | string) {
  const iconMap: Record<string, () => React.JSX.Element> = {
    Portfolio: LinkSVGs.Portfolio,
    Github: LinkSVGs.Github,
    Blog: LinkSVGs.Blog,
    Resume: LinkSVGs.Resume,
    Mail: LinkSVGs.Mail,
    Figma: LinkSVGs.Figma,
    Globe: LinkSVGs.Globe,
  };
  return iconMap[iconName] || LinkSVGs.Globe;
}

interface LinkListProps {
  links: LinkItem[];
  onLinkClick: (id: string) => void;
  onAddLink?: () => void;
}

export function LinkList({ links, onLinkClick, onAddLink }: LinkListProps) {
  const activeLinks = [...links]
    .filter((item) => item.isActive !== false)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  return (
    <section className="space-y-2 mb-6">
      <div className="px-1 py-1 flex items-center justify-between">
        <h2 className="text-[15px] font-bold text-toss-grey-900 dark:text-white">
          바로가기
        </h2>
        <div className="flex items-center gap-2">
          <span className="text-[13px] font-medium text-toss-grey-500 dark:text-toss-dark-muted tabular-nums">
            전체 {activeLinks.length}개
          </span>
          {onAddLink && (
            <button
              type="button"
              onClick={onAddLink}
              aria-label="링크 추가"
              className="flex items-center gap-1 text-[13px] font-semibold text-toss-blue-500 hover:text-toss-blue-600 transition-colors px-2 py-1 rounded-tds-s hover:bg-toss-blue-50 dark:hover:bg-toss-dark-blueWeak/30"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
              </svg>
              추가
            </button>
          )}
        </div>
      </div>

      <Card className="overflow-hidden divide-y divide-toss-grey-100 dark:divide-toss-dark-border">
        {activeLinks.length === 0 && (
          <div className="py-12 flex flex-col items-center gap-3 text-center px-6">
            <div className="w-12 h-12 rounded-full bg-toss-grey-100 dark:bg-toss-dark-surface flex items-center justify-center">
              <svg className="w-6 h-6 text-toss-grey-400 dark:text-toss-dark-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
              </svg>
            </div>
            <div>
              <p className="text-[14px] font-semibold text-toss-grey-700 dark:text-toss-dark-subtext">아직 링크가 없어요</p>
              <p className="text-[12px] text-toss-grey-400 dark:text-toss-dark-muted mt-0.5">위의 추가 버튼으로 링크를 등록해보세요</p>
            </div>
          </div>
        )}
        {activeLinks.map((link) => {
          const IconComp = getLinkIcon(link.icon);
          const isMail = link.url.startsWith("mailto:");

          return (
            <a
              key={link.id}
              href={link.url}
              target={link.isExternal && !isMail ? "_blank" : undefined}
              rel={link.isExternal && !isMail ? "noopener noreferrer" : undefined}
              onClick={() => onLinkClick(link.id)}
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
                      <Badge
                        variant={link.highlight ? "outline" : "secondary"}
                        className="text-[11px] font-bold px-1.5 py-0.5 rounded-tds-xs"
                      >
                        {link.tag}
                      </Badge>
                    )}
                  </div>
                  <p className="text-[13px] text-toss-grey-500 dark:text-toss-dark-muted truncate mt-0.5">
                    {link.subtitle}
                  </p>
                </div>
              </div>

              <div className="shrink-0 flex items-center pl-1 text-toss-grey-400 dark:text-toss-dark-muted group-hover:text-toss-grey-700 dark:group-hover:text-white group-hover:translate-x-0.5 transition-all">
                <LinkSVGs.ChevronRight />
              </div>
            </a>
          );
        })}
      </Card>
    </section>
  );
}

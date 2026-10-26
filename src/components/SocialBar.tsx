"use client";

import React from "react";
import { SocialLink } from "@/types/link";
import { Card } from "@/components/ui/card";

const SocialSVGs = {
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
  Linkedin: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" rx="1" />
      <circle cx="4" cy="4" r="2" />
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
};

function getSocialIcon(platform: string) {
  switch (platform.toLowerCase()) {
    case "github":
      return SocialSVGs.Github;
    case "blog":
      return SocialSVGs.Blog;
    case "linkedin":
      return SocialSVGs.Linkedin;
    case "mail":
      return SocialSVGs.Mail;
    default:
      return SocialSVGs.Globe;
  }
}

interface SocialBarProps {
  socials: SocialLink[];
}

export function SocialBar({ socials }: SocialBarProps) {
  if (!socials || socials.length === 0) return null;

  return (
    <Card className="rounded-tds-2xl p-3 mb-4 flex items-center justify-around">
      {socials.map((social) => {
        const Icon = getSocialIcon(social.platform);
        const isMail =
          social.platform === "mail" || social.url.startsWith("mailto:");

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
    </Card>
  );
}

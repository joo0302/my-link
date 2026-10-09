import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "양민주 (Minju Yang) | Profile & Links",
  description: "사용자 중심의 경험을 만드는 프론트엔드 개발자 양민주의 프로필과 링크 모음입니다.",
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" translate="no" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}

import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        toss: {
          blue: {
            50: "#E8F3FF",
            100: "#CFE5FF",
            500: "#3182F6",
            600: "#1B64DA",
            700: "#1653B6",
          },
          grey: {
            50: "#F9FAFB",
            100: "#F2F4F6",
            150: "#ECEFF2",
            200: "#E5E8EB",
            300: "#D1D6DB",
            400: "#B0B8C1",
            500: "#8B95A1",
            600: "#6B7684",
            700: "#4E5968",
            800: "#333D4B",
            900: "#191F28",
          },
          dark: {
            bg: "#101012",
            surface: "#1C1C22",
            card: "#202027",
            elevated: "#2C2C35",
            border: "#32323D",
            divider: "#26262E",
            text: "#FFFFFF",
            subtext: "#A6A6B0",
            muted: "#6B6B78",
            blue: "#3485FA",
            blueWeak: "#1E2A42",
          },
          semantic: {
            red: "#F04452",
            green: "#04B064",
            orange: "#FF8800",
            yellow: "#FFC342",
          },
        },
      },
      borderRadius: {
        "tds-xs": "4px",
        "tds-s": "8px",
        "tds-m": "12px",
        "tds-l": "14px",
        "tds-xl": "16px",
        "tds-2xl": "20px",
        "tds-3xl": "24px",
        "tds-4xl": "32px",
        "tds-full": "999px",
      },
      boxShadow: {
        "tds-1": "0 1px 2px rgba(25, 31, 40, 0.04), 0 1px 1px rgba(25, 31, 40, 0.04)",
        "tds-2": "0 4px 12px rgba(25, 31, 40, 0.06), 0 1px 2px rgba(25, 31, 40, 0.04)",
        "tds-3": "0 12px 32px rgba(25, 31, 40, 0.10), 0 2px 6px rgba(25, 31, 40, 0.06)",
        "tds-toast": "0 8px 24px rgba(25, 31, 40, 0.16)",
        "tds-sheet": "0 -4px 20px rgba(25, 31, 40, 0.08)",
      },
      fontFamily: {
        sans: [
          '"Pretendard Variable"',
          "Pretendard",
          "-apple-system",
          "BlinkMacSystemFont",
          "system-ui",
          "Roboto",
          '"Helvetica Neue"',
          '"Segoe UI"',
          '"Apple SD Gothic Neo"',
          '"Noto Sans KR"',
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};

export default config;

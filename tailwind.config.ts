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
        background: "var(--background)",
        foreground: "var(--foreground)",
        neo: {
          yellow: "#FFE600",
          pink: "#FF70A6",
          blue: "#38BDF8",
          lime: "#A3E635",
          purple: "#C084FC",
          orange: "#FB923C",
          cream: "#FFFDF5",
        },
      },
      boxShadow: {
        neo: "4px 4px 0px 0px #000",
        "neo-sm": "2px 2px 0px 0px #000",
        "neo-lg": "6px 6px 0px 0px #000",
        "neo-xl": "8px 8px 0px 0px #000",
        "neo-dark": "4px 4px 0px 0px #f8fafc",
        "neo-dark-sm": "2px 2px 0px 0px #f8fafc",
        "neo-dark-lg": "6px 6px 0px 0px #f8fafc",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        float: "float 4s ease-in-out infinite",
        marquee: "marquee 18s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;

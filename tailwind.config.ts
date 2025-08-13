import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        'xs': '0.75rem',   // 12px
        'sm': '0.875rem',  // 14px
        'base': '0.95rem', // 15.2px (基準)
        'lg': '1.125rem',  // 18px
        'xl': '1.25rem',   // 20px
        '2xl': '1.5rem',    // 24px
        '3xl': '1.875rem',  // 30px
        '4xl': '2.25rem',   // 36px
        '5xl': '3rem',      // 48px
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",
        "primary-foreground": "var(--primary-foreground)",
        secondary: "var(--secondary)",
        "secondary-foreground": "var(--secondary-foreground)",
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
          red: "var(--accent-red)",
          green: "var(--accent-green)",
        },
        highlight: '#bb5555', // 新しいハイライトカラー
        footerHighlight: '#008877', // フッターのハイライトカラー
        border: "var(--border)",
        'main-green': '#008877',
        'main-red': '#bb5555',
        'dark-charcoal': '#101820',
        'main-green-dark': '#006655',
        'main-red-dark': '#a04040',
      },
      fontFamily: {
        sans: ["var(--font-noto-sans-jp)"],
        serif: ["var(--font-shippori-mincho)"],
      },
    },
  },
  plugins: [],
};
export default config;

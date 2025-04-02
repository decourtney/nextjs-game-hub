import type { Config } from "tailwindcss";
import { heroui } from "@heroui/react";

export default {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        emerald: {
          50: "#ecfdf5",
          100: "#d1fae5",
          200: "#a7f3d0",
          300: "#6ee7b7",
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
          700: "#047857",
          800: "#065f46",
          900: "#064e3b",
          950: "#022c22",
        },
      },
    },
  },
  darkMode: "class",
  plugins: [
    heroui({
      prefix: "heroui",
      addCommonColors: true,
      themes: {
        light: {
          layout: {},
          colors: {
            background: "#FDF6E3", // Light cream background
            foreground: "#059669", // emerald-600 for primary actions
            primary: "#059669", // emerald-600 for primary elements
            secondary: "#FACC15", // Sunny yellow for accents
            content1: "#111827", // Deep slate for text
            content2: "#6EE7B7", // Soft mint green for backgrounds
            content3: "#A78BFA", // Soft purple for borders and dividers
            content4: "#34D399", // Bright green for interactive elements
          },
        },
        dark: {
          layout: {},
          colors: {
            background: "#1E293B", // Dark slate blue
            foreground: "#34D399", // emerald-400 for primary actions
            primary: "#34D399", // emerald-400 for primary elements
            secondary: "#FACC15", // Sunny yellow for accents
            content1: "#E5E7EB", // Light grey for text
            content2: "#064e3b", // emerald-900 for dark backgrounds
            content3: "#065f46", // emerald-800 for dark borders
            content4: "#064e3b", // emerald-900 for dark interactive elements
          },
        },
      },
    }),
  ],
} satisfies Config;

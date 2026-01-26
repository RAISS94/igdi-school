import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}", // Crucial: finds your Hero.tsx
  ],
  theme: {
    extend: {
      colors: {
        school: {
          blue: "#2A5298",
          gold: "#D4AF37",
          sand: "#F4EBD0",
          dark: "#1A2A44",
        },
      },
      fontFamily: {
        amiri: ["var(--font-amiri)"],
        noto: ["var(--font-noto)"],
      },
    },
  },
  plugins: [],
};
export default config;

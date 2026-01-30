import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
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
        // This will now pull the Harmattan font because of the layout.tsx change
        amiri: ["var(--font-amiri)", "serif"],
        noto: ["var(--font-noto)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;

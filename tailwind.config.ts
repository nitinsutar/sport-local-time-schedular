
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0b0d10",
        card: "#111418",
        text: "#e6e7e8",
        mute: "#9aa0a6"
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.25rem'
      }
    }
  },
  plugins: []
};
export default config;

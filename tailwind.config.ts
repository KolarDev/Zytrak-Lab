import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          teal: "#0B6E4F",
          "teal-light": "#E1F5EE",
          navy: "#1A2B5E",
          "navy-light": "#E6F1FB"
        },
        stellar: {
          DEFAULT: "#7B61FF",
          light: "#EEF2FF",
          dark: "#3B1FC2"
        },
        temperature: {
          ambient: "#E7F7F1",
          refrigerated: "#E6F1FB",
          frozen: "#EAF3FF",
          ultra: "#F3EEFF"
        }
      },
      boxShadow: {
        glow: "0 18px 50px rgba(11, 110, 79, 0.15)",
        stellar: "0 16px 48px rgba(123, 97, 255, 0.18)"
      },
      backgroundImage: {
        "hero-mesh":
          "radial-gradient(circle at top left, rgba(123,97,255,0.18), transparent 28%), radial-gradient(circle at top right, rgba(11,110,79,0.16), transparent 32%), linear-gradient(135deg, rgba(255,255,255,0.98), rgba(230,241,251,0.92))"
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["Courier New", "monospace"]
      }
    }
  },
  plugins: []
};

export default config;

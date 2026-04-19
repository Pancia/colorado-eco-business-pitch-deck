/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./scripts/**/*.js"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0e0f0c",
          soft: "#1a1c18",
        },
        bone: {
          DEFAULT: "#f5f1e8",
          soft: "#ece6d6",
        },
        moss: {
          DEFAULT: "#3a4a32",
          deep: "#243020",
          bright: "#5a7049",
        },
        ember: {
          DEFAULT: "#c45a2a",
          deep: "#8f3e1b",
        },
      },
      fontFamily: {
        display: ['"Fraunces"', "ui-serif", "Georgia", "serif"],
        sans: ['"Inter"', "ui-sans-serif", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        wider: "0.08em",
        widest: "0.18em",
      },
      maxWidth: {
        prose: "68ch",
      },
      animation: {
        "fade-in": "fadeIn 800ms ease-out both",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};

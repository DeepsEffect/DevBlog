/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        // Dark Mode Colors
        background: {
          primary: "#121212",
          secondary: "#1E1E1E",
        },
        text: {
          primary: "#E0E0E0",
          secondary: "#B0B0B0",
        },
        accent: "#BB86FC",
        cta: "#03DAC6",
        error: "#CF6679",
        border: "#333333",
        success: "#03DAC6",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};

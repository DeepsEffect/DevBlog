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
        text: "#E0E6ED", // Primary text color, soft and readable
        background: "#121212", // Main background color, deep dark
        primary: "#A3BE8C", // Primary brand color, muted green for accents
        secondary: "#4C566A", // Secondary elements, cool gray
        accent: "#81A1C1", // Accent color, a calm blue for highlights
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      prefix: "nextui", // prefix for themes variables
      addCommonColors: false, // override common colors (e.g. "blue", "green", "pink").
      defaultTheme: "dark", // default theme from the themes object
      defaultExtendTheme: "dark", // default theme to extend on custom themes
      layout: {}, // common layout tokens (applied to all themes)
      themes: {
        light: {
          layout: {}, // light theme layout tokens
          colors: {}, // light theme colors
        },
        dark: {
          layout: {}, // dark theme layout tokens
          colors: {
            text: "#E0E6ED", // Primary text color, soft and readable
            background: "#121212", // Main background color, deep dark
            primary: "#A3BE8C", // Primary brand color, muted green for accents
            secondary: "#4C566A", // Secondary elements, cool gray
            accent: "#81A1C1", // Accent color, a calm blue for highlights 
          },
        },
      },
    }),
  ],
};

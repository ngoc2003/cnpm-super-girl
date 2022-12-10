/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        brittany: ['Brittany Signature']
      },
      colors: {
        primary: "#182359",
        secondary: "#ffbd59",
        error: "#EB5757",
        lightGray: "#f5f6f7",
        darkGray: "#a6a6a6",
      },
    },
  },
  plugins: [],
};

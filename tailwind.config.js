/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
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

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      md: '750px',
      lg: '900px',
      xl: '1000px',
      xxl: '1200px',
      smallTablet: '625px',
    },
    extend: {
      fontFamily: {
        brittany: ['Brittany Signature'],
      },
      colors: {
        primary: '#182359',
        secondary: '#ffbd59',
        error: '#EB5757',
        lightGray: '#f5f6f7',
        darkGray: '#a6a6a6',
        green: 'green',
      },
    },
  },
  plugins: [],
};

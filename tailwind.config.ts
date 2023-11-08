/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      aspectRatio: {
        'card': '26 / 37',
      },
      fontFamily: {
        'serif': ['"Bebas Neue"', ...defaultTheme.fontFamily.serif],
      },
      gridTemplateColumns: {
        '13': 'repeat(13, minmax(0, 1fr))',
      },
      dropShadow: {
        'title': '0.05em 0.05em 0 rgba(0, 0, 0, 1)',
      }
    },
  },
  plugins: [],
}


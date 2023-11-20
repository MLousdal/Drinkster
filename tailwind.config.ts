/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': '375px',
      ...defaultTheme.screens,
    },
    extend: {
      animation: {
        'wiggle': 'wiggle 0.5s ease-in-out infinite'
      },
      aspectRatio: {
        'card': '26 / 37',
      },
      dropShadow: {
        'title': '0.05em 0.05em rgba(0, 0, 0, 1)',
      },
      fontFamily: {
        'serif': ['"Bebas Neue"', ...defaultTheme.fontFamily.serif],
      },
      gridTemplateColumns: {
        '13': 'repeat(13, minmax(0, 1fr))',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-5deg)' },
          '50%': { transform: 'rotate(5deg)' },
        }
      }
    },
  },
  plugins: [],
}


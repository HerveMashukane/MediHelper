/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      keyframes: {
        pageFlip: {
          '0%': { transform: 'rotateY(90deg)', opacity: '0' },
          '100%': { transform: 'rotateY(0deg)', opacity: '1' },
        },
        fadeIn: {
          '0%': {transform: 'translateY(-100%)', opacity: '0'},
          '100%': {transform: 'translateY(0%)', opacity: '1'},
        }
      },
      animation: {
        pageFlip: 'pageFlip 0.5s ease-out forwards',
        fadeIn: 'fadeIn 0.5s ease-in forwards',
      },
    },
  },
  plugins: [],
}
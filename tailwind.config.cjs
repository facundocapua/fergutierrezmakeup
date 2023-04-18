/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'pale-rose': '#e6c4c3'
      },
      fontFamily: {
        sans: ['Rubik', ...defaultTheme.fontFamily.sans],
        handwriting: ['AlexBrush', ...defaultTheme.fontFamily.sans]
      }
    }
  },
  plugins: []
}

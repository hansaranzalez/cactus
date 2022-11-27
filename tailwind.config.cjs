/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
module.exports = {
  important: true,
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      ...colors,
      'green-florofila':'#598858',
      'cloud-white-florofila':'#F5F6FA',
    },
    extend: {},
  },
  plugins: [],
}

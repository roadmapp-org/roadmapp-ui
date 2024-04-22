/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '500px',
      },
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'custom-black': '#333',
      'custom-grey': '#bbb',
      'custom-white': '#eee',
      'custom-blue': '#a5d0e8',
      'purple': '#3f3cbb',
      'midnight': '#121063',
      'metal': '#565584',
      'tahiti': '#3ab7bf',
      'silver': '#ecebff',
      'bubble-gum': '#ff77e9',
      'bermuda': '#78dcca',
    },
  },
  plugins: [],
}


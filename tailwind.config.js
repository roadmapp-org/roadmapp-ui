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
      'custom-grey-2': '#585858',
      'custom-white': '#eee',
      'white': '#fff',
      'custom-blue': '#a5d0e8',
      'color-1': '#e74645',
      'color-2': '#fb7756',
      'color-3': '#facd60',
      'color-4': '#3ab7bf',
      'color-5': '#fdfa66',
      'color-6': '#ff77e9',
      'color-7': '#58b368'
    },
  },
  plugins: [],
}


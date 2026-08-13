/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#ffffff',
        'on-primary': '#2f3131',
        'primary-container': '#e2e2e2',
        'on-primary-container': '#636565', 
        'surface': '#131313',
        'on-surface': '#e5e2e1',
        'on-surface-variant': '#c4c7c8',
        'surface-dim': '#131313',
        'surface-tint': '#c6c6c7',
        'surface-container-low': '#1c1b1b',
      },
      fontFamily: {
        'headline-xl': ['Geist', 'sans-serif'],
        'headline-md': ['Geist', 'sans-serif'],
        'body-md': ['Geist', 'sans-serif'],
        'label-sm': ['Geist', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
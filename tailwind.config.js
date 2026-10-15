/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#bae0fd',
          300: '#7cc7fb',
          400: '#36a9f6',
          500: '#0c8de4',
          600: '#016fc2',
          700: '#02589e',
          800: '#064b82',
          900: '#0b3f6d',
          950: '#072848',
        }
      }
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: '#1E3A8A',
        gold: '#FBBF24',
        teal: '#2DD4BF',
      },
    },
  },
  plugins: [],
};
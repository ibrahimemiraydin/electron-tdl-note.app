/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Enable dark mode using the 'class' strategy
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
      colors: {
        light: {
          bg: 'var(--color-sky-100)',
          text: 'var(--color-sky-900)',
        },
        dark: {
          bg: 'var(--color-slate-800)',
          text: 'var(--color-slate-200)',
        },
      },
    },
  },
  plugins: [],
};

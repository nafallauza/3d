/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sand: {
          DEFAULT: '#a89474',
          light: '#c7b89f',
          dark: '#877353',
          10: 'rgba(168, 148, 116, 0.1)',
          20: 'rgba(168, 148, 116, 0.2)',
          50: 'rgba(168, 148, 116, 0.5)',
        },
        charcoal: {
          DEFAULT: '#2c2824',
          deep: '#1a1816',
          light: '#3d3732',
          10: 'rgba(44, 40, 36, 0.1)',
          20: 'rgba(44, 40, 36, 0.2)',
          50: 'rgba(44, 40, 36, 0.5)',
        },
        cream: '#f5f1ea',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      letterSpacing: {
        tighter: '-0.06em',
        tight: '-0.03em',
        widest: '0.15em',
      }
    },
  },
  plugins: [],
}

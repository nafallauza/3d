/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        tara: {
          navy: '#1B3459',
          blue: '#0B70AD',
          red: '#C91C22',
          dark: '#070E1A',
          surface: '#0D192E',
          slate: '#142542',
          light: '#F8FAFC',
        },
        navy: {
          DEFAULT: '#1B3459',
          dark: '#0B1426',
          deep: '#070E1A',
        },
        primary: {
          DEFAULT: '#0B70AD',
          dark: '#085584',
          light: '#1B8DD3',
        },
        accent: {
          red: '#C91C22',
          light: '#E5383E',
        },
        charcoal: {
          DEFAULT: '#0D192E',
          deep: '#070E1A',
          light: '#142542',
          10: 'rgba(13, 25, 46, 0.1)',
          20: 'rgba(13, 25, 46, 0.2)',
          50: 'rgba(13, 25, 46, 0.5)',
        },
        cream: '#070E1A',
      },
      fontFamily: {
        serif: ['"Playfair Display"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', '"Inter"', 'system-ui', 'sans-serif'],
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

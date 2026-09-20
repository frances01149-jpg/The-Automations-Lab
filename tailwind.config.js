/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#1a3a52',
          50: '#f2f6f9',
          100: '#e0eaf1',
          200: '#c2d5e4',
          300: '#94b6ce',
          400: '#6b9ec9',
          500: '#3f6d92',
          600: '#2d5373',
          700: '#1a3a52',
          800: '#142c3f',
          900: '#0e1f2c',
        },
        sky: {
          DEFAULT: '#6b9ec9',
          light: '#94b6ce',
          dark: '#3f6d92',
        },
        cream: {
          DEFAULT: '#f9f8f5',
          dark: '#efeee9',
        },
        charcoal: {
          DEFAULT: '#3a3a3a',
          light: '#5c5c5c',
          muted: '#8a8a8a',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      letterSpacing: {
        brand: '0.18em',
        wide: '0.32em',
      },
    },
  },
  plugins: [],
}

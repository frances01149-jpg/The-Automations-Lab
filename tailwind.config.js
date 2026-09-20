/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Sampled from the supplied logo artwork — see brandTokens.js.
        navy: {
          DEFAULT: '#142a5e',
          50: '#f2f5fd',
          100: '#e4ebfb',
          200: '#d9e2fc',
          300: '#b3c4f2',
          400: '#8fa9ea',
          500: '#6682d5',
          600: '#4f68b8',
          700: '#2f4485',
          800: '#1f3570',
          900: '#142a5e',
          950: '#0d1c40',
        },
        periwinkle: '#8fa9ea',
        cornflower: {
          DEFAULT: '#6682d5',
          /** Text-safe on cream (5.02:1). Use for accent copy, not the logo. */
          text: '#4f68b8',
        },
        lime: '#dce566',
        ice: '#f4f6ff',
        cream: {
          DEFAULT: '#fbfaf6',
          dark: '#f1efe8',
        },
      },
      fontFamily: {
        serif: ["'PT Serif'", 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

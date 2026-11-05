/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: { sans: ['Poppins', 'system-ui', 'sans-serif'] },
      colors: {
        navy: { 950: '#050E26', 900: '#0A1A3F', 800: '#0E2558', 700: '#14306F' },
        royal: { 600: '#1652C8', 500: '#2463E0', 400: '#4C83F0', 100: '#E6EEFD', 50: '#F3F7FE' },
        brand: { orange: '#F7931E', orange2: '#FF7A00', soft: '#FFF4E8' },
        wa: { DEFAULT: '#1FAF54', dark: '#178A42' },
      },
      boxShadow: {
        card: '0 10px 30px -12px rgba(10,26,63,.18)',
        lift: '0 24px 50px -20px rgba(10,26,63,.35)',
        glow: '0 12px 30px -8px rgba(247,147,30,.55)',
        wa: '0 12px 30px -8px rgba(31,175,84,.55)',
      },
    },
  },
  plugins: [],
}

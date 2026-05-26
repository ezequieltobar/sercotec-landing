/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#e6f0f7',
          100: '#cce1ef',
          200: '#99c3df',
          300: '#66a5cf',
          400: '#3387bf',
          500: '#0069af',
          600: '#00548c',
          700: '#003f69',
          800: '#002a46',
          900: '#001523',
        },
        accent: {
          400: '#f5a623',
          500: '#e8950f',
          600: '#c97d00',
        },
        neutral: {
          50:  '#f8f9fa',
          100: '#f1f3f5',
          200: '#e9ecef',
          300: '#dee2e6',
          400: '#ced4da',
          500: '#adb5bd',
          600: '#6c757d',
          700: '#495057',
          800: '#343a40',
          900: '#212529',
        }
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body:    ['"Source Sans 3"', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'fade-up':   'fadeUp 0.6s ease forwards',
        'fade-in':   'fadeIn 0.5s ease forwards',
        'slide-left':'slideLeft 0.5s ease forwards',
      },
      keyframes: {
        fadeUp:    { from:{ opacity:0, transform:'translateY(24px)' }, to:{ opacity:1, transform:'translateY(0)' } },
        fadeIn:    { from:{ opacity:0 }, to:{ opacity:1 } },
        slideLeft: { from:{ opacity:0, transform:'translateX(24px)' }, to:{ opacity:1, transform:'translateX(0)' } },
      },
    },
  },
  plugins: [],
}

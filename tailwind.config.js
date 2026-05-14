/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Fjord One"', 'Georgia', 'serif'],
        hand: ['"La Belle Aurore"', 'cursive'],
        ui: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'],
        body: ['"Inter"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      colors: {
        ink: {
          primary:   '#111110',
          secondary: '#6b6b6b',
          tertiary:  '#a0a0a0',
        },
        surface: '#ffffff',
        bg:      '#fafaf8',
        accent:  '#d97b6c',
      },
      borderRadius: {
        card: '20px',
        pill: '9999px',
      },
      maxWidth: {
        content: '1200px',
        hero:    '900px',
      },
    },
  },
  plugins: [],
}

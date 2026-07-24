/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './car.html',
    './try-trek.html',
    './founder.html',
    './pay/**/*.html',
    './js/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        trek: {
          bg: '#0a0f1a',
          card: '#0f172a',
          gold: '#facc15',
          emerald: '#10b981',
        },
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './index.html'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF8C42',
        secondary: '#FFB563',
        accent: '#FF6B35',
        dark: '#2A2D34',
        light: '#FFFCF9'
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif']
      }
    }
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: 'class',

  content: [   
    "./pages/**/*.{js,ts,jsx,tsx}",   
    "./components/**/*.{js,ts,jsx,tsx}",  
     ],
  theme: {
    extend: {
      fontSize: {
        'smallest': '0.625rem', // Adjust the value as needed
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      colors: {
        'paper': '#FFFBF6',
        'paper-burnt': '#F5ECE1',
        'paper-burnt-light': '#F5ECE1',
        'contrasting-blue':'#3E7CB1',
        'rich-red':'#D1514E',
        'light-peach':'#F8EDD6',
        'cream':'#F5F1EC',
        'dark-brown':'#5C4438',
        'light-brown':'#8C6D5B'

      },
      fontFamily: {
        Merriweather: ["Merriweather", "cursive"],
       },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwind-scrollbar-hide')
  ],
}

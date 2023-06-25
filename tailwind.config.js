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

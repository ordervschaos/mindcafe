/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: 'class',

  content: [   
    "./pages/**/*.{js,ts,jsx,tsx}",   
    "./components/**/*.{js,ts,jsx,tsx}",  
     ],
  theme: {
  
    extend: {
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

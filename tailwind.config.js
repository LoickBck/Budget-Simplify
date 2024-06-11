/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4CAF4F',
        primary_light: '#DDF1DE',
        secondary: '#263238',
        warning: '#F59E0B',
        neutral: '#F3F4F6', 
        danger: '#A7001E', 
        mint: '#BAEDBD',
        plant: '#A1E3CB',
        background: '#FFFFFF', 
        text: '#4D4D4D', 
      },
      screens: {
        'xxs': '280px',
        'xs': '400px',
        'sm': '640px',
        'md': '768px', 
        'lg': '1024px',
        'xl': '1280px', 
        '2xl': '1536px',
      },
    },
  },
  plugins: [],
}

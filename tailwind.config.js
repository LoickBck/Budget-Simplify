module.exports = {
  content: ['./assets/**/*.{js,jsx,ts,tsx}', './templates/**/*.html.twig'],
  theme: {
    extend: {
      colors: {
        primary: '#4CAF4F',
        primary_light: '#DDF1DE',
        secondary: '#263238',
        third: '#4B5943',
        four: '#7F9473',
        warning: '#F59E0B',
        neutral: '#F3F4F6', 
        danger: '#A7001E', 
        mint: '#BAEDBD',
        plant: '#A1E3CB',
        background: '#FFFFFF', 
        text: '#4D4D4D',
        'green-400': 'rgba(128, 255, 128, 0.8)',
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
      backgroundImage: {
        'overlay': "repeating-linear-gradient(180deg, rgba(0, 0, 0, 0) 0, rgba(0, 0, 0, 0.3) 50%, rgba(0, 0, 0, 0) 100%)",
      },
      keyframes: {
        scan: {
          '0%': { backgroundPosition: '0 -100vh' },
          '35%, 100%': { backgroundPosition: '0 100vh' },
        },
      },
      animation: {
        'scan-animation': 'scan 7.5s linear infinite',
      },
    },
  },
  plugins: [],
}

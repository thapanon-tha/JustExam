const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        orange: colors.orange,
        amber: colors.amber,
        mainColor: '#EF7F4C',
        subColor: '#FFFBFA',
        footerColor: '#3F454C',
        outlineColor: '#EF7F4E',
      },
    },
  },
  plugins: [],
};

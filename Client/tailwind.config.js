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
        editorColor: '#F9CCB7',
      },
      width: {
        '156': '72rem',
      }
    },
  },
  plugins: [],
};

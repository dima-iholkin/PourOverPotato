const konstaConfig = require('konsta/config');

module.exports = konstaConfig({
  content: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode: 'media', // or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
});
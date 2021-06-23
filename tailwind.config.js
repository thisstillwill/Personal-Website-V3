module.exports = {
  mode: 'jit',
  purge: [
    './src/**/*.njk',
    '.eleventy.js',
  ],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

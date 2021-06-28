const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  purge: [
    './src/**/*.njk',
    '.eleventy.js',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: [
            {
              color: theme('colors.gray.900'),
              '[class~="lead"]': {
                color: theme('colors.gray.900'),
              },
              a: {
                color: theme('colors.blue.600'),
              },
              strong: {
                color: theme('colors.gray.900'),
              },
              'ol > li::before': {
                color: theme('colors.gray.900'),
              },
              'ul > li::before': {
                backgroundColor: theme('colors.gray.900'),
              },
              hr: {
                borderColor: theme('colors.gray.900'),
              },
              blockquote: {
                color: theme('colors.gray.900'),
                borderLeftColor: theme('colors.gray.900'),
              },
              h1: {
                color: theme('colors.gray.900'),
              },
              h2: {
                color: theme('colors.gray.900'),
              },
              h3: {
                color: theme('colors.gray.900'),
              },
              h4: {
                color: theme('colors.gray.900'),
              },
              'figure figcaption': {
                color: theme('colors.gray.900'),
              },
              code: {
                color: theme('colors.gray.50'),
              },
              'a code': {
                color: theme('colors.gray.50'),
              },
              pre: {
                color: theme('colors.gray.50'),
                backgroundColor: theme('colors.gray.900'),
              },
              thead: {
                color: theme('colors.gray.900'),
                borderBottomColor: theme('colors.gray.900'),
              },
              'tbody tr': {
                borderBottomColor: theme('colors.gray.900'),
              },
            },
          ],
        },
        light: {
          css: [
            {
              color: theme('colors.gray.50'),
              '[class~="lead"]': {
                color: theme('colors.gray.50'),
              },
              a: {
                color: theme('colors.indigo.700'),
              },
              strong: {
                color: theme('colors.gray.50'),
              },
              'ol > li::before': {
                color: theme('colors.gray.50'),
              },
              'ul > li::before': {
                backgroundColor: theme('colors.gray.50'),
              },
              hr: {
                borderColor: theme('colors.gray.50'),
              },
              blockquote: {
                color: theme('colors.gray.50'),
                borderLeftColor: theme('colors.gray.50'),
              },
              h1: {
                color: theme('colors.gray.50'),
              },
              h2: {
                color: theme('colors.gray.50'),
              },
              h3: {
                color: theme('colors.gray.50'),
              },
              h4: {
                color: theme('colors.gray.50'),
              },
              'figure figcaption': {
                color: theme('colors.gray.50'),
              },
              code: {
                color: theme('colors.gray.900'),
              },
              'a code': {
                color: theme('colors.gray.900'),
              },
              pre: {
                color: theme('colors.gray.900'),
                backgroundColor: theme('colors.gray.50'),
              },
              thead: {
                color: theme('colors.gray.50'),
                borderBottomColor: theme('colors.gray.50'),
              },
              'tbody tr': {
                borderBottomColor: theme('colors.gray.50'),
              },
            },
          ],
        },
      }),
    },
  },
  variants: {
    extend: {
      typography: ['dark'],
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

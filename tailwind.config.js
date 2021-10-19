const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  purge: ["./src/**/*.njk", ".eleventy.js"],
  darkMode: "class",
  theme: {
    colors: {
      primary: {
        DEFAULT: colors.blue[600],
        dark: colors.blue[500],
      },
      background: {
        DEFAULT: colors.gray[50],
        dark: colors.gray[900],
      },
      text: {
        DEFAULT: colors.gray[900],
        dark: colors.gray[100],
      },
      border: {
        DEFAULT: colors.gray[300],
        dark: colors.gray[800],
      },
      princeton: "#e77500",
    },
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: [
            {
              color: theme("colors.text"),
              '[class~="lead"]': {
                color: theme("colors.text"),
              },
              a: {
                color: theme("colors.primary.DEFAULT"),
              },
              strong: {
                color: theme("colors.text"),
              },
              "ol > li::before": {
                color: theme("colors.text"),
              },
              "ul > li::before": {
                backgroundColor: theme("colors.text"),
              },
              hr: {
                borderColor: theme("colors.text"),
              },
              blockquote: {
                color: theme("colors.text"),
                borderLeftColor: theme("colors.border.DEFAULT"),
              },
              "blockquote p:first-of-type::before": { content: "none" },
              "blockquote p:first-of-type::after": { content: "none" },
              h1: {
                color: theme("colors.text"),
              },
              h2: {
                color: theme("colors.text"),
              },
              h3: {
                color: theme("colors.text"),
              },
              h4: {
                color: theme("colors.text"),
              },
              "figure figcaption": {
                color: theme("colors.text"),
              },
              code: {
                color: theme("colors.text"),
              },
              "a code": {
                color: theme("colors.text"),
              },
              pre: {
                color: theme("colors.text"),
              },
              thead: {
                color: theme("colors.text"),
                borderBottomColor: theme("colors.text"),
              },
              "tbody tr": {
                borderBottomColor: theme("colors.text"),
              },
            },
          ],
        },
        light: {
          css: [
            {
              color: theme("colors.text.dark"),
              '[class~="lead"]': {
                color: theme("colors.text.dark"),
              },
              a: {
                color: theme("colors.primary.dark"),
              },
              strong: {
                color: theme("colors.text.dark"),
              },
              "ol > li::before": {
                color: theme("colors.text.dark"),
              },
              "ul > li::before": {
                backgroundColor: theme("colors.text.dark"),
              },
              hr: {
                borderColor: theme("colors.text.dark"),
              },
              blockquote: {
                color: theme("colors.text.dark"),
                borderLeftColor: theme("colors.border.dark"),
              },
              h1: {
                color: theme("colors.text.dark"),
              },
              h2: {
                color: theme("colors.text.dark"),
              },
              h3: {
                color: theme("colors.text.dark"),
              },
              h4: {
                color: theme("colors.text.dark"),
              },
              "figure figcaption": {
                color: theme("colors.text.dark"),
              },
              code: {
                color: theme("colors.text.dark"),
              },
              "a code": {
                color: theme("colors.text.dark"),
              },
              pre: {
                color: theme("colors.text.dark"),
              },
              thead: {
                color: theme("colors.text.dark"),
                borderBottomColor: theme("colors.text.dark"),
              },
              "tbody tr": {
                borderBottomColor: theme("colors.text.dark"),
              },
            },
          ],
        },
      }),
    },
  },
  variants: {
    extend: {
      typography: ["dark"],
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  purge: {
    content: [
      "./src/**/*.njk",
      "./src/**/*.js",
      "./src/**/*.11ty.js",
      "./src/**/*.html",
      ".eleventy.js",
    ],
  },
  darkMode: "class",
  theme: {
    colors: {
      primary: {
        DEFAULT: colors.blue[600],
        dark: colors.blue[500],
        light: colors.blue[400],
      },
      background: {
        DEFAULT: colors.gray[50],
        dark: colors.gray[900],
      },
      text: {
        DEFAULT: colors.gray[900],
        dark: colors.gray[50],
      },
      border: {
        DEFAULT: colors.gray[300],
        dark: colors.gray[800],
      },
      note: {
        DEFAULT: colors.yellow[100],
        dark: colors.gray[800],
      },
      princeton: "#e77500",
    },
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: [
            {
              color: theme("colors.text.DEFAULT"),
              '[class~="lead"]': {
                color: theme("colors.text.DEFAULT"),
              },
              a: {
                color: theme("colors.primary.DEFAULT"),
              },
              strong: {
                color: theme("colors.text.DEFAULT"),
              },
              "ol > li::before": {
                color: theme("colors.text.DEFAULT"),
              },
              "ul > li::before": {
                backgroundColor: theme("colors.text.DEFAULT"),
              },
              hr: {
                borderColor: theme("colors.text.DEFAULT"),
              },
              blockquote: {
                color: theme("colors.text.DEFAULT"),
                borderLeftColor: theme("colors.border.DEFAULT"),
              },
              "blockquote p:first-of-type::before": { content: "none" },
              "blockquote p:first-of-type::after": { content: "none" },
              h1: {
                color: theme("colors.text.DEFAULT"),
              },
              h2: {
                color: theme("colors.text.DEFAULT"),
              },
              h3: {
                color: theme("colors.text.DEFAULT"),
              },
              h4: {
                color: theme("colors.text.DEFAULT"),
              },
              "figure figcaption": {
                color: theme("colors.text.DEFAULT"),
              },
              code: {
                color: theme("colors.text.DEFAULT"),
              },
              "a code": {
                color: theme("colors.text.DEFAULT"),
              },
              pre: {
                color: theme("colors.text.DEFAULT"),
              },
              thead: {
                color: theme("colors.text.DEFAULT"),
                borderBottomColor: theme("colors.text.DEFAULT"),
              },
              "tbody tr": {
                borderBottomColor: theme("colors.text.DEFAULT"),
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
                color: theme("colors.primary.light"),
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

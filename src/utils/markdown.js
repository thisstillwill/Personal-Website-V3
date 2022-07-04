const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const markdownItToc = require("markdown-it-toc-done-right");
const markdownItFootnote = require("markdown-it-footnote");
const markdownItMath = require("@iktakahiro/markdown-it-katex");
const markdownItSup = require("markdown-it-sup");
const markdownItSub = require("markdown-it-sub");
const markdownItAttrs = require("markdown-it-attrs");
const slugify = require("slugify");

// Customize Markdown library and settings:
const markdownLibrary = markdownIt({
  html: true,
  breaks: true,
  linkify: true,
  typographer: true,
})
  .use(markdownItAnchor, {
    permalink: markdownItAnchor.permalink.linkInsideHeader({
      placement: "before",
      style: "aria-label",
      assistiveText: (title) => `Permalink to “${title}”`,
      visuallyHiddenClass: "visually-hidden",
      class: "direct-link",
      symbol: "#",
      level: [2, 3, 4],
      slugify: slugify,
    }),
  })
  .use(markdownItToc, {
    level: [2, 3],
    slugify: slugify,
  })
  .use(markdownItFootnote)
  .use(markdownItMath, {})
  .use(markdownItSup)
  .use(markdownItSub)
  .use(markdownItAttrs);

module.exports = markdownLibrary;

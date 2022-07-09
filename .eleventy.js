// Eleventy plugins
const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginNavigation = require("@11ty/eleventy-navigation");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginImage = require("@11ty/eleventy-img");
const pluginPageAssets = require("eleventy-plugin-page-assets");

// Work with file system
const fs = require("fs");
const path = require("path");

// Access utilities
const filters = require("./src/utils/filters.js");
const components = require("./src/utils/components.js");
const markdownLibrary = require("./src/utils/markdown.js");

const IS_PRODUCTION = process.env.ELEVENTY_ENV === "production";

// Image shortcode using eleventy-img
// https://www.brycewray.com/posts/2021/04/using-eleventys-official-image-plugin/
async function imageShortcode(src, alt) {
  // Generate optimized images only in production
  if (IS_PRODUCTION) {
    const sizes = "(min-width: 1024px) 100vw, 50vw";
    const widths = [600, 900, 1500];
    const formats = ["webp", "jpeg"];
    const imagePathStem = this.page.filePathStem.substring(
      0,
      this.page.filePathStem.indexOf("index")
    );
    const imageSrc = "./src" + imagePathStem + src;
    const outputDir = "./build" + this.page.url;
    const urlPath = "";
    const options = {
      widths: widths,
      formats: formats,
      urlPath: urlPath,
      outputDir: outputDir,
      filenameFormat: function (id, src, width, format, options) {
        const extension = path.extname(src);
        const name = path.basename(src, extension);
        return `${name}-${width}w.${format}`;
      },
    };
    console.log(`Generating image(s) from:  ${imageSrc}`);
    const metadata = await pluginImage(imageSrc, options);
    const imageAttributes = {
      alt,
      sizes,
      loading: "lazy",
      decoding: "async",
    };
    const imageHTML = pluginImage.generateHTML(metadata, imageAttributes);
    return `<figure>
              ${imageHTML}
              <figcaption>${alt}</figcaption>
            </figure>`;
  } else {
    return `<figure>
              <picture>
                <img
                    src="${src}"
                    alt="${alt}"
                    loading="lazy"
                    decoding="async">
              </picture>
              <figcaption>${alt}</figcaption>
            </figure>`;
  }
}

module.exports = function (eleventyConfig) {
  // Register plugins
  eleventyConfig.addPlugin(pluginNavigation);
  eleventyConfig.addPlugin(pluginSyntaxHighlight);
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginPageAssets, {
    mode: "directory",
    postsMatching: "src/{pages,posts,projects}/*/*.md",
    assetsMatching: "*.jpg|*.jpeg|*.png|*.gif|*.mp4|*.webp|*.webm|*.pdf",
  });

  // https://www.11ty.dev/docs/data-deep-merge/
  eleventyConfig.setDataDeepMerge(true);

  // Register image shortcode
  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);

  // Filters
  Object.keys(filters).forEach((filterName) => {
    eleventyConfig.addFilter(filterName, filters[filterName]);
  });

  // Shortcodes
  eleventyConfig.addShortcode("toc", components.toc);
  eleventyConfig.addPairedShortcode("hero", components.hero);
  eleventyConfig.addPairedShortcode(
    "sectionContainer",
    components.sectionContainer
  );
  eleventyConfig.addPairedShortcode("cardContainer", components.cardContainer);
  eleventyConfig.addShortcode("card", components.card);

  // Create a collection of all tags
  eleventyConfig.addCollection("tagList", function (collection) {
    let tagSet = new Set();
    collection.getAll().forEach((item) => {
      (item.data.tags || []).forEach((tag) => tagSet.add(tag));
    });

    return [...tagSet];
  });

  // Pass through static files to output
  eleventyConfig.addPassthroughCopy("src/static");

  // Markdown Parsing
  eleventyConfig.setLibrary("md", markdownLibrary);

  // Override Browsersync defaults (used only with --serve)
  eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready: function (err, browserSync) {
        const content_404 = fs.readFileSync("build/404.html");

        browserSync.addMiddleware("*", (req, res) => {
          // Provides the 404 content without redirect.
          res.writeHead(404, { "Content-Type": "text/html; charset=UTF-8" });
          res.write(content_404);
          res.end();
        });
      },
    },
    ui: false,
    ghostMode: false,
  });

  return {
    // Pre-process *.md files with nunjucks
    markdownTemplateEngine: "njk",

    dir: {
      input: "./src",
      output: "./build",
    },
  };
};

// Eleventy plugins
const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginNavigation = require("@11ty/eleventy-navigation");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginImage = require("@11ty/eleventy-img");

// Work with file system
const fs = require("fs");
const path = require("path");

// Access utilities
const filters = require("./src/utils/filters");
const components = require("./src/utils/components.js");
const markdownLibrary = require("./src/utils/markdown");

const IS_PRODUCTION = process.env.ELEVENTY_ENV === "production";

// Image shortcode using eleventy-img
// https://www.brycewray.com/posts/2021/04/using-eleventys-official-image-plugin/
async function imageShortcode(src, alt) {
  // Generate optimized images only in production
  if (IS_PRODUCTION) {
    let sizes = "(min-width: 1024px) 100vw, 50vw";
    let srcPrefix = `./src/static/images/`;
    src = srcPrefix + src;
    console.log(`Generating image(s) from:  ${src}`);
    if (alt === undefined) {
      // Throw an error on missing alt (alt="" works okay)
      throw new Error(`Missing \`alt\` on responsive image from: ${src}`);
    }
    let metadata = await pluginImage(src, {
      widths: [600, 900, 1500],
      formats: ["webp", "jpeg"],
      urlPath: "/static/images/",
      outputDir: "./build/static/images/",
      /* =====
      Now we'll make sure each resulting file's name will
      make sense to you. **This** is why you need
      that `path` statement mentioned earlier.
      ===== */
      filenameFormat: function (id, src, width, format, options) {
        const extension = path.extname(src);
        const name = path.basename(src, extension);
        return `${name}-${width}w.${format}`;
      },
    });
    let lowsrc = metadata.jpeg[0];
    let highsrc = metadata.jpeg[metadata.jpeg.length - 1];
    return `<figure>
              <picture>
                ${Object.values(metadata)
                  .map((imageFormat) => {
                    return `  <source type="${
                      imageFormat[0].sourceType
                    }" srcset="${imageFormat
                      .map((entry) => entry.srcset)
                      .join(", ")}" sizes="${sizes}">`;
                  })
                  .join("\n")}
                <img
                    src="${lowsrc.url}"
                    width="${highsrc.width}"
                    height="${highsrc.height}"
                    alt="${alt}"
                    loading="lazy"
                    decoding="async">
              </picture>
              <figcaption>${alt}</figcaption>
            </figure>`;
  } else {
    urlPath = "/static/images/" + src;
    return `<figure>
              <picture>
                <img
                    src="${urlPath}"
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

  // https://www.11ty.dev/docs/data-deep-merge/
  eleventyConfig.setDataDeepMerge(true);

  // Generate social preview images in production
  // https://bnijenhuis.nl/notes/2021-05-10-automatically-generate-open-graph-images-in-eleventy/
  eleventyConfig.on("afterBuild", () => {
    if (IS_PRODUCTION) {
      const socialPreviewImagesDir = "build/static/images/social/";
      fs.readdir(socialPreviewImagesDir, function (err, files) {
        if (files.length > 0) {
          files.forEach(function (filename) {
            if (filename.endsWith(".svg")) {
              let imageUrl = socialPreviewImagesDir + filename;
              console.log(`Generating image(s) from:  ${imageUrl}`);
              pluginImage(imageUrl, {
                formats: ["jpeg"],
                outputDir: "./" + socialPreviewImagesDir,
                filenameFormat: function (id, src, width, format, options) {
                  let outputFilename = filename.substring(
                    0,
                    filename.length - 4
                  );

                  return `${outputFilename}.${format}`;
                },
              });
            }
          });
        }
      });
    }
  });

  // Register image shortcode
  // eleventyConfig.addShortcode("image", imageShortcode);
  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);
  eleventyConfig.addLiquidShortcode("image", imageShortcode);
  // === Liquid needed if `markdownTemplateEngine` **isn't** changed from Eleventy default
  eleventyConfig.addJavaScriptFunction("image", imageShortcode);

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
  eleventyConfig.addPassthroughCopy("./src/static");
  eleventyConfig.addPassthroughCopy("./src/fonts");

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

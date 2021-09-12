const { DateTime } = require("luxon");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const fs = require("fs");
const Image = require("@11ty/eleventy-img");
const path = require("path");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");

// Image shortcode using eleventy-img
// https://www.brycewray.com/posts/2021/04/using-eleventys-official-image-plugin/
async function imageShortcode(src, alt) {
  let sizes = "(min-width: 1024px) 100vw, 50vw";
  let srcPrefix = `./src/static/images/`;
  src = srcPrefix + src;
  console.log(`Generating image(s) from:  ${src}`);
  if (alt === undefined) {
    // Throw an error on missing alt (alt="" works okay)
    throw new Error(`Missing \`alt\` on responsive image from: ${src}`);
  }
  let metadata = await Image(src, {
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
}

module.exports = function (eleventyConfig) {
  // Register plugins
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(syntaxHighlight);

  // https://www.11ty.dev/docs/data-deep-merge/
  eleventyConfig.setDataDeepMerge(true);

  // Generate social preview images
  // https://bnijenhuis.nl/notes/2021-05-10-automatically-generate-open-graph-images-in-eleventy/
  eleventyConfig.on("afterBuild", () => {
    const socialPreviewImagesDir = "build/static/images/social/";
    fs.readdir(socialPreviewImagesDir, function (err, files) {
      if (files.length > 0) {
        files.forEach(function (filename) {
          if (filename.endsWith(".svg")) {
            let imageUrl = socialPreviewImagesDir + filename;
            console.log(`Generating image(s) from:  ${imageUrl}`);
            Image(imageUrl, {
              formats: ["jpeg"],
              outputDir: "./" + socialPreviewImagesDir,
              filenameFormat: function (id, src, width, format, options) {
                let outputFilename = filename.substring(0, filename.length - 4);

                return `${outputFilename}.${format}`;
              },
            });
          }
        });
      }
    });
  });

  // Register image shortcode
  // eleventyConfig.addShortcode("image", imageShortcode);
  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);
  eleventyConfig.addLiquidShortcode("image", imageShortcode);
  // === Liquid needed if `markdownTemplateEngine` **isn't** changed from Eleventy default
  eleventyConfig.addJavaScriptFunction("image", imageShortcode);

  // Hero banner
  eleventyConfig.addPairedShortcode(
    "hero",
    (content) => `
            <header class="bg-blue-600 text-gray-50 text-4xl lg:text-5xl dark:bg-indigo-700">
                <div class="max-w-screen-xl px-6 py-8 mx-auto lg:py-12">
                    ${content}
                </div>
            </header>
        `
  );

  // Section container
  eleventyConfig.addPairedShortcode(
    "sectionContainer",
    (content, title) => `
            <section class="max-w-screen-xl px-6 mx-auto mt-8 lg:mt-12">
                <h2 class="text-3xl lg:text-4xl border-b-2 pb-4 border-gray-900 border-dashed dark:border-gray-50">${title}</h2>
                ${content}
            </section>
        `
  );

  // Card container
  eleventyConfig.addPairedShortcode(
    "cardContainer",
    (content) => `
            <div class="grid grid-flow-row gap-8 mt-8 sm:grid-cols-2 lg:grid-cols-3">
                ${content}
            </div>
        `
  );

  // Card component
  eleventyConfig.addShortcode(
    "card",
    (link, titleLevel, title, dateTime, displayTime, description, tags) => `
            <a class="transition duration-150 ease-in-out transform border-2 border-blue-600 rounded-lg hover:scale-105 focus:scale-105 hover:shadow-xl focus:shadow-xl bg-gray-50 dark:border-indigo-700 dark:bg-gray-900" href="${link}">
                <article class="h-full p-4">
                    <${titleLevel} class="text-2xl">${title}</${titleLevel}>
                    <time class="block mt-1 font-mono text-gray-600 text-sm dark:text-gray-200" datetime="${dateTime}">${displayTime}</time>
                    <p class="mt-2 leading-normal">${description}</p>
                    <ul class="flex flex-wrap mt-4">
                        ${(tags || [])
                          .map(function (tag) {
                            return `<li class="mb-2 mr-2">
                        <span class="bg-blue-600 text-gray-50 px-2 py-1 rounded-md text-xs inline-flex font-medium whitespace-nowrap dark:bg-indigo-700">${tag}</span>
                    </li>`;
                          })
                          .join("")}
                    </ul>

                </article>
            </a>
        `
  );

  // Create an array of all tags
  eleventyConfig.addCollection("tagList", function (collection) {
    let tagSet = new Set();
    collection.getAll().forEach((item) => {
      (item.data.tags || []).forEach((tag) => tagSet.add(tag));
    });

    return [...tagSet];
  });

  // Get the first `n` elements of a collection.
  eleventyConfig.addFilter("head", (array, n) => {
    if (n < 0) {
      return array.slice(n);
    }
    return array.slice(0, n);
  });

  // Return only the elements present in another collection
  eleventyConfig.addFilter("filterInCollection", function (array, collection) {
    return (array || []).filter((o) => collection.includes(o));
  });

  // Return only relevant tags
  eleventyConfig.addFilter("filterTagList", (tags) => {
    // should match the list in tags.njk
    return (tags || []).filter(
      (tag) =>
        ["all", "featured", "posts", "projects", "pages"].indexOf(tag) === -1
    );
  });

  // Get the year from a page's date
  eleventyConfig.addFilter("dateYear", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy");
  });

  // Generate a human-readable date string from a page's date
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat(
      "dd LLL yyyy"
    );
  });

  // Generate a valid date string from a page's date
  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-LL-dd");
  });

  // Pass through static files to output
  eleventyConfig.addPassthroughCopy("./src/static");
  eleventyConfig.addPassthroughCopy("./src/*.css");

  // Customize Markdown library and settings:
  let markdownLibrary = markdownIt({
    html: true,
    breaks: true,
    linkify: true,
  }).use(markdownItAnchor, {
    permalink: markdownItAnchor.permalink.linkInsideHeader({
      placement: "before",
      style: "aria-label",
      assistiveText: (title) => `Permalink to “${title}”`,
      visuallyHiddenClass: "visually-hidden",
      class: "direct-link",
      symbol: "#",
      level: [1, 2, 3, 4],
    }),
    slugify: eleventyConfig.getFilter("slug"),
  });
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

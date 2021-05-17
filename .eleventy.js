const { DateTime } = require("luxon");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

module.exports = function (eleventyConfig) {
    // Register plugins
    eleventyConfig.addPlugin(eleventyNavigationPlugin);

    // https://www.11ty.dev/docs/data-deep-merge/
    eleventyConfig.setDataDeepMerge(true);

    // Get the first `n` elements of a collection.
    eleventyConfig.addFilter("head", (array, n) => {
        if (n < 0) {
            return array.slice(n);
        }
        return array.slice(0, n);
    });

    eleventyConfig.addFilter("readableDate", dateObj => {
        return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat("dd LLL yyyy");
    });

    // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
    eleventyConfig.addFilter('htmlDateString', (dateObj) => {
        return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat('yyyy-LL-dd');
    });

    // Pass through static files to output
    eleventyConfig.addPassthroughCopy("./src/static");

    return {
        // Pre-process *.md files with nunjucks
        markdownTemplateEngine: "njk",

        dir: {
            input: "./src",
            output: "./build"
        }
    };
};

const { DateTime } = require("luxon");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function (eleventyConfig) {
    // Register plugins
    eleventyConfig.addPlugin(eleventyNavigationPlugin);
    eleventyConfig.addPlugin(syntaxHighlight);

    // https://www.11ty.dev/docs/data-deep-merge/
    eleventyConfig.setDataDeepMerge(true);

    // Hero banner
    eleventyConfig.addPairedShortcode(
        "hero",
        (content) => `
            <header class="bg-blue-600 text-gray-50 text-4xl lg:text-5xl">
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
                <h2 class="text-3xl lg:text-4xl border-b-2 pb-4 border-gray-900 border-dashed">${title}</h2>
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
        (link, titleLevel, title, dateTime, displayTime, description) => `
            <a class="transition duration-150 ease-in-out transform border-2 border-blue-600 rounded-lg hover:scale-105 focus:scale-105 hover:shadow-xl focus:shadow-xl bg-gray-50" href="${link}">
                <article class="h-full p-4">
                    <${titleLevel} class="text-2xl">${title}</${titleLevel}>
                    <time class="block mt-1 font-mono text-gray-600" datetime="${dateTime}">${displayTime}</time>
                    <p class="mt-2 leading-normal">${description}</p>
                </article>
            </a>
        `
    );

    // Get the first `n` elements of a collection.
    eleventyConfig.addFilter("head", (array, n) => {
        if (n < 0) {
            return array.slice(n);
        }
        return array.slice(0, n);
    });

    // Return only the elements present in another collection
    eleventyConfig.addFilter("filterInCollection", function (array, collection) {
        return (array || []).filter(o => collection.includes(o))
    });

    // Return only relevant tags
    eleventyConfig.addFilter("filterTagList", tags => {
        // should match the list in tags.njk
        return (tags || []).filter(tag => ["all", "featured", "posts", "projects", "pages"].indexOf(tag) === -1);
    });

    // Get the year from a page's date
    eleventyConfig.addFilter("dateYear", dateObj => {
        return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat("yyyy");
    });

    // Generate a human-readable date string from a page's date
    eleventyConfig.addFilter("readableDate", dateObj => {
        return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat("dd LLL yyyy");
    });

    // Generate a valid date string from a page's date
    // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
    eleventyConfig.addFilter('htmlDateString', (dateObj) => {
        return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat('yyyy-LL-dd');
    });

    // Pass through static files to output
    eleventyConfig.addPassthroughCopy("./src/static");
    eleventyConfig.addPassthroughCopy("./src/*.css");

    return {
        // Pre-process *.md files with nunjucks
        markdownTemplateEngine: "njk",

        dir: {
            input: "./src",
            output: "./build"
        }
    };
};

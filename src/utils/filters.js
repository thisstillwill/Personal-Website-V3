const { DateTime } = require("luxon");

module.exports = {
  // Get the first `n` elements of a collection
  head: (array, n) => {
    if (n < 0) {
      return array.slice(n);
    }
    return array.slice(0, n);
  },

  // Get the year from a page's date
  dateYear: (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy");
  },

  // Generate a human-readable date string from a page's date
  readableDate: (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat(
      "dd LLL yyyy"
    );
  },

  // Generate a valid date string from a page's date
  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  htmlDateString: (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-LL-dd");
  },

  // Return only relevant tags
  filterTagList: (tags) => {
    // Should match the list in tags.njk
    return (tags || []).filter(
      (tag) =>
        ["all", "featured", "posts", "projects", "pages"].indexOf(tag) === -1
    );
  },

  // Return only the elements present in another collection
  filterInCollection: (array, collection) => {
    return (array || []).filter((o) => collection.includes(o));
  },
};

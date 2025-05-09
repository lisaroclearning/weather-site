/**
 * ---------------------------------------------------------------
 * File: eleventy.config.js
 * Description: Eleventy configuration file for build and asset handling.
 * ---------------------------------------------------------------
 */

module.exports = function (eleventyConfig) {
  // Copy public assets into _site
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/weather_data.js");

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes", // nunchucks templates
    },
  };
};

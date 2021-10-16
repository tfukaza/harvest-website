const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function(eleventyConfig) {
    // Directories to watch
    eleventyConfig.addWatchTarget("sass");

    // Directories to copy
    eleventyConfig.addPassthroughCopy("asset");

    // Plugins
    eleventyConfig.addPlugin(syntaxHighlight);
};
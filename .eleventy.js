//const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function(eleventyConfig) {
    // Directories to watch
    eleventyConfig.addWatchTarget("src");

    // Directories to copy
    eleventyConfig.addPassthroughCopy("src/asset");

    // Plugins
    // eleventyConfig.addPlugin(syntaxHighlight);

    return {
        dir: {
          input: 'src',
          output: '_site'
        }
    };
};
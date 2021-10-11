

module.exports = function(eleventyConfig) {
    eleventyConfig.addWatchTarget("sass");
    eleventyConfig.addPassthroughCopy("asset");
};
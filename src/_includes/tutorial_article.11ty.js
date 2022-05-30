const util = require('../js/util');


exports.data = {
    title: "Harvest | Docs",
    layout: "doc",
    css: ["docs.css"],
};

  
exports.render = function(data) {

    let content = util.preToDaisyCode(data.content);

    return `
    <article class="min-h-screen">
      
        <h1 class="mt-0">${data.articleTitle}</h1>
          
        ${ content }
    </article>`
}
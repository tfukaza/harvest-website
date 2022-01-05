exports.data = {
    title: "Harvest | Docs",
    layout: "boilerplate",
    css: ["docs.css"],
};

  
exports.render = function(data) {
    
    return `<article>
        <header>
            <h1>${ data.article_title }</h1>
        </header>
        ${ data.content }
    </article>`
}
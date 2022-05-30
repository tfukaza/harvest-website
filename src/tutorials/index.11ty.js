exports.data = {
    title: "Harvest | Tutorials",
    layout: "boilerplate",
    css: ["tutorials.css"],
};


exports.render = function(data) {

    tutorials = [
        {
            title: "Starters",
            items : [
                {
                    title: "Startup Guide",
                    url: "/tutorials/starter",
                    description: "Introduction to installing Harvest, and writing your first algorithm.",
                },
                {
                    title: "CLI",
                    url: "/tutorials/cli",
                    description: "Introduction to the command line interface.",
                },
            ]
        }
    ];

    let categories = [];
    for (let i = 0; i < tutorials.length; i++) {
        let category = tutorials[i];
        let items = [];
        let renderCategory = "<h2>" + category.title + "</h2>";
        renderCategory += `<div class='grid grid-cols-4 gap-4'>`;
        for (let j = 0; j < category.items.length; j++) {
            let item = category.items[j];
            let renderItem = `
                <a class="card bg-base-100 shadow-xl" href="${item.url}">
                    <div class="card-body">
                        <h3 class="card-title">${item.title}</h3>
                        <p>${item.description}</p>
                    </div>
                </a>
            `;
            items.push(renderItem);
        }
        renderCategory += items.join("");
        renderCategory += "</div>";
        categories.push(renderCategory);
    }
    let content = categories.join("");

    
    return `
    <section>
        ${ content }
    </section>`;
}
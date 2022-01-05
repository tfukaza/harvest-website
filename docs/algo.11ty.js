util = require('./util.js');

class Algo {
    data() {
      return {
        title: "Harvest | Docs",
        layout: "boilerplate",
        css: ["docs.css"],
      };
    }
  
    render(data) {
      return `
        ${util.render_menu(data.BaseAlgo)}
        <section>
        <div>
          <h1>Algo</h1>
          ${util.render_all_methods(data.BaseAlgo)}
        </div>
        </section>`;
    }
}

module.exports = Algo;

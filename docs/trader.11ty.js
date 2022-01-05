
var MarkdownIt = require('markdown-it');
util = require('./util.js');
md = new MarkdownIt();

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
        ${util.render_menu(data.LiveTrader)}
        <section>
        <div>
          <h1>Trader</h1>
          ${util.render_all_methods(data.LiveTrader)}
        </div>
        </section>`;
    }
}

module.exports = Algo;

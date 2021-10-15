const data = require('./data/BaseAlgo.json');
const tips = require('./data/def.json');
var MarkdownIt = require('markdown-it'),
md = new MarkdownIt();

class Algo {
    data() {
      return {
        title: "Harvest | Docs",
        layout: "boilerplate",
        css: ["docs.css"],
      };
    }
  
    render() {
      return `
        ${this.render_menu(data)}
        <section>
        <div>
          <h1>Algo</h1>
          ${this.render_all_methods(data)}
        </div>
        </section>`;
    }

    render_menu(data){
      let ret = '<div class="menu">';
      for (let d of data) {
        ret+=`<a href="#${d.index}">${d.index}</a>`;
      }
      return ret+"</div>";
    }

    render_all_methods(data) {
      let ret = '';
      for (let d of data) {
        ret+=`${this.render_method(d)}`;
      }
      return ret;
    }

    render_method(data) {
      let long_description = data.long_description ? data.long_description : "";
      return `
        <div class="method" id="${data.index}">
          <h2>${this.highlight_method_name(data.function, data.params)}</h2>
          <p class="short">${data.short_description}</p>
          <p class="long">${long_description}</p>
          ${this.render_method_params(data.params)}
          ${this.render_method_returns(data.returns)}
          ${this.render_method_raises(data.raises)}
        </div>`;
    }

    highlight_method_name(str, par) {
      str = str.replace(/ /g, '');
      let regex = /[()]/g;
      let matches = str.match(regex);
      let desc_split = str.split(regex);
      //console.log(matches);
      //console.log(desc_split);
      let ret = `<span class="name">${desc_split[0]}</span>(`;
      let params = desc_split[1].split(',');

      ret+=`<span class="param">${params[0]}</span>`;
      params.shift();
      if (params.length != 0) {
        for (let p of params) {
          let class_name = "param";
          for (let q of par) {
            if (q.name === p && !q.optional) { class_name = "param req"; break; }
          }
          ret+=`<span class="comma">, </span><span class="${class_name}">${p}</span>`;
        }
      }
      ret+=`)`;
      return ret;
    } 

    render_method_params(params) {
      if (params !== null && params.length == 0) return '';

      let ret = `<div class="param"><h3>Parameters</h3><h3>Default</h3>`;
      for (let p of params) {
        let def = "";
        if (p.default == null) { def = "<span class='red'>Required</span>";}
        else { def = this.pms(p.default); }
        ret+=`
          <span></span>
          <div class="method-param">
            <p class="a">• ${p.name}</p>
            <p class="b">(${p.type}):</p>
            <p class="c">${this.pms(p.desc)}</p>
            <p class="d">${def}</p>
            <p></p>
          </div>`; 
      }
      return ret+"</div>";
    }

    render_method_returns(returns) {
      let ret = `<div class="returns"><h3>Returns</h3>`;
      return ret+md.render(returns)+"</div>";
    }

    render_method_raises(raises) {
      if (raises === null || raises.length === 0) return '';
      let ret = `<div class="raises"><h3>Raises</h3><ul>`;
      for (let r of raises) {
        ret+=`<li>${r.type}:${r.desc}</li>`;
      }
      return ret+"</ul></div>";
    }

    // Parse Method String
    pms(str){
      if (str === null) return null;
      // Match any {} patterns
      let regex = /{[^{}]+}/g;
      let matches = str.match(regex);
      let desc_split = str.split(regex);

      if (matches === null || matches.length === 0) { return str; }

      //console.log(matches);
      //console.log(desc_split);

      let ret = '';
      let tooltip = null;
      let word = '';
      for (let m of matches){
        ret+=desc_split[0];
        desc_split.shift();
        word = m.replace(/[{}]/g, '');
        tooltip = `<span>${this.get_tooltip(word)}</span>`;
        ret+=`<span class="tooltip">${tooltip}${word}</span>`;
      }
      ret+=desc_split[0];

      //console.log(ret);

      return ret;
    }
    
    get_tooltip(word){
      if (word in tips) {
        return tips[word];
      } else {
        return "";
      }
    }

}

module.exports = Algo;

// let algo_items = [];
//   let trader_items = [];
//   let backtester_items = [];
//   // let algo_func = [];
//   for (let val of algos){
//     algo_items.push(<Function dict={val}></Function>);
//     // algo_func.push(<Link 
//     //                 href={'/docs#'+val["index"]}
//     //                 passHref>
//     //                   <li>{val["index"]}</li></Link>)
//   }
//   for (let val of algos){
//     algo_items.push(<Function dict={val}></Function>);
//   }
//   for (let val of trader){
//     trader_items.push(<Function dict={val}></Function>);
//   }
//   for (let val of backtester){
//     backtester_items.push(<Function dict={val}></Function>);
//   }

//   return (
//     <div className={styles.container}>
//       <Header title="Harvest | Documentation"></Header>
//       <NavBar></NavBar>      
//       <main className={styles.main}>
//           <nav className={`${doc.nav} ${rc.card}`}>
//             <h3>Algo</h3>
//             <h3>Trader</h3>
//             <h3>BackTester</h3>
//           </nav>
//         <section className={styles.section}>
//           <h1>Documentation</h1>
//           <h2 className={doc.className}>harvest.Algo</h2>
//           {algo_items}
//           <h2 className={doc.className}>harvest.Trader</h2>
//           {trader_items}
//           <h2 className={doc.className}>harvest.BackTester</h2>
//           {backtester_items}
//         </section>
//       </main>

//       <Footer></Footer>
//     </div>

  

// function parse_tooltips(text){

//   if (text === undefined) text = "";
//   // Match any {} patterns
//   let regex = /{[^{}]+}/g;
//   let matches = text.match(regex);
//   let desc_split = text.split(regex);

//   let nodes = [];
//   let word = '';
//   let tooltip = null;
//   for (let d of desc_split){
//       nodes.push(d);
//       if (matches !== null && matches.length > 0){
//           word = matches.shift().replace(/[{}]/g, '');
//           tooltip = <span dangerouslySetInnerHTML={{ __html: get_def(word) }}></span>;
//           nodes.push(<span className={doc.lookup}>{tooltip}{word}</span>)
//       }
//   }

//   return [nodes, matches];
// }


// function generate_params(dict){
//   let params=[]
//   // Parse through method parameters
//   for (let v of dict["params"]){
//       let nodes = parse_tooltips(v["desc"]);
//       params.push(
//           <div>
//               <p className={doc.paramName}>• {v["name"]}</p>
//               <p className={doc.paramType}>&nbsp;({v["type"]}):</p>
//               <p>{nodes[0]}</p>
//               <p className={doc.paramDef}>{v["default"]}</p>
//               <p>{nodes[1]}</p>
//           </div>
//       );   
//   }
//   return params;
// }

// function generate_raises(dict){
//   let raises=[];
//   for (let v of dict["raises"]){
//       raises.push(
//           <li><span>{v["type"]+': '}</span>{v["desc"]}</li>
//       );   
//   }
//   return raises;
// }

// function generate_returns(dict){
//   let nodes=[];
//   let text = dict["returns"]; 

//   // Find all lists in the text
//   let lists = text.match(/(\s*\n\s*- .+)+/g);
//   let texts = text.split(/\s*- [^\n]*/).filter(s => s.length > 0);

//   for (let t of texts){
//       nodes.push(<p>{t}</p>);
//       if (lists !== null && lists.length > 0){
//           let list = lists.shift();
//           let lines = list.match(/-.*[^\n]/g);
//           let line_nodes = [];
//           for (let l of lines){
//               line_nodes.push(<li>{l.replace(/- /, '')}</li>);
//           }
//           nodes.push(<ul>{line_nodes}</ul>); 
//       }
//   }

//   return nodes;
// }

// <p>{dict["returns"]}</p>

// export default function Function({dict}) {
//   if (dict === undefined)
//       return(<p>:)</p>);

//   let params = generate_params(dict);
//   let raises = generate_raises(dict);
//   let returns = generate_returns(dict);
//   return (
//           <div className={doc.entry} id={dict["index"]}>
//           <CodeBlock
//               lang="python"
//               value={dict["function"]}>
//           </CodeBlock>
//           <p>{dict["short_description"]}</p>
//           <p className={doc.longDesc}>{dict["long_description"]}</p>
          // <div className={doc.paramHeader}>
          //     <h3>Params:</h3><h4>Default</h4>
          //     {params}
          // </div>
          // <div className={doc.paramReturn}>
          //     <h3>Returns:</h3>{returns}</div>
          // <div className={doc.paramRaise}>
          //     <h3>Raises:</h3>
          //     <ul className={doc.raises}>{raises}</ul></div>
        
          // </div>
//   )
// }
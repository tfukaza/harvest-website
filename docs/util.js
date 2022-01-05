const tips = require('./data/def.json');
var prism = require('prismjs');

var MarkdownIt = require('markdown-it');
var md = new MarkdownIt({
  highlight : function (str, lang) {
    if (lang && prism.languages[lang]) {
      try {
        return prism.highlight(str, prism.languages[lang]);
      } catch (__) {}
    }
    return ''; 
  }});

function render_menu(data){
    let ret = '<div class="menu">';
    for (let d of data) {
      ret+=`<a href="#${d.index}">${d.index}</a>`;
    }
    return ret+"</div>";
  }

 function render_all_methods(data) {
    let ret = '';
    for (let d of data) {
      ret+=`${render_method(d)}`;
    }
    return ret;
  }

 function render_method(data) {
    let long_desc = data.long_description ? data.long_description : "";
    long_desc = md.render(long_desc);
    
    return `
      <div class="method" id="${data.index}">
        <h2>${highlight_method_name(data.function, data.params)}</h2>
        <p class="short">${data.short_description}</p>
        <div class="long">${long_desc}</div>
        ${render_method_params(data.params)}
        ${render_method_returns(data.returns)}
        ${render_method_raises(data.raises)}
      </div>`;
  }

 function highlight_method_name(str, par) {
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
  
 function render_method_params(params) {
    if (params !== null && params.length == 0) return '';

    let ret = `<div class="param"><h3>Parameters</h3>`;
    for (let p of params) {
      let def = "";
      if (p.default == null) { def = "<span class='red'>Required</span>";}
      else { def = pms(p.default); }
      ret+=`
        <span></span>
        <div class="method-param">
          <p class="a">• ${p.name}</p>
          <p class="b">(${p.type}):</p>
          <p class="c">${pms(p.desc)}</p>
          <p></p>
        </div>`; 
    }
    return ret+"</div>";
  }

 function render_method_returns(returns) {
    let ret = `<div class="returns"><h3>Returns</h3>`;
    return ret+md.render(returns)+"</div>";
  }

 function render_method_raises(raises) {
    if (raises === null || raises.length === 0) return '';
    let ret = `<div class="raises"><h3>Raises</h3><ul>`;
    for (let r of raises) {
      ret+=`<li>${r.type}:${r.desc}</li>`;
    }
    return ret+"</ul></div>";
  }

  // Parse Method String
 function pms(str){
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
      tooltip = `<span>${get_tooltip(word)}</span>`;
      ret+=`<span class="tooltip">${tooltip}${word}</span>`;
    }
    ret+=desc_split[0];

    //console.log(ret);

    return ret;
  }
  
 function get_tooltip(word){
    if (word in tips) {
      return tips[word];
    } else {
      return "";
    }
  }

exports.render_menu = render_menu;
exports.render_all_methods = render_all_methods;

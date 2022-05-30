const jsdom = require("jsdom");
const util = require('../js/util');

exports.data = {
    title: "Harvest | Class",
    layout: "doc",
    css: ["../asset/prism-dark-min.css"],
};


function serializeNodeArray(nodes, removeTag = false) {
    // serialize the content
    let serialized = '';
    for (let item of nodes) {
        serialized += (item.outerHTML == undefined || removeTag) ? item.textContent : item.outerHTML;
    }
    return serialized;
}

function serializeTable(nodes) {
    let html = `
    <div class="py-16">
        <div class="hidden font-semibold lg:flex">
            <span class="pr-3 py-3 text-slate-400 uppercase tracking-wide text-xs w-40 flex-none">Parameter</span>
            <span class="pr-3 py-3 text-slate-400 uppercase tracking-wide text-xs grow">Description</span>
            <span class="pr-3 py-3 text-slate-400 uppercase tracking-wide text-xs w-32 flex-none">Default</span>
        </div>
        <div>`;
    for (let item of nodes) {
        // if there is no text, skip
        if (item.textContent == '') {
            continue;
        }
        let params = item.childNodes;
        for (let param of params) {
            let paramText = param.textContent;
            let paramName = paramText.split(':')[0];
            if (paramName.trim() === '') {
                continue;
            }
            // get the parenthesis in paramName
            let paramType = paramName.match(/\(.*\)/g);
            if (paramType != null) {
                paramType = `<span class="text-slate-500">${paramType}</span>`;
            } else {
                paramType = '';
            }

            paramName = paramName.replace(/\(.*\)/g, '');

            let paramDesc = paramText.split(':')[1];
            if (paramDesc === undefined) {
                paramDesc = paramText;
            }
            let paramDefaults = "";
            let isOptional = false;
            if (paramDesc.includes('Default')) {
                paramDesc = paramDesc.split('Default')[0];
                paramDefaults = paramText.split('Default')[1];
            }
            if (paramDesc.includes('(Optional)')) {
                paramDesc = paramDesc.replace('Optional', '');
                isOptional = true;
            }
            html += `
            <div class="lg:flex border-t-[1px] border-slate-200">
                <span class="w-full block lg:inline lg:w-40 py-2 pr-3 flex-none text-sm font-semibold text-slate-700 overflow-scroll">${paramName}${paramType}</span>
                <span class="py-2 pr-3 grow text-sm">${paramDesc}</span>
                <span class="py-2 pr-3 w-32 flex-none text-sm">${paramDefaults}</span>
            </div>`;
    
        }
    }
    html += `
        </div>
    </div>`;

    return html;
}


function formatDoc(html_str){

    // parse the html string into a DOM
    let doc = new jsdom.JSDOM(html_str);
    // divide the html into sections using h1 tags as a separator
    let nodes = doc.window.document.querySelectorAll('h1');
    let sections = [];
    for (let i = 0; i < nodes.length; i++) {
        let section = {};
        section.title = nodes[i].innerHTML;
        let content = [];
        // loop through siblings until the next h1 tag
        let sibling = nodes[i].nextSibling;
        while (sibling && sibling.nodeName !== 'H1') {
            content.push(sibling);
            sibling = sibling.nextSibling;
        }
        section.contents = content;
        sections.push(section);
    }
    console.log(sections);
    // loop through each section and format the content
    let output = '';
    for (let section of sections) {
        //output += `<h1>${section.title}</h1>`;
        let contents = section.contents;
        let i = 0;
        let subsections = {}
        while (i < contents.length) {
            let node = contents[i];
            if (node.nodeName === 'H2') {
                let title = node.innerHTML;
                let content = [];
                i++;
                while (i < contents.length && contents[i].nodeName !== 'H2') {
                    content.push(contents[i]);
                    i++;
                }
            
                subsections[title] = content;
            } else {
                i++;
            }
        }
        console.log(subsections);
        
        for (let key in subsections) {
            switch (key) {
                case 'name':
                    let name = serializeNodeArray(subsections[key], true);
                    // remove parenthesis
                    let funcName = name.replace(/\(.*\)/g, '').trim();
                    output += `<h1 id="${funcName}" class="text-2xl lg:text-4xl font-semibold mb-4">${funcName}</h1>
                    <div class="rounded-lg p-3 bg-slate-50"><code>${name}</code></div>`;
                
                    break;
                case 'desc':
                    let desc = serializeNodeArray(subsections[key]);
                    output += `<p>${desc}</p>`;
                    break;
                case 'example':
                    let example = serializeNodeArray(subsections[key]);
                    console.log(example);
                    /*html*/
                    output += `
                    <div tabindex="0" class="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box"> 
                        <div class="collapse-title text-xl font-medium">
                            Example
                        </div>
                        <div class="collapse-content"> 
                            ${example}
                        </div>
                    </div>
                    `;
                    break;
                case 'param':
                    let param = serializeTable(subsections[key]);
                    output += `${param}`;
                    break;
                case 'returns':
                    let returns = serializeNodeArray(subsections[key]);
                    output += `
                    <h3 class="text-lg text-slate-700 font-semibold">Returns</h3>
                    <div class="return text-sm">${returns}</div>`;
                    break;
            }
        }
        output+=`<div class="divider my-20"></div>`;
    }
    return output;

}

exports.render = function(data) {

    let content = util.preToDaisyCode(data.content);
    content = formatDoc(content);
    return `
        ${content}  
    `;
}
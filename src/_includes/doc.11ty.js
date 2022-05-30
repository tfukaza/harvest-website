const util = require('../js/util');
const fs = require('fs');
const { data } = require('./tutorial_article.11ty');

exports.data = {
    layout: "boilerplate",
};

function getLiquidTitle(file) {
    const content = fs.readFileSync(file, 'utf8');
    let metaText = content.split('---')[1].split('\n');
    let title = {};
    metaText.forEach(m => {
        let [key, value] = m.split(':');
        if (key === 'articleTitle') {
            title.title = value;
        }
    });
    if (title.title == undefined) {
        
    } 
    title.href = file.replace('src', '').replace('.md', '');
        
    return title;

}

function getClassFunctions(file) {
    const content = fs.readFileSync(file, 'utf8');
    // group together lines using h1 as a separator
    let lines = content.split('\n');
    let functions = [];
    for (let line of lines) {
        if (line.startsWith('# ')) {
            line = line.replace('# ', '');
            let func = {
                title: line,
                href: file.replace('src', '').replace('.md', '') + '#' + line.replace(/ /g, '')
            }
            functions.push(func);
        }
    }
    return functions;

}



function sideMenu(data) {
    let tutorialFiles = fs.readdirSync('src/docs/_tutorial');
    // get the liquid template data for each file
    let tutorialTitles = tutorialFiles.map(file => {
        return getLiquidTitle(`src/docs/_tutorial/${file}`);
    });
    
    let classFiles = fs.readdirSync('src/docs/_class');
    let classTitles = classFiles.map(file => {
        return {
            header: file.replace('.md', ''),
            functions: getClassFunctions(`src/docs/_class/${file}`)
        }
    });
    
    
    let urlPrefix = process.env.ELEVENTY_PATH_PREFIX;
    if (urlPrefix === undefined) {
        urlPrefix = '';
    } else {
        urlPrefix = '/' + urlPrefix;
    }

    let html = `
        <div>
        <h3 class="text-sm mb-3 text-gray-400 uppercase font-semibold ">Introduction</h3>
        <ul class="">
    `;
    //html+=`<li class=""><a class="text-sm" href="/docs">Installation</a></li>`;
    // add to index 0
    tutorialTitles.splice(0, 0, {
        title: 'Installation',
        href: '/docs'
    });
    for (let tutorial of tutorialTitles) {
        let cls = "";
        if (data.articleTitle != undefined && tutorial.title.trim() === data.articleTitle.trim()) {
            cls = "bg-gray-200";
        }
        html+=`<li class="flex rounded-sm overflow-hidden ${cls}"><a class="w-full p-2 text-sm" href="${tutorial.href}">${tutorial.title}</a></li>`;
    }
    html+=`</ul>
        <div class="divider"></div>
        <h3 class="text-sm mb-3 text-gray-400 uppercase font-semibold">API</h3>`;
    for (let classTitle of classTitles) {
        let header_href = `${urlPrefix}/docs/_class/${classTitle.header}`;
        let cls = (classTitle.header === data.articleTitle) ? "bg-slate-50" : '';
        /*html*/
        html+=`
        <div class="p-3 rounded-sm overflow-hidden ${cls}">
        <a class="w-full font-semibold text-gray-700" href="${header_href}">${classTitle.header}</a>
            <ul class="">`;
        for (let func of classTitle.functions) {
            /*html*/
            html+=`
            <li class="flex rounded-sm overflow-hidden ${cls}">
                <a class="p-2 text-sm" href="${urlPrefix}${func.href}">${func.title}</a>
            </li>`;
        }
        html+=`</ul></div>`;
    }
    html+=`
    <div class="h-64"></div>
    </div>`;

    return html;
}

exports.render = function(data) {

    let menu = sideMenu(data);
    let content = data.content;
    /*html*/
    return `
        <section class="lg:w-[1000px] mx-auto"
            x-data="{isMoble: false, openMenu: false}"
            x-init="if (window.innerWidth >= 1024) { openMenu = true; }"
            @resize.window="if (window.innerWidth < 1024) { isMoble = true; openMenu = false } else { isMoble = false; openMenu = true; }">
            <aside :class="{
                'transition-all -left-full top-0 fixed h-screen w-72 pt-32 overflow-y-scroll overscroll-y-contain bg-white shadow-lg z-30 ' : !openMenu,
                'transition-all left-0 lg:left-auto top-0 lg:top-auto fixed h-screen w-72 pt-32 overflow-y-scroll overscroll-y-contain bg-white shadow-lg lg:shadow-none z-30 lg:z-0' : openMenu,
            }">
                ${menu}
            </aside>
            <div class="lg:pl-80 lg:pt-40">
                ${content}
            </div>
            <button class="fixed top-24 right-3 btn btn-circle lg:hidden z-40"
                @click="openMenu = !openMenu; console.log(openMenu)">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
        </section>
    `;
}
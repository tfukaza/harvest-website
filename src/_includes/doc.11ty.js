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
            let href = file.replace('src', '').replace('.md', '').replace('\n', '');
            let func = {
                title: line,
                href: href
            }
            functions.push(func);
        }
    }
    return functions;

}



function sideMenu(data) {
    let tutorialFiles = fs.readdirSync('src/docs/Introduction');
    // get the liquid template data for each file
    let tutorialTitles = tutorialFiles.map(file => {
        return getLiquidTitle(`src/docs/Introduction/${file}`);
    });
    
    let classFiles = fs.readdirSync('src/docs/API');
    // ignore files that end with "main.md"
    classFiles = classFiles.filter(file => {
        return !file.endsWith('main.md');
    });
    let classDoc = {};
    for (let file of classFiles) {
        let fileParams = file.replace('.md', '').split('-');
        let className = fileParams[0];
        //let num = fileParams[1];
        //let funcName = fileParams[2];
        let functions = getClassFunctions(`src/docs/API/${file}`);
        if (className in classDoc) {
            classDoc[className] = classDoc[className].concat(functions);
        } else {
            classDoc[className] = functions;
        }
    }
    // let classTitles = classFiles.map(file => {
    //     return {
    //         header: file.replace('.md', ''),
    //         functions: getClassFunctions(`src/docs/API/${file}`)
    //     }
    // });
    
    
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
        html+=`<li class="flex rounded-lg overflow-hidden ${cls} hover:bg-primary hover:text-white transition-all"><a class="w-full p-2 text-sm" href="${urlPrefix}${tutorial.href}">${tutorial.title}</a></li>`;
    }
    html+=`</ul>
        <div class="divider"></div>
        <h3 class="text-sm mb-3 text-gray-400 uppercase font-semibold">API</h3>`;
    for (const [key, value] of Object.entries(classDoc)) {
        let header_href = `${urlPrefix}/docs/API/${key}`;
        let cls = (key === data.articleTitle) ? "bg-slate-50" : '';
        /*html*/
        html+=`
        <div class="p-3 rounded-sm overflow-hidden ${cls}">
        <a class="w-full font-semibold text-gray-700" href="${header_href}">${key}</a>
            <ul class="">`;
        for (let func of value) {
            /*html*/
            html+=`
            <li class="flex rounded-lg hover:bg-primary transition-all overflow-hidden ${cls}">
                <a class="w-full p-2 text-sm" href="${urlPrefix}${func.href}">${func.title}</a>
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
    let breadcrumbs = [];
    let filePathStem = data.page.filePathStem;
    let pages = filePathStem.split('/');
    // if any of the pages have a '-', split and use the last part
    for (let page of pages) {
        if (page.includes('-')) {
            page = page.split('-');
            page = page[page.length - 1];
        }
        if (page != '') {
            breadcrumbs.push(page);
        } 
       
    }
    let bc_str = `
        <div class="text-sm breadcrumbs mb-5">
            <ul>`;
    for (let bc of breadcrumbs) {
        bc_str += `<li>${bc}</li>`;
    }
    bc_str += `</ul>
        </div>`;

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
                ${bc_str}
                ${content}
            </div>
            <button class="fixed top-24 right-3 btn btn-circle lg:hidden z-40"
                @click="openMenu = !openMenu; console.log(openMenu)">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
        </section>
    `;
}
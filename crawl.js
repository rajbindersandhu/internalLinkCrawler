import { JSDOM } from "jsdom";

function normalizeURL(urlString){
    const url = new URL(urlString)
    
    const hostName = url.hostname
    let pathName = url.pathname
    if (pathName.toString().endsWith("/")){
        pathName = pathName.slice(0,-1)
    }
    return (hostName + pathName)
}

function convertRelativeToAbs(urlString, baseUrlString){
    try{
        const urlObj = new URL(urlString)
        if (urlObj.protocol && urlObj.hostname){
            return urlString
        }
    }catch{}
    

    const baseUrlObj = new URL(baseUrlString)
    let absoluteUrlString = urlString
    if (baseUrlObj.pathname && !urlString.includes(baseUrlObj.pathname)){
        if (baseUrlObj.pathname.endsWith("/")){
            if (absoluteUrlString[0] == "/"){
                absoluteUrlString = baseUrlObj.pathname + absoluteUrlString.slice(1)
            }else{
                absoluteUrlString = baseUrlObj.pathname + absoluteUrlString
            }
        }else{
            if (absoluteUrlString[0] == "/"){
                absoluteUrlString = baseUrlObj.pathname + absoluteUrlString
            }else{
                absoluteUrlString = baseUrlObj.pathname + "/" + absoluteUrlString
            }
        }
    }

    if (!urlString.includes(baseUrlObj.hostname)){
        absoluteUrlString = absoluteUrlString[0] == "/" ? (baseUrlObj.hostname + absoluteUrlString) : (baseUrlObj.hostname +"/"+ absoluteUrlString)
    }

    if (baseUrlObj.protocol && !urlString.includes(baseUrlObj.protocol)){
        absoluteUrlString = baseUrlObj.protocol + "//" + absoluteUrlString
    }

    return absoluteUrlString
}

function getAnchorEle(htmlString){
    const domobject = new JSDOM(htmlString);
    const anchorList = domobject.window.document.querySelectorAll("a");
    let urlArray = []
    anchorList.forEach((anchor) => urlArray.push(anchor.getAttribute("href")))
    return urlArray
}

function getUrlFromHtml(htmlString, baseUrl){
    const urlArray = getAnchorEle(htmlString);
    let absUrlArray = [];
    urlArray.forEach((url) => absUrlArray.push(normalizeURL(convertRelativeToAbs(url, baseUrl))));
    return absUrlArray
}

async function fetchHTML(url){
    const res = await fetch(url);
    if (res.status>=400){
        console.log(`Request failed with ${res.status} status`);
        return
    }else if (!res.headers.get("content-type").includes("text/html")){
        //console.log(res.headers)
        console.log(`Response content type is not text/html`)
        return
    }

    let bodyText = await res.text()
    return bodyText
}

async function crawlPage(baseUrl, currentUrl=baseUrl, pages={}){
    const baseUrlObj = new URL(baseUrl)
    const currentUrlObj = new URL(currentUrl)
    if (baseUrlObj.hostname != currentUrlObj.hostname){
        return pages
    }
    if (normalizeURL(currentUrl) in pages){
        pages[normalizeURL(currentUrl)] += 1
        return pages
    }else{
        pages[normalizeURL(currentUrl)] = 1
    }

    
    let bodyText = await fetchHTML(currentUrl)
    if (!bodyText){
        return pages
    }
    let urlList = getUrlFromHtml(bodyText, currentUrl)
    for(let i=0;i<urlList.length;i++){
        pages = await crawlPage(baseUrl, ("https://"+urlList[i]), pages) 
    }
    return pages
}

export {normalizeURL, convertRelativeToAbs, getAnchorEle, getUrlFromHtml, crawlPage};
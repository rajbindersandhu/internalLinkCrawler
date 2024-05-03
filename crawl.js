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
    urlArray.forEach((url) => absUrlArray.push(convertRelativeToAbs(url, baseUrl)));
    return absUrlArray
}

async function crawlPage(url){
    const res = await fetch(url);
    if (res.status>=400){
        throw new Error(`Request failed with ${res.status}status`)
    }else if (!res.headers.get("content-type").includes("text/html")){
        //console.log(res.headers)
        throw new Error(`Response content type is not text/html`)
    }else{
        let bodyText = await res.text()
        console.log(typeof bodyText)
    }
}

export {normalizeURL, convertRelativeToAbs, getAnchorEle, getUrlFromHtml, crawlPage};
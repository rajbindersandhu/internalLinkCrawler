function normalizeURL(urlString){
    const url = new URL(urlString)
    const hostName = url.hostname
    let pathName = url.pathname
    if (pathName.toString().endsWith("/")){
        pathName = pathName.slice(0,-1)
    }
    return (hostName + pathName)
}

export {normalizeURL};
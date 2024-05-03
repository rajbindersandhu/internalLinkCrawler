
function sortPageObjEntry(pageObjEntry){
    return pageObjEntry.sort((a, b) => b[1]-a[1])
}

function generateReport(pageObj){
    let pageObjEntryLst = sortPageObjEntry(Object.entries(pageObj))
    console.log("\n\n================ Report ====================\n\n")
    for (let pageObjEntry of pageObjEntryLst){    
        console.log(` > Found ${pageObjEntry[1]} internal links to ${pageObjEntry[0]}`)
    }
    console.log("\n\n=============================================\n")
}

export {generateReport}
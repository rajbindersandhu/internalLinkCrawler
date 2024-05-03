import {crawlPage} from "./crawl.js"
async function main(){
    const cliArgs = (process.argv).slice(2)
    if (cliArgs.length == 0){
        throw new Error("No base URL provided")
    }else if(cliArgs.length > 1){
        throw new Error("Only one argument is allowed..")
    }else{
        console.log(`Recievd base URL: ${cliArgs[0]}, Starting the crawler...`)
    }

    await crawlPage(cliArgs)
}

await main()
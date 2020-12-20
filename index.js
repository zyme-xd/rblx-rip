const fetch = require('node-fetch');
const readline = require('readline-promise').default.createInterface({
    input: process.stdin,
    output: process.stdout
});
const fs = require('fs');
let headers = ({
    "Accept": "application/json",
    "Content-Type": "application/json",
    "User-Agent": "Roblox/WinInet"
});

main()
async function main() {
    let asset = parseInt(await readline.questionAsync('Enter an asset ID:  '))
    if (isNaN(asset)) {
        console.log("You can't input a string")
        return main()
    }
    let type = await readline.questionAsync('Enter the asset type:    ')
    console.log(`Ok, ripping the asset id ${asset}`)
    switch (type.toLowerCase()) {
        case 'audio':
            type = ".mp3"
            rip2()
            break;
        case 'shirt':
            type = ".png"
            rip()
            break;
        case 'pants':
            type = ".png"
            rip()
            break;
        case 'hat':
            type = ".rbxm"
            rip2()
            break;    
        default:
            console.log("Sorry, you provided an invalid type.")
            return main();
    }
    async function rip() {
        response = await fetch(`https://assetdelivery.roblox.com/v1/asset?id=${asset}`)
            .then(res => res.text())
        newId = response.split("<url>").join().split("</url>").join().split(",")[1].replace(/\D/g, '')
        res = await fetch(`https://assetdelivery.roblox.com/v1/asset?id=${newId}`)
        res.body.pipe(fs.createWriteStream('./folder/' + newId + `${type}`))
        readline.close()
    }
    async function rip2(){
        response = await fetch(`https://assetdelivery.roblox.com/v1/asset?id=${asset}`, {
                method: 'GET',
                headers: headers
            })
            response.body.pipe(fs.createWriteStream('./folder/' + asset + `${type}`))
            readline.close()
    }
}
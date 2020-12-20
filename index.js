const fetch = require('node-fetch');
const readline = require('readline-promise').default.createInterface({
    input: process.stdin,
    output: process.stdout
});
const fs = require('fs');

main()
async function main() {
    let asset = parseInt(await readline.questionAsync('Enter an asset ID:  '))
    if (isNaN(asset)) {
        console.log("You can't input a string")
        return main()
    }
    console.log(`Ok, getting the template for the asset id ${asset}`)
     response = await fetch(`https://assetdelivery.roblox.com/v1/asset?id=${asset}`)
        .then(res => res.text())
    newId = response.split("<url>").join().split("</url>").join().split(",")[1].replace(/\D/g, '')
    res = await fetch(`https://assetdelivery.roblox.com/v1/asset?id=${newId}`)
    res.body.pipe(fs.createWriteStream('./folder/' + newId + '.png'))
    readline.close()
}
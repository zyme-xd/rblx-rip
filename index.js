const fetch = require('node-fetch');
const readline = require('readline-promise').default.createInterface({
    input: process.stdin,
    output: process.stdout
});
const fs = require('fs');

init()

async function init() {
    let asset = parseInt(await readline.questionAsync('Enter an asset ID:  '))
    let regex = /\D/g
    if (isNaN(asset)) {
        console.log("You can't input a string")
        init()
        return
    }
    console.log(`Ok, getting the template for the asset id ${asset}`)
    let text = await fetch(`https://assetdelivery.roblox.com/v1/asset?id=${asset}`)
                .then(res => res.text())
    let newId = text.split("<url>").join().split("</url>").join().split(",")[1].replace(regex, '')
    let res =  await fetch(`https://assetdelivery.roblox.com/v1/asset?id=${newId}`)
    let writestream = fs.createWriteStream('./folder/' + newId + '.png')
    res.body.pipe(writestream)
     readline.close()
}
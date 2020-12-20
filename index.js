const fetch = require('node-fetch');
const readline = require('readline-promise').default.createInterface({
    input: process.stdin,
    output: process.stdout
});
const fs = require('fs');

main()
async function main() {
    let asset = parseInt(await readline.questionAsync('Enter an asset ID:  '))
    let regex = /\D/g
    if (isNaN(asset)) {
        console.log("You can't input a string")
        return main()
    }
    console.log(`Ok, getting the template for the asset id ${asset}`)
    let text = await fetch(`https://assetdelivery.roblox.com/v1/asset?id=${asset}`)
        .then(res => res.text())
    let newId = text.split("<url>").join().split("</url>").join().split(",")[1].replace(regex, '')
    await fetch(`https://thumbnails.roblox.com/v1/assets?assetIds=${newId}&size=700x700&format=Png&isCircular=false`)
        .then(res => res.json())
        .then(res => imageUrl = res.data[0].imageUrl)
    let res = await fetch(imageUrl);
    let writestream = fs.createWriteStream('./folder/' + newId + '.png')
    res.body.pipe(writestream)
    readline.close()
}
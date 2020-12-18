const fetch = require('node-fetch');
const readline = require('readline-promise').default.createInterface({
    input: process.stdin,
    output: process.stdout
});
const fs = require('fs')


init()

async function init() {
    let asset = 2774837067
    let regex = /\D/g
    let newId
    if (isNaN(asset)) {
        console.log("You can't input a string")
        init()
        return
    }
    console.log(`Ok, getting the template for the asset id ${asset}`)
    await fetch(`https://assetdelivery.roblox.com/v1/asset?id=${asset}`)
        .then(res => res.text())
        .then(async function (res) {
            asset = res.split("<url>").join().split("</url>").join().split(",")
            newId = asset[1].replace(regex, '')
            await fetch(`https://thumbnails.roblox.com/v1/assets?assetIds=${newId}&size=700x700&format=Png&isCircular=false`)
                .then(res => res.json())
                .then(async function (json) {
                    asset = json.data[0].imageUrl
                })
        })
}
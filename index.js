const fetch = require('node-fetch')
const readline = require('readline-promise').default.createInterface({
    input: process.stdin,
    output: process.stdout
})
let obj = require('./types.json')
const fs = require('fs')

console.log(`
      _     _                     _       
     | |   | |                   (_)      
_ __ | |__ | |_  __  ______   _ __ _ _ __  
| '__| '_ /| / // / |______| | '__| | '_ |
| |  | |_) | |>  <           | |  | | |_)|
|_|  |_.__/|_/_//_/          |_|  |_| .__/
                                    | |    
                                    |_| `)
console.log('Thanks for installing rblx-rip! Keep in mind some asset types may need to be onsale.')
// i dont remember which types need it, lol
main()
async function main() {
    if (!fs.existsSync("./assets/")) {
        try {
            fs.mkdirSync("./assets")
        } catch (e) {
            console.error("Error!");
            throw e;
        }
    }
    let asset = parseInt(await readline.questionAsync('Enter an asset ID:  '))
    if (isNaN(asset)) {
        console.log("You can't input a string")
        return main()
    }
    let type = await readline.questionAsync('Enter the asset type:  ')
    console.log(`Ok, ripping the asset id ${asset}`)
    if (obj[type.toLowerCase()]) {
        type = obj[type.toLowerCase()]
        rip()
    } else {
        console.log('You entered an invalid type, please try again.')
        return main()
    }
    async function rip() {
        if (type == '.rbxm' || type == '.mp3' || type == '.webm' || type == ".rbxl") {
            response = await download(asset, {
                method: 'GET',
                headers: {
                    'User-Agent': 'Roblox/WinInet'
                }
            });
            response.body.pipe(fs.createWriteStream(`./assets/${asset}${type}`))
        } else if (type == '.rbxmx') {
            resp = await download(asset).then(res => res.text())
            newId = resp.split(";")
            for (i = 0; newId.length > i; i++) {
                res = await download(newId[i])
                response.body.pipe(fs.createWriteStream(`./assets/${newId[i]}${type}`))
            }    
        } else if (type == '.k') {
            console.log("This is coming soon, this isn't done yet.")
        }
        else if (type == '.m'){
            response = await download(asset).then(res => res.text())
            result1 = response.split(/<Content name="TextureId"><url>http:\/\/www.roblox.com\/asset\/\?id=([0-9]+)/)
            result2 = /<Content name="MeshId"><url>http:\/\/www.roblox.com\/asset\/\?id=([0-9]+)/.exec(response)
            response2 = await download(result1[3])
            response3 = await download(result2[1])
            response2.body.pipe(fs.createWriteStream(`./assets/${result1[3]}.png`))
            response3.body.pipe(fs.createWriteStream(`./assets/${result2[1]}.obj`))
        } 
        else if (type == '.z') {
            response = await download(asset).then(res => res.text())
            result1 = /MeshId.*?rbxassetid:\/\/([0-9]+)/.exec(response)
            result2 = /TextureId.*?rbxassetid:\/\/([0-9]+)/.exec(response)
            if (result2 == null){
                result2 = /http:\/\/www.roblox.com\/asset\/\?id=([0-9]+)/.exec(response)
            }
            response2 = await download(result1[1])
            response3 = await download(result2[1])
            response2.body.pipe(fs.createWriteStream(`./assets/${result1[1]}.obj`))
            response3.body.pipe(fs.createWriteStream(`./assets/${result2[1]}.png`))
        } else {
            response = await download(asset).then(res => res.text())
            newId = response.split("<url>").join().split("</url>").join().split(",")[1].replace(/\D/g, '')
            res = await download(newId)
            res.body.pipe(fs.createWriteStream(`./assets/${newId}${type}`))
        }
        readline.close()
    }

}

async function download(asset, headers) {
    return await fetch(`https://assetdelivery.roblox.com/v1/asset?id=${asset}`, headers ? headers : {})
}
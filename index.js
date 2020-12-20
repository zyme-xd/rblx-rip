const fetch = require('node-fetch');
const readline = require('readline-promise').default.createInterface({
    input: process.stdin,
    output: process.stdout
});
const fs = require('fs');

console.log(`
      _     _                     _       
     | |   | |                   (_)      
_ __ | |__ | |_  __  ______   _ __ _ _ __  
| '__| '_ /| / // / |______| | '__| | '_ /
| |  | |_) | |>  <           | |  | | |_)|
|_|  |_.__/|_/_//_/          |_|  |_| .__/
                                    | |    
                                    |_| `)
console.log('Thanks for installing rbx-rip! Please keep in mind you cannot download off-sale assets.')                                    
main()
async function main() {
    let asset = parseInt(await readline.questionAsync('Enter an asset ID:  '))
    if (isNaN(asset)) {
        console.log("You can't input a string")
        return main()
    }
    let type = await readline.questionAsync('Enter the asset type:  ')
    console.log(`Ok, ripping the asset id ${asset}`)
    switch (type.toLowerCase()) {
        case 'audio':
            type = ".mp3"
            rip(); break
        case 'shirt':
            type = ".png"
            rip(); break
        case 'pants':
            type = ".png"
            rip(); break
        case 'hat':
            type = ".rbxm"
            rip(); break
        case 'mesh':
            type = ".rbxm"
            rip(); break
        case 'model':
            type = ".rbxm"
            rip(); break
        default:
            console.log("Sorry, you provided an invalid type.")
            return main();
    }
    async function rip() {
        if (type == '.rbxm' || type == '.mp3') {
            response = await fetch(`https://assetdelivery.roblox.com/v1/asset?id=${asset}`,{method:'GET',headers:{'User-Agent':'Roblox/WinInet'}})
            response.body.pipe(fs.createWriteStream('./folder/' + asset + `${type}`))
            readline.close()
        } else {
            response = await fetch(`https://assetdelivery.roblox.com/v1/asset?id=${asset}`) .then(res => res.text())
            newId = response.split("<url>").join().split("</url>").join().split(",")[1].replace(/\D/g, '')
            res = await fetch(`https://assetdelivery.roblox.com/v1/asset?id=${newId}`)
            res.body.pipe(fs.createWriteStream('./folder/' + newId + `${type}`))
            readline.close()
        }
    }
}
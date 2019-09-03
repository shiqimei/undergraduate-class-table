const dataPath = '../assets/data'
const fs = require('fs')

const nameMapArray = []

fs.readdir(dataPath, (err, files) => {
    files.forEach(file => {
        file = file.replace(/\.json/, '')
        nameMapArray.push([file, file])
    })

    fs.writeFile(dataPath + '/nameMap.json', JSON.stringify(nameMapArray), () => console.log('ok'))
})
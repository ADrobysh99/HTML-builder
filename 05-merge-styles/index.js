const fileSystem = require("fs");
const fs = fileSystem.promises;
const path = require('path');
const src = path.join(__dirname, '../05-merge-styles') + '/styles/';
const dest = path.join(__dirname, '../05-merge-styles') + '/project-dist';
const writeStream = fileSystem.createWriteStream(dest + "/bundle.css");
let data = '';

function writeInBundle(data) { 
    writeStream.write(data, "UTF8");
    writeStream.end()    
    console.log('bundle.css created!')
};

async function createData(src) { 
   const fileNames = await fs.readdir(src)
    for (const filename of fileNames) {
    if (path.parse(src+filename).ext == '.css'){
        const readStream = await fs.readFile(src + filename, 'utf8');
        data += readStream;
    }         
 } 
   writeInBundle(data)
}
createData(src)

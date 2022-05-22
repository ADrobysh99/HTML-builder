const path = require('path');
const fs = require('fs')

folderPath = path.join(__dirname, '../03-files-in-folder') + '/secret-folder';
console.log('file list: ')
function readFiles(dir, processFile) {
    fs.readdir(dir, (error, fileNames) => {
      if (error) throw error;
  
      fileNames.forEach(filename => {
        const name = path.parse(filename).name;
        const ext = path.parse(filename).ext;
        const filepath = path.resolve(dir, filename);
  
        fs.stat(filepath, function(error, stat) {
          if (error) throw error;
          const isFile = stat.isFile();
          if (isFile) {
            processFile(filepath, name, ext, stat);
          }
        });
      });
    });
  }
readFiles(folderPath, (filepath, name, ext, stat) => {
 console.log(name + ' - ' + ext.slice(1) + ' - ' + (stat.size*0.0009766).toFixed(3) + 'kb');
  });

const fs = require('fs');

const path = require('path');

const src = path.join(__dirname, '../04-copy-directory') + '/files';
const dest = path.join(__dirname, '../04-copy-directory') + '/files-copy';

function createDir(dest) {

    fs.access(dest, function (err) { 
        if (err && err.code === 'ENOENT') { 
            fs.mkdir(dest, {
                recursive: true
            }, (error) => {
                if (error) throw error;
            }); 
            copyDir(src, dest)
        } else { 
            fs.readdir(dest, (error, fileNames) => {
                if (error) throw error;
                fileNames.forEach(filename => {

                    fs.unlink(path.join(dest, filename), (error) => {
                        if (error) throw error;
                    })
                })
            })
            copyDir(src, dest)
        }
    });

}

function copyDir(src, dest) {
    fs.readdir(src, {
        withFileTypes: true
    }, (error, fileNames) => {
        if (error) throw error;

        fileNames.forEach(filename => {
            const srcPath = path.join(src, filename.name);
            const destPath = path.join(dest, filename.name);
            if (filename.isDirectory()) {
                copyDir(srcPath, destPath, (error) => {
                    if (error) throw error;
                });
            } else {
                fs.copyFile(srcPath, destPath, (error) => {
                    if (error) throw error;
                });
            }
        })
    })

    console.log('copy dir successful!')
}

createDir(dest)

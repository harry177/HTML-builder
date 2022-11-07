const fs = require('fs');
const path = require('path');

const folderPath = path.join(__dirname, 'secret-folder');


// Reading folder content

fs.readdir(folderPath, {withFileTypes: true}, (error, files) => {
    if (error) throw error;

    files.forEach(file => {
        let directFile = path.join(folderPath, file.name);
        fs.stat(directFile, function (error, stats) {
            if (error) throw error;
            else if (file.isFile()) {
            console.log(path.parse(directFile).name + ' - ' + path.extname(file.name).slice(1) + ' - ' + (stats.size / 1024) + 'kB');
            }
        })
      });
})
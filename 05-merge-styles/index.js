const fs = require('fs');
const path = require('path');

// Defining pathes

const sourceStylePath = path.join(__dirname, 'styles');
const bundleStylePath = path.join(__dirname, 'project-dist', 'bundle.css');

fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true }, error => {
    if (error) throw error;
});

// Creating WriteStream

const writeStream = fs.createWriteStream(bundleStylePath);

// Reading source css-files

fs.readdir(sourceStylePath, (error, files) => {
    if (error) throw error;

    files.forEach(data => {
        if(path.extname(data) === '.css') {

            const streamPath = path.join(__dirname, 'styles', data);

            // Creating ReadStream

            const readStream = fs.createReadStream(streamPath);

            // Piping data from source to dist
            
            readStream.pipe(writeStream);
        }
    })

    
})
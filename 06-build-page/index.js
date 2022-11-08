const fs = require ('fs');
const path = require('path');

const distPath = path.join(__dirname, 'project-dist');
const templatePath = path.join(__dirname, 'template.html');
const componentsPath = path.join(__dirname, 'components');


// Creating project-dist folder

fs.mkdir(distPath, { recursive: true }, error => {
    if(error) throw error;
 });


// Creating index.html + replacing template-tags 


fs.readFile(templatePath, (error, fileContent) => {
    if(error) throw error;

    fs.writeFile(path.join(distPath, 'index.html'), fileContent, error => {
        if(error) throw error;

        fs.readFile(path.join(distPath, 'index.html'), 'utf-8', (error, fileContent) => {
            if(error) throw error;


        fs.readdir(componentsPath, (error, files) => {
            if(error) throw error;

            files.forEach(file => {
                fs.readFile(path.join(componentsPath, file), 'utf-8', (error, content) => {
                    if(error) throw error;
                    fileContent = fileContent.replace(`{{${path.parse(file).name}}}`, content);
                
      
                fs.writeFile(path.join(distPath, 'index.html'), fileContent, error => {
                   if(error) throw error;
                })
            });

        })
    });
            
          })

    });
})

// Defining styles pathes

const sourceStylePath = path.join(__dirname, 'styles');
const bundleStylePath = path.join(__dirname, 'project-dist', 'style.css');


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


// Defining assets pathes

const filesPath = path.join(__dirname, 'assets');
const filesCopyPath = path.join(__dirname, 'project-dist', 'assets');


// Reading source folder + copying folders and files 

fs.readdir(filesPath, {withFileTypes: true}, (error, folders) => {
    if (error) throw error;
     
      folders.forEach(folder => {
        fs.mkdir(path.join(filesCopyPath, folder.name), { recursive: true }, error => {
            if (error) throw error;

          fs.readdir(path.join(filesPath, folder.name), {withFileTypes: true}, (error, files) => {
            if (error) throw error;
             
              files.forEach(file => {
                fs.copyFile(path.join(filesPath, folder.name, file.name), path.join(filesCopyPath, folder.name, file.name), error => {
                    if (error) throw error;
                });
              })
            });
        })
    });
})

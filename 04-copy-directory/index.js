const fs = require ('fs');
const path = require ('path');

// Defining pathes

const filesPath = path.join(__dirname, 'files');
const filesCopyPath = path.join(__dirname, 'files-copy');


// Implementing function

function copyDir() {

// Deleting previous folder + creating new folder
fs.rm(filesCopyPath, { recursive: true, force: true}, error => {
  if(error) throw error;

  fs.mkdir(filesCopyPath, { recursive: true }, error => {
    if(error) throw error;


// Reading source folder + copying files 


    fs.readdir(filesPath, { withFileTypes: true }, (error, files) => {
      if(error) throw error;
    
      files.forEach(file => {
        fs.copyFile(path.join(__dirname, 'files', file.name), path.join(__dirname, 'files-copy', file.name), error => {
          if (error) throw error;
        });
      });
    });
  });
});

}


copyDir();

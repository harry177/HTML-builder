const fs = require('fs');
const process = require('process');
const path = require('path');

/* Creating text.txt with stream (another way):

 const stream = new fs.createWriteStream('./02-write-file/text.txt', 'utf-8');

 stream.on('writable', function() {
    
 }); */

// Creating text.txt with file path + message:

fs.writeFile(
  path.join(__dirname, 'text.txt'), '',
  (error) => {
    if (error) throw error;
    console.log('Greetings! Your message is:');
  }
);

// Offering input; writing input messages into the file.

    
process.stdin.on('data', data => {
    if (data.toString().trim() === 'exit') {
      console.log('Thank you!');
      process.exit();
    }

    fs.appendFile('./02-write-file/text.txt', data, error => {
      if (error) throw error;
    });
  });

  // Cancelling process.

   process.on('SIGINT', () => {
     console.log('Hope, we`ll meet again!');
     process.exit();
 }); 



 

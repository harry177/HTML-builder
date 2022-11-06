
const fs = require('fs');

// 1) Without using ReadStream

// fs.readFile('./01-read-file/text.txt', 'utf-8', (error, data) => {
    // if (error) throw error;
    // console.log(data);
// });


// 2) Using ReadStream

const stream = new fs.ReadStream('./01-read-file/text.txt', 'utf-8');

stream.on('readable', function() {
    const data = stream.read();
    if (data !== null) {
    console.log(data);
    }
});
const fs = require('fs');

fs.writeFileSync('notes.txt', 'This file was created by Node.js!');
fs.appendFileSync('notes.txt', ' This was appended to the file!');
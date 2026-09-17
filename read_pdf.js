const fs = require('fs');
const pdf = require('pdf-parse');

let dataBuffer = fs.readFileSync('catalogo.pdf');

pdf(dataBuffer).then(function(data) {
    console.log(data.text);
}).catch(function(error){
    console.log(error);
});

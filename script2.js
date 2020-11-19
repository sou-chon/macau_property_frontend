const fs = require('fs');
const captionFile = fs.readFileSync('./draft');
const captions = captionFile.toString().split('\n').reverse();

const fileNameFile = fs.readFileSync('./draft2');
const fileName = fileNameFile.toString().split('\n').reverse();

let arr = new Array(16).fill({
    imageFileName: "",
    faceName: "",
    year: 2020
});

arr = arr.map(_ => ({
    imageFileName: fileName.pop(),
    faceName: captions.pop(),
    year: 2020
}))
console.log(JSON.stringify(arr, null, 4));

const fs = require('fs');
const readline = require('readline');

var myInterface = readline.createInterface({
  input: fs.createReadStream('./output.tsv')
});

const json = [];
myInterface.on('line', function (line) {
    
    const el = line.split('\t');
    const prop = {
        "id": el[0],
        "category": el[1],
        "name": el[2],
        "address": el[3],
        "island": el[4],
        "numFaces": el[5],
        "coordinates": el[6],
        "image": el[7]
    };
    
    json.push({
        "type": "Feature",
        "properties": {
            category: prop.category,
            "island": prop.island,
            "name": prop.name,
            "id": prop.id,
            address: prop.address,
            "images": [],
            numFaces: parseInt(prop.numFaces)
        },
        "geometry": {
            "type": "Polygon",
            "coordinates": JSON.parse(`[[${prop.coordinates}]]`)
        }
    });
});

myInterface.on('close', () => {
    console.log(JSON.stringify(json, null, 4));
})

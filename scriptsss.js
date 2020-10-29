const fs = require('fs');
const parse = require('csv-parse/lib/sync');

const coordinatefile = fs.readFileSync('./coordinate.tsv');

let coordinaterecords = parse(coordinatefile, {
    skip_empty_lines: true,
    delimiter: '\t',
    relax_column_count: true,
    columns: [
        'id',
        'category',
        'name',
        'address',
        'island',
        'numFace',
        'coordinate'
    ]
});

const newcoor = fs.readFileSync('./coor.tsv');

let newcoorrecord = parse(newcoor, {
    skip_empty_lines: true,
    delimiter: '\t',
    relax_column_count: true,
    columns: [
        'id',
        'coordinate'
    ]
});
newcoorrecord = newcoorrecord.reduce((a, el) => {
    a[el.id] = el.coordinate;
    return a;
}, {})

coordinaterecords.forEach(el => {
    //console.log(newcoorrecord[el.id]);
    if( newcoorrecord[el.id] !== undefined) {
        el.coordinate = newcoorrecord[el.id];
    }
});



coordinaterecords.forEach(el => {
    const { id, category, name, address, island, numFace, coordinate } = el;
    console.log(`${id}\t${category}\t${name}\t${address}\t${island}\t${numFace}\t${coordinate}`);
});
//console.log(JSON.stringify(coordinaterecords, null, 4));



const fs = require('fs');
const parse = require('csv-parse/lib/sync');

const coordinatefile = fs.readFileSync('./coordinate.tsv');

const coordinaterecords = parse(coordinatefile, {
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

const imagefile_1 = fs.readFileSync('./image_001.tsv');
let imagerecords_1 = parse(imagefile_1, {
    skip_empty_lines: true,
    delimiter: '\t',
    relax_column_count: true,
    columns: [
        'numFace',
        'id_name',
        'Top',
        'F1',
        'F2',
        'F3',
        'F4',
        'F5',
        'F6',
        'D1',
        'D2',
        'D3',
        'D4'
    ]
});
imagerecords_1 = imagerecords_1.map(el => ({ ...el, id: el.id_name.substring(0, el.id_name.indexOf('_')) }));
const relevantCol = [ 'Top', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'D1', 'D2', 'D3', 'D4'];
imagerecords_1 = imagerecords_1.reduce((a, el) => {
    const entry = [];
    relevantCol.forEach(face => {
        if (el[face] !== '') {
            entry.push({
                imageFileName: el[face],
                //thumbnailFileName: string;
                faceName: face,
                year: 2020
            });
        }
    });
    a[el.id] = entry;
    if (entry.length !== parseInt(el.numFace)){
        console.log(el, entry);
        throw Error(el.id);
    }
    return a;
}, {});


/* merge to coordinate */
coordinaterecords.forEach(el => {
    if (imagerecords_1[el.id]) {
        el.images = imagerecords_1[el.id];
    }
});

/* output geojson */
const mappingFunction = el => {
    let coordinate;
    try {
        coordinate = JSON.parse(`[[${el.coordinate}]]`);
    } catch (e) {
        console.log(e);
        console.log(el.coordinate);
        process.exit(1);
    }
    const entry = {
        "type": "Feature",
        "properties": {
            "category": el.category,
            "island": el.island,
            "name": el.name,
            "id": el.id,
            "address": el.address,
            "images": el.images || [],
        },
        "geometry": {
            "type": "Polygon",
            "coordinates": coordinate
        }
    };
    return entry;
};

const macau_records = coordinaterecords.filter(el => el.island === 'Macau');
const taipa_records = coordinaterecords.filter(el => el.island === 'Taipa');
const coloane_records = coordinaterecords.filter(el => el.island === 'Coloane');
const macau_geojson = macau_records.map(mappingFunction);
const taipa_geojson = taipa_records.map(mappingFunction);
const coloane_geojson = coloane_records.map(mappingFunction);

console.log(JSON.stringify(macau_geojson, null, 4));

const fs = require('fs');

const allFile = fs.readdirSync('.');

allFile.forEach(el => {
    if (el.indexOf('/') !== -1) {
        const newFilename = el.replace(new RegExp('\/g'), '_');
        fs.renameSync(`./${el}`, `./${newFilename}`);
    }
});


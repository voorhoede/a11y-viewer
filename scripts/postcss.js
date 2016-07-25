const fs = require('fs');
const postcss = require('postcss');

const inputFilename = 'src/assets/a11y-viewer.css';
const outputDir = 'dist/';
const outputFilename = 'dist/index.css';

postcss([
    require("postcss-custom-properties"),
    require('autoprefixer'),
    require('cssnano')])
    .process(fs.readFileSync(inputFilename), {
        from: inputFilename,
        to: outputDir, // file path relative to output dir
        map: { inline: false }
    })
    .then(function (result) {
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir);
        }

        fs.writeFileSync(outputFilename, result.css);
    });
const fs = require('fs');
const postcss = require('postcss');

const inputFilename = 'src/assets/a11y-viewer.css';
const outputDir = 'dist/';
const outputIndexFile = 'dist/index.html';
const outputIntroFile = 'dist/intro.html';
const indexFile = fs.readFileSync(outputIndexFile);
const introFile = fs.readFileSync(outputIntroFile);
const placeholder = '/* INLINE_CSS_PLACEHOLDER */';

postcss([
    require('postcss-custom-properties'),
    require('autoprefixer'),
    require('cssnano')])
    .process(fs.readFileSync(inputFilename), {
        from: inputFilename,
        to: outputDir, // file path relative to output dir
    })
    .then(function (result) {
        fs.writeFileSync(outputIndexFile, indexFile.toString().replace(placeholder, result.css));
        fs.writeFileSync(outputIntroFile, introFile.toString().replace(placeholder, result.css));
    });
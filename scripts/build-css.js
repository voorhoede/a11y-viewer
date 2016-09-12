'use strict';

const fs = require('fs');
const postcss = require('postcss');

const inputFilename = 'src/assets/a11y-viewer.css';
const outputDir = 'dist/';
const outputFilename = 'dist/index.html';
const indexFile = fs.readFileSync(outputFilename);
const placeholder = '/* INLINE_CSS_PLACEHOLDER */';
const postCSSModules = [];
const requiredModules = [
    'postcss-custom-properties',
    'autoprefixer'
];

if (process.env.NODE_ENV === 'production') {
    requiredModules.push('cssnano');
}

requiredModules.forEach(module => postCSSModules.push(require(module)));

postcss(postCSSModules)
    .process(fs.readFileSync(inputFilename), {
        from: inputFilename,
        to: outputDir // file path relative to output dir
    })
    .then(function (result) {
        fs.writeFileSync(outputFilename, indexFile.toString().replace(placeholder, result.css));
    })
    .catch(function handleError (error) {
        if (error.message) {
            console.log(error.message);
            process.exit(1);
        }
    });

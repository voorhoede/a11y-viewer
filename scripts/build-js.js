'use strict';

const fs = require('fs');
const uglify = require('uglify-js');

const inputFilename = 'src/assets/a11y-viewer.js';
const outputFilename = 'dist/index.html';
const indexFile = fs.readFileSync(outputFilename);
const placeholder = '/* INLINE_JAVASCRIPT_PLACEHOLDER */';
let jsOutput;

try {
	jsOutput = (process.env.NODE_ENV === 'production') ? uglify.minify(inputFilename).code : fs.readFileSync(inputFilename);
} catch (error) {
	console.log('Problem reading JavaScript file from ' + inputFilename + ' : ' + error.message);
	process.exit(1);
}

fs.writeFileSync(outputFilename, indexFile.toString().replace(placeholder, jsOutput));

const fs = require('fs');
const uglify = require('uglify-js');

const inputFilename = 'src/assets/a11y-viewer.js';
const outputFilename = 'dist/index.html';
const indexFile = fs.readFileSync(outputFilename);
const placeholder = '/* INLINE_JAVASCRIPT_PLACEHOLDER */';

var result = uglify.minify(inputFilename, {
    // options taken from: https://davidwalsh.name/compress-uglify
    mangle: true,
    compress: {
        sequences: true,
        dead_code: true,
        conditionals: true,
        booleans: true,
        unused: true,
        if_return: true,
        join_vars: true,
        drop_console: true,
        drop_debugger: true
    }
});

fs.writeFileSync(outputFilename, indexFile.toString().replace(placeholder, result.code));
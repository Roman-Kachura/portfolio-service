const path = require('path');
const staticPath = path.resolve(__dirname, 'static', 'media');
const staticDirectory = path.resolve(__dirname, 'static');
const imagesDirectory = path.resolve(__dirname, 'static', 'images');
const publicDirectory = path.resolve(__dirname, 'public');

exports.staticPath = staticPath;
exports.staticDirectory = staticDirectory;
exports.imagesDirectory = imagesDirectory;
exports.publicDirectory = publicDirectory;

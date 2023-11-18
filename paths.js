const path = require('path');
const staticPath = path.resolve(__dirname, 'assets');
const publicDirectory = path.resolve(__dirname, 'public');

exports.staticPath = staticPath;
exports.publicDirectory = publicDirectory;

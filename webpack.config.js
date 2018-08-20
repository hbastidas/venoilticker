const path = require('path');

module.exports = {
  entry: './index.js',
  output: {
    filename: 'venoilticker.js',
    path: path.resolve(__dirname, 'dist')
  }
};

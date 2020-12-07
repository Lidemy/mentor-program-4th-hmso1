const path = require('path');

module.exports = {
  entry: './homeworks/week13/hw2/src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve('./homeworks/week13/hw2/', 'dist'),
    library: 'commentPlugin'
  },
};
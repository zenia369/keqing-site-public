const path = require('path');

module.exports = {
    mode: 'production',
    entry: './webpack/userProfile/js/main.js',
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, './publicHBS/profile/js'),
    },
}
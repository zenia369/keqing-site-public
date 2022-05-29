const path = require('path');

const configProfile = {
  mode: 'production',
    entry: './webpack/userProfile/js/main.js',
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, './publicHBS/profile/js'),
    },
}

const configLogin = {
  mode: 'production',
  entry: './webpack/login/js/main.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, './public/pages/login/js'),
  },
}

module.exports = configLogin
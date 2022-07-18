const path = require('path');

const glob = require('glob');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const miniCss = require('mini-css-extract-plugin');


module.exports = {
  mode: 'development',
  entry: getEntry(),
  output: {
      filename: '[name]/js/main.js',
      path: path.resolve(__dirname, 'public', 'pages'),
      publicPath: './pages'
  },
  module: {
      rules: [
          {
              test:/\.(s*)css$/,
              use: [
                  miniCss.loader,
                  'css-loader',
                  'sass-loader',
              ]
          },
          {
              test: /\.(png|jpe?g|gif|svg)$/i,
              loader: 'file-loader',
              options: {
                  name: '[name].[ext]',
                  outputPath: (url, resourcePath, context) => {
                      const relativePath = path.relative(context, resourcePath);
          
                      const imgPath = relativePath.toString().trim().match(/[a-zA-Z]{1,}\\([a-zA-Z]{1,}\\img|[a-zA-Z]{1,}\\images)/)[1];

                      return `${imgPath}\\${url}`
                  }
              }
          },
          {
              test: /\.mp3$/,
              loader: 'file-loader',
              options: {
                  name: '[name].[ext]',
                  outputPath: (url, resourcePath, context) => {
                      const relativePath = path.relative(context, resourcePath);

                      const mpPath = relativePath.toString().trim().match(/[a-zA-Z]{1,}\\([a-zA-Z]{1,}\\audio)/)[1];

                      return `${mpPath}\\${url}`
                  }
              }
          },
      ]
   },
  plugins: [
      ...getHtmlTemplate(),
      new miniCss({
          filename: '[name]/styles/style.css',
      }),
  ],
};

//Multi page entry
function getEntry() {
  const entry = {};
  glob.sync('./webpack/**/js/*.js').forEach((file) => {
      const name = (file.match(/([a-zA-Z]{1,})\/js\/([a-zA-Z]{1,}).js/))[1];
      entry[name] = file;
  });
  return entry;
}

//Multi page template
function getHtmlTemplate() {
  return glob
    .sync('./webpack/**/*.html')
    .map((file) => {
        return { 
            name: file.match(/.+\/([a-zA-Z]{1,})\/[a-zA-Z]{1,}.html/)[1],
            fileName: file.match(/.+\/[a-zA-Z]{1,}\/([a-zA-Z]{1,}).html/)[1], 
            path: file 
        };
    })
    .map(
      (template) =>
        new HtmlWebpackPlugin({
          template: template.path,
          chunks: [template.name.toString()],
          filename: `${template.name}/${template.fileName}.html`,
        })
    );
}
// generates html file with the webpack build in the path specified in output property
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    mode: 'development', // or 'production' or 'none'
    devServer: {
      port: 8080
    },
    plugins: [
      new HtmlWebpackPlugin ({
        template: './public/index.html'
      })
    ]
  };
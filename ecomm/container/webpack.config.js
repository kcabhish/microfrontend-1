// generates html file with the webpack build in the path specified in output property
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
module.exports = {
    mode: 'development', // or 'production' or 'none'
    devServer: {
      port: 8080
    },
    plugins: [
        new ModuleFederationPlugin({
            name:'container',
            remotes: {
                products: 'products@http://localhost:8081/remoteEntry.js'
            }

        }),
      new HtmlWebpackPlugin ({
        template: './public/index.html'
      })
    ]
  };
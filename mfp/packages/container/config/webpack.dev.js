// This allows to merge different webpack configs
const { merge } = require('webpack-merge');

const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');
const port = 8080;
const devConfig = {
  mode: 'development',
  devServer: {
    port,
    historyApiFallback: true,
  },
  output: {
    publicPath: `http://localhost:8080/`,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'container',
      remotes: {
        marketing: 'marketing@http://localhost:8081/remoteEntry.js',
        auth: 'auth@http://localhost:8082/remoteEntry.js',
        dashboard: 'dashboard@http://localhost:8083/remoteEntry.js'
      },
      shared: packageJson.dependencies,
    }),
  ],
};

// Prioritizes configs right to left on the parameters
module.exports = merge(commonConfig, devConfig);

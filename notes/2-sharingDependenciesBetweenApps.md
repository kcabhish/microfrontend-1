# Section 2: Sharing Dependencies Between Apps

When there are multiple apps (REMOTE) getting loaded into the container (HOST), there are chances that the remote app could be using common packages. When the HOST applications loads those packages/modules, it will be loading the same module multiple times.

For example:

lets say app1 and app2 has a commong node_module package called `xyzpackage` which is 3mb in size. When these modules are loaded into the host container `xyzpackage` will be loaded 2 times increasing the bundle size to 6mb.

Below is the screenshot with an example of duplicate package being loaded.

![duplicate package](./assets/section2/duplicatePackages.png)

## Using Shared Modules

- Container fetches Products remoteEntry.js
- Container fetches Cart remoteEntry.js
- Container notices that both require and `Faker`package.
- Container can choose to load only one copy from either `Cart`or `Prodcuts`
- Single copy is made available to both `Cart` and `Products`

To fix the issues with loading multiple dependencies, we need to update the webpack.config.js file to include `shared` property in the module federation plugin for the apps using the shared modules.

example from products:

`shared: ['faker']` is added in the ModuleFederationPlugin.

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
module.exports = {
  mode: 'development', // or 'production' or 'none'
  devServer: {
    port: 8081,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'products',
      filename: 'remoteEntry.js',
      exposes: {
        './ProductsIndex': './src/index',
      },
      shared: ['faker']
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
```

## ℹ️ Things to Note

When packages are shared, it will cause issues when trying to load the shared package in the isolated apps when running them individually.

For example: When trying to load the `faker` package in `products`, the app will attempt to load it immediately but fail because it is now shared via the Module Federation plugin. The package is loaded asynchronously, causing function calls that depend on it to fail with the following error message:

```text
Uncaught Error: Shared module is not available for eager consumption: webpack/sharing/consume/default/faker/faker
    at __webpack_require__.m.<computed> (main.js:1057:54)
    at __webpack_require__ (main.js:284:33)
    at fn (main.js:556:21)
    at eval (index.js:2:63)
    at ./src/index.js (main.js:211:1)
    at __webpack_require__ (main.js:284:33)
    at main.js:1677:37
    at main.js:1679:12
```

To fix this we will need to use the dynamic import to load the contents by using the following steps.

1. Create a new file called `bootstrap.js` (file name can be anything)
2. Move all the base codes for the app in the new file.
3. in `index.js` file, load bootstrap using the dynamic import
```
import ('./boostrap');
```


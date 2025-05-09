# Micro Front End Gotchyas!

Adding some peculiar issues noticed during development.

## when Plugin name and id are the same!

- Do not name the `id` in the html as the same variable in `moduleFederationPlugin` in the webpack. When the code is compiled the exported values are created as a global variable and the ids are also generated with the same varibale name during execution. So the file contents will be overwritten by the element if both are named the same.

Example:

Below are the sample `webpack.config.js` file and `ìndex.html` with the same plugin name and id which will cause issue.

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
module.exports = {
  mode: 'development', 
  devServer: {
    port: 8082,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'same-cart-name', // <--This name should not be same as id
      filename: `remoteEntry.js`,
      exposes: {
        './CartShow': './src/bootstrap',
      },
      shared: {
        faker: {
          singleton: true
        }
      }
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ModuleFederation-Cart</title>
</head>
<body>
    <!--
    the id in the html should not be the same as the modulefederationplugin name 
     -->
    <div id="same-cart-name"></div>
</body>
</html>
```


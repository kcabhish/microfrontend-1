# Microfrontend-1

This repository demonstrates a **Micro Frontend Architecture** using **Webpack Module Federation**. It showcases how to build and integrate multiple independently deployable frontend applications into a cohesive user experience.

## 🧩 Overview

The project is structured into multiple microfrontend applications, each responsible for a specific domain or feature. These applications are:

- **ecomm**: Main e-commerce application.
- **products**: Handles product listings and details.
- **cart**: Manages the shopping cart functionality.

Each microfrontend is developed and deployed independently, promoting scalability and maintainability.

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14 or above)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/kcabhish/microfrontend-1.git
   cd microfrontend-1
   ```

2. **Navigate to each microfrontend and install dependencies:**

   ```bash
   cd ecomm
   npm install
   cd ../products
   npm install
   cd ../cart
   npm install
   ```

### Running the Applications

Each microfrontend can be started independently:

1. **Start the `products` application:**

   ```bash
   cd products
   npm start
   ```

2. **Start the `cart` application:**

   ```bash
   cd cart
   npm start
   ```

3. **Start the `ecomm` application:**

   ```bash
   cd ecomm
   npm start
   ```

By default, the applications run on the following ports:

- **ecomm**: http://localhost:8080
- **products**: http://localhost:8081
- **cart**: http://localhost:8082

## 🔧 Module Federation Configuration

Webpack's Module Federation plugin is used to enable sharing of modules between applications. Each microfrontend exposes certain modules, which are then consumed by the `ecomm` application.

**Example configuration in `webpack.config.js`:**

```js
new ModuleFederationPlugin({
  name: 'ecomm',
  remotes: {
    products: 'products@http://localhost:8081/remoteEntry.js',
    cart: 'cart@http://localhost:8082/remoteEntry.js',
  },
});
```

Ensure that each microfrontend's `webpack.config.js` is correctly configured to expose and consume the necessary modules.

## 📌 Things to Note

When packages are shared, it can cause issues when trying to load the shared package in isolated apps when running them individually.

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

To resolve this, ensure that shared modules are properly configured and that dynamic imports are used where necessary.

## 🛠️ Technologies Used

- [React](https://reactjs.org/)
- [Webpack 5](https://webpack.js.org/)
- [Webpack Module Federation](https://webpack.js.org/concepts/module-federation/)
- [JavaScript (ES6+)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

## 📂 Folder Structure

```plaintext
microfrontend-1/
├── ecomm/          # Main container application
├── products/       # Microfrontend for product listings
├── cart/           # Microfrontend for shopping cart
└── README.md       # Project documentation
```

## 📄 License

This project is licensed under the [MIT License](LICENSE).

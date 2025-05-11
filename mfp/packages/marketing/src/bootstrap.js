import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

/**
 * Mount function to start up the project
 * @param {*} el 
 */
const mount = (el) => {
    ReactDOM.render(
        <App />, el
    )
}

/**
 * Check to see if the code is running in development or production
 */

if (process.env.NODE_ENV==='development') {
    const devRoot = document.querySelector('#_marketing-dev-root');
    if (devRoot) {
        mount(devRoot);
    }
}

export { mount };
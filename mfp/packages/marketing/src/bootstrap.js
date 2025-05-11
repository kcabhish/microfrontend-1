import React from 'react';
import ReactDOM from 'react-dom';

/**
 * Mount function to start up the project
 * @param {*} el 
 */
const mount = (el) => {
    ReactDOM.render(
        <h1>Hello World</h1>, el
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
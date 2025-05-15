import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createMemoryHistory, createBrowserHistory } from 'history';

/**
 * Mount function to start up the project
 * @param {*} el
 */
const mount = (el, { onSignIn, onNavigate, defaultHistory, initialPath }) => {
  const history = defaultHistory || createMemoryHistory({
    // This will provide and initial entry for the memory history which will prevent the issue where users will have to click twice to load the 
    // page.
    initialEntries: [initialPath]
  });
  if (onNavigate) {
    history.listen(onNavigate);
  }

  ReactDOM.render(<App history={history} onSignIn={onSignIn}/>, el);
  return {
    onParentNavigate({pathname: nextPathname}) {
        const {pathname} = history.location;
        if (pathname != nextPathname) {
            history.push(nextPathname);
        }
    }
  }
};

/**
 * Check to see if the code is running in development or production
 */

if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector('#_auth-dev-root');
  if (devRoot) {
    // when in dev mode use browser history as default
    mount(devRoot, { defaultHistory: createBrowserHistory() });
  }
}

export { mount };

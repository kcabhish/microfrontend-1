import { createApp} from 'vue';
import Dashboard from './components/Dashboard';


/**
 * Mount function to start up the project
 * @param {*} el
 */
const mount = (el) => {
  const app = createApp(Dashboard);
  // this mount is from vue
  app.mount(el);
};

/**
 * Check to see if the code is running in development or production
 */

if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector('#_dashboard-dev-root');
  if (devRoot) {
    mount(devRoot);
  }
}

export { mount };

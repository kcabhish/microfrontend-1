import faker from 'faker';

const mount = (el) => {
  const cartText = `<div> You have ${faker.random.number()} item`;
  el.innerHTML = cartText;
};

/**
 * Checks to see if the environment is development
 */
if (process.env.NODE_ENV === 'development') {
  /**
   * checks to see if there is a active id called dev-cart.
   * The assumption is that this id is only used when running the
   * app in isolation.
   *
   * This id will be used to determine if the products app is running on isolation.
   * Assumption: This id should only be used in the `public/index.html` and not in the host.
   */
  const el = document.querySelector('#dev-cart');
  if (el) {
    mount(el);
  }
}

export {mount};

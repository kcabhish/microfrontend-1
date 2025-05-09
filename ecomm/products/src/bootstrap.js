import faker from 'faker';

const mount = (el) => {
  console.log('MOUNTED');
  let products = '';

  for (let i = 0; i < 5; i++) {
    const name = faker.commerce.productName();
    products += `<div>${name}</div>`;
  }

  el.innerHTML = products;
};

/**
 * Checks to see if the environment is development
 */
if (process.env.NODE_ENV === 'development') {
  /**
   * checks to see if there is a active id called dev-prodcuts.
   * The assumption is that this id is only used when running the
   * app in isolation.
   *
   * This id will be used to determine if the products app is running on isolation.
   * Assumption: This id should only be used in the `public/index.html` and not in the host.
   */
  const el = document.querySelector('#dev-products');
  if (el) {
    mount(el);
  }
}

export { mount };

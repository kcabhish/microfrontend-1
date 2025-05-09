// This import is generated from the webpack in the remote from moduleFederationPlugin
// by default the import will check for node_modules folder, if it does not find it there, it will seek in the moduleFederationPlugin from the webpack
import {mount as productsMount} from 'products/ProductsIndex';
import {mount as cartMount} from 'cart/CartShow';

productsMount(document.querySelector('#host-products'));
cartMount(document.querySelector('#host-cart'));
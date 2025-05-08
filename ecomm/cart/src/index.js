import faker from 'faker';

const cartText = `<div> You have ${faker.random.number()} item`;

document.querySelector('#dev-cart').innerHTML=cartText;

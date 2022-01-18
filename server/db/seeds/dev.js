const productsObj = require('./products.json');
const orderItemsObj = require('./order_items.json')
const faker = require('faker/locale/en_GB')

// create random integer inclusive of min & max

function getRandomIntInclusive (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}


/**
 * @param { import("knex").Knex } knex
 * 
 * @returns { Promise<void> } 
 */

exports.seed =  async function(knex) {
  
  // truncate all existing tables
  await knex.raw('TRUNCATE TABLE "order_items" CASCADE');
  await knex.raw('TRUNCATE TABLE "orders" CASCADE');
  await knex.raw('TRUNCATE TABLE "cart_items" CASCADE');
  await knex.raw('TRUNCATE TABLE "cart" CASCADE');
  await knex.raw('TRUNCATE TABLE "users" CASCADE');
  await knex.raw('TRUNCATE TABLE "category" CASCADE');
  await knex.raw('TRUNCATE TABLE "products" CASCADE');

  // add categories
  await knex('category').insert([
    {
      category: "men's clothing"
    },
    {
      category: "jewelery"
    },
    {
      category: 'electronics'
    },
    {
      category:"women's clothing"
    }
  ]);

  // add products - note that products.json is converted into an object when imported 
  await knex('products').insert(productsObj.products);

  // add users

  for(let i = 1; i < 101; i++) {
    await knex('users').insert({
      email: faker.internet.email(),
      password: faker.internet.password(),
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
    })
  };

  // add orders 

  for (let i = 1; i < 21; i++) {
    await knex('orders').insert({
      user_id: getRandomIntInclusive(1, 100),
      amount: getRandomIntInclusive(7.95, 2000),
      shipping_address: faker.fake("{{address.streetAddress}}, {{address.city}}, {{address.county}}, {{address.zipCode}}"),
      status: 'fulfilled'
    })
  }

  // add order items. Note: total order amounts wont match with quantity random data
  //Todo add constraint for production on orders.amount : CHECK (SELECT orders.id JOIN order_items.quantity ON order.id = order_items.order_ID)  = orders.amount)
  
  for (let i = 1; i < 31; i++) {
    await knex('order_items').insert({
      order_id: getRandomIntInclusive(1, 20),
      product_id: getRandomIntInclusive(1, 20),
      quantity: getRandomIntInclusive(1, 5),
    });
  };

  // add carts

  for (let i = 1; i < 31; i++) {
    await knex('cart').insert({
      user_id: getRandomIntInclusive(1, 100)
    });
  };

  /// add cart items 

  for (let i = 1; i < 40; i++) {
      await knex('cart_items').insert({
        cart_id: getRandomIntInclusive(1, 30),
        product_id: getRandomIntInclusive(1, 20),
        quantity: getRandomIntInclusive(1, 5)
      });
    };

  return;  
};

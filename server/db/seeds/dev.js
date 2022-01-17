/**
 * @param { import("knex").Knex } knex
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

   return await knex('products').insert(
    {
      title:	"Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
      price:	109.95,
      description:	"Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
      image:	"https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
      raiting:	3.9,
      stock:	120
    }
  );


};

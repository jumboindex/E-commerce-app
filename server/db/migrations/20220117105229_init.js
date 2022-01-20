
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
  .createTable('category', (table) => {
    table.increments();
    table.string('category', 50).notNullable();
    table.timestamps(true, true);
    })
    .createTable('products', (table) => {
      table.increments();
      table.string('title').notNullable();
      table.decimal('price', 5, 2).notNullable();
      table.text('description').notNullable();
      table.text('image').notNullable();
      table.decimal('raiting', 2, 1).notNullable();
      table.integer('stock').notNullable();
      table.integer('category_id').notNullable().references('id').inTable('category');
      table.timestamps(true, true);
    })
    .createTable('users', (table) => {
        table.increments();
        table.string('email', 50).notNullable().unique();
        table.text('password').notNullable();
        table.string('first_name', 50).notNullable();
        table.string('last_name', 50).notNullable();
        table.json('google');
        table.timestamps(true, true);
    })  
    .createTable('cart', (table) => {
        table.increments();
        table.integer('user_id').notNullable().references('id').inTable('users');
        table.timestamps(true, true);
    })  
    .createTable('cart_items', (table) => {
        table.increments();
        table.integer('cart_id').notNullable().references('id').inTable('cart');
        table.integer('product_id').notNullable().references('id').inTable('products');
        table.integer('quantity').notNullable();
        table.timestamps(true, true);
    })
    .createTable('orders', (table) => {
        table.increments();
        table.integer('user_id').notNullable().references('id').inTable('users');
        table.decimal('amount', 6, 2).notNullable();
        table.text('shipping_address').notNullable();
        table.string('status', 30).notNullable();
        table.timestamps(true, true);
    })
    .createTable('order_items', (table) => {
        table.increments();
        table.integer('order_id').notNullable().references('id').inTable('orders');
        table.integer('product_id').notNullable().references('id').inTable('products');
        table.integer('quantity').notNullable();
        table.timestamps(true, true);
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
  .dropTableIfExists('order_items')
  .dropTableIfExists('orders')
  .dropTableIfExists('cart_items')
  .dropTableIfExists('cart')
  .dropTableIfExists('users')
  .dropTableIfExists('products')
  .dropTableIfExists('category');
  
};

const { Client } = require('pg');
const { DB } = require('../config');

const setupDatabase = async () => {

    const productsTable = `
    CREATE TABLE IF NOT EXISTS products (
        id              INT             PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
        title           VARCHAR(50)     NOT NULL,
        price           MONEY           NOT NULL, 
        description     VARCHAR(300)    NOT NULL,
        image           TEXT            NOT NULL,
        raiting         DECIMAL         NOT NULL, 
        stock           INT             NOT NULL
    );
    `
    const categoryTable = `
    CREATE TABLE IF NOT EXISTS category (
        id              INT             PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
        product_id      INT             NOT NULL,
        category        VARCHAR(50)     NOT NULL,
        FOREIGN KEY     (product_id) REFERENCES products(id) 
    );
    `
    const usersTable = `
    CREATE TABLE IF NOT EXISTS users (
        id              INT             PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
        email           VARCHAR(50)     NOT NULL,
        password        TEXT            NOT NULL, 
        first_name      VARCHAR(50)     NOT NULL,
        last_name       VARCHAR(50)     NOT NULL,
        google          JSON            
    );
    `
    const cartTable = `
    CREATE TABLE IF NOT EXISTS cart (
        id              INT             PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
        user_id         INT             NOT NULL,
        created_date    DATE            NOT NULL,
        FOREIGN KEY    (user_id) REFERENCES users(id)         
    );
    `
    const cartItemsTable = `
    CREATE TABLE IF NOT EXISTS cart_items (
        id              INT             PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
        cart_id         INT             NOT NULL,
        product_id      INT             NOT NULL,
        quantity        INT             NOT NULL,
        FOREIGN KEY    (cart_id) REFERENCES cart(id),
        FOREIGN KEY    (product_id) REFERENCES products(id)  
    );
    `

    const orders = `
    CREATE TABLE IF NOT EXISTS orders (
        id                  INT             PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
        user_id             INT             NOT NULL,
        amount              MONEY           NOT NULL,
        order_date          DATE            NOT NULL,
        shipping_address    TEXT            NOT NULL,
        status              VARCHAR(30)     NOT NULL,
        FOREIGN KEY    (user_id) REFERENCES users(id)   
    );
    `
    const orderItems = `
    CREATE TABLE IF NOT EXISTS order_items (
        id              INT             PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
        order_id        INT             NOT NULL,
        product_id      INT             NOT NULL,
        quantity        INT             NOT NULL,
        FOREIGN KEY    (order_id) REFERENCES orders(id),
        FOREIGN KEY    (product_id) REFERENCES products(id)  
    );
    `
    
    try {
        const db = new Client({
            user: DB.PGUSER,
            host: DB.PGHOST,
            database: DB.PGDATABASE,
            password: DB.PGPASSWORD,
            port: DB.PGPORT
        });

        await db.connect();

        //create tables 
        await db.query(productsTable);
        await db.query(categoryTable);
        await db.query(usersTable);
        await db.query(cartTable);
        await db.query(cartItemsTable);
        await db.query(orders);
        await db.query(orderItems);

        await db.end()

    } catch (err) {
        console.log(`Error creating tables: ${err}`);
    }   
};

setupDatabase();
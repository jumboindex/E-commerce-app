const express = require('express');
const cartRouter = require('./cart');
const checkoutRouter = require('./checkout');
const orderRouter = require('./Orders');
const productsRouter = require('./products');
const userRouter = require('./users')

const router = express.Router();
//user endpoint
router.use('/users', userRouter);
//products endpoint
router.use('/products', productsRouter);
//cart endpoint
router.use('/cart', cartRouter);
//order endpoint 
router.use('/orders', orderRouter)
//checkout endpoint 
router.use('/checkout', checkoutRouter)


// 404 
router.use(function (req, res, next) {
    res.status(404).send('route not found!')
});

module.exports = router;


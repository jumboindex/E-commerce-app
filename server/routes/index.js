const express = require('express');
const cartRouter = require('./cart');
const productsRouter = require('./products');
const userRouter = require('./users')

const router = express.Router();
//user endpoint
router.use('/users', userRouter);
//products endpoint
router.use('/products', productsRouter);
//cart endpoint
router.use('/cart', cartRouter);


// 404 
router.use(function (req, res, next) {
    res.status(404).send('route not found!')
});

module.exports = router;


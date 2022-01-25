const express = require('express');
const productsRouter = require('./products');
const userRouter = require('./users')

const router = express.Router();
//user endpoint
router.use('/users', userRouter);
//products endpoint
router.use('/products', productsRouter);


// 404 
router.use(function (req, res, next) {
    res.status(404).send('route not found!')
});

module.exports = router;


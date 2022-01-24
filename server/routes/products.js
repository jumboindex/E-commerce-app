const express = require('express');
const productsRouter = express.Router();
const ProductController = require('../controller/products');

productsRouter.get('/', ProductController.getAllProducts);

productsRouter.get('/:productId', ProductController.getProductById);

module.exports = productsRouter;
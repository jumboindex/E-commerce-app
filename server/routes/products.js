const express = require('express');
const productsRouter = express.Router();
const ProductController = require('../controller/products');
const { routeParam } = require('../dto/schema');
const { validateDto } = require('../middleware/validate-dto');


productsRouter.param('id', (req, res, next, id) => {
    req.body.id = id
    next();
  });
// get all products 
productsRouter.get('/', ProductController.getAllProducts);
// get product by id
productsRouter.get('/:id', validateDto(routeParam), ProductController.getProductById);

module.exports = productsRouter;
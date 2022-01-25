const express = require('express');
const productsRouter = express.Router();
const ProductController = require('../controller/products');
const { routeParam } = require('../dto/schema');
const { validateDto } = require('../middleware/validate-dto');


productsRouter.param('id', (req, res, next, id) => {
    req.body.id = id
    next();
  });

productsRouter.get('/', ProductController.getAllProducts);

productsRouter.get('/:id', validateDto(routeParam), ProductController.getProductById);

module.exports = productsRouter;
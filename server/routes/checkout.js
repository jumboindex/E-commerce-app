const express = require('express');
const checkoutRouter = express.Router();
const OrdersController = require('../controller/orders');
const { orderDTO } = require('../dto/schema');
const { validateDto } = require('../middleware/validate-dto');


checkoutRouter.param('cartId', (req, res, next, id) => {
    req.body.cart_id = id
    next();
}); 

// create new order 
checkoutRouter.post('/create/:cartId',  (req, res, next) => {
    // todo authentication middleware
    next()
}, validateDto(orderDTO), OrdersController.createOrder);

module.exports = checkoutRouter;
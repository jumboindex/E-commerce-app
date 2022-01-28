const express = require('express');
const orderRouter = express.Router();
const OrdersController = require('../controller/orders')



orderRouter.param('cartId', (req, res, next, id) => {
    req.body.cart_id = id
    next();
}); 



// create new cart 
orderRouter.post('/create/:cartId',  (req, res, next) => {
    // todo authentication middleware
    next()
}, OrdersController.createOrder);





module.exports = orderRouter;
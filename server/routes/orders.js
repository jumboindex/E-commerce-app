const express = require('express');
const orderRouter = express.Router();
const OrdersController = require('../controller/orders');
const { orderDTO, routeParamOrderId } = require('../dto/schema');
const { validateDto } = require('../middleware/validate-dto');

orderRouter.param('cartId', (req, res, next, id) => {
    req.body.cart_id = id
    next();
}); 

orderRouter.param('orderId', (req, res, next, id) => {
    console.log(id)
    req.body.order_id = id
    next();
}); 

// create new order 
orderRouter.post('/create/:cartId',  (req, res, next) => {
    // todo authentication middleware
    next()
}, validateDto(orderDTO), OrdersController.createOrder);

// getAllOrders
orderRouter.get('/orders', (req, res, next) => {
    // auth
    next()
}, OrdersController.getAllOrders)
    
// getAllCustomerOrdersByCustomerId
orderRouter.get('/orders/customer', (req, res, next) => {
    // auth todo pass customer id via session
    next()
}, OrdersController.getAllCustomerOrdersByCustomerId)

// getOrderAndOrderItemsById
orderRouter.get('/orders/:orderId', (req, res, next) => {
    // auth 
    next()
}, validateDto(routeParamOrderId), OrdersController.validateOrder , OrdersController.getOrderAndOrderItemsById)

// updateOrderStatus
orderRouter.put('/orders/status/:orderId', (req, res, next) => {
    //auth
    next()
}, validateDto(routeParamOrderId), OrdersController.validateOrder, OrdersController.updateOrderStatus)

// DeletOrderById
orderRouter.delete('/orders/delete/:orderId', (req, res, next) => {
    //auth
    next();
}, validateDto(routeParamOrderId), OrdersController.validateOrder, OrdersController.DeletOrderById)

module.exports = orderRouter;
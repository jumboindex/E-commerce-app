const express = require('express');
const orderRouter = express.Router();
const OrdersController = require('../controller/orders');
const { routeParamOrderId } = require('../dto/schema');
const { validateDto } = require('../middleware/validate-dto');


orderRouter.param('orderId', (req, res, next, id) => {
    console.log(id)
    req.body.order_id = id
    next();
}); 

// getAllOrders
orderRouter.get('/', (req, res, next) => {
    // auth
    next()
}, OrdersController.getAllOrders)
    
// getAllCustomerOrdersByCustomerId
orderRouter.get('/customer', (req, res, next) => {
    // auth todo pass customer id via session
    next()
}, OrdersController.getAllCustomerOrdersByCustomerId)

// getOrderAndOrderItemsById
orderRouter.get('/:orderId', (req, res, next) => {
    // auth 
    next()
}, validateDto(routeParamOrderId), OrdersController.validateOrder , OrdersController.getOrderAndOrderItemsById)

// updateOrderStatus
orderRouter.put('/status/:orderId', (req, res, next) => {
    //auth
    next()
}, validateDto(routeParamOrderId), OrdersController.validateOrder, OrdersController.updateOrderStatus)

// DeletOrderById
orderRouter.delete('/delete/:orderId', (req, res, next) => {
    //auth
    next();
}, validateDto(routeParamOrderId), OrdersController.validateOrder, OrdersController.DeletOrderById)

module.exports = orderRouter;
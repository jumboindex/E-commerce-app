const { UniqueViolationError } = require('objection-db-errors');
const ApiError = require('../error/ApiError');
const OrdersService = require('../service/orders');

class OrdersController {
    
    async createOrder(req, res, next) {
        try {
            //changed to checkout
            console.log(req.body)
            const newOrder = await OrdersService.checkout(req.body)
            return res.status(201).json(newOrder);
        } catch (err) {
            if (err.message === 'Cart Not Found!'){
                next(ApiError.notFound(err.message))
            }
            next(err)
        }
    }
    // no route
    async getAllOrders(req, res, next) {
        try {
            const allOrders = await OrdersService.getAllOrders();
            return res.status(200).json(allOrders)
        } catch (err) {
            next(err)
        }
    }
    // no route
    async getAllCustomerOrdersByCustomerId(req, res, next) {
        try {
            const customerOrders = await OrdersService.getAllOrdersByCustomerId(req.body.user_id);
            return res.status(200).json(customerOrders);
        } catch (err) {
            next(err)
        }
    }
    // no route
    async getOrderAndOrderItemsById(req, res, next) {
        try {
            const orderAndItems = await OrdersService.getOrderAndOrderItemsById(req.body.order_id);
            return res.status(200).json(orderAndItems);
        } catch (err) {
           next(err); 
        }  
    }
    // no route
    async updateOrderStatus(req, res, next) {
        try {
            const {order_id, status} = req.body;
            const updatedOrder = await OrdersService.updateOrderStatusById(order_id, status);
            return res.status(200).json(updatedOrder);
        } catch (err) {
            next(err)
        }
    }
    // no route
    async DeletOrderById(req, res, next) {
        try {
            const deletedOrder = await OrdersService.DeletOrderById(req.body.order_id);
            return res.status(204).json(deletedOrder);
        } catch (err) {
            next(err)
        }
    }

}

module.exports = new OrdersController();
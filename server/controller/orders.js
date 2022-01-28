const { UniqueViolationError } = require('objection-db-errors');
const ApiError = require('../error/ApiError');
const OrdersService = require('../service/orders');

class OrdersController {

    async createOrder(req, res, next) {
        try {
            const newOrder = await OrdersService.createOrder(req.body)
            return res.status(200).json(newOrder);
        } catch (err) {
            next(err)
        }
    }

}

module.exports = new OrdersController();
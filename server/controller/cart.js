const { UniqueViolationError } = require('objection-db-errors');
const ApiError = require('../error/ApiError');
const CartService = require('../service/cart');

class CartController {

    async createCart(req, res, next) {
        try {
            const newCart = await CartService.createCart(req.body);
            return res.status(200).json(newCart);
        } catch (err) {
            if (err.type === 'ModelValidation') {
                return next(ApiError.badRequest(err.message))
            } else if (err instanceof UniqueViolationError) {
                return next(ApiError.uniqueViolationError('UniqueViolationError'))
            };
            next(err);
        }
    }

}

module.exports = new CartController();
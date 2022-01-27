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
            } else if (err.message === 'Cart already exists for user') {
                return next(ApiError.uniqueViolationError(err.message))
            };
            next(err);
        }
    }

    async getCartWithItems(req, res, next) {
        try {
            const cartWithItems = await CartService.findCartWithItems(req.body.user_id);
            return res.status(200).json(cartWithItems);
        } catch (err) {
            next(err);
        }
    }

    async validateCartByUserId(req, res, next) {
        try {
            const cartExists = await CartService.findCartByUser(req.body.user_id);
            if (!cartExists) return next(ApiError.notFound('Cart not Found'));  
            else return next()
        } catch (err) {
            next(err);
        }
    }


    async addItemToCart(req, res, next) {
        try {
            const updatedCartWithItems = await CartService.addItemToCart(req.body)
            return res.status(200).json(updatedCartWithItems);
        } catch (err) {
            if (err.message === 'Item already in cart') {
                return next(ApiError.badRequest(err.message))
            }
            next(err);
        }
    }

    async incrementItemInCart(req, res, next) {
        try {
            const updatedLineItem = await CartService.incrementCartItem(req.body);
            return res.status(200).json(updatedLineItem);
        } catch (err) {
            next(err);
        }
    }

    async decrementItemInCart(req, res, next) {
        try {
            const updatedLineItem = await CartService.decrementCartItem(req.body);
            return res.status(200).json(updatedLineItem);
        } catch (err) {
            if (err.message = 'Item is not in cart or cannot be 0') {
                next(ApiError.badRequest(err.message));
            }
            next(err);
        }
    }

    async removeItemInCart(req, res, next) {
        try {
            const removedItem = await CartService.removeItemFromCart(req.body);
            return res.status(204).json(removedItem);
        } catch (err) { 
            if (err.message = 'Item is not in cart') {
                return next(ApiError.badRequest(err.message))
            }
            next(err);
        }
    }

    async deleteCartById(req, res, next) {
        try {
            const deletedCart = await CartService.deleteCart(req.body.cart_id);
            return res.status(204).json(deletedCart);
        } catch (err) {
            next(err)
        }
    }

}

module.exports = new CartController();
const express = require('express');
const cartRouter = express.Router();
const cartController = require('../controller/cart');
const { routeParamCartUserId, cartDTO, routeParamCartProductId, routeParamCartId } = require('../dto/schema');
const { validateDto } = require('../middleware/validate-dto');


cartRouter.param('userId', (req, res, next, id) => {
    req.body.user_id = id
    next();
});

cartRouter.param('productId', (req, res, next, id) => {
    req.body.product_id = id
    next();
  });

cartRouter.param('cartId', (req, res, next, id) => {
    req.body.cart_id = id
    next();
}); 

// get cart with items by userid
cartRouter.get('/find/:userId', (req, res, next) => {
// todo authentication middleware
    next()
},  validateDto(routeParamCartUserId), 
    cartController.validateCartByUserId, 
    cartController.getCartWithItems);

// create new cart 
cartRouter.post('/create',  (req, res, next) => {
    // todo authentication middleware
    next()
}, validateDto(cartDTO), cartController.createCart);

// add item to existing cart
cartRouter.put('/update', (req, res, next) => {
    //todo auth middleware
    next()
},  validateDto(cartDTO),
    cartController.validateCartByUserId,
    cartController.addItemToCart);

// increment cart line item
cartRouter.put('/increment/:cartId/:productId', (req, res, next) => {
    // todo auth midleware
    next();
},  validateDto(routeParamCartId),
    validateDto(routeParamCartProductId),
    cartController.incrementItemInCart);

//decrement cart line item
cartRouter.put('/decrement/:cartId/:productId', (req, res, next) => {
    // todo auth midleware
    next();
},  validateDto(routeParamCartId),
    validateDto(routeParamCartProductId),
    cartController.decrementItemInCart);

//remove item from cart
cartRouter.delete('/remove/:cartId/:productId', (req, res, next) => {
    // todo auth midleware
    next();
},  validateDto(routeParamCartId),
    validateDto(routeParamCartProductId),
    cartController.removeItemInCart);

// delete cart
cartRouter.delete('/:cartId', (req, res, next) => {
    //todo auth middleware 
    next();
},  validateDto(routeParamCartId),
    cartController.deleteCartById);



module.exports = cartRouter;
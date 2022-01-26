const express = require('express');
const cartRouter = express.Router();
const cartController = require('../controller/cart');
const { routeParamCart, cartDTO } = require('../dto/schema');
const { validateDto } = require('../middleware/validate-dto');


cartRouter.param('userId', (req, res, next, id) => {
  req.body.user_id = id
  next();
});

cartRouter.get('/:userId', (req, res, next) => {
    // todo authentication middleware
    next()
},  validateDto(routeParamCart), 
    cartController.validateCartByUserId, 
    cartController.getCartWithItems);

cartRouter.post('/',  (req, res, next) => {
    // todo authentication middleware
    next()
}, validateDto(cartDTO), cartController.createCart);

cartRouter.put('/', (req, res, next) => {
    //todo auth middleware
    next()
},  validateDto(cartDTO),
    cartController.validateCartByUserId,
    cartController.addItemToCart);


module.exports = cartRouter;
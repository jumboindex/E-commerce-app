const express = require('express');
const cartRouter = express.Router();
const cartController = require('../controller/cart');


/* userRouter.param('id', (req, res, next, id) => {
  req.body.id = id
  next();
}); */

cartRouter.post('/',  (req, res, next) => {
    // todo authentication middleware
    next()
}, cartController.createCart);

/* userRouter.get('/:id', (req, res, next) => {
    // todo authentication middleware
    next();
}, validateDto(routeParam), userController.getUser);

userRouter.get('/', (req, res, next) => {
    // todo authentication middleware
    next();
}, userController.getAllUsers);

userRouter.put('/', (req, res, next) => {
    // todo authentication middleware
    next();
}, validateDto(updateUserDto), userController.updateUserDetails);

userRouter.delete('/:id', (req, res, next) => {
    // todo authentication middleware
    next();
}, validateDto(routeParam), userController.validateUser, userController.deleteUserDetails);
 */
module.exports = cartRouter;
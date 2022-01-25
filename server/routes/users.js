const express = require('express');
const userRouter = express.Router();
const userController = require('../controller/user');
const { userDTO, updateUserDto, routeParam } = require('../dto/schema');
const { validateDto } = require('../middleware/validate-dto');



userRouter.param('id', (req, res, next, id) => {
  req.body.id = id
  next();
});

userRouter.post('/',  (req, res, next) => {
    // todo authentication middleware
    next()
}, validateDto(userDTO), userController.createUser);

userRouter.get('/:id', (req, res, next) => {
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

module.exports = userRouter;
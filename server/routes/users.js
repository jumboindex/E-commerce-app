const express = require('express');
const userRouter = express.Router();
const userController = require('../controller/user');
const { userDTO, updateUserDto } = require('../dto/schema');
const { validateDto } = require('../middleware/validate-dto');

userRouter.post('/',  (req, res, next) => {
    // todo authentication middleware
    next()
}, validateDto(userDTO), userController.createUser);

userRouter.get('/:userid', (req, res, next) => {
    // todo authentication middleware
    next();
}, userController.getUser);

userRouter.get('/', (req, res, next) => {
    // todo authentication middleware
    next();
}, userController.getAllUsers);

userRouter.put('/', (req, res, next) => {
    // todo authentication middleware
    next();
}, validateDto(updateUserDto), userController.updateUserDetails);

userRouter.delete('/:userid', (req, res, next) => {
    // todo authentication middleware
    next();
}, userController.validateUser, userController.deleteUserDetails);

module.exports = userRouter;
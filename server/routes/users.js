const express = require('express');
const userRouter = express.Router();
const userController = require('../controller/user')

userRouter.post('/', userController.createUser);

userRouter.get('/:userid', (req, res, next) => {
    // todo authentication middleware
    next();
}, userController.getUser);

userRouter.get('/', (req, res, next) => {
    // todo authentication middleware
    next();
}, userController.getAllUsers);

module.exports = userRouter;
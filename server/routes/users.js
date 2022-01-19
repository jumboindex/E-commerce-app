const express = require('express');
const userRouter = express.Router();
const userController = require('../controller/user')

userRouter.get('/:userid', (req, res, next) => {
    next();
}, userController.getUser);

module.exports = userRouter;
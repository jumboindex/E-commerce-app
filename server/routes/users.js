const express = require('express');
const userRouter = express.Router();
const userController = require('../controller/user')

userRouter.get('/:userid', (req, res, next) => {
    // todo authentication middleware
    next();
}, userController.getUser);

module.exports = userRouter;
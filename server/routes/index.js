const { Router } = require('express');
const express = require('express');
const userRouter = require('./users')

const router = express.Router();

router.use('/users', userRouter);

// 404 
router.use(function (req, res, next) {
    res.status(404).send('route not found!')
});

module.exports = router;


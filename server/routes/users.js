const express = require('express');
const userRouter = express.Router();
const userController = require('../controller/user');
const { userDTO, updateUserDto, routeParamUser } = require('../dto/schema');
const { validateDto } = require('../middleware/validate-dto');



userRouter.param('id', (req, res, next, id) => {
  req.body.id = id
  next();
});
// create new user - todo update route to register
userRouter.post('/',  (req, res, next) => {
    // todo authentication middleware
    next()
}, validateDto(userDTO), userController.createUser);
// get user by Id
userRouter.get('/:id', (req, res, next) => {
    // todo authentication middleware
    next();
}, validateDto(routeParamUser), userController.getUser);
// get all users
userRouter.get('/', (req, res, next) => {
    // todo authentication middleware
    next();
}, userController.getAllUsers);
// update user details
userRouter.put('/', (req, res, next) => {
// todo authentication middleware
    next();
}, validateDto(updateUserDto), userController.updateUserDetails);
// delete user by id
userRouter.delete('/:id', (req, res, next) => {
    // todo authentication middleware
    next();
}, validateDto(routeParamUser), userController.validateUser, userController.deleteUserDetails);

module.exports = userRouter;
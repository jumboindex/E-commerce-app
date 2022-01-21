const { UniqueViolationError } = require('objection-db-errors');
const ApiError = require('../error/ApiError');
const UserService = require('../service/users');

class UserController {

    async createUser(req, res, next) {
        try {
            const newUser = await UserService.createUser(req.body);
            return  res.status(200).json(newUser);

        } catch (err) {
            if (err.message === 'email is invalid!') {
                return next(ApiError.badRequest(err.message));
            } else if (err.type === 'ModelValidation') {
                return next(ApiError.badRequest(err.message))
            } else if (err instanceof UniqueViolationError) {
                return next(ApiError.badRequest('email registered under another account!'))
            };
            next(err);
        }
    }

    async getUser(req, res, next) {
        try {
            const user = await UserService.getUser(req.params.userid);

            if (!user) {
                return next(ApiError.badRequest('user not found!'));
            }

            return res.status(200).json(user);

        } catch (err) {
            next(err)
        }
    }

    async getAllUsers(req, res, next) {
        try {
            const allUsers = await UserService.getAllUsers();
            res.status(200).json(allUsers);
        } catch (err) { 
            next(err);
        }
    }

    async validateUser(req, res, next) {
        try {
            const user = await UserService.getUser(req.params.userid);
            if (!user) {
                return next(ApiError.badRequest('user not found!'));
                
            } else {
                next()
            }

        } catch (err) {
            next(err)
        }
    }

    async updateUserDetails(req, res, next) {
        try {
            const updatedUser = await UserService.updateUserDetails(req.body);
            
            if (!updatedUser) {
                next(ApiError.badRequest('user not found!'))
            return;
        }
        res.status(200).json(updatedUser);
        
        } catch (err) {     
            if (err.message === 'email is invalid!') {
                return next(ApiError.badRequest(err.message));
            } else if (err.type === 'ModelValidation') {
                return next(ApiError.badRequest(err.message))
            } else if (err instanceof UniqueViolationError) {
                return next(ApiError.badRequest('email registered under another account!'))
            };
            next(err);
        }
    }

    async  deleteUserDetails(req, res, next) {

        try {
            const deletedUser = await UserService.deleteUserById(req.params.userid);
            return res.status(204).json(deletedUser);

        } catch (err) {
            if (err instanceof ReferenceError) {
                return next(ApiError.badRequest(err.message))
            }
            next(err)
        }
    }
}

module.exports = new UserController();
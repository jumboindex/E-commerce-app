const { UniqueViolationError } = require('objection-db-errors');
const ApiError = require('../error/ApiError');
const UserService = require('../service/users');

class UserController {

    async createUser(req, res, next) {
        try {
            
            const newUser = await UserService.createUser(req.body);
        
            //if (!newUser) return next(ApiError.badRequest('cannot create new user due to invalid input'));

            res.status(200).json(newUser);

        } catch (err) {
            if (err.message === 'email is invalid!') {
                next(ApiError.badRequest(err.message));
            } else if (err.type === 'ModelValidation') {
                next(ApiError.badRequest(err.message))
            } else if (err instanceof UniqueViolationError) {
                next(ApiError.badRequest('email registered under another account!'))
            };
            next(err);
        }
    }

    async getUser(req, res, next) {
        try {
            const user = await UserService.getUser(req.params.userid);

            if (!user) {
                next(ApiError.badRequest('user not found!'))
                return;
            }

            res.status(200).json(user);

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
}

module.exports = new UserController();
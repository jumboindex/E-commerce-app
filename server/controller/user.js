const ApiError = require('../error/ApiError');
const UserService = require('../service/users');

class UserController {

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
}

module.exports = new UserController();
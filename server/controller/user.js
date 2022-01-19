const UserService = require('../service/users');

class UserController {

    async getUser(req, res, next) {
        try {
            const user = await UserService.getUser(req.params.userid);
            res.status(200).send(user)
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    }
}

module.exports = new UserController();
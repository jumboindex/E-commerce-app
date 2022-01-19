const UserDAO = require('../data access objects/user');

class UserService {
    getUser(id) {
        return UserDAO.findByUserId(id);
    }
};

module.exports = new UserService();
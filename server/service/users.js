const UserDAO = require('../data access objects/user');
const { emailIsValid } = require('../helpers/uservalidation');

class UserService {
    
    createUser(userObj) {
        const {email, password, first_name, last_name, google} = userObj;
        
        // validate email 
        const validEmail = emailIsValid(email);
        if (!validEmail) throw new Error('email is invalid!');

        // todo password hash - bcryptjs

        // add user to db
        return UserDAO.createUser(email, password, first_name, last_name, google);
        
    }
    
    getUser(id) {
        return UserDAO.findByUserId(id);
    }

    getAllUsers() {
        return UserDAO.findAllUsers();
    }

    getUserByEmail(email) {
        return UserDAO.findByUserEmail(email);
    }
};

module.exports = new UserService();
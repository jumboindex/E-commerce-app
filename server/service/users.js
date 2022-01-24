const UserDAO = require('../data access objects/user');
const { emailIsValid } = require('../helpers/uservalidation');

class UserService {
    
    createUser(userObj) {
        const {email, password, first_name, last_name, google} = userObj;
        
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

    updateUserDetails(userObj) {
        const {id, email, password, first_name, last_name, google} = userObj;
         
        // todo password hash if present- bcryptjs
        
        // update user in db
        return UserDAO.updateUserDetails(id, email, password, first_name, last_name, google);
    }

    deleteUserById(id) {
         return UserDAO.deleteUserById(id);
    }
};

module.exports = new UserService();
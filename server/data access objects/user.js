const Users = require('../db/models/users');

class UserDAO { 
    
    async createUser(email, password, first_name, last_name, google = null) {
        return Users.query().insert({
            email, 
            password,
            first_name,
            last_name,
            google: {google}
        }); 
    }
    
    findByUserId(id) {
        return Users.query().findById(id)
    }

    findByUserEmail(email) {
        return Users.query().findOne(email);
    }

    findAllUsers() {
        return Users.query();
    }

    updateUserDetails(id, email, password, first_name, last_name) {
        return Users.query().patchAndFetchById(id, {
            email,
            password,
            first_name,
            last_name
        })
    }

    deleteUserById(id) {
        return Users.query().deleteById(id);
    }

};


module.exports = new UserDAO();
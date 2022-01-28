const Users = require('../db/models/users');

class UserDAO { 
    
    createUser(email, password, first_name, last_name, google = null) {
        return Users.query().insert({
            email, 
            password,
            first_name,
            last_name,
            google: {google}
        }).returning(['first_name', 'last_name', 'email']); 
    }
    
    findByUserId(id) {
        return Users.query().returning(['first_name', 'last_name', 'email'])
        .findById(id);
    }

    findByUserEmail(email) {
        return Users.query().findOne(email)
        .returning(['first_name', 'last_name', 'email']);
    }

    findAllUsers() {
        return Users.query().returning(['first_name', 'last_name', 'email']);
    }

    updateUserDetails(id, email, password, first_name, last_name) {
        return Users.query().patchAndFetchById(id, {
            email,
            password,
            first_name,
            last_name
        }).returning(['first_name', 'last_name', 'email']);
    }

    deleteUserById(id) {
        return Users.query().deleteById(id);
    }

};


module.exports = new UserDAO();
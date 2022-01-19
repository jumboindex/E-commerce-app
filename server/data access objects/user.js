const Users = require('../db/models/users');

class UserDAO { 
    
    createUser(email, password, first_name, last_name, google = null) {
        Users.query().insert({
            email, 
            password,
            first_name,
            last_name,
            google
        }).returning('id');
    }
    
    findByUserId(id) {
        return Users.query().findById(id)
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
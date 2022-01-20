const { Model } = require('objection');
const { BaseModel } = require('./BaseModel');

class Users extends BaseModel {
    static get tableName() {
        return 'users';
    }

static get jsonSchema() {
    return {
        type: 'object',
        required: ['email', 'password', 'first_name', 'last_name'],

        properties: {
            id: {type:'integer'},
            email: {type: 'string', minLength: 1, maxLength: 50},
            password: {type: 'string', minLength:8, maxLength: 20},
            first_name: {type: 'string', minLength: 1, maxLength: 50},
            last_name: {type: 'string', minLength: 1, maxLength: 50},
            google: {type:'object'}
            }
        }
    }

static get relationMappings () {
    const Orders = require('./orders');
    const Cart = require('./cart')

    return {
        orders: {
            relation: Model.HasManyRelation,
            modelClass: Orders,
            join: {
                from: 'users.id',
                to: 'orders.user_id'
            }
        },

        cart: {
            relation: Model.HasManyRelation,
            modelClass: Cart,
            join: {
                from: 'users.id',
                to: 'cart.user_id'
                }
            }   
        }
    }
};

module.exports = Users;
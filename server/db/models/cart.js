const { Model } = require('objection');
const cart = require('../../dao/cart');
const { BaseModel } = require('./BaseModel');


class Cart extends BaseModel {

    static get tableName() {
        return 'cart';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['user_id'],

            properties: {
                id: {type:'integer'},
                user_id: {type:'integer'}
            }
        }
    }

    static get relationMappings() {
        const Users = require('./users');
        const Cart_items = require('./cart_items');
        const Products = require('./products');

        return {
            cart_users: {
                relation: Model.BelongsToOneRelation,
                modelClass: Users,
                join: {
                    from: 'cart.user_id',
                    to: 'users.id'
                }
            },

            cart_items: {
                relation: Model.HasManyRelation,
                modelClass: Cart_items,
                join: {
                    from: 'cart.id',
                    to: 'cart_items.cart_id'
                }

            },

            products: {
                relation: Model.ManyToManyRelation,
                modelClass: Products,
                join: {
                    from: 'cart.id',
                    through: {
                        from:'cart_items.cart_id',
                        to: 'cart_items.product_id'
                    },
                    to: 'products.id'
                }
            }
        }
    }
};

module.exports = Cart;
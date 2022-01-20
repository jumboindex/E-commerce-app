const { Model } = require('objection');
const { BaseModel } = require('./BaseModel');

class Orders extends BaseModel {
    static get tableName() {
        return 'orders';
    }

static get jsonSchema() {
    return {
        type: 'object',
        required: ['user_id', 'amount', 'shipping_address', 'status' ],

        properties: {
            id: {type:'integer'},
            user_id: {type: 'integer'},
            amount: {type: 'integer'},
            shipping_address:{type:'string'},
            status: {type:'string'}
            }
        }
    }

static get relationMappings () {

    const Users = require('./users');
    const Order_items = require('./order_items');
    const Products = require('./products')

    return {
            users: {
                relation: Model.BelongsToOneRelation,
                modelClass: Users,
                join: {
                    from: 'orders.user_id',
                    to: 'users.id'
                }
            },

            order_items: {
                relation: Model.HasManyRelation,
                modelClass: Order_items,
                join: {
                    from: 'orders.id',
                    to: 'order_items.order_id'
                    }
                },
            
            products: {
                relation: Model.ManyToManyRelation,
                modelClass: Products,
                join: {
                    from: 'orders.id',
                    through: {
                        from: 'order_items.order_id',
                        to: 'order_items.product_id'
                    },
                    to: 'product.id'
                }
            }    
        }
    }
};

module.exports = Orders;
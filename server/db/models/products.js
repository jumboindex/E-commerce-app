const { Model } = require('objection');
const { BaseModel } = require('./BaseModel');

class Products extends BaseModel {
    static get tableName() {
        return 'products';
    }

static get jsonSchema() {
    return {
        type: 'object',
        required: ['title', 'price', 'description', 'image', 'raiting', 'stock', 'category_id'],

        properties: {
            id: {type:'integer'},
            title: {type: 'string'},
            price: {type: 'integer'},
            description:{type:'string'},
            image: {type:'string'},
            raiting: {type:'integer'},
            stock: {type: 'integer'},
            category_id: {type:'integer'}
            }
        }
    }

static get relationMappings () {

    const Category = require('./category');
    const Order_items = require('./order_items');
    const Orders = require('./orders');
    const Cart_items = require('./cart_items');
    const Cart = require('./cart');

    return {
            categories: {
                relation: Model.BelongsToOneRelation,
                modelClass: Category,
                join: {
                    from: 'products.category_id',
                    to: 'category.id'
                }
            },

            order_items: {
                relation: Model.HasManyRelation,
                modelClass: Order_items,
                join: {
                    from: 'products.id',
                    to: 'order_items.product_id'
                    }
                },
            
            orders: {
                relation: Model.ManyToManyRelation,
                modelClass: Orders,
                join: {
                    from: 'products.id',
                    through: {
                        from: 'order_items.product_id',
                        to: 'order_items.order_id'
                    },
                    to: 'orders.id'
                }
            },

            cart_items: {
                relation: Model.HasManyRelation,
                modelClass: Cart_items,
                join: {
                    from: 'products.id',
                    to: 'cart_items.product_id'
                    }
                },

            cart: {
                relation: Model.ManyToManyRelation,
                modelClass: Cart,
                join: {
                    from: 'products.id',
                    through: {
                        from: 'cart_items.product_id',
                        to: 'cart_items.cart_id'
                    },
                    to: 'cart.id'
                }
            }, 
        }
    }
};

module.exports = Products;
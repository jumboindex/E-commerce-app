const { Model } = require('objection');
const { BaseModel } = require('./BaseModel');

class Order_items extends BaseModel {
    static get tableName() {
        return 'order_items';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['order_id', 'product_id', 'quantity'],

            properties: {
                id: {type:'integer'},
                order_id: {type: 'integer'},
                product_id: {type: 'integer'},
                quantity: {type: 'integer'}
            }
        }
    }

    static get relationMappings() {
        const Products = require('./products');

        return {
            product: {
                relation: Model.BelongsToOneRelation,
                modelClass: Products,
                join: {
                    from: 'order_items.product_id',
                    to: 'product.id'
                }
            },
        }
    }

};

module.exports = Order_items;
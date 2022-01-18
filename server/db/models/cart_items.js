const { Model } = require('objection');

class Cart_items extends Model {

    static get tableName() {
        return 'cart_items';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['cart_id', 'product_id', 'quantity'],

            properties: {
                id: {type:'integer'},
                cart_id: {type:'integer'},
                product_id: {type:'integer'},
                quantity: {type:'integer'}
            }
        }
    }

    static get relationMappings() {
        const Products = require('./products');

        return {
            products: {
                relation: Model.BelongsToOneRelation,
                modelClass: Products,
                join: {
                    from: 'cart_items.product_id',
                    to: 'product.id'
                }
            }
        }
    }    
};

module.exports = Cart_items;
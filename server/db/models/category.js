const { Model } = require('objection');

class Category extends Model {
    static get tableName() {
        return 'category';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['category'],

            properties: {
                id: {type:'integer'},
                category: {type:'string', minLength: 1, maxLength: 50}
            }
        }
    }

    static get relationMappings() {
        const Products = require('./products');

        return {
            product_category: {
                relation: Model.HasManyRelation,
                modelClass: Products,
                join: {
                    from: 'category.id',
                    to: 'products.category_id'
                }
            }
        }
    }
};

module.exports = Category;
const Products = require('../db/models/products');

class ProductsDAO  {
    
    findByProductId(id) {
        return Products.query().findById(id);
    }

    findAllProducts() {
        return Products.query();
    }

    
}

module.exports = new ProductsDAO;
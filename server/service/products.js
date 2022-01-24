const ProductDAO = require('../data access objects/products');

class ProductService {
    getAllProducts() {
        return ProductDAO.findAllProducts();
    }

    getProductById(id) {
        return ProductDAO.findByProductId(id);
    }
};

module.exports = new ProductService();
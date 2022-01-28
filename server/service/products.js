const ProductDAO = require('../dao/products');

class ProductService {
    getAllProducts() {
        return ProductDAO.findAllProducts();
    }

    getProductById(id) {
        return ProductDAO.findByProductId(id);
    }
};

module.exports = new ProductService();
const ProductDAO = require('../dao/products');

class ProductService {
    getAllProducts() {
        return ProductDAO.findAllProducts();
    }

    getProductById(id) {
        return ProductDAO.findByProductId(id);
    }

    decrementProductStockById(id, quantity) {
        return ProductDAO.decrementProductQuantity(id, quantity);
    }

    incrementProductStockById(id, quantity) {
        return ProductDAO.incrementProductQuantity(id, quantity);
    }
};

module.exports = new ProductService();
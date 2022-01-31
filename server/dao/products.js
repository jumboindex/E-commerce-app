const Products = require('../db/models/products');

class ProductsDAO  {
    
    findByProductId(id) {
        return Products.query().findById(id);
    }

    findAllProducts() {
        return Products.query();
    }
    // used when placing order 
    decrementProductQuantity(product_id, quantityPurchased) {
        return Products.query().where({
            id: product_id
        }).decrement('stock', quantityPurchased); 
    }
    // used to reverse unpaid orders or update stock
    incrementProductQuantity(product_id, quantityPurchased) {
        return Products.query().where({
            id: product_id
        }).increment('stock', quantityPurchased); 
    }
  
}

module.exports = new ProductsDAO;
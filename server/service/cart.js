const CartDAO = require('../data access objects/cart');

class CartService {
    
    createCart(cartObj) {
        const {user_id, product_id, quantity} = cartObj;

        // add cart to db
        return CartDAO.createCart(user_id, product_id, quantity);
    }
    
};

module.exports = new CartService();
const Cart_Items = require('../db/models/cart_items');

class CartItemsDAO { 
    
    findCartItemByCartIdAndProductId (cart_id, product_id) {
        return Cart_Items.query().findOne({
            cart_id: cart_id,
            product_id: product_id
        });
    }


};


module.exports = new CartItemsDAO();
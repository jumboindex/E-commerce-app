const Cart_Items = require('../db/models/cart_items');

class CartItemsDAO { 
     // used for creating order 
    findCartItemsByCartId(cart_id) {
        return Cart_Items.query().select(['product_id', 'quantity'])
        .where({ cart_id });
    }

    findCartItemByCartIdAndProductId(cart_id, product_id) {
        return Cart_Items.query().findOne({
            cart_id: cart_id,
            product_id: product_id
        }).returning(['cart_id', 'product_id', 'quantity']);
    }

    incrimentCartItemQuantity(cart_id, product_id) {
        return Cart_Items.query().increment('quantity', 1).where({
            cart_id: cart_id,
            product_id: product_id
        }).returning(['cart_id', 'product_id', 'quantity']); 
    }

    decrementCartItemQuantity(cart_id, product_id) {
        return Cart_Items.query().where({
            cart_id: cart_id,
            product_id: product_id
        }).decrement('quantity', 1)
        .returning(['cart_id', 'product_id', 'quantity']); 
    }

    deleteCartItem(cart_id, product_id) {
        return Cart_Items.query().delete().where({
            cart_id: cart_id,
            product_id: product_id
        }).returning('*');
    }

};


module.exports = new CartItemsDAO();
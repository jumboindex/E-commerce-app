const Cart = require('../db/models/cart');

class CartDAO { 
    
    createCart(userId, productId, quantity) {
        try {
            const cartWithItems = Cart.transaction(async trx => {
                const cart = await Cart.query(trx).insert({
                    user_id: userId
                });
                const cartItems = await cart.$relatedQuery('cart_items', trx).insert({
                    cart_id: cart.id,
                    product_id: productId,
                    quantity: quantity
                });

                return { cart, 
                         cartItems };
            });
            return cartWithItems
        } catch (err) {
            throw new Error('transaction error whilst creating cart')
        }
    }
    
    findCartById(id) {
        return Cart.query().findById(id);
    }
    
    findCartByUserId(user_id) {
        return Cart.query().findOne({
            user_id: user_id
        });
    }

    findCartLineItems(id) {
        return Cart.relatedQuery('cart_items').for(id);
    }

    findCartWithRelatedProducts(id) {
        return Cart.relatedQuery('products').for(id);
    }

    addItemToCartByUserId(userId, productId, quantity) {
        try {
            const updatedCartWithItems = Cart.transaction(async trx => {
                const cart = await Cart.query(trx).findOne({
                    user_id: userId
                });

                const cartItems = await cart.$relatedQuery('cart_items', trx).insert({
                    cart_id: cart.id,
                    product_id: productId,
                    quantity: quantity
                });

                return { cart, 
                         cartItems };

            });
            return updatedCartWithItems;
        } catch (err) {
            throw new Error('transaction error whilst updating cart')
        }
    }
   

};


module.exports = new CartDAO();
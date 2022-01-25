const Cart = require('../db/models/cart');

class CartDAO { 
    
    createCart(userId, productId, quantity) {
        try {
            console.log(userId)
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
            console.log(err)
            throw new Error('transaction error whilst creating cart')
        }
    }    
   

};


module.exports = new CartDAO();
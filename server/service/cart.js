const CartDAO = require('../data access objects/cart');
const CartItemsDAO = require('../data access objects/cart_items');

class CartService {
    
    async createCart(cartObj) {
        const {user_id, product_id, quantity} = cartObj;

        //check if cart exists for user:
        const cartExists =  await CartDAO.findCartByUserId(user_id);
        if(cartExists) throw new Error('Cart already exists for user');
        // add cart to db
        const cartWithLineItems = await CartDAO.createCart(user_id, product_id, quantity);
        // find related products and return
        const productsInCart = await CartDAO.findCartWithRelatedProducts(cartWithLineItems.cart.id);
        
        return {
            cartWithLineItems,
            productsInCart
        };
    }

    async findCartWithItems(user_id) {
        const cart = await CartDAO.findCartByUserId(user_id);
        const lineItems = await CartDAO.findCartLineItems(cart.id);
        const productsInCart = await CartDAO.findCartWithRelatedProducts(cart.id);

        return {
            cart,
            lineItems,
            productsInCart
        };
    }

    findCartByUser(user_id) {
        return CartDAO.findCartByUserId(user_id);
    }

    async addItemToCart(cartObj) {
        const {user_id, product_id, quantity} = cartObj;
        // check if item is already in cart
        const cart = await CartDAO.findCartByUserId(user_id);
        const cartLineItems = await CartItemsDAO.findCartItemByCartIdAndProductId(cart.id, product_id);
        if (cartLineItems) throw new Error('Item already in cart')
        // update cart with new item
        const updatedCartWithLineItem = await CartDAO.addItemToCartByUserId(user_id, product_id, quantity);
        // find all line items in cart
        const updatedLineItems = await CartDAO.findCartLineItems(updatedCartWithLineItem.cart.id)
        // find all related products in cart 
        const productsInCart = await CartDAO.findCartWithRelatedProducts(updatedCartWithLineItem.cart.id)

        return {
            updatedCartWithLineItem,
            updatedLineItems,
            productsInCart
        };

    }

    updateCartItems() {

    }

    removeItemFromCart() {

    }

    deleteCart() {

    }
    
};

module.exports = new CartService();
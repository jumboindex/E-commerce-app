const OrdersDAO = require('../dao/orders');
const CartService = require('./cart')



class OrdersService {
    
    async createOrder(cartDTO) {
        const {cart_id, shipping_address} = cartDTO;
        const amount = 100;
        const status = 'paid'
        // todo - math required for total

        const cart = await CartService.findCartById(cart_id)
        const cartItems = await CartService.findCartItemsByCartId(cart_id);
      
        const cartObj = { user_id: cart.user_id,
                    amount, 
                    shipping_address, 
                    status }

        const newOrder = await OrdersDAO.createNewOrder(cartObj, cartItems)
     
        
        return newOrder;

    }

  
    
};

module.exports = new OrdersService();
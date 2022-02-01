const OrdersDAO = require('../dao/orders');
const ProductsService = require('./products');
const GBP = require('../helpers/currency');
const CartService = require('./cart')

class OrdersService {
    // create new order
    async checkout(cartDTO) {
        const {cart_id, shipping_address} = cartDTO // change cart_id to user_Id once session setup
        // find cart- object with cart_id and user_id 
        // const cart = await CartService.findCartByUser(user_id); - swap below once session setup
        const cart = await CartService.findCartById(cart_id)
        if (!cart) throw new Error('Cart Not Found!');
        // find cartItems - array of objects which contains order items product_id and quantity ordered.
        const cartItems = await CartService.findCartItemsByCartId(cart.id);
        
        // Calculate total - cartItemsWithPrice is an array of objects which contain:
        // product_id, quantity, price. GBP function used to elminate rounding errors. 
        const cartItemsWithPrice = await CartService.getCartItemsAndRelatedProductsPrice(cart.id)
        const totalAmount =  cartItemsWithPrice.reduce((total, item) => {   
            total += (item.price * item.quantity);
                return total;
        }, 0);
       
        const orderObj = { 
            user_id: cart.user_id,
            amount: GBP(totalAmount).format(), 
            shipping_address, 
            status: 'Pending' }
        
        // create order
        const newOrder = await OrdersDAO.createNewOrder(orderObj, cartItems)
        // delete cart
        await CartService.deleteCart(cart_id);
        // take payment - to do
        let payment = true;


        // decrement stock if payment ok
        cartItems.forEach( async item => {
            return await ProductsService
            .decrementProductStockById(item.product_id, item.quantity)
        })
        // update order status to paid if payment ok, or pending if payment error
        if (payment) await OrdersDAO.updateOrderStatusById(newOrder.newOrder.id, 'Paid');
        else await OrdersDAO.updateOrderStatusById(newOrder.newOrder.id, 'pending payment');

        return newOrder;
        
    }

    getAllOrders() {
        return OrdersDAO.findAllOrders();
    }

    getAllOrdersByCustomerId(user_id) {       
        return OrdersDAO.findAllCustomerOrders(user_id);
    }

    // returns order, line items and related products
    async getOrderAndOrderItemsById(id) {
        const lineItems = await OrdersDAO.findOrderAndOrderItemsById(id);
        const products =  await OrdersDAO.findOrderAndProductsById(id);
        return {lineItems, products};
    }

    updateOrderStatusById(id, status) {
        return OrdersDAO.updateOrderStatusById(id, status)
    }

    DeletOrderById(id) {
        return OrdersDAO.DeletOrderById(id);
    }

};

module.exports = new OrdersService();
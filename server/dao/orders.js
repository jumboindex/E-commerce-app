const Orders = require('../db/models/orders');

class OrdersDAO { 
    
    createNewOrder(orderObj, cartItems) {
        const {user_id, amount, shipping_address, status} = orderObj;
        try {
            const order = Orders.transaction(async trx => {
                // create new order
                const newOrder = await Orders.query(trx).insert({
                    user_id: user_id,
                    amount: amount, 
                    shipping_address: shipping_address,
                    status: status
                });
            
                // cartItems is an object which contains cart_id, product_id and quantity for
                // each cart item. We need to add order_id, product_id and quantity to order_items table. 
                const cartItemkeys = Object.keys(cartItems)
                let itemArr = [];
                cartItemkeys.forEach( key => {
                  itemArr.push({
                    order_id: newOrder.id,
                    product_id: cartItems[key].product_id,
                    quantity: cartItems[key].quantity})
                }); 
                // add order items to order
                const orderItems = await newOrder.$relatedQuery('order_items', trx).insert(
                    itemArr
                );
                // find related products    
                const products = await newOrder.$relatedQuery('products', trx);

                return {newOrder, orderItems, products}
            });

            return order
            
        } catch (err) {
            console.log(err)
            throw new Error('transaction error whilst creating order')
        }
    }

    getAllOrders() {

    }


    getOrderAndOrderItemsById(id) {
        return Orders.relatedQuery('order_items').where({order_id: id})
    }

    getOrderAndProductsById(id) {
        return Orders.relatedQuery('products').where({order_id: id});
    }

    updateOrderStatusById() {

    }

    DeletOrderById() {

    }



};


module.exports = new OrdersDAO();
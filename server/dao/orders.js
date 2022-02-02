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
            
                // cartItems is an array of objects which conatins order 
                // items product_id and quantity ordered.
              
                // add order items to order
                const orderItems = await newOrder.$relatedQuery('order_items', trx)
                .insert(
                   cartItems.map(item => ({ order_id: newOrder.id,
                                            product_id: item.product_id, 
                                            quantity: item.quantity }))
                );
                // find related products    
                const products = await newOrder.$relatedQuery('products', trx);
        
                return { newOrder, 
                        orderItems, 
                        products }
                });

            return order

        } catch (err) {
            throw new Error('transaction error whilst creating order')
        }
    }

    findAllOrders() {
        return Orders.query();
    }

    findOrderById(id){
        return Orders.query().findById(id);
    }

    findAllCustomerOrders(customerid) {
        console.log('running correct query')
        return Orders.query().where({user_id: customerid})
    }
    
    findOrderAndOrderItemsById(id) {
        return Orders.relatedQuery('order_items').for(id)
    }
    
    findOrderAndProductsById(id) {
        return Orders.relatedQuery('products').for(id);
    }

    updateOrderStatusById(id, status) {
        return Orders.query().findById(id).patch({status: status})
                .returning(['id', 'status']);
    }

    DeletOrderById(id) {
        return Orders.query().deleteById(id).returning('*');
    }



};


module.exports = new OrdersDAO();
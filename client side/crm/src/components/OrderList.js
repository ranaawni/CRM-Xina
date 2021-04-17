import React from 'react';
import orderItem from './OrdertItem';

const orderList = props => {
    const orders = props.orders.map(order => {
         
        return <orderItem orderId={order._id} title={order.service}/>;
             
        
    });
    return <ul className="order__list">{orders}</ul>
    
}

export default orderList;
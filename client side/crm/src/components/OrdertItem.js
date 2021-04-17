import React from 'react';

import "../App.css"
const orderItem = props => {
    <li key={props.orderId} className="order__list-item">{props.service}</li>
};

export default orderItem;
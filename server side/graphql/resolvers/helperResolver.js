//alternative to many same returns
const transformOrder = (order) => {
  return {
    ...order._doc,
    _id: order.id,
    customerName: user.bind(this, order._doc.customerName),
    date: order.date.toISOString(),
  };
};

//order function to get related data for order
const orders = async (orderIds) => {
  try {
    const orders = await Order.find({ _id: { $in: orderIds } });
    orders.sort((a, b) => {
      return (
        orderIds.indexOf(a._id.toString()) - orderIds.indexOf(b._id.toString())
      );
    });
    return orders.map((order) => {
      return transformOrder(order);
    });
  } catch (err) {
    throw err;
  }
};

//user function to get related data for user
const user = async (userId) => {
  try {
    const user = await Admin.findById(userId);
    console.log(user.id, "useeeeeeeeeeer");
    return {
      _id: user.id,
      customerName: user._doc.customerName,
      fullName: user._doc.fullName,
      createdOrder: orders.bind(this, user._doc.createdOrder),
    };
  } catch (err) {
    throw err;
  }
};

exports.orders = orders;
exports.user = user;
exports.transformOrder = transformOrder;

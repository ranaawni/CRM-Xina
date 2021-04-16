const Order = require("../../models/orders");
const Admin = require("../../models/admins");
const { orders, transformOrder } = require("./helperResolver");

module.exports = {
  //order resolver to get what we need from orders
  orders: async (args, req) => {
    //make orders resolver protected
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }

    try {
      const orders = await Order.find();

      console.log(orders, "find order");

      return orders.map((order) => {
        // console.log(order, "1");
        console.log(order.id, "doc order in line 61 in index resolver folder");
        console.log(order._doc.customerName, "dooooooc ncustomer");
        return transformOrder(order);
      });
    } catch (err) {
      throw err;
    }
  },

  //creat order resolver to create order
  createOrder: async (args, req) => {
    // var ObjectId = require("mongodb").ObjectId;
    // var name = Admin.findById("60789996e7a8a968ccc609c3");
    // console.log(name, "naaaame");
    // var name = Admin.findById("60789996e7a8a968ccc609c3").populate(
    //   "userName"
    // );
    // console.log(name, "naaaame");
    // const ord = await Admin.findById({ id: args.orderInput.customerName });
    // console.log(ord);

    //make the resolver protected
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }
    const order = new Order({
      customerName: "60793572ed90d21fb4243330",
      service: args.orderInput.service,
      date: new Date().toISOString(),
    });
    let createdOrder;
    try {
      const result = await order.save();
      console.log(result, "result in order file line 87");
      createdOrder = transformOrder(result);
      // console.log(result._doc, "doccccccc");
      const admin = await Admin.findById("60793572ed90d21fb4243330");

      if (!admin) {
        throw new Error("admin not found");
      }
      admin.createdOrder.push(order);
      await admin.save();
      return createdOrder;
    } catch (err) {
      console.log("error from saving", err);
      throw err;
    }
  },

  //edit order
  editOrder: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated");
    }
    try {
      const id = await args.orderId;
      console.log(id, "updaaate");
      return Order.findByIdAndUpdate(id, args);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    }
  },

  //delete order
  deleteOrder: async (args, req) => {
    //make deleteOrder protected
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }
    try {
      const id = await args.orderId;
      Order.deleteOne({ _id: id }).exec();
      return { _id: id };
    } catch (err) {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    }
  },
};

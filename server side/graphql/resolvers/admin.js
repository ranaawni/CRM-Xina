const Admin = require("../../models/admins");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { orders, transformOrder, user } = require("./helperResolver");

module.exports = {
  //admin resolver to get what we need from admin
  admins: async (args, req) => {
    //make admins resolver protected
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }
    try {
      const admins = await Admin.find();

      // console.log(admins, "find admins");

      return admins.map((admin) => {
        // console.log(order, "1");
        return {
          ...admin._doc,
          _id: admin.id,
          fullName: admin._doc.fullName,
          userName: admin._doc.userName,
          password: null,
          createdOrder: orders.bind(this, admin._doc.createdOrder),
        };
      });
    } catch (err) {
      throw err;
    }
  },

  //create admin resolver to sign up new admin
  createAdmin: async (args) => {
    try {
      const existingAdmin = await Admin.findOne({
        userName: args.adminInput.userName,
      });

      if (existingAdmin) {
        throw new Error("User Already Exists");
      }
      const hashedPassword = await bcrypt.hash(args.adminInput.password, 12);

      const admin = new Admin({
        fullName: args.adminInput.fullName,
        userName: args.adminInput.userName,
        password: hashedPassword,
      });
      const result = await admin.save();
      // console.log(admin, "admin data which is saved");

      return { ...result._doc, password: null };
    } catch (err) {
      console.log("error from saving and hashing pass", err);
      throw err;
    }
  },

  login: async ({ userName, password }) => {
    const admin = await Admin.findOne({ userName: userName });
    if (!admin) {
      throw new Error("User does not exist");
    }
    const correctPass = await bcrypt.compare(password, admin.password);
    if (!correctPass) {
      throw new Error("Password is incorrect!");
    }
    const token = jwt.sign(
      { adminId: admin.id, userName: admin.userName },
      `${process.env.JWT_KEY}`,
      {
        expiresIn: "1h",
      }
    );
    return { adminId: admin.id, token: token, tokenExpiration: 1 };
  },

  //edit admin
  editAdmin: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated");
    }
    try {
      const id = await args.adminId;
      console.log(id, "updaaate");
      return Admin.findByIdAndUpdate(id, args);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    }
  },
};

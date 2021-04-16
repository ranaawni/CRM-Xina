const mongoose = require("mongoose");

const Admin = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },

  userName: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
  },
  password: {
    type: String,
    required: true,
  },

  createdOrder: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
});

module.exports = mongoose.model("Admin", Admin);

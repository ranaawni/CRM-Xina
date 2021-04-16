const mongoose = require("mongoose");
const admins = require("./admins");

const Order = new mongoose.Schema(
  {
    customerName: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin",
      },
    ],

    service: {
      type: String,
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", Order);

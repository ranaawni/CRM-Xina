const mongoose = require("mongoose");

const Orders = new mongoose.Schema({
  customerName: {
    type: String,
    required: true,
  },

  service: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Orders", Orders);

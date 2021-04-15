const mongoose = require("mongoose");

const Admins = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },

  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Admins", Admins);

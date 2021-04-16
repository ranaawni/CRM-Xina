const adminResolver = require("./admin");
const orderResolver = require("./orders");

const rootResolver = {
  ...adminResolver,
  ...orderResolver,
};

module.exports = rootResolver;

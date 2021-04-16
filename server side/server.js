const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

require("dotenv").config();

const Order = require("./models/orders");
const Admin = require("./models/admins");
// const graphQlSchema = require("./GraphQL/schemas/index");
// const graphQlResolvers = require("./GraphQL/resolvers/index");
// const isAuth = require('./middleware/is-auth');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// const orders = [];

// app.use(isAuth);

app.use(
  "/graphql",
  graphqlHTTP({
    schema: buildSchema(`
      type order {
        _id: ID!
        service : String!
        date: String!
       }

       type admin {
        _id: ID!
        userName: String!
        fullName: String!
        password: String
        
      }

       input orderInput {
        service: String!
        date: String!
      }

      input adminInput {
        userName: String!
        fullName: String!
        password: String!
      }

       type RootQuery {
           orders: [order!]!

       }

       type RootMutation {
           createOrder(orderInput : orderInput): order
           createAdmin(adminInput : adminInput): admin

       }
       schema {
           query: RootQuery
           mutation: RootMutation
       }
   `),
    rootValue: {
      orders: () => {
        return Order.find()
          .then((orders) => {
            console.log(orders, "find order");
            return orders.map((order) => {
              return { ...order._doc, _id: order.id };
            });
          })
          .catch((err) => {
            throw err;
          });
      },
      createOrder: (args) => {
        const order = new Order({
          service: args.orderInput.service,
          date: new Date().toISOString(),
          customerName: " 60789996e7a8a968ccc609c3",
        });
        let createdOrder;
        return order
          .save()
          .then((result) => {
            createdOrder = { ...result._doc, _id: order.id };
            return Admin.findById(" 60789996e7a8a968ccc609c3");
          })
          .then((admin) => {
            if (!admin) {
              throw new Error("admin not found");
            }
            admin.createdOrder.push(order);
            return admin.save();
          })
          .then((result) => {
            return createdOrder;
          })
          .catch((err) => {
            console.log("error from saving", err);
            throw err;
          });
      },

      createAdmin: (args) => {
        Admin.findOne({ userName: args.adminInput.userName })
          .then((admin) => {
            if (admin) {
              throw new Error("User Already Exists");
            }
            return bcrypt.hash(args.adminInput.password, 12);
          })
          .then((hashedPassword) => {
            const admin = new Admin({
              fullName: args.adminInput.fullName,
              userName: args.adminInput.userName,
              password: hashedPassword,
            });
            return admin.save();
            // console.log(admin, "admin data which is saved");
          })
          .then((result) => {
            return { ...result._doc, password: null };
          })

          .catch((err) => {
            console.log("error from saving and hashing pass", err);
            throw err;
          });
      },
    },
    graphiql: true,
  })
);

//connect with database
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

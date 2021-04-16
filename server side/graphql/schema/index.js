const { buildSchema } = require("graphql");

module.exports = buildSchema(`
type order {
  _id: ID!
  customerName: admin!
  service : String!
  date: String!
 }

 type admin {
  _id: ID!
  userName: String!
  fullName: String!
  password: String
  createdOrder: [order!]
  
}

 type authUser {
   adminId: ID!
   token: String!
   tokenExpiration: Int!
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
     admins:[admin!]!
     login(userName: String!, password: String!): authUser

 }

 type RootMutation {
     createOrder(orderInput : orderInput): order
     createAdmin(adminInput : adminInput): admin
     deleteOrder(orderId: ID!): order!
     editOrder(orderId: ID!, service: String): order
     editAdmin(adminId: ID!, fullName: String, userName: String): admin


 }
 schema {
     query: RootQuery
     mutation: RootMutation
 }
 `);

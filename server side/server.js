const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");
const isAuth = require("./middleware/isAuth");

const graphQlSchema = require("./graphql/schema/index");
const graphQlResolvers = require("./graphql/resolvers/index");
// const isAuth = require('./middleware/is-auth');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use(isAuth);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methodss", "POST,GET,OPTIONS,UPDATE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// app.use(isAuth);
app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
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

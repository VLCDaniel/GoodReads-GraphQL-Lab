const express = require("express");
const { port } = require("./config/express");

const { graphqlHTTP } = require("express-graphql");

const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("./controllers/users");

const authorizationMiddleware = require('./middlewares/authorization');

const { getUserId } = require("./controllers/login");

const app = express();

const schema = require("./graphql");

app.get("/users", getAllUsers);
// app.get("/users/:id", getUserById);
// app.post("/users", createUser);
// app.put("/users/:id", updateUser);
// app.delete("/user/:id", deleteUser);

app.use(
  "/graphql",
  authorizationMiddleware,
  graphqlHTTP((req, res, graphQLParams) => {
    return {
      schema,
    };
  })
);

app.listen(port, () => {
  console.log("Server started on", port);
});

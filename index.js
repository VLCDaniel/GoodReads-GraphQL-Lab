const express = require('express');
const { port } = require('./config/express');

const {graphqlHTTP} = require('express-graphql');

const { getAllUsers, getUserById, createUser, updateUser, deleteUser } = require("./controllers/users");
const app = express();

const schema = require('./graphql');

app.get("/users", getAllUsers);
// app.get("/users/:id", getUserById);
// app.post("/users", createUser);
// app.put("/users/:id", updateUser);
// app.delete("/user/:id", deleteUser);

app.use('/graphql', graphqlHTTP({
    schema,
}) );

app.listen(port, () => {
    console.log("Server started on", port);
});
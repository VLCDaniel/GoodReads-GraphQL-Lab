const express = require('express');
const { port } = require('./config/express');

const app = express();

app.listen(port, () => {
    console.log("Server started on", port);
});
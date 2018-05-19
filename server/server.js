require('./config/config');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const _ = require('lodash');
const ObjectId = require('mongoose').Types.ObjectId;

const { mongoose } = require('./db/mongoose');


const port = process.env.PORT || 5000;
const app = express();

app.use(bodyParser.json());
// configure CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, x-auth");
    res.header("Access-Control-Expose-Headers", "x-auth");
    next();
});


app.get("*", (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`Server is start at ${port}`);
});

module.exports = { app };



require('./config/config');
const express = require('express');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const _ = require('lodash');
const ObjectId = require('mongoose').Types.ObjectId;

const { mongoose } = require('./db/mongoose');
const { generateAuthToken, authenticate } = require('./middleware/jwt');
require('./authentication/twitter');

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

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());

app.use(passport.session());

const generateUserToken = (req, res) => {
    const accessToken = generateAuthToken(req.user);
    res.redirect(`http://localhost:3000/auth/success?token=${accessToken}`);
};

app.get('/auth/twitter', passport.authenticate('twitter'));

app.get('/auth/twitter/callback', passport.authenticate('twitter'), generateUserToken);

app.get("/secure", authenticate, (req, res) => {
    res.send(req.user);
});


app.get("*", (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`Server is start at ${port}`);
});

module.exports = { app };



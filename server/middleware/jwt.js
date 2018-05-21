const jwt = require('jsonwebtoken');

const { User } = require('../models/User');

const generateAuthToken = (user) => {
    return jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
};

const authenticate = (req, res, next) => {
    const token = req.headers['x-auth'];
    let decoded;

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
        return res.status(401).send();
    }

    User.findById(decoded._id)
        .then(user => {
            if (!user) {
                res.status(401).send();
            } else {
                req.user = user;
                req.token = token;
                next();
            }
        })
        .catch(e => {
            res.status(401).send();
        });
};

module.exports = { generateAuthToken, authenticate };
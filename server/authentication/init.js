const passport = require('passport');
const { User } = require('../models/User');

module.exports = function () {

    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id)
            .then(user => {
                done(null, user);
            })
            .catch(e => {
                done(e);
            });
    });
};
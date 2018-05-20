const passport = require('passport');
const TwitterStrategy = require('passport-twitter');

const { User } = require('../models/User');
const init = require('./init');

const passportConfig = {
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: ""
};

passport.use(new TwitterStrategy(passportConfig, function (token, tokenSecret, profile, done) {
    
    User
        .findOne({ twitterId: profile.id })
        .then(doc => {
            if (!doc) {
                const newUser = new User({
                    twitterId: profile.id,
                    username: profile.username
                });
                return newUser.save();
            } else {
                return doc;                
            }
        })
        .then(user => {
            done(null, user);
        })
        .catch(err => {
            done(err);
        });
}));

init();
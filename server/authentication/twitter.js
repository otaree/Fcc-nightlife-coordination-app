const passport = require('passport');
const TwitterStrategy = require('passport-twitter');

const passportConfig = {
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: ""
};

passport.use(new TwitterStrategy(passportConfig, function (token, tokenSecret, profile, done) {
    console.log("token", token);
    console.log("tokenSecret", tokenSecret);
    console.log("Profile", profile);
}));
require('dotenv').config()
const express = require('express');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const ObjectId = require("mongoose").Types.ObjectId;

const { mongoose } = require('./db/mongoose');
const { Bar } = require('./models/Bar');
const { generateAuthToken, authenticate } = require('./middleware/jwt');
const { getBusinessData } = require('./utilities/yelp-fusion');
require('./authentication/twitter');

const port = process.env.PORT || 5000;
const app = express();

app.use(express.static(path.join(__dirname, "..", "client", "build")));
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
    // res.redirect(`http://localhost:3000/auth/success?token=${accessToken}`);
    res.redirect(`/auth/success?token=${accessToken}`);
};

app.get('/auth/twitter', passport.authenticate('twitter'));

app.get('/auth/twitter/callback', passport.authenticate('twitter'), generateUserToken);

app.get('/bars/:location', async (req, res) => {
    const location = req.params.location.trim().toLowerCase();
    
    try {
        let businesses;

        businesses = await Bar.findOne({ location });

        if (!businesses) {
            businesses = await getBusinessData(location);  
            const newBar = new Bar({ location, businesses });
            businesses = await newBar.save();                  
        }
        res.send({ businesses });
    } catch (e) {
        res.status(400).send()
    }
});

app.patch('/bars/business/:id', authenticate, async (req, res) => {
    const id = req.params.id;
    const businessId = req.body.business;
    const userId = req.user._id;    

    if (!ObjectId.isValid(id)) {
        return res.status(400).send();
    }

    try {
        let updateBusiness;
        
        const business = await Bar.findOne({ _id: id, "businesses.id": businessId });

        if (!business) {
            throw "No Business";
        }

        const businesses = business.businesses.find(business => businessId === business.id);

        if (businesses.going.indexOf(userId.toHexString()) !== -1) {
            updateBusiness = await Bar.findOneAndUpdate({ _id: id, "businesses.id": businessId  }, { $pull: { "businesses.$.going": userId.toHexString() } }, { new: true });                        
        } else {
            updateBusiness = await Bar.findOneAndUpdate({ _id: id, "businesses.id": businessId  }, { $push: { "businesses.$.going": userId.toHexString() } }, { new: true });            
        }
        res.send({ businesses: updateBusiness });
    } catch (e) {
        res.status(400).send(e);
    }
});


app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"));
});

app.listen(port, () => {
    console.log(`Server is start at ${port}`);
});

module.exports = { app };



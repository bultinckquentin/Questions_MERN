'use strict';

//Load /.env file as environment variables
require('dotenv').config();

//Imports
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const passport = require('passport');

//TODO remove underlying imports from this file
const Thread = require("./model/thread");
const Answer = require("./model/answer");
const Comment = require("./model/comment");
const Tag = require("./model/tag");
const User = require("./model/user");

/*      SETUP GOOGLE STRATEGY
*************************************/
passport.use(new GoogleStrategy({
        clientID:     process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3333/auth/google/callback",
        passReqToCallback   : true
    },
    function(request, accessToken, refreshToken, profile, done) {
        // console.log(profile);

        // User.findOneOrCreate({ googleId: profile.id }, function (err, user) {
        //     return done(err, user);
        // });

        return done(null, profile);
    }
));
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

/*      DATABASE CONNECTION
**********************************/
mongoose.connect(
    `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
    {useMongoClient: true}
);

/*      SERVER SETUP
******************************/
//Setup instances
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

//To prevent errors from Cross Origin Resource Sharing, we will set 
//our headers to allow CORS with middleware like so:
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    //and remove caching
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

/*      SERVER API ROUTES
******************************/
//Use our API router configuration when we call /api
let apiRouter = require("./routeHandler/API");
app.use('/api', apiRouter);

//Authentication with google
let googleAuthRouter = require("./routeHandler/googleAuth");
app.use("/auth/google", googleAuthRouter);

/*      START SERVER
******************************/
const port = process.env.API_PORT;
app.listen(port, function () {
    console.log(`Server running on port ${port}`);
});
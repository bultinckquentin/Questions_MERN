'use strict';

//Load /.env file as environment variables
require('dotenv').config();

//Imports
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const Thread = require("./model/thread");
const Answer = require("./model/answer");
const Comment = require("./model/comment");
const Tag = require("./model/tag");
const User = require("./model/user");

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

/*      START SERVER
******************************/
const port = process.env.API_PORT;
app.listen(port, function () {
    console.log(`api running on port ${port}`);
});
"use strict";

const router = require("express").Router();
const sanitizer = require("sanitizer");

//now we can set the route path & initialize the API
router.get('/', function (req, res) {
    res.json({message: 'API Initialized!'});
});

//adding the /comments route to our /api router
router.route('/threads')
    //retrieve all threads from the database
    .get(function (req, res) {
        Thread.find(function (err, threads) {
            if (err) res.send(err);
            res.json(threads)
        });
    })
    //post new thread to the database
    .post(function (req, res) {
        let comment = new Comment();
        //body parser lets us use the req.body
        comment.author = req.body.author;
        comment.text = req.body.text;
        comment.save(function (err) {
            if (err)
                res.send(err);
            res.json({message: 'Comment successfully added!'});
        });
    });

module.exports = router;
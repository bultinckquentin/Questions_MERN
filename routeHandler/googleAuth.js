"use strict";

const passport = require('passport');
const router = require('express').Router();

router.route('/')
    .get(passport.authenticate('google', {
            scope: ['email', 'profile']
        })
    );
router.route('/callback')
    .get(passport.authenticate('google', {
            successRedirect: 'http://localhost:3000/',
            failureRedirect: '/'
        })
    );

module.exports = router;
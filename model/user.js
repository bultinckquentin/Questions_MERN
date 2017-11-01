'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = Schema({
    _id: {type: Number, required: true},
    username: {type: String, required: true},

    threads: [{type: Schema.ObjectId, ref: "Thread"}],
    answers: [{type: Schema.ObjectId, ref: "Answer"}],
    approvedAnswers: {type: Number, default: 0}
});

module.exports = mongoose.model('User', UserSchema);
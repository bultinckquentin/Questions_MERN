"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let CommentSchema = Schema({
    comment: {type: String, required: true},
    forAnswer: {type: Schema.ObjectId, ref: "Answer", required: true}
});

module.exports = mongoose.model("Comment", CommentSchema);
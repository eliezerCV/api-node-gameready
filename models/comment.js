'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentSchema = Schema({
    idPublication: String,
    author: String,
    dateComment:{type: Date, default: Date.now()},
    content: String
})

module.exports = mongoose.model('Comment', CommentSchema)
'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DiscutionSchema = Schema({
    title:String,
    description:String,
    author:String,
    registerDate: {type: Date, default:Date.now()}
})

module.exports = mongoose.model('Discution', DiscutionSchema)
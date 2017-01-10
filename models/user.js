'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')

const UserSChema = new Schema({
    name: {type:String, unique:true},
    email: {type: String, unique:true, lowercase:true},
    password: {type: String },
    lastName:String,
    company:String,
    signupDate: {type: Date, default: Date.now()},
    lastLogin: {type: Date, default: Date.now()}
})

// una funcion para antes de que se registre el usuario poder encriptar el password

module.exports = mongoose.model('User', UserSChema)

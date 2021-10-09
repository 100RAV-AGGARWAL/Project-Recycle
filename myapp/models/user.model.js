'use strict';
const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    email     : {type: String, allowNull: false, unique: true},
}, {timestamps: true})

const User = mongoose.model('User', userSchema);
module.exports = User;
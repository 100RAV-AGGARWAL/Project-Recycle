'use strict';
const bcrypt         = require('bcrypt');
const bcrypt_p       = require('bcrypt-promise');
const jwt            = require('jsonwebtoken');
const {TE, to}       = require('../services/util.service');
const CONFIG         = require('config');
const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    first     : String,
    last      : String,
    email     : {type: String, allowNull: true, unique: true},
    phone     : {type: String, allowNull: true, unique: true},
    password  : String,
    role      : {type:String, enum:['superuser','admin','user'],default:"user"},
    smsnotification : {type : String, enum:['daily','monthly','weekly','never'],default:"daily"},
    emailnotification : {type : String, enum:['daily','monthly','weekly','never'],default:"daily"}
}, {timestamps: true})
userSchema.pre('save', async function(error, doc, next) {
    let err;
    if (this.isModified('password')){
        let salt, hash
        [err, salt] = await to(bcrypt.genSalt(10));
        if(err) TE(err.message, true);

        [err, hash] = await to(bcrypt.hash(this.password, salt));
        if(err) TE(err.message, true);

        this.password = hash;
    }
    doc.role="user";
    next();
});

userSchema.methods.comparePassword = async function (pw) {
    let err, pass
    if(!this.password) TE('password not set');

    [err, pass] = await to(bcrypt_p.compare(pw, this.password));
    if(err) TE(err);

    if(!pass) TE('invalid password');

    return this;
};

userSchema.methods.getJWT = function () {
    let expiration_time = parseInt(CONFIG.get("jwt").expiration);
    return "Bearer "+jwt.sign({user_id:this._id}, CONFIG.get("jwt").secretKey, {expiresIn: expiration_time});
};

const User = mongoose.model('User', userSchema);
module.exports = User;
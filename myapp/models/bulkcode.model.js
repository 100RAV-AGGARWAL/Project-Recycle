"use strict";
const mongoose = require('mongoose');

const BulkCode = mongoose.model('BulkCode', new mongoose.Schema({
    tokenrequire : {type: Number},
    token :{type : String},
	expiredat: { type: Date },
    // takenById: { type: mongoose.ObjectId, ref: 'User', allowNull: false }
}, { timestamps: true }));

module.exports = BulkCode;
"use strict";
const mongoose = require('mongoose');

const BulkCode = mongoose.model('BulkCode', new mongoose.Schema({
    tokenrequire : {type: Number},
    token :{type : Array},
	expiredat: { type: Date },
    emailId: { type: String }
}, { timestamps: true }));

module.exports = BulkCode;
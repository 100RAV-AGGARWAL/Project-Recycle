"use strict";
const mongoose = require('mongoose');

const BulkCode = mongoose.model('BulkCode', new mongoose.Schema({
    coderequire : {type: Number},
	expiredat: { type: Date },
}, { timestamps: true }));

module.exports = BulkCode;
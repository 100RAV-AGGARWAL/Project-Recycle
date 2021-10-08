"use strict";
const mongoose = require('mongoose');

const User_Payment_Info = mongoose.model('User_Payment_Info', new mongoose.Schema({
  tokenType: { type: String, allowNull: false, required: true},
  token: { type: String, allowNull: true},
  amount: { type: Number, allowNull: false, required: true},
  status: {
    type: String,
    enum: ["SUCCESS", "FAILURE", "ERROR", "TIMEOUT", "PENDING"],
    default: "PENDING"
  },
  customerId: {type: mongoose.ObjectId, ref: 'User', allowNull: false},
  currency: {type: String, allowNull: true, default: "INR"},
  date: {type: Date, allowNull: false},
  banktxnId: {type: String, allowNull: true, default: ""},
  respCode: {type: String, allowNull: true, default: ""},
  respMessage: {type: String, allowNull: true, default: ""},
  bankName: {type: String, allowNull: true, default: ""},
  paymentMode: {type: String, allowNull: true, default: ""},
  gatewayName: {type: String, allowNull: true, default: ""},
}, {timestamps: true}));

module.exports = User_Payment_Info;
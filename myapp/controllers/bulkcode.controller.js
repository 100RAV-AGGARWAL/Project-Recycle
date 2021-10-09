const { to, ReE, ReS } = require("../services/util.service");
const { BulkCode, User } = require("../models");
const { getPublicInfo } = require("./user.controller");
const config = require('config');
var crypto = require('crypto');


const create = async function (req, res) {

	res.setHeader('Content-Type', 'application/json');
	const body = req.body;
	let tokenrequire = body.tokenrequire;
	let err, bulkcode;
	body.token=[];
	for (let i=0;i <tokenrequire;i++) {
		[err, token] = await to(new Promise((resolve, reject) => {
			crypto.randomBytes(20, function (err, buf) {
				if (err) {
					reject(err);
				} else {
					var token = buf.toString("hex");
					resolve(token);
				}
			});

		}));
		if (err) console.log("token is not generating");
		body.token.push(token);
	}

	
	if (body.expiredat) {
	var expireDate = Date.parse(body.expiredat);
	var current = Date();
	if (current < expireDate) {
		console.log("Date is expired");
		return ReE(res, err, 422);
	}
}
	// [err,user]= await to(User.findbyId(req.user.id))
	// body.emailId = user.email;
	[err, bulkcode] = await to(BulkCode.create(body));
	let bulkcodeJson = bulkcode.toObject();
	[err, bulkcodeJson] = await to(bulkcode.save())
	if (err) console.log("Error error");
	//bulkcodeJson.users = [{ user: req.user.id }];

	return ReS(res, { message: 'Successfully created your bulk codes.', bulkcode: bulkcodeJson }, 201);
}

module.exports.create = create;

const get = async function (req, res) {

let err, bulkcode, user;

 	[err, bulkcode] = await to(findByPk(req.query._id));
 	if (err) {
 		console.log("Can't able to get token");
 		return ReE(res, err, 422);
	}

	let bulkcodeJson = bulkcode.toObject();
// 	//bulkcode.user = user;

 	res.setHeader('Content-Type', 'application/json');
 	return ReS(res, { bulkcode: bulkcodeJson });
 }
module.exports.get = get;

const findByPk = async function (_id) {
 	let  bulkcode;
 	if (!_id) {
		console.log("Id not found");
 	}

 	[err,bulkcode] = await to(BulkCode.findById(_id));
	if(err){
		console.log("Bulkcode id is not found");
	}
 	return bulkcode;
 }
module.exports.findByPk = findByPk;
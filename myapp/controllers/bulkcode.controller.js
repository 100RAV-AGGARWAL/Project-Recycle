const { to, ReE, ReS } = require("../services/util.service");
const { BulkCode } = require("../models");
const config = require('config');

const create = async function (req, res) {
	res.setHeader('Content-Type', 'application/json');
	let err, bulkcode;
	const body = req.body;

	if (body.expiredat) {
		var expireDate = Date.parse(body.expiredat);
		var current = Date();
		if (current < expireDate) {
			logger.error("Notification Controller - create : Expired date is old");
			return ReE(res, err, 422);
		}
	}

	[err, bulkcode] = await to(BulkCode.create(body));

	let bulkcodeJson = bulkcode.toObject();

	return ReS(res, { message: 'Successfully created your bulk codes.', bulkcode: bulkcodeJson }, 201);
}

module.exports.create = create;
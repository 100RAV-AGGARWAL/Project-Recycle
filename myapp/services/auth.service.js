const { User } = require('../models');
const validator = require('validator');
const { to, TE } = require('../services/util.service');

const getUniqueKeyFromBody = function (body) {// this is so they can send in 3 options unique_key, email, or phone and it will work
	let unique_key = body.unique_key;
	if (typeof unique_key === 'undefined') {
		if (typeof body.email != 'undefined') {
			unique_key = body.email
		} else if (typeof body.phone != 'undefined') {
			unique_key = body.phone
		} else {
			unique_key = null;
		}
	}

	return unique_key;
}

module.exports.getUniqueKeyFromBody = getUniqueKeyFromBody;


const authUser = async function (userInfo) {//returns token
	let unique_key;
	let auth_info = {};
	auth_info.status = 'login';
	unique_key = getUniqueKeyFromBody(userInfo);

	if (!unique_key) TE('Please enter an email or phone number to login');


	if (!userInfo.password) TE('Please enter a password to login');

	let user;
	if (validator.isEmail(unique_key)) {
		auth_info.method = 'email';

		[err, user] = await to(User.findOne({ email: unique_key, blocked: false }));
		console.log(err, user, unique_key);
		if (err) TE(err.message);
		if (user && user.isActivated == false) {
			TE("User has not been activated yet. Please refer your email for the same.");
		}

	} else if (validator.isMobilePhone(unique_key, 'any')) {//checks if only phone number was sent
		auth_info.method = 'phone';

		[err, user] = await to(User.findOne({ phone: unique_key, blocked: false }));
		if (err) TE(err.message);
		if (user && user.isActivated == false) {
			TE("User has not been activated yet. Please refer your email for the same.");
		}

	} else {
		TE('A valid email or phone number was not entered');
	}

	if (!user) TE('User not registered');

	[err, user] = await to(user.comparePassword(userInfo.password));

	if (err) TE(err.message);

	return user;

}
module.exports.authUser = authUser;

module.exports.roleAuthorization = function (roles) {
	return function (req, res, next) {
		if (roles.indexOf(req.user.role) > -1 || req.user.role === "superuser" || (req.user.role !== "superuser" && req.user.role === "admin")) {
			return next();
		}

		res.status(401).json({ error: 'You are not authorized to view this content' });
		return next('Unauthorized');
	}

}

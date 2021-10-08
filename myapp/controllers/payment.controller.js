const { to, ReE, ReS } = require("../services/util.service");
const { User_Payment_Info, User } = require("../models");
const config = require("config");
const https = require('https');
const PaytmChecksum = require('paytmchecksum');
const checksum_lib = require('checksum');

let paymentConfig = config.get("payment");

const createOrder = async function(req, res) {
	res.setHeader("Content-Type", "application/json");
	const body = req.body;
	let err, user_payment_info;
  
	if(!req.user.id) {
	  return ReE(res, err, 401);
	}
  
	body.customerId = req.user.id;
	body.status = "PENDING";
	body.amount = 100;
	body.token = "";
	body.tokenType = "TXN_TOKEN";
  
	[err, user_payment_info] = await to(User_Payment_Info.create(body));
	if (err) return ReE(res, err, 422);
  
	let customerJson = user_payment_info.toObject();
	customerJson.customer = [{ user: req.user.id }];
  
	return ReS(
	  res,
	  { message: "Successfully created new transaction.", customerInfo: customerJson },
	  201
	);
}
module.exports.createOrder = createOrder;

const initateTransaction = async function(req, res) {
	var paytmParams = {};
	
	//find db through orderId
	let customerInfo, order_id;
	order_id = req.body.orderId;

	[err, customerInfo] = await to(User_Payment_Info.findById(order_id));
	if(err) {
		console.log("Error getting customer Info");
		return;
	}

	paytmParams.body = {
	    "requestType"   : "Payment",
	    "mid"           : "SKLANi73687573808064",
	    "websiteName"   : "WEBSTAGING",
	    "orderId"       : order_id,
	    "callbackUrl"   : "https://merchant.com/callback",
	    "txnAmount"     : {
	        "value"     : customerInfo.amount,
	        "currency"  : "INR",
	    },
	    "userInfo"      : {
	        "custId"    : customerInfo.customerId,
	    },
	};

	/*
	* Generate checksum by parameters we have in body
	* Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys 
	*/
	[err, checksum] = await to(PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), "rpfmvN@Ce1N_E2o1"));
	if(err) {
		console.log("Error initiating transaction");
		return;
	}

    paytmParams.head = {
        "signature"    : checksum
    };

    var post_data = JSON.stringify(paytmParams);

    var options = {

        /* for Staging */
        hostname: paymentConfig.hostname,

        /* for Production */
        // hostname: 'securegw.paytm.in',

        port: paymentConfig.port,
        path: `${paymentConfig.path}${paytmParams.body.orderId}`,
        method: paymentConfig.method,
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': post_data.length
        }
    };

    var response = "";
	[err, Response] = await to(new Promise((resolve, reject) => {
	    var post_req = https.request(options, function(post_res) {
	        post_res.on('data', function (chunk) {
	            response += chunk;
	        });

	        post_res.on('end', function(){
				responseObject = JSON.parse(response);
	            console.log('Response: ', response);
				resolve(responseObject);
	        });
	    });

	    post_req.write(post_data);
	    post_req.end();
	}));
	if(err) {
		console.log("Error getting transaction token");
		return;
	}

	customerInfo.token = Response.body.txnToken;
	customerInfo.currency = paytmParams.body.txnAmount.currency;

	[err, savedInfo] = await to(customerInfo.save());
	if (err) {
	  if (err.message == "Validation error")
		err = "Error updating data";
	  return ReE(res, err, 422);
	}

	return ReS(
		res,
		{ message: "Successfully initiated transaction.", Response: Response },
		201
	);
}
module.exports.initateTransaction = initateTransaction;

const validateTransaction = async function(req, res) {
	res.setHeader("Content-Type", "application/json");

	const received_data = req.body;
	let customerInfo, mid="SKLANi73687573808064";

	// ORDERID
	[err, customerInfo] = await to(User_Payment_Info.findById(received_data["ORDERID"]));
	if(err) {
		console.log("Error getting customer Info");
	}

	// MID
	if(received_data["MID"] != mid) {
		console.log("Merchant Id not validated");
	}

	// TXNID
	if(received_data["TXNID"] != customerInfo.token) {
		console.log("Transaction Id not validated");
	}

	// TXNAMOUNT
	if(received_data["TXNAMOUNT"] != customerInfo.amount) {
		console.log("Error validating transaction amount");
	}

	// CURRENCY
	if(received_data["CURRENCY"] != customerInfo.currency) {
		console.log("Error validating transaction currency");
	}
	// TXNDATE

	// CHECKSUMHASH
	var paytmChecksum = "";

	/**
	* Create an Object from the parameters received in POST
	* received_data should contains all data received in POST
	*/
	var paytmParams = {};
	for(var key in received_data){
		if(key == "CHECKSUMHASH") {
			paytmChecksum = received_data[key];
		} else {
			paytmParams[key] = received_data[key];
		}
	}

	/**
	* Verify checksum
	* Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys 
	*/
	var isValidChecksum = checksum_lib.verifychecksum(paytmParams, "rpfmvN@Ce1N_E2o1", paytmChecksum);
	if(isValidChecksum) {
		console.log("Checksum Matched");
	} else {
		console.log("Checksum Mismatched");
	}

	// STATUS
	/* body parameters */
	paytmParams.body = {

		/* Find your MID in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys */
		"mid" : "SKLANi73687573808064",

		/* Enter your order id which needs to be check status for */
		"orderId" : received_data.orderId,
	};

	/**
	* Generate checksum by parameters we have in body
	* Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys 
	*/
	[err, checksum] = await to(PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), "rpfmvN@Ce1N_E2o1"));
	if(err) {
		console.log("Error initiating transaction");
		return;
	}

	/* head parameters */
	paytmParams.head = {
		/* put generated checksum value here */
		"signature"	: checksum
	};

	/* prepare JSON string for request */
	var post_data = JSON.stringify(paytmParams);

	var options = {

		/* for Staging */
		hostname: 'securegw-stage.paytm.in',

		/* for Production */
		// hostname: 'securegw.paytm.in',

		port: 443,
		path: '/v3/order/status',
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Content-Length': post_data.length
		}
	};

	// Set up the request
	var response = "";
	[err, Response] = await to(new Promise((resolve, reject) => {
	    var post_req = https.request(options, function(post_res) {
	        post_res.on('data', function (chunk) {
	            response += chunk;
	        });

	        post_res.on('end', function(){
				responseObject = JSON.parse(response);
	            console.log('Response: ', response);
				resolve(responseObject);
	        });
	    });

	    post_req.write(post_data);
	    post_req.end();
	}));
	if(err) {
		console.log("Error getting transaction token");
		return;
	}
	
	if(received_data["STATUS"] != Response.body.status) {
		console.log("Transaction status not validated");
	}
}
module.exports.validateTransaction = validateTransaction;

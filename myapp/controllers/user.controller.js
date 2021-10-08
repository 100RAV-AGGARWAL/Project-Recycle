const { User }          = require('../models');
const authService       = require('../services/auth.service');
const { to, ReE, ReS }  = require('../services/util.service');

const create = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    const body = req.body;

    let err, user;

    [err, user] = await to(authService.createUser(body));
    if(err) return ReE(res, err, 422);
    return ReS(res, {message:'Successfully created new user.', user:user.toObject()}, 201);
}
module.exports.create = create;

const get = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let user = req.user;

    return ReS(res, {user:user.toObject()});
}
module.exports.get = get;


const getPublicInfo = async function(userId){
    let err,user;
    [err,user] = await to(User.findById(userId));
    if(err){
        throw err;
    }
    return {
        id:user._id,
        _id:user._id,
        first: user.first,
        last:user.last,
        email: user.email
   }
    
}
module.exports.getPublicInfo = getPublicInfo;


const { User }          = require('../models');
const authService       = require('../services/auth.service');
const { to, ReE, ReS }  = require('../services/util.service');

const create = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    const body = req.body;

    if(!body.unique_key && !body.email && !body.phone){
        return ReE(res, 'Please enter an email or phone number to register.');
    } else if(!body.password){
        return ReE(res, 'Please enter a password to register.');
    }else{
        let err, user;

        [err, user] = await to(authService.createUser(body));

        if(err) return ReE(res, err, 422);
        return ReS(res, {message:'Successfully created new user.', user:user.toObject(), token:user.getJWT()}, 201);
    }
}
module.exports.create = create;

const get = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let user = req.user;

    return ReS(res, {user:user.toObject()});
}
module.exports.get = get;

const update = async function(req, res){
    let err, user, data
    user = req.user;
    data = req.body;
    user.set(data);

    [err, user] = await to(user.save());
    if(err){
        if(err.message=='Validation error') err = 'The email address or phone number is already in use';
        return ReE(res, err);
    }
    return ReS(res, {message :'Updated User: '+user.email});
}
module.exports.update = update;

const remove = async function(req, res){
    let user, err;
    user = req.user;

    [err, user] = await to(user.destroy());
    if(err) return ReE(res, 'error occured trying to delete user');

    return ReS(res, {message:'Deleted User'}, 204);
}
module.exports.remove = remove;

const login = async function(req, res){
    const body = req.body;
    let err, user;

    [err, user] = await to(authService.authUser(req.body));
    if(err) return ReE(res, err, 422);

    return ReS(res, {token:user.getJWT(), user:user.toObject()});
}
module.exports.login = login;

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

const profile = async function(req, res){
    let user_id, err,user;
    user_id = req.query._id;
    [err, user] = await to(getPublicInfo(user_id));
    if(err) return ReE(res, err.message);
    res.setHeader('Content-Type', 'application/json');
    return ReS(res, {user:user});
    
 }
module.exports.profile = profile;

const getUserList = async function(req, res){
    let userList;

    [err, userList] = await to(User.find());
    if(err) return {};

    let userObject = {};
    for(let user of userList) {
        userObject[user._id] = user;
    }

    return userObject;
}
module.exports.getUserList = getUserList;
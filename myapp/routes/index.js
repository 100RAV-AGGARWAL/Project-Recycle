var express = require('express');
var router = express.Router();
const BulkCodeController = require('../controllers/bulkcode.controller');
const UserController = require('../controllers/user.controller');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/createUser', UserController.create); //create   
// router.get('/users', UserController.get);  //read
// router.post('/users/login', UserController.login);
router.post('/token/create', BulkCodeController.create);
router.get('/token/get', BulkCodeController.get)

module.exports = router;


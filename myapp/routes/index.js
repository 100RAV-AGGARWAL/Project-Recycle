var express = require('express');
var router = express.Router();
const BulkCodeController = require('../controllers/bulkcode.controller');
const UserController = require('../controllers/user.controller');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/users', UserController.create); //create   
router.get('/users', requireAuth, authService.roleAuthorization(["user"]), UserController.get);  //read
router.put('/users', requireAuth, authService.roleAuthorization(["user"]), UserController.update); //update  
router.get('/users/list', requireAuth, authService.roleAuthorization(["admin"]), UserController.userList); //update  
router.put('/users/others', requireAuth, authService.roleAuthorization(["admin"]), UserController.updateOtherUser); //update  
router.get('/users/getUser', requireAuth, authService.roleAuthorization(["admin"]), UserController.getUser); //update  
router.post('/users/login', UserController.login);
router.post('/token/create', BulkCodeController.create);

module.exports = router;


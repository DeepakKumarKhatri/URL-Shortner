var express = require('express');
var router = express.Router();
const userController = require("../controllers/user");

router.post('/', userController.handleUserSignUp);
router.post('/login', userController.handleUserLoginIn);

module.exports = router;
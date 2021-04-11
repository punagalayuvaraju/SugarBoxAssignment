'use strict';

var express = require('express');
var controller = require('./user.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.post('/', controller.create);

router.post('/getUsers',auth.isAuthenticated(), controller.getAllUsers);

router.delete('/:userId', auth.isAuthenticated(), controller.userDelete);

module.exports = router;

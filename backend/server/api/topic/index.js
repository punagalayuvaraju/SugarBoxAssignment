'use strict';

var express = require('express');
var controller = require('./topic.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/:id', controller.index);

router.post('/',auth.isAuthenticated(), controller.create);


module.exports = router;
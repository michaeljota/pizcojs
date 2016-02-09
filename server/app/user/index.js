'use strict';

var router = require('express').Router();
var controller = require('./user.controller');
var auth = require('../auth/auth.middleware');

router.get('/', controller.index);
router.get('/me', auth.isAuthenticated(), controller.me);
router.post('/', controller.create);

module.exports = router;
'use strict';

var router = require('express').Router();
var controller = require('./auth.controller');

router.post('/local', controller.local);

module.exports = router;
'use strict';

var router = require('express').Router();
var controller = require('./room.controller');
var auth = require('../auth/auth.middleware');

//#region Rooms routes
router.route('/')
    .get(controller.findAll)
    .post(auth.isAuthenticated(), controller.add);

router.route('/:roomId')
    .get(controller.find)
    .put(controller.update)
    .delete(controller.destroy)

router.route('/:roomId/enter')
    .post(auth.isAuthenticated(), controller.enter);
//#endregion

module.exports = router;

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
  .post(controller.update)
  .put(controller.update)
  .delete(controller.destroy)

router.route('/:roomId/enter')
  .post(auth.isAuthenticated(), controller.enter);
//#endregion

router.route('/:roomId/whiteboards')
  .get(controller.findAllWhiteboards)
  .post(controller.addWhiteboard);

module.exports = router;

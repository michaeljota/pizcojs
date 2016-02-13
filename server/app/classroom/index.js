'use strict';

var router = require('express').Router();
var controller = require('./classroom.controller');
var whiteboardController = require('../whiteboard/whiteboard.controller');

//#region Classrooms routes
router.route('/')
    .get(controller.findAll)
    .post(controller.add);

router.route('/:crId')
    .get(controller.find)
    .post(controller.update)
    .put(controller.update)
    .delete(controller.destroy);
//#endregion

router.route('/:crId/whiteboard')
    .get(whiteboardController.find)
    .post(whiteboardController.add);

module.exports = router;

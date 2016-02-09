'use strict';

var router = require('express').Router();
var whiteboardController = require('./whiteboard.controller');

//region Whiteboards routes
router.route('/whiteboards')
    .get(whiteboardController.findAll)
    .post(whiteboardController.add);

router.route('/whiteboards/:wbId')
    .get(whiteboardController.find)
    .post(whiteboardController.update)
    .put(whiteboardController.update)
    .delete(whiteboardController.destroy);
//#endregion

module.exports = router;
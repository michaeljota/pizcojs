'use strict';

var router = require('express').Router();
var controller = require('./classroom.controller');

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

module.exports = router;

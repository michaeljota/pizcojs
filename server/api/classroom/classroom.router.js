'use strict';

var router = require('express').Router();
var controller = require('./classroom.controller');

router.route('/classrooms')
    .get(controller.findAll)
    .post(controller.add);

router.route('/classrooms/:classId')
    .get(controller.find)
    .post(controller.update)
    .put(controller.update)
    .delete(controller.destroy);

router.route('/classrooms/:classId/Whiteboard/add')
    .get(controller.newWhiteboard);

router.route('/classrooms/:classId/addShape')
    .post(controller.addShape);

router.route('/classrooms/:classId/addPoint')
    .post(controller.addPoint);

module.exports = router;

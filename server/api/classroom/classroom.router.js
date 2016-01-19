'use strict';

var router = require('express').Router();
var classroomController = require('./classroom.controller');
var whiteboardController = require('./whiteboard.controller');
var shapeController = require('./shape.controller');

router.route('/classrooms')
    .get(classroomController.findAll)
    .post(classroomController.add);

router.route('/classrooms/:classId')
    .get(classroomController.find)
    .post(classroomController.update)
    .put(classroomController.update)
    .delete(classroomController.destroy);

router.route('/classrooms/:classId/whiteboards')
    .get(whiteboardController.findAll)
    .post(whiteboardController.add);

router.route('/whiteboards/:wbId')
    .get(whiteboardController.find)
    .post(whiteboardController.update)
    .put(whiteboardController.update)
    .delete(whiteboardController.destroy);

router.route('/whiteboards/:wbId/shapes')
    .get(shapeController.findAll)
    .post(shapeController.add);

router.route('/shapes/:shapeId')
    .get(shapeController.find)
    .post(shapeController.update)
    .put(shapeController.update)
    .delete(shapeController.destroy);

router.route('/shapes/:shapeId/points')
    .get(shapeController.findPoints)
    .post(shapeController.addPoint);

module.exports = router;

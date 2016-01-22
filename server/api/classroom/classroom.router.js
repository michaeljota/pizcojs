'use strict';

var router = require('express').Router();
var classroomController = require('./classroom.controller');
var whiteboardController = require('./whiteboard.controller');
var shapeController = require('./shape.controller');

//#region Classrooms routes
router.route('/classrooms')
    .get(classroomController.findAll)
    .post(classroomController.add);

router.route('/classrooms/:crId')
    .get(classroomController.find)
    .post(classroomController.update)
    .put(classroomController.update)
    .delete(classroomController.destroy);
//#endregion

//region Whiteboards routes
router.route('/classrooms/:crId/whiteboards')
    .get(whiteboardController.findAll)
    .post(whiteboardController.add);

router.route('/whiteboards/:wbId')
    .get(whiteboardController.find)
    .post(whiteboardController.update)
    .put(whiteboardController.update)
    .delete(whiteboardController.destroy);
//#endregion

//#region Shapes routes
router.route('/whiteboards/:wbId/shapes')
    .get(shapeController.findAll)
    .post(shapeController.add);

router.route('/shapes/:shapeId')
    .get(shapeController.find)
    .post(shapeController.update)
    .put(shapeController.update)
    .delete(shapeController.destroy);
//#endregion

//#region Points routes
router.route('/shapes/:shapeId/points')
    .get(shapeController.findPoints)
    .post(shapeController.addPoint);
//#endregion

module.exports = router;

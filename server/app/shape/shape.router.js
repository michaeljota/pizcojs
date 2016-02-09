'use strict';

var router = require('express').Router();
var controller = require('./shape.controller');

//#region Shapes routes
router.route('/:wbId/shapes')
    .get(controller.findAll)
    .post(controller.add);

router.route('/shapes/:shapeId')
    .get(controller.find)
    .post(controller.update)
    .put(controller.update)
    .delete(controller.destroy);
//#endregion

//#region Points routes
router.route('/shapes/:shapeId/points')
    .get(controller.findPoints)
    .post(controller.addPoint);
//#endregion

module.exports = router;
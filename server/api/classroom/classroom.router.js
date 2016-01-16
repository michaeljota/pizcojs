var router = require('express').Router();
var controller = require('./classroom.controller');

router.route('/classrooms')
    .get(controller.findAll)
    .post(controller.add);

router.route('/classrooms/:classId')
    .get(controller.find)
    .post(controller.update)
    .put(controller.update)
    .delete(controller.remove);

module.exports = router;

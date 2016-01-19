'use strict';

var Classroom = require('./classroom.model').Classroom;
var Whiteboard = require('./classroom.model').Whiteboard;
var Shape = require('./classroom.model').Shape;
var Point = require('./classroom.model').Point;

function errorHandler (res, err) {
    res.status(500).send(err.message);
}

function successHandler (res, obj) {
    res.status(200).jsonp(obj);
}

function findAll (req, res) {
    Whiteboard.loadOne({_id: req.params.wbId})
        .then(whiteboard => successHandler (res, whiteboard.shapes))
        .catch(err => errorHandler (res, err));
}

function find (req, res) {
    Shape.loadOne({_id: req.params.shapeId})
        .then(shape => successHandler (res, shape))
        .catch(err => errorHandler (res, err));
}

function add (req, res) {
    var s = Shape.create({
        type:req.body.type
    });
    s.save()
        .then(shape => {
            Whiteboard.loadOne({_id: req.params.wbId})
                .then(whiteboard => {
                    whiteboard.shapes.push(shape);
                    whiteboard.save()
                        .then(classroom => successHandler (res, shape))
                        .catch(err => errorHandler (res, err))
                })
                .catch(err => errorHandler (res, err));
        })
        .catch(err => errorHandler (res, err));
}

function update (req, res) {
    Shape.loadOneAndUpdate(
        {_id: req.params.shapeId},
        {
            type:req.body.type
        })
        .then(whiteboard => successHandler (res, whiteboard))
        .catch(err => errorHandler (res, err));
}

function destroy (req, res) {
    Shape.loadOneAndDelete({_id: req.params.shapeId})
        .then(successHandler (res, null))
        .catch(err => errorHandler (res, err));
}

function findPoints (req, res) {
    Shape.loadOne({_id: req.params.shapeId})
        .then(shape => successHandler (res, shape.points))
        .catch(err => errorHandler (res, err));
}

function addPoint (req, res) {
    Shape.loadOne({_id: req.params.shapeId})
        .then(shape => {
            var point = Point.create({
                x: req.body.x,
                y: req.body.y
            });
            shape.points.push(point);
            shape.save()
                .then(shapeUpdated => successHandler (res, shapeUpdated))
                .catch(err => errorHandler (res, err));
        })
        .catch(err => errorHandler (res, err));
}

/**
 * Naming for endpoints.
 * GET      /shapes                      ->  findAll
 * POST     /shapes                      ->  create
 * GET      /shapes/:shapeId             ->  find
 * POST     /shapes/:shapeId             ->  update
 * PUT      /shapes/:shapeId             ->  update
 * DELETE   /shapes/:shapeId             ->  destroy
 *
 * POST     /shape/:shapeId/addPoint    -> addPoint
 */

module.exports.findAll = findAll;
module.exports.find = find;
module.exports.add = add;
module.exports.update = update;
module.exports.destroy = destroy;
module.exports.findPoints = findPoints;
module.exports.addPoint = addPoint;

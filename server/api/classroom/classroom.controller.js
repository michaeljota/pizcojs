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
    Classroom.loadMany()
        .then(clasrooms => successHandler (res, clasrooms))
        .catch(err => errorHandler (res, err));
}

function find (req, res) {
    Classroom.loadOne({_id: req.params.classId})
        .then(classroom => successHandler (res, classroom))
        .catch(err => errorHandler (res, err));
}

function add (req, res) {
    var classroom = Classroom.create({
        name: req.body.name
    });
    classroom.save()
        .then(classroom => successHandler (res, classroom))
        .catch(err => errorHandler (res, err));
}

function update (req, res) {
    Classroom.loadOneAndUpdate(
        {_id: req.params.classId},
        {
            name: req.body.name
        })
        .then(classroom => successHandler (res, classroom))
        .catch(err => errorHandler (res, err));
}

function destroy (req, res) {
    Classroom.loadOneAndDelete(
        {_id: req.params.classId})
        .then(successHandler (res, []))
        .catch(err => errorHandler (res, err));
}

function whiteboard (req, res) {
    Classroom.loadOne ({_id: req.params.classId})
        .then(classroom => successHandler (res, classroom.whiteboards))
        .catch(err => errorHandler (res, err));
}

function newWhiteboard (req, res) {
    Classroom.loadOne({_id: req.params.classId})
        .then(function(classroom){
            classroom.whiteboards.push(Whiteboard.create());
            classroom.save()
                .then(classroom => successHandler(res, classroom))
                .catch(err => errorHandler(res, err));
        })
        .catch(err => errorHandler(res, err));
}

function addShape (req, res) {
    Classroom.loadOne({_id: req.params.classId})
        .then(function(classroom){
            var shape = Shape.create({
                type: req.body.type,
                lineColor: req.body.lineColor,
                fillColor: req.body.fillColor
            });
            classroom.whiteboards[classroom.whiteboards.length-1].shapes.push(shape);
            classroom.save()
                .then(classroom => successHandler (res, shape))
                .catch(err => errorHandler (res, err));
        })
        .catch(err => errorHandler(res, err))
}

function addPoint (req, res) {
    Classroom.loadOne({_id: req.params.classId})
        .then(function(classroom){
            var point = Point.create({
                x: req.body.x,
                y: req.body.y
            });
            var wbIndex = classroom.whiteboards.length-1;
            var sIndex = classroom.whiteboards[wbIndex].shapes.length-1;
            classroom.whiteboards[wbIndex].shapes[sIndex].points.push(point);
            classroom.save()
                .then(classroom => successHandler (res, point))
                .catch(err => errorHandler (res, err));
        })
        .catch(err => errorHandler(res, err));
}


/**
 * Naming for endpoints.
 * GET      /classroom                   ->  findAll
 * POST     /classroom                   ->  create
 * GET      /classroom/:classId          ->  find
 * POST     /classroom/:classId          ->  update
 * PUT      /classroom/:classId          ->  update
 * DELETE   /classroom/:classId          ->  destroy
 *
 * GET      /classroom/whiteboard        ->  whiteboard
 * POST     /classroom/whiteboard        ->  createWhiteboard
 */

module.exports.findAll = findAll;
module.exports.find = find;
module.exports.add = add;
module.exports.update = update;
module.exports.destroy = destroy;
module.exports.newWhiteboard = newWhiteboard;
module.exports.addShape = addShape;
module.exports.addPoint = addPoint;

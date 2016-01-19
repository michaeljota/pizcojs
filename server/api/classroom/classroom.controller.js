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
        className: req.body.name
    });
    classroom.save()
        .then(classroom => successHandler (res, classroom))
        .catch(err => errorHandler (res, err));
}

function update (req, res) {
    Classroom.loadOneAndUpdate({_id: req.params.classId},
        {
            className: req.body.name
        })
        .then(classroom => successHandler (res, classroom))
        .catch(err => errorHandler (res, err));
}

function destroy (req, res) {
    Classroom.loadOneAndDelete({_id: req.params.classId})
        .then(successHandler (res, null))
        .catch(err => errorHandler (res, err));
}

/**
 * Naming for endpoints.
 * GET      /classroom                   ->  findAll
 * POST     /classroom                   ->  create
 * GET      /classroom/:classId          ->  find
 * POST     /classroom/:classId          ->  update
 * PUT      /classroom/:classId          ->  update
 * DELETE   /classroom/:classId          ->  destroy
 */

module.exports.findAll = findAll;
module.exports.find = find;
module.exports.add = add;
module.exports.update = update;
module.exports.destroy = destroy;

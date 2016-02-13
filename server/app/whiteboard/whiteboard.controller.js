'use strict';

var Classroom = require('../classroom/classroom.model');
var Whiteboard = require('./whiteboard.model');

function errorHandler (res, err) {
    res.status(500).send(err.message);
}

function successHandler (res, obj) {
    res.status(200).jsonp(obj);
}

function findAll (req, res) {
    Classroom.loadOne({_id: req.params.crId})
        .then(classroom => successHandler (res, classroom.whiteboards))
        .catch(err => errorHandler (res, err));
}

function add (req, res) {
    var wb = Whiteboard.create();
    wb.save()
        .then(whiteboard => {
            Classroom.loadOne({_id: req.params.crId})
                .then(classroom => {
                    classroom.whiteboards.push(wb);
                    classroom.save()
                        .then(classroom => successHandler (res, whiteboard))
                        .catch(err => errorHandler (res, err))
                })
                .catch(err => errorHandler (res, err));
        })
        .catch(err => errorHandler (res, err));
}

function find (req, res) {
    Whiteboard.loadOne({_id: req.params.wbId})
        .then(whiteboard => successHandler (res, whiteboard))
        .catch(err => errorHandler (res, err));
}

function update (req, res) {
    Whiteboard.loadOneAndUpdate(
        {_id: req.params.wbId},
        {
            //There is nothing to update directly in the whiteboard right now.
        })
        .then(whiteboard => successHandler (res, whiteboard))
        .catch(err => errorHandler (res, err));
}

function destroy (req, res) {
    Whiteboard.loadOneAndDelete(
        {_id: req.params.wbId})
        .then(successHandler (res, null))
        .catch(err => errorHandler (res, err));
}

/**
 * Naming for endpoints.
 * GET      classroom/:crId/whiteboards    ->  findAll
 * POST     classroom/:crId/whiteboards    ->  create
 * GET      /whiteboards/:wbId             ->  find
 * POST     /whiteboards/:wbId             ->  update
 * PUT      /whiteboards/:wbId             ->  update
 * DELETE   /whiteboards/:wnId             ->  destroy
 */

module.exports.findAll = findAll;
module.exports.find = find;
module.exports.add = add;
module.exports.update = update;
module.exports.destroy = destroy;

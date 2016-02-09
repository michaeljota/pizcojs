'use strict';

var Classroom = require('./classroom.model');

function errorHandler (res, err) {
    res.status(500).send(err.message);
}

function successHandler (res, obj) {
    res.status(200).jsonp(obj);
}

function findAll (req, res) {
    Classroom.loadMany()
        .then((clasrooms) => {
            successHandler (res, clasrooms)
        })
        .catch((err) => {
            errorHandler (res, err)
        });
}

function find (req, res) {
    Classroom.loadOne({_id: req.params.crId})
        .then((classroom) => {
            successHandler (res, classroom)
        })
        .catch((err) => {
            errorHandler (res, err)
        });
}

function add (req, res) {
    var classroom = Classroom.create(req.body);
    classroom.save()
        .then(classroom => successHandler (res, classroom))
        .catch(err => errorHandler (res, err));
}

function update (req, res) {
    Classroom.loadOneAndUpdate({_id: req.params.crId},req.body)
        .then(classroom => successHandler (res, classroom))
        .catch(err => errorHandler (res, err));
}

function destroy (req, res) {
    Classroom.loadOneAndDelete({_id: req.params.crId})
        .then(() => { successHandler (res, null) })
        .catch((err) => { errorHandler (res, err) });
}

/**
 * Naming for endpoints.
 * GET      /classroom                   ->  findAll
 * POST     /classroom                   ->  create
 * GET      /classroom/:crId             ->  find
 * POST     /classroom/:crId             ->  update
 * PUT      /classroom/:crId             ->  update
 * DELETE   /classroom/:crId             ->  destroy
 */

module.exports.findAll = findAll;
module.exports.find = find;
module.exports.add = add;
module.exports.update = update;
module.exports.destroy = destroy;

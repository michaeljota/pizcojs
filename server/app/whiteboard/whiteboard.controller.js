'use strict';

var Whiteboard = require('./whiteboard.model');

function errorHandler (res, err) {
    res.status(500).send(err.message);
}

function successHandler (res, obj) {
    res.status(200).jsonp(obj);
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
 * GET      room/:crId/whiteboards         ->  room.findAllWhiteboards
 * POST     room/:crId/whiteboards         ->  room.createWhiteboard
 * GET      /whiteboards/:wbId             ->  find
 * POST     /whiteboards/:wbId             ->  update
 * PUT      /whiteboards/:wbId             ->  update
 * DELETE   /whiteboards/:wnId             ->  destroy
 */

module.exports.find = find;
module.exports.update = update;
module.exports.destroy = destroy;

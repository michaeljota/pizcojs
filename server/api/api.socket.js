'use strict';

var _io = null;

function register (io) {
    _io = io;
}

function postSave (collection, doc) {
    if(_io) {
        _io.emit(collection+':save', doc);
    }
}

function postDelete (collection, doc) {
    if(_io) {
        _io.emit(collection+':remove', doc);
    }
}

module.exports.register = register;
module.exports.postSave = postSave;
module.exports.postDelete = postDelete;

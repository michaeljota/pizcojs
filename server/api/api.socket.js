'use strict';

var _socket = null;

function register (socket) {
    _socket = socket;
}

function postSave (collection, doc) {
    if(_socket) {
        _socket.emit(collection+':save', doc);
    }
}

function postDelete (collection, doc) {
    if(_socket) {
        _socket.emit(collection+':remove', doc);
    }
}

module.exports.register = register;
module.exports.postSave = postSave;
module.exports.postDelete = postDelete;

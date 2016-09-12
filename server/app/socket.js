'use strict';

var _io = null;

function register (io) {
    _io = io;
}

function emit (collection, event, doc) {
    if(_io) {
        _io.emit(collection+':'+event, doc);
    }
}

module.exports.register = register;
module.exports.emit = emit;
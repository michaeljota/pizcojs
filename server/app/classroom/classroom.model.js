'use strict';

var Document = require('camo').Document;
var Whiteboard = require ('../whiteboard/whiteboard.model');
var _emit = require('../socket').emit;

class Classroom extends Document {
    constructor() {
        super();

        this.className = {
            type: String,
            required: true
        };

        this.date = {
            type: Date,
            default: new Date()
        };

        this.whiteboards = {
            type: [Whiteboard]
        };
    }

    postSave () {
        _emit (Classroom.collectionName(), 'saved', this);
    }

    postDelete () {
        _emit (Classroom.collectionName(), 'deleted' , this);
    }
    
    get currentWhiteboard () {
        return this.whiteboards[this.whiteboards.length-1];
    }
}

module.exports = Classroom;

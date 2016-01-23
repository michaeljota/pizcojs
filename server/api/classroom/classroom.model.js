'use strict';

var Document = require('camo').Document;
var EmbeddedDocument = require('camo').EmbeddedDocument;
var _postSave = require('./../api.socket.js').postSave;
var _postDelete = require('./../api.socket.js').postDelete;

class Point extends EmbeddedDocument {
    constructor() {
        super();
        this.x = {
            type: Number,
            required: true
        };
        this.y = {
            type: Number,
            required: true
        };
    }
}

class Shape extends Document {
    constructor() {
        super();
        this.shapeType = {
            type: String,
            choices: ['pencil','circle','line','rectangle']
        };
        this.lineColor = {
            type: String,
            default: '#000'
        };
        this.fillColor = {
            type: String,
            default: '#000'
        };
        this.lineWidth = {
            type: Number,
            default: 3
        };
        this.lineCap = {
            type: String,
            choices: ['butt', 'round', 'square'],
            default: 'round'
        };
        this.stroked = {
            type: Boolean,
            default: true
        };
        this.filled = {
            type: Boolean,
            default: false
        };
        this.points = {
            type: [],
            default: []
        };
    }

    postSave () {
        _postSave ('shapes', this);
    }

    postDelete () {
        _postDelete ('shapes', this);
    }
}

class Whiteboard extends Document {
    constructor() {
        super();
        this.shapes = {
            type: [],
            default: []
        }
    }

    postSave () {
        _postSave ('whiteboards', this);
    }

    postDelete () {
        _postDelete ('whiteboards', this);
    }
}

class Classroom extends Document {
    constructor() {
        super();

        this.className = {
            type: String,
            required: true
        };

        this.date = {
            type: Date,
            default: Date.now()
        };

        this.whiteboards = {
            type: [Whiteboard]
        };
    }

    postSave () {
        _postSave ('classrooms', this);
    }

    postDelete () {
        _postDelete ('classrooms', this);
    }
}

module.exports.Classroom = Classroom;
module.exports.Whiteboard = Whiteboard;
module.exports.Shape = Shape;
module.exports.Point = Point;

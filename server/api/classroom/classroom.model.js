'use strict';

var Document = require('camo').Document;
var EmbeddedDocument = require('camo').EmbeddedDocument;

class Point extends EmbeddedDocument {
    constructor() {
        super();
        this.x = {
            type: Number
        };
        this.y = {
            type: Number
        };
    }
}

class Shape extends EmbeddedDocument {
    constructor() {
        super();
        this.type = {
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
            type: Number,
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
            type: [Point],
            default: []
        };
    }
}

class Whiteboard extends EmbeddedDocument {
    constructor() {
        super();
        this.shapes = {
            type: [Shape],
            default: []
        }
    }
}

class Classroom extends Document {
    constructor() {
        super();

        this.name = {
            type: String,
            required: true
        };

        this.date = {
            type: Date,
            default: Date.now()
        };

        this.whiteboards = {
            type: [Whiteboard],
            default: [Whiteboard.create()]
        };
    }
}

module.exports.Classroom = Classroom;
module.exports.Whiteboard = Whiteboard;
module.exports.Shape = Shape;
module.exports.Point = Point;

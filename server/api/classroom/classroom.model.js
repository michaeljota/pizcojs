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
            type: String
        };
        this.fillColor = {
            type: String
        };
        this.lineCap = {
            type: Number,
            default: '3'
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
            type: [Point]
        };
    }
}

class Whiteboard extends EmbeddedDocument {
    constructor() {
        super();
        this.shapes = {
            type: [Shape]
        }
    }
}

class Classroom extends Document {
    constructor() {
        super();

        this.name = {
            type: String
        };

        this.date = {
            type: Date,
            default: Date.now()
        };

        this.whiteboards = {
            type: [Whiteboard],
            default: []
        };
    }
}

module.exports = Classroom;

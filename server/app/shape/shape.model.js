'use strict';

var Document = require('camo').Document;
var EmbeddedDocument = require('camo').EmbeddedDocument;
var _emit = require('./../socket.js').emit;

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
            type: [Point],
            default: []
        };
    }

    postSave () {
        _emit (Shape.collectionName(), 'saved', this);
    }
    
    postDelete () {
        _emit (Shape.collectionName(), 'deleted', this);
    }
}

module.exports = Shape;
module.exports.Point = Point;
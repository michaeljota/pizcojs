'use strict';

const EmbeddedDocument = require('camo').EmbeddedDocument;

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

class Shape extends EmbeddedDocument {
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
            required: true
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
}

module.exports = Shape;
module.exports.Point = Point;

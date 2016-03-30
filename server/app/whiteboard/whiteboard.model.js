'use strict';

var Document = require('camo').Document;
var EmbeddedDocument = require('camo').EmbeddedDocument;
var Shape = require('../shape/shape.model');
var _emit = require('../socket').emit;

class Whiteboard extends Document {
  constructor() {
    super();
    this.shapes = {
      type: [Shape],
      default: []
    }
    this.redos = {
      type: [Shape],
      default: []
    };
  }

  postSave () {
    _emit(Whiteboard.collectionName(), 'saved', this);
  }

  postDelete () {
    _emit(Whiteboard.collectionName(), 'deleted', this);
  }
}

module.exports = Whiteboard;

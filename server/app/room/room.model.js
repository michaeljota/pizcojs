'use strict';

const Document = require('camo').Document;
const EmbeddedDocument = require('camo').EmbeddedDocument;
const User = require ('../user/user.model');
const Whiteboard = require ('../whiteboard/whiteboard.model');
const _emit = require ('../socket').emit;

/**
 * Image class. Store data buffer, and Content Type.
 *
 * @class Image
 * @extends {EmbeddedDocument}
 */
class Image extends EmbeddedDocument {

  /**
   * Creates an instance of Image.
   */
  constructor() {
    super();

    this.data = {
      type: Buffer
    };

    this.contentType = {
      type: String
    };
  }

  /**
   * Returns dataURL string to be use in src.
   */
  get dataURL () {
    return 'data:'+this.contentType+';base64,'+this.data.toString('base64');
  }
}


/**
 * (description)
 *
 * @class Room
 * @extends {Document}
 */
class Room extends Document {

  /**
   * Creates an instance of Room.
   */
  constructor() {
    super();

    this.title = {
      type: String,
      required: true
    };

    this.owner = {
      type: User,
      required: true
    };

    this.creationDate = {
      type: Date,
      default: Date.now()
    };

    this.colaborative = {
      type: Boolean,
      default: false
    }

    this.clients = {
      type: [User]
    };

    this.image = {
      type: Image
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
    _emit(Room.collectionName(), 'saved', this);
  }

  postDelete () {
    _emit(Room.collectionName(), 'deleted' , this);
  }

  get currentWhiteboard () {
    return this.whiteboards[this.whiteboards.length-1];
  }
}

module.exports = Room;

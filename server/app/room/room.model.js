'use strict';

var Document = require('camo').Document;
var EmbeddedDocument = require('camo').EmbeddedDocument;
var Classroom = require ('../classroom/classroom.model');
var User = require ('../user/user.model');
var _emit = require ('../socket').emit;

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
            type: Buffer,
            required: true
        };
        
        this.contentType = {
            type: String,
            required: true
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
        
        this.clients = {
            type: [User]
        };
        
        this.image = {
            type: Image
        };
        
        this.classroom = {
            type: Classroom
        }
    }

    postSave () {
        _emit (Room.collectionName(), 'saved', this);
    }

    postDelete () {
        _emit (Room.collectionName(), 'deleted' , this);
    }
}

module.exports = Room;

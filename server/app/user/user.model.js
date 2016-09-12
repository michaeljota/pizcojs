'use strict';

var Document = require('camo').Document;

class User extends Document {
    constructor() {
        super();
        this.user = {
            type: String,
            required: true,
            unique: true
        }
        this.role = {
            type: String,
            default: 'user'
        }
    }
    
    set username (user) {
        this.user = user.toLowerCase();
    }
    
    get username () {
        return this.user;
    }
    
    set password(password) {
        
    }
    
    get password () {
        return '';
    }
}

module.exports = User;
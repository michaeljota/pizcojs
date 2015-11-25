'use strict';

angular.module('tesisApp')
    .factory('User', function () {

        var _name;
        var _room;

        // Public API here
        return {
            getName : function () {
                return _name;
            },
            setName : function (name) {
                _name = name;
            },
            getRoom : function (){
                return _room;
            },
            setRoom : function (room){
                _room = room;
            }
        };
    });

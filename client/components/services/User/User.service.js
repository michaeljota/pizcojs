'use strict';

angular.module('tesisApp')
  .service('User', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
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
            },
            isReady : function () {
                return (_name && _room);
            }
        };
  });

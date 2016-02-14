'use strict';

(function() {
    function Classroom ($resource) {
        return $resource('/api/classrooms/:id/:controller', {
            id: '@_id'
        },{
            addWhiteboard: {
                method: 'POST',
                params: {
                    controller: 'whiteboard'
                }
            }
        });
    }
    
    angular.module('tesisApp')
        .factory('Classroom', Classroom);
})();

(function(){
    function Room($resource) {
        return $resource('/api/rooms/:id/:controller', {
            id: '@_id'
        },{
            enter: {
                method: 'POST',
                params: {
                    controller: 'enter'
                }
            },
            addWhiteboard: {
                method: 'POST',
                params: {
                    controller: 'addWhiteboard'
                }
            }
        });
    }
    
    angular.module('tesisApp')
        .factory('Room', Room);
})();

(function(){
    
    function RoomManager($http, $window, Room, Classroom, whiteboardRenderer) {
        
        var _currentRoom;
        
        if ($window.sessionStorage.room) {
            setCurrentRoom(JSON.parse($window.sessionStorage.room));
        }
        
        function setCurrentWhiteboardId(id) {
            whiteboardRenderer.setWhiteboard(id);
        }
        
        function getCurrentWhiteboardId() {
            return _currentRoom.classroom.currentWhiteboard._id;
        }
        
        function setCurrentRoom (room) {
            delete $window.sessionStorage.room;
            if(room) {
                _currentRoom = room;
                $window.sessionStorage.room = JSON.stringify(_currentRoom);
                setCurrentWhiteboardId(_currentRoom.classroom.currentWhiteboard._id);
            }
        }
        
        function getCurrentRoom () {
            return _currentRoom;
        }
        
        function create (room, cb) {
            cb = cb || angular.noop;
            return Room.save(room,
                function (room) {
                    setCurrentRoom(room);
                    return cb(room);
                }, function (err) {
                    return cb(null, err);
                }).$promise;
        }
        
        function enter (room, cb) {
            cb = cb || angular.noop;
            return Room.enter(room,
                function (room) {
                    Classroom.get({id: room.classroom._id},
                        function(classroom) {
                            room.classroom = classroom;
                            setCurrentRoom(room);
                            return cb(room);
                        })
                }, function (err) {
                    return cb(null, err);
                }).$promise;
        }
        
        function addWhiteboard(wb, cb) {
            cb = cb || angular.noop;
            if(getCurrentRoom()) {
                return Classroom.addWhiteboard(getCurrentRoom().classroom,
                    function (whiteboard) {
                        _currentRoom.classroom.currentWhiteboard = whiteboard;
                        setCurrentWhiteboardId(_currentRoom.classroom.currentWhiteboard._id);
                        return cb(whiteboard);
                    }, function (err) {
                        return cb(null, err);
                    }).$promise;
            }
        }
        
        return {
            create: create,
            
            enter: enter,
            
            addWhiteboard: addWhiteboard,
            
            getCurrentRoom: getCurrentRoom,
            
            getCurrentWhiteboardId: getCurrentWhiteboardId
        }
    }
    angular.module('tesisApp')
        .factory('RoomManager', RoomManager);
})();
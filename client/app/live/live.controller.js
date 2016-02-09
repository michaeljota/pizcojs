'use strict';

angular.module('tesisApp')
    .controller('LiveCtrl', function ($scope, $mdDialog, $http, $state, socket) {
        
        $http.get('/api/rooms').success(function(rooms) {
            $scope.cards = rooms;
            socket.syncUpdates('rooms', $scope.cards);
        });

        $scope.enterRoom = function (room) {
            //TODO: Esto debería ingresar a la sala y dejar al usuario en la pantalla de dibujo.
            console.log('Entering in:');
            console.log(room);
        };

        $scope.showInfo = function (room, ev) {
            $mdDialog.show ({
                templateUrl: 'app/roomInfo/roomInfo.html',
                controller: 'roomInfoCtrl',
                locals: {
                    room: room
                },
                clickOutsideToClose:true,
                targetEvent: ev
            });
        };

        $scope.createRoom = function (ev) {
            $mdDialog.show ({
                templateUrl: 'app/roomCreation/roomCreation.html',
                controller: 'roomCreationCtrl',
                clickOutsideToClose:true,
                targetEvent: ev
            })
            .then(function (room) {
                if(!room || room.title === '') {
                    return;
                }
                $http.post('/api/rooms', { room })
                    .success(function(room) {
                        
                        $state.go('app.sketchpad', {classroomId: room.classroom._id});
                    })
                    .error(function(err) {
                        console.error(err);
                    });
            });
        };
    });

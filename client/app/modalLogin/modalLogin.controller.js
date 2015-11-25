'use strict';

angular.module('tesisApp')
    .controller('ModalLoginCtrl', function ($log, $scope, User, socket) {

        socket.socket.on('userUpdated', function(){
            User.setName($scope.Name);
            User.setRoom($scope.Room);
            $log.info('Now user is: '+User.getName());
        });

        $scope.submit = function (){
            $log.info('Name: '+$scope.Name+'. Room: '+$scope.Room);
            socket.socket.emit('updateUser', {Name: $scope.Name, Room: $scope.Room});
        }
    });

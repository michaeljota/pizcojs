'use strict';

angular.module('tesisApp')
  .controller('LoginCtrl', function ($scope, socket, $state) {
    $scope.message = 'Hello';
        $scope.user = {
            name: ''
        };

        $scope.login = function () {
            if(!$scope.user.name) return;
            socket.socket.emit('login-update', $scope.user);
        };

        socket.socket.on('login-success', function (data) {
            //TODO: Set globar user model.
            $state.go('main');
        });

        socket.socket.on('login-fail', function () {

        });
  });

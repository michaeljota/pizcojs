'use strict';

angular.module('tesisApp')
    .controller('LoginCtrl', function ($scope, socket, $state) {

        $scope.checkEnter = function (keyEvent) {
            if(keyEvent.which == 13){
                $scope.login();
            }
        };

        $scope.user = {
            name: ''
        };

        $scope.login = function () {
            if(!$scope.user.name) return;
            socket.socket.emit('login-update', $scope.user);
        };

        socket.socket.on('login-success', function (data) {
            //TODO: Set global user model.
            //Voy a suponer que con lo de arriba quise decir que se tiene que configurar el usuario aquí y que según la configuración del usuario, entonces se acomodan las vistas.
            $state.go('app.main.live');
        });

        socket.socket.on('login-fail', function () {

        });
    });

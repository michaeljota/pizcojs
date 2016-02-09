'use strict';

angular.module('tesisApp')
    .controller('LoginCtrl', function ($scope, socket, $state, Auth) {

        $scope.checkEnter = function (keyEvent) {
            if(keyEvent.which === 13){
                $scope.login();
            }
        };

        $scope.user = {
            name: ''
        };

        $scope.login = function () {
            if(!$scope.user.name) {
                return;
            }
            Auth.createUser({
                username: $scope.user.name,
                password: ''
            })
            .then(function() {
                // Account created, redirect to home
                $state.go('app.main');
            })
            .catch(function(err) {
                console.error(err);
            });
        };
    });

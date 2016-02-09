'use strict';

(function (angular){
    angular.module('tesisApp')
        .controller('roomCreationCtrl', function($scope, $mdDialog){
            $scope.room = {
                title: ''
            };
            
            $scope.checkEnter = function (keyEvent) {
                if(keyEvent.which == 13){
                    $scope.close();
                }
            };

            $scope.close = function () {
                if(!$scope.room.title) return;
                $mdDialog.hide($scope.room);
            }
        });
})(angular)
'use strict';

(function(angular) {
    angular.module('tesisApp')
        .controller('roomInfoCtrl', function($scope, $mdDialog, room){
            $scope.room = room;

            $scope.close = function () {
                $mdDialog.hide();
            };
        });
})(angular);

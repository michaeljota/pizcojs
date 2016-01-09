'use strict';

(function(angular) {
    angular.module('tesisApp')
        .controller('appInfoCtrl', function($scope, $mdDialog){

            $scope.close = function () {
                $mdDialog.hide();
            };
        });
})(angular);

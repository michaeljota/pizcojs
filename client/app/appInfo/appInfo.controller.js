'use strict';

(function() {
    
    function appInfoCtrl ($scope, $mdDialog){

            $scope.close = function () {
                $mdDialog.hide();
            };
        }
    
    angular.module('tesisApp')
        .controller('appInfoCtrl', appInfoCtrl);
})();

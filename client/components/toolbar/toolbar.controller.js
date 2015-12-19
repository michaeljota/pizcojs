'use strict';

angular.module('tesisApp')
  .controller('ToolbarCtrl', function ($scope, $mdDialog) {
        var originatorEv;

        $scope.openMenu = function($mdOpenMenu, ev) {
            originatorEv = ev;
            $mdOpenMenu(ev);
        };

        /*$scope.redial = function() {
            $mdDialog.show(
                $mdDialog.alert()
                    .targetEvent(originatorEv)
                    .clickOutsideToClose(true)
                    .parent('body')
                    .title('Suddenly, a redial')
                    .textContent('You just called a friend; who told you the most amazing story. Have a cookie!')
                    .ok('That was easy')
            );
            originatorEv = null;
        };*/

        $scope.download = function () {
            //TODO:
        }
    });

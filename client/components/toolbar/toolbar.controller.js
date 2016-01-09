'use strict';

angular.module('tesisApp')
  .controller('ToolbarCtrl', function ($scope, $mdDialog, $mdSidenav) {

        $scope.openMenu = function($mdOpenMenu, ev) {
            $mdOpenMenu(ev);
        };

        $scope.showAppInfo = function () {
            
        };

        $scope.openSidenav = function () {
            $mdSidenav('left')
                .toggle();
        };
    });

'use strict';

angular.module('tesisApp')
  .controller('ToolbarCtrl', function ($scope, $mdDialog, $mdSidenav) {

        $scope.openMenu = function($mdOpenMenu, ev) {
            $mdOpenMenu(ev);
        };

        $scope.showAppInfo = function (ev) {
            $mdDialog.show ({
                templateUrl: 'app/appInfo/appInfo.html',
                controller: 'appInfoCtrl',
                clickOutsideToClose:true,
                targetEvent: ev
            });
        };

        $scope.openSidenav = function () {
            $mdSidenav('left')
                .toggle();
        };
    });

(function(){
  'use strict';

  angular
    .module('pizcojs')
    .controller('ToolbarController', ToolbarController);

  function ToolbarController($mdDialog, $mdSidenav) {
    var tbVm = this;

    tbVm.showAppInfo = function (ev) {
      $mdDialog.show ({
        templateUrl: 'app/appInfo/appInfo.html',
        controller: 'appInfoCtrl',
        clickOutsideToClose:true,
        targetEvent: ev
      });
    };

    tbVm.openSidenav = function () {
      $mdSidenav('left')
          .toggle();
    };
  }
})();

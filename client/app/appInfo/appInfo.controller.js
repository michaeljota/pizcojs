(function() {
  'use strict';

  angular
    .module('pizcojs')
    .controller('appInfoCtrl', appInfoCtrl);

  function appInfoCtrl ($mdDialog){
    var modal = this;

    modal.close = function () {
      $mdDialog.hide();
    };
  }
})();

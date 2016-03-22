(function() {
  'use strict';

  angular
    .module('pizcojs')
    .controller('roomInfoCtrl', roomInfoController);

  function roomInfoController($mdDialog, room){
    var modal = this;

    modal.room = room;

    modal.close = function () {
      $mdDialog.hide();
    };
  }
})();

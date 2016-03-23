(function() {
  'use strict';

  angular
    .module('pizcojs')
    .controller('roomInfoController', roomInfoController);

  function roomInfoController($mdDialog, room){
    var modal = this;

    modal.room = room;

    modal.close = function () {
      $mdDialog.hide();
    };
  }
})();

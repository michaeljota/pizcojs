(function(){
  'use strict';

  angular
    .module('pizcojs')
    .controller('roomCreationController', roomCreationController);

  function roomCreationController($mdDialog){
    var modal = this;

    modal.room = {
      title: ''
    };

    modal.checkEnter = function (keyEvent) {
      if(keyEvent.which == 13){
        modal.close();
      }
    };

    modal.close = function () {
      if(!modal.room.title) return;
      $mdDialog.hide(modal.room);
    }
  }
})()

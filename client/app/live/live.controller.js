(function(){
  'use strict';

  angular
    .module('pizcojs')
    .controller('LiveController', LiveController);

  function LiveController($mdDialog, $http, $state, RoomSocket, RoomManager) {
    var vm = this;

    $http.get('/api/rooms').success(function(rooms) {
      vm.cards = rooms;
      RoomSocket.syncUpdates(vm.cards);
    });

    vm.enterRoom = enterRoom;

    function enterRoom(room) {
      RoomManager.enter(room)
        .then (function(room) {
          $state.go('app.sketchpad', {roomId: room._id});
        })
        .catch (function(err) {
          console.error(err);
        });
    };

    vm.showInfo = showInfo;

    function showInfo(room, ev) {
      $mdDialog.show ({
        templateUrl: 'app/roomInfo/roomInfo.html',
        controller: 'roomInfoController',
        controllerAs: 'modal',
        locals: {
          room: room
        },
        clickOutsideToClose:true,
        targetEvent: ev
      });
    };

    vm.createRoom = createRoom;

    function createRoom(ev) {
      $mdDialog.show ({
        templateUrl: 'app/roomCreation/roomCreation.html',
        controller: 'roomCreationController',
        controllerAs: 'modal',
        clickOutsideToClose:true,
        targetEvent: ev
      })
      .then(function (room) {
        if(!room || room.title === '') {
          return;
        }
        RoomManager.create(room)
          .then (function(room) {
            $state.go('app.sketchpad', {roomId: room._id});
          })
          .catch (function(err) {
            console.error(err);
          });
      });
    };

    vm.getImage = getImage;

    function getImage(card) {
      return card.image && card.image.dataURL ?
        card.image.dataURL :
        '../assets/img/blank_square.svg';
    }
  }
})();

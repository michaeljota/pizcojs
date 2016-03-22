(function(){

'use strict';

angular.module('pizcojs')
  .controller('SavedCtrl', SavedController);

  function SavedController($mdDialog) {
    var vm = this;

    vm.cards = {
      title: 'Prueba',
      img: '../assets/img/blank_square.svg',
      name: 'Sketchpad',
      owner: 'Michael',
      creationDate: new Date(),
      duration: 1
    },{
      title: 'Prueba',
      img: '../assets/img/blank_square.svg',
      name: 'Sketchpad',
      owner: 'Michael',
      creationDate: new Date(),
      duration: 1
    },{
      title: 'Prueba',
      img: '../assets/img/blank_square.svg',
      name: 'Sketchpad',
      owner: 'Michael',
      creationDate: new Date(),
      duration: 1
    };

    vm.playSketchpad = function (card) {
      //TODO: Debería entrar al reproductor, pasando como parametros la información de la pizarra.
      console.log('Entering in %s', card.name);
    };

    vm.setFaved = function (card) {
      card.faved = !card.faved;
    };

    vm.showInfo = function (room, ev) {
      $mdDialog.show ({
        templateUrl: 'app/roomInfo/roomInfo.html',
        controller: 'roomInfoCtrl',
        locals: {
          room: room
        },
        clickOutsideToClose:true,
        targetEvent: ev
      });
    };

    vm.destroy = function (room, ev) {
      var confirm = $mdDialog.confirm()
        .title('¿Deseas eliminar la sala?')
        .textContent('La siguiente sala será borrada: '+room.name)
        .ariaLabel('Borrar sala')
        .targetEvent(ev)
        .ok('Sí')
        .cancel('No');
      $mdDialog.show(confirm).then(function() {
        //TODO: Debe borrar los datos de la sala de los datos guardados.
        console.log(room+' borrada');
      });
    };
  }
})();

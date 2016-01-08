'use strict';

angular.module('tesisApp')
  .controller('SavedCtrl', function ($scope, $mdDialog) {
        var cards = [];

        cards.push ({
            title: 'Prueba',
            img: 'assets/canvas-testing.png',
            name: 'Sketchpad',
            owner: 'Michael',
            creationDate: new Date(),
            duration: 1
        });

        cards.push ({
            title: 'Prueba',
            img: 'assets/canvas-testing.png',
            name: 'Sketchpad',
            owner: 'Michael',
            creationDate: new Date(),
            duration: 1
        });

        cards.push ({
            title: 'Prueba',
            img: 'assets/canvas-testing.png',
            name: 'Sketchpad',
            owner: 'Michael',
            creationDate: new Date(),
            duration: 1
        });

        $scope.cards = cards;

        $scope.playSketchpad = function (card) {
            //TODO: Debería entrar al reproductor, pasando como parametros la información de la pizarra.
            console.log('Entering in %s', card.name);
        };

        $scope.setFaved = function (card) {
            card.faved = !card.faved;
        };

        $scope.showInfo = function (room, ev) {
            $mdDialog.show ({
                templateUrl: 'app/roomInfo/roomInfo.html',
                controller: 'roomInfoCtrl',
                locals: {
                    room: room
                },
                clickOutsideToClose:true,
                targetEvent: ev
            })
        };

        $scope.delete = function (room, ev) {
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
    });

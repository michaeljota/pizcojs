'use strict';

angular.module('tesisApp')
    .controller('LiveCtrl', function ($scope, $mdDialog) {
        var cards = [];

        cards.push ({
            title: 'Prueba',
            img: 'assets/canvas-testing.png',
            name: 'room',
            owner: 'Michael',
            creationDate: new Date(),
            clientsConnected: 1
        });

        cards.push ({
            title: 'Prueba',
            img: 'assets/canvas-testing.png',
            name: 'room',
            owner: 'Michael',
            creationDate: new Date(),
            clientsConnected: 1
        });

        cards.push ({
            title: 'Prueba',
            img: 'assets/canvas-testing.png',
            name: 'room',
            owner: 'Michael',
            creationDate: new Date(),
            clientsConnected: 1
        });

        $scope.cards = cards;

        $scope.enterRoom = function (room) {
            //TODO: Esto debería ingresar a la sala y dejar al usuario en la pantalla de dibujo.
            console.log('Entering in %s', room);
        };
        
        $scope.showInfo = function (room) {
            console.log(room.title);
            var alert = $mdDialog.alert()
                .title ('%s INFO', room.title)
                .textContent (
                    'Name: %s\n'+
                    'Owner: %s\n'+
                    'Creation Date: %s\n'+
                    'Clients Connected: %s\n',
                    room.title, room.owner, room.creationDate, room.clientsConnected
                )
                .clickOutsideToClose(true)
                .ok ('OK');
            $mdDialog.show (alert)
                .finally (function () {
                    alert = null;
                });
        }
    });

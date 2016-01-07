'use strict';

angular.module('tesisApp')
    .controller('LiveCtrl', function ($scope) {
        var cards = [];

        cards.push ({
            title: 'Prueba',
            img: 'assets/canvas-testing.png',
            room: 'room',
            faved: false
        });

        cards.push ({
            title: 'Prueba',
            img: 'assets/canvas-testing.png',
            room: 'room',
            faved: false
        });

        cards.push ({
            title: 'Prueba',
            img: 'assets/canvas-testing.png',
            room: 'room',
            faved: false
        });

        $scope.cards = cards;

        $scope.enterRoom = function (room) {
            //TODO: Esto debería ingresar a la sala y dejar al usuario en la pantalla de dibujo.
            console.log('Entering in %s', room);
        };

        $scope.setFaved = function (card) {
            card.faved = !card.faved;
        };
    });

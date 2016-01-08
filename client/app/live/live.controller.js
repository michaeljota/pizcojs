'use strict';

angular.module('tesisApp')
    .controller('LiveCtrl', function ($scope, $mdDialog) {
        var cards = [];

        cards.push ({
            title: 'Prueba',
            img: '../assets/img/blank_square.svg',
            name: 'room',
            owner: 'Michael',
            creationDate: new Date(),
            clientsConnected: 1
        });

        cards.push ({
            title: 'Prueba',
            img: '../assets/img/blank_square.svg',
            name: 'room',
            owner: 'Michael',
            creationDate: new Date(),
            clientsConnected: 1
        });

        cards.push ({
            title: 'Prueba',
            img: '../assets/img/blank_square.svg',
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

        $scope.createRoom = function () {
            //TODO: Mostrar una ventana modal para recibir los datos de la sala a crear.
        }
    });

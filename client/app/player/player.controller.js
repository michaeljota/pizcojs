'use strict';

angular.module('tesisApp')
    .controller('PlayerCtrl', function ($scope, Drawer) {
        var _drawer = new Drawer(document.getElementById('canvasContainer'));

        var resizeCanvas = function () {
            var container = document.getElementById('canvasContainer');
            var wid = container.clientWidth;
            var hei = window.innerHeight * 0.80;
            if(wid>hei){
                wid = hei;
            }else{
                hei = wid;
            }
            _drawer.setCanvasSize(wid,hei);
        };

        $scope.init = function () {
            resizeCanvas();

            window.addEventListener('resize', resizeCanvas);
        };

    });

'use strict';

angular.module('pizcojs')
    .factory('Syncer', function (socket, Enums, Shape) {

      function Drawer(container) {

      }

        function Syncer(container){
            var _remoteDrawing = false;
            var _drawer = Drawer(container);

            //#region Synchronize
            socket.socket.on('syncer-draw', function(shape) {
                if(_remoteDrawing){
                    _drawer.renderShape(new Shape(JSON.parse(shape)));
                }
            });

            socket.socket.on('syncer-renderStorage', function() {
                _drawer.renderStorage();
            });

            socket.socket.on('syncer-syncStorage', function(shapeStorage) {
                _drawer.setStorage(shapeStorage);
            });

            socket.socket.on('syncer-refresh', function() {
                if(_remoteDrawing){
                    _drawer.renderStorage();
                }else{
                    _drawer.refresh();
                }
            });

            socket.socket.on('syncer-remoteDrawing', function(active) {
                _remoteDrawing = active;
            });

            socket.socket.on('syncer-cancelDraw', function(){
                _drawer.cancelDraw();
            });
            //#endregion

            //#region Getters/Setters
            this.getCanvas = function () {
                return _drawer.getCanvas();
            };

            this.setCanvasSize = function (wid,hei) {
                _drawer.setCanvasSize(wid, hei);
            };

            this.isDrawing = _drawer.isDrawing;

            this.addPoint = _drawer.addPoint;
            //#endregion

            this.startDrawing = function (tmpShape) {
                if (!_remoteDrawing) {
                    //socket.socket.emit('updateTmpShape', tmpShape);
                    _drawer.setTmpShape(tmpShape);
                    _drawer.setDrawing(true);
                    socket.socket.emit('syncer-remoteDrawing', true);
                }
            };

            this.refresh = function () {
                socket.socket.emit('syncer-refresh');
                if(_drawer.getTmpShape().points.length > 1){
                    socket.socket.emit('syncer-draw', JSON.stringify(_drawer.getTmpShape()));
                }
            };

            this.endDrawing = function () {
                if(_drawer.getTmpShape().points.length > 1){
                    socket.socket.emit('syncer-saveShape', JSON.stringify(_drawer.getTmpShape()));
                    socket.socket.emit('syncer-renderStorage');
                }
                _drawer.endDrawing();
                socket.socket.emit('syncer-remoteDrawing', false);
            };

            this.resetCanvas = function () {
                _drawer.cancelDraw();
                socket.socket.emit('syncer-resetShapeStorage');
            };

            this.undo = function () {
                socket.socket.emit('syncer-undo');
            };

            this.redo = function () {
                socket.socket.emit('syncer-redo');
            };

            this.requestSync = function () {
                socket.socket.emit('syncer-syncPlease');
            };

        };
        // Public API here
        return Syncer;
    });

'use strict';

angular.module('tesisApp')
    .factory('Syncer', function (Drawer, socket, Enums, Shape) {

        var Syncer = function (container){
            var _remoteDrawing = false;
            var _drawer = new Drawer(container);

            //#region Synchronize
            socket.socket.on('draw', function(shape) {
                if(_remoteDrawing){
                    _drawer.renderShape(new Shape(JSON.parse(shape)));
                }
            });

            socket.socket.on('renderStorage', function() {
                _drawer.renderStorage();
            });

            socket.socket.on('syncStorage', function(shapeStorage) {
                _drawer.setStorage(shapeStorage);
            });

            socket.socket.on('refresh', function() {
                if(_remoteDrawing){
                    _drawer.renderStorage();
                }else{
                    _drawer.refresh();
                }
            });

            socket.socket.on('remoteDrawing', function(active) {
                _remoteDrawing = active;
                console.log(_remoteDrawing);
            });

            socket.socket.on('cancelDraw', function(){
                _drawer.cancelDraw();
            });
            //#endregion

            //#region Getters/Setters
            this.getDrawer = function () {
                return _drawer;
            };

            this.setDrawer = function (drawer) {
                if(!drawer instanceof Drawer) {
                    throw new Error('Can\'t set drawer');
                }
                _drawer = drawer;
            };
            //#endregion

            this.startDrawing = function (tmpShape) {
                if (!_remoteDrawing) {
                    //socket.socket.emit('updateTmpShape', tmpShape);
                    _drawer.setTmpShape(tmpShape);
                    _drawer.setDrawing(true);
                    socket.socket.emit('remoteDrawing', true);
                }
            };

            this.refresh = function () {
                socket.socket.emit('refresh');
                if(_drawer.getTmpShape().getPoints().length > 1){
                    socket.socket.emit('draw', JSON.stringify(_drawer.getTmpShape()));
                }
            };

            this.endDrawing = function () {
                if(_drawer.getTmpShape().getPoints().length > 1){
                    socket.socket.emit('saveShape', JSON.stringify(_drawer.getTmpShape()));
                    socket.socket.emit('renderStorage');
                }
                _drawer.endDrawing();
                socket.socket.emit('remoteDrawing', false);
            };

            this.resetCanvas = function () {
                _drawer.cancelDraw();
                socket.socket.emit('resetShapeStorage');
            };

            this.undo = function () {
                _drawer.undo();
                socket.socket.emit('undo');
            };

            this.requestSync = function () {
                socket.socket.emit('syncPlease');
            };

        };
        // Public API here
        return Syncer;
    });

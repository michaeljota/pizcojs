'use strict';

angular.module('tesisApp')
    .factory('Syncer', function (Drawer, socket, Enums, Shape) {

        var Syncer = function (){
            //JS change 'this' in some anonymous functions.
            var _this = this;

            this._remoteDrawing = false;
            this._drawer = new Drawer();

            //#region Synchronize
            socket.socket.on('draw', function(shape) {
                if(_this._remoteDrawing){
                    _this._drawer.renderShape(Shape.fromJSON(shape));
                }
            });

            socket.socket.on('renderStorage', function() {
                _this._drawer.renderShapeStorage();
            });

            socket.socket.on('syncStorage', function(shapeStorage) {
                var ss = [];
                for(var i = 0; i < shapeStorage.length; i++){
                    ss.push(Shape.fromJSON(shapeStorage[i]));
                }
                _this._drawer.setShapeStorage(ss);
            });

            socket.socket.on('refresh', function() {
                if(_this._remoteDrawing){
                    _this._drawer.renderShapeStorage();
                }else{
                    _this._drawer.refresh();
                }
            });

            socket.socket.on('remoteDrawing', function(active) {
                _this._remoteDrawing = active;
            });

            socket.socket.on('cancelDraw', function(){
                _this._drawer.cancelDraw();
            });
            //#endregion
        };

        //#region Getters/Setters
        Syncer.prototype.getDrawer = function () {
            return this._drawer;
        };

        Syncer.prototype.setDrawer = function (drawer) {
            this._drawer = drawer;
        };
        //#endregion

        Syncer.prototype.startDrawing = function (tmpShape) {
            if (this._remoteDrawing) {
                //Resetting the Temporal Shape
                this._drawer.setTmpShape(null);
            } else {
                //socket.socket.emit('updateTmpShape', tmpShape);
                this._drawer.setTmpShape(tmpShape);
                socket.socket.emit('remoteDrawing', true);
            }
        };

        Syncer.prototype.refresh = function () {
            socket.socket.emit('refresh');
            if(this._drawer.getTmpShape().getPoints().length > 1){
                socket.socket.emit('draw', JSON.stringify(this._drawer.getTmpShape()));
            }
        };

        Syncer.prototype.endDrawing = function () {
            if(this._drawer.getTmpShape().getPoints().length > 1){
                socket.socket.emit('saveShape', JSON.stringify(this._drawer.getTmpShape()));
                socket.socket.emit('renderStorage');
            }
            this._drawer.endDrawing();
            socket.socket.emit('remoteDrawing', false);
        };

        Syncer.prototype.resetCanvas = function () {
            this._drawer.cancelDraw();
            socket.socket.emit('resetShapeStorage');
        };

        Syncer.prototype.undo = function () {
            this._drawer.undo();
            socket.socket.emit('undo');
        };

        Syncer.prototype.requestSync = function () {
            socket.socket.emit('syncPlease');
        };

        // Public API here
        return Syncer;
    });

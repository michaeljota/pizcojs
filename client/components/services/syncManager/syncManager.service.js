'use strict';

angular.module('tesisApp')
    .factory('syncManager', function ($log, drawManager, socket, User) {

        var Tool = {
            PENCIL : 0,
            LINE : 1,
            RECTANGLE : 2,
            CIRCLE : 3,

            properties : {
                0: {name: 'pencil', value: 0, code: 'P'},
                1: {name: 'line', value: 1, code: 'L'},
                2: {name: 'rectangle', value: 2, code: 'R'},
                3: {name: 'circle', value: 3, code: 'C'}
            }
        };

        var
            remoteDrawing = false;

        var
            _startDrawing = function () {
                if (remoteDrawing) {
                    //Resetting the Temporal Shape
                    drawManager.setTmpShape(null);
                } else {
                    socket.socket.emit('remoteDrawing', true);
                }
            },
            _continueDrawing = function () {
                if(!drawManager.getTmpShape()) return;
                drawManager.continueDrawing();
                if(drawManager.getTmpShape().ToolName !== Tool.PENCIL){
                    socket.socket.emit('renderShapeStorage');
                }
                if(drawManager.getTmpShape().Points.length > 1){
                    socket.socket.emit('draw', drawManager.getTmpShape());
                }
            },

            _endDrawing = function () {
                if(!drawManager.getTmpShape()) return;
                if(drawManager.getTmpShape().Points.length > 1){
                    socket.socket.emit('saveShape', drawManager.getTmpShape());
                }
                drawManager.endDrawing();
                socket.socket.emit('remoteDrawing', false);
            },

            _resetDraw = function () {
                drawManager.resetDraw();
                socket.socket.emit('resetShapeStorage');
            },

            _undo = function () {
                drawManager.undo();
                socket.socket.emit('undo');
            };

        //Sync

        socket.socket.on('draw', function(shape) {
            if(remoteDrawing){
                drawManager.renderShape(shape);
            }
        });

        socket.socket.on('renderShapeStorage', function() {
            drawManager.renderShapeStorage();
        });

        socket.socket.on('syncShapeStorage', function(ss) {
            drawManager.setShapeStorage(ss);
            drawManager.renderShapeStorage();
        });

        socket.socket.on('remoteDrawing', function(active) {
            remoteDrawing = active;
        });

        socket.socket.on('cancelDraw', function(){
            drawManager.setTmpShape(null);
        });

        // Public API here
        return {
            DrawManager : function(){
                return drawManager;
            },

            startDrawing : function () {
                _startDrawing();
            },

            continueDrawing : function () {
                _continueDrawing();
            },

            endDrawing : function () {
                _endDrawing();
            },

            resetDraw : function () {
                _resetDraw();
            },

            undo : function () {
                _undo();
            }
        };
    });

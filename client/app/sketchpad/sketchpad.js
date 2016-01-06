'use strict';

angular.module('tesisApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('app.sketchpad', {
                url: '^/sketchpad',
                parent: 'app',
                views: {
                    'content@app': {
                        templateUrl: 'app/sketchpad/sketchpad.html',
                        controller: 'SketchpadCtrl'
                    }
                }
            });
    });

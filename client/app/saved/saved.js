'use strict';

angular.module('tesisApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('app.main.saved', {
                url: '^/saved',
                templateUrl: 'app/saved/saved.html',
                controller: 'SavedCtrl',
                parent: 'app.main'
            });
    });

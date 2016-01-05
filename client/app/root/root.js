'use strict';

angular.module('tesisApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('app', {
                url: '',
                templateUrl: 'app/root/root.html',
                abstract: true
            });
    });

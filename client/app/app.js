'use strict';

angular.module('tesisApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ui.router',
    'ui.bootstrap',
    'btford.socket-io',
    'ngMaterial'
])
    .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $mdIconProvider, $mdThemingProvider) {
        $urlRouterProvider
            .otherwise('/');

        $locationProvider.html5Mode(true);

        $mdIconProvider
            .defaultIconSet('./assets/icons/mdi.svg');

        $mdThemingProvider.theme('default')
            .primaryPalette('deep-purple')
            .accentPalette('blue');
    });

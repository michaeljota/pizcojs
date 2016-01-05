'use strict';

var app = angular.module('tesisApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ui.router',
    'btford.socket-io',
    'ngMaterial',
    'ngAnimate',
    'ngAria'
]);

/*UI Router Config*/
app.config(function ($stateProvider, $urlRouterProvider, $locationProvider){
    $urlRouterProvider
        .otherwise('/login');

    $locationProvider.html5Mode(true);
});

/*Angular Material Config*/
app.config(function ($mdIconProvider, $mdThemingProvider) {

    $mdIconProvider
        .defaultIconSet('./assets/icons/mdi.svg');

    $mdThemingProvider.theme('default')
        .primaryPalette('deep-purple')
        .accentPalette('blue');
});

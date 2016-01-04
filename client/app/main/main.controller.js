'use strict';

angular.module('tesisApp')
    .controller('MainCtrl', function ($scope, $state) {
        var tabs = [];

        tabs.push({
            id: 'tab1',
            label: 'Live',
            state: 'app.main.live'
        });
        tabs.push({
            id: 'tab2',
            label: 'Saved',
            state: 'app.main.saved'
        });

        $scope.tabs = tabs;

        $scope.selectedIndex = 0;

        $scope.$watch('selectedIndex', function(current, old) {
            selectPage(tabs[current]);
        });

        var selectPage = function (page) {
            page && page.state && $state.go(page.state);
        }
    });

'use strict';

angular.module('tesisApp')
    .controller('MainCtrl', function ($scope, $state) {
        var tabs = [];
        tabs.push({
            index: 0,
            id: 'tab1',
            label: 'Live',
            view: '^.live'
        });
        tabs.push({
            index: 1,
            id: 'tab2',
            label: 'Saved',
            view: '^.saved'
        });

        $scope.tabs = tabs;
        $scope.selectedIndex = 0;

        $scope.$watch('selectedIndex', function(current, old) {
            switch (current) {
                case 0:
                    $state.go(tabs[0].view);
                    break;
                case 1:
                    $state.go(tabs[1].view);
                    break;
            }
        });
    });

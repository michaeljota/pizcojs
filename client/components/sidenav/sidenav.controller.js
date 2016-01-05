'use strict';

angular.module('tesisApp')
    .controller('SidenavCtrl', function ($scope, $state) {

        var sections = [];
        var openedSection;
        var currentSection;
        var currentPage;

        sections.push({
            name: 'Login',
            state: 'app.login',
            type: 'link',
            icon: 'hexagon'
        });

        sections.push({
            name: 'Main',
            state: 'app.main.live',
            type: 'link',
            icon: 'hexagon'
        });

        sections.push({
            name: 'Sketchpad',
            state: 'app.sketchpad',
            type: 'link',
            icon: 'hexagon'
        });

        sections.push({
            name: 'Player',
            state: 'app.player',
            type: 'link',
            icon: 'hexagon'
        });

        $scope.autoFocusContent = false;

        $scope.status = {
            isFirstOpen: true,
            isFirstDisabled: false
        };

        $scope.sections = sections;


        $scope.isOpen = function (section) {
            return openedSection === section;
        };

        $scope.toggleOpen =  function (section) {
            openedSection = (openedSection === section ? null : section)
        };

        $scope.selectPage = function (section, page) {
            page && page.url && $state.go(page.url);
            currentSection = section;
            currentPage = page;
        };
    });

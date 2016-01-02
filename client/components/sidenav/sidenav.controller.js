'use strict';

angular.module('tesisApp')
    .controller('SidenavCtrl', function ($scope, $state) {

        var sections = [];
        var openedSection;
        var currentSection;
        var currentPage;

        sections.push({
            name: 'Login',
            state: 'main',
            type: 'link',
            icon: 'hexagon'
        });

        sections.push({
            name: 'Main',
            state: 'main',
            type: 'link',
            icon: 'hexagon'
        });

        sections.push({
            name: 'Sketchpad',
            state: 'sketchpad',
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
        }
    });

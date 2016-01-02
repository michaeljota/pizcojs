'use strict';

angular.module('tesisApp')
    .directive('menuLink', function () {
        return {
            scope: {
                section: '='
            },
            templateUrl: 'components/directives/menuLink/menuLink.html',
            restrict: 'EA',
            link: function (scope, element, attrs) {
                var controller = element.parent().controller();

                scope.focusSection = function () {
                    // set flag to be used later when
                    // $locationChangeSuccess calls openPage()
                    controller.autoFocusContent = true;
                };
            }
        };
    });

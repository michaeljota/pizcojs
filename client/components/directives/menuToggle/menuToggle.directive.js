'use strict';

angular.module('tesisApp')
    .directive('menuToggle', function () {
        return {
            scope: {
                section: '='
            },
            templateUrl: 'components/directives/menuToggle/menuToggle.html',
            restrict: 'EA',
            link: function (scope, element, attrs) {
                var controller = element.parent().controller();

                scope.isOpen = function () {
                    return controller.isOpen(scope.section);
                };
                scope.toggle = function () {
                    controller.toggleOpen(scope.section);
                };

                var parentNode = element[0].parentNode.parentNode.parentNode;
                if (parentNode.classList.contains('parent-list-item')) {
                    var heading = parentNode.querySelector('h2');
                    element[0].firstChild.setAttribute('aria-describedby', heading.id);
                }
            }
        };
    });

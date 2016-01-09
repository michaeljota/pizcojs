(function (angular){
    angular.module('tesisApp')
        .controller('roomCreationCtrl', function($scope, $mdDialog){
            $scope.room = {
                name: ''
            };
            
            $scope.checkEnter = function (keyEvent) {
                if(keyEvent.which == 13){
                    $scope.close();
                }
            };

            $scope.close = function () {
                $mdDialog.hide($scope.room);
            }
        });
})(angular)
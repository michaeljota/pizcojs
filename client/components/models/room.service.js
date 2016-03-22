'use strict';

(function(){
    function Room($resource) {
        return $resource('/api/rooms/:id/:controller', {
            id: '@_id'
        },{
            enter: {
                method: 'POST',
                params: {
                    controller: 'enter'
                }
            },
            addWhiteboard: {
                method: 'POST',
                params: {
                    controller: 'addWhiteboard'
                }
            }
        });
    }

    angular.module('tesisApp')
        .factory('Room', Room);
})();

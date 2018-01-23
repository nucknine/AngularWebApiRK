(function () {
    "use strict";

    angular
        .module("common.services")
        .factory("habitantsResource",
        ["$resource",
            "appSettings",
            "currentUser",
            habitantsResource]);

    function habitantsResource($resource, appSettings, currentUser) {
        return $resource(appSettings.serverPath + "/api/Habitants/:id", null,
            {
                'get': {                    
                    headers: {
                        'Authorization': 'Bearer ' + currentUser.getProfile().token                        
                    }
                },

                'query': {
                    //isArray: true,
                    headers: {
                        'Authorization': 'Bearer ' + currentUser.getProfile().token
                    }
                },

                'save': {                    
                    headers: { 'Authorization': 'Bearer ' + currentUser.getProfile().token }
                },

                'update': {
                    method: 'PUT',
                    headers: { 'Authorization': 'Bearer ' + currentUser.getProfile().token }
                }                

            });
    }
}());


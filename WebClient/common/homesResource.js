(function () {
    "use strict";

    angular
        .module("common.services")
        .factory("homesResource",
        ["$resource",
            "appSettings",
            "currentUser",
            homesResource]);

    function homesResource($resource, appSettings, currentUser) {
        return $resource(appSettings.serverPath + "/api/Homes/:id", null,
            {
                'get': {                    
                    headers: {
                        'Authorization': 'Bearer ' + currentUser.getProfile().token                        
                    }
                },

                'query': {
                    isArray: true,
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


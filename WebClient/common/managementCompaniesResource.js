(function () {
    "use strict";

    angular
        .module("common.services")
        .factory("managementCompaniesResource",
        ["$resource",
            "appSettings",
            "currentUser",
            managementCompaniesResource]);

    function managementCompaniesResource($resource, appSettings, currentUser) {
        return $resource(appSettings.serverPath + "/api/ManagementCompanies/:id/:flag", null,
            {
                'get': {
                    //isArray: true,   
                    //params: {
                    //    id: '@id'                        
                    //},
                    url: appSettings.serverPath + '/api/ManagementCompanies/:id',
                    headers: {

                        'Authorization': 'Bearer ' + currentUser.getProfile().token                        
                    }
                },

                'save': {
                    //method: 'POST',
                    headers: { 'Authorization': 'Bearer ' + currentUser.getProfile().token }
                },

                'update': {
                    method: 'PUT',
                    headers: { 'Authorization': 'Bearer ' + currentUser.getProfile().token }
                }
                ,
                'findHomes': {                    
                    method: 'GET',
                    isArray: true,
                    headers: { 'Authorization': 'Bearer ' + currentUser.getProfile().token },
                    params: {
                        id: '@id',
                        flag: '@flag'
                    }
                }

            });
    }
}());


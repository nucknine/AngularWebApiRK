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
                    headers: { 'Authorization': 'Bearer ' + currentUser.getProfile().token }
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


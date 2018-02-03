(function () {
    "use strict";

    angular
        .module("common.services")
        .factory("userAccount",
        ["$resource",
            "appSettings",
            userAccount]);

    function userAccount($resource, appSettings) {
        return {
            registration: $resource(appSettings.serverPath + "/api/Account/Register?", null,
                {
                    'registerUser': {
                        method: 'POST',
                        params: {
                            flag: '@flag'
                        }
                    }
                }),

            login: $resource(appSettings.serverPath + "/Token", null,
                {
                    'loginUser': {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        transformRequest: function (data, headersGetter) {
                            var str = [];
                            for (var d in data)
                                str.push(encodeURIComponent(d) + "=" +
                                    encodeURIComponent(data[d]));
                            return str.join("&");
                        }

                    }
                }),

            role: $resource(appSettings.serverPath + "/api/values/name", null,
                {
                    'roleUser': {
                        method: 'GET',
                        isArray: true,
                        //headers: { 'Authorization': 'Bearer ' + currentUser.getProfile().token },
                        params: {
                            name: '@name'
                        }
                    }
                }),

            logout: $resource(appSettings.serverPath + "api/Account/Logout", null,
                {
                    'logOutUser': {
                        method: 'POST'
                        //headers: { 'Authorization': 'Bearer ' + currentUser.getProfile().token },
                    }
                })
        };

    }
})();

(function () {
    "use strict";

    angular
        .module("common.services")
        .factory("currentUser",
        currentUser);

    function currentUser() {
        var profile = {
            isLoggedIn: false,
            username: "",
            role: "",
            token: ""
        };

        var setProfile = function (username, token) {
            profile.username = username;            
            profile.token = token;
            profile.isLoggedIn = true;
        };

        var getProfile = function () {
            return profile;
        };

        var getUsername = function () {
            return profile.username;
        };

        return {
            setProfile: setProfile,
            getProfile: getProfile,
            getUsername: getUsername
        };
    }
})();
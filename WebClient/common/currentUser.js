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

        var setProfile = function (username, role, token) {
            profile.username = username;
            profile.role = role;
            profile.token = token;
            profile.isLoggedIn = true;
        };

        var getProfile = function () {
            return profile;
        };

        return {
            setProfile: setProfile,
            getProfile: getProfile
        };
    }
})();

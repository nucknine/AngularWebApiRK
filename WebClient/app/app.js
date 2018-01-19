(function () {
    "use strict";

    var app = angular.module("companyManagement",
        ["common.services"]);

    app.config(['$qProvider', function ($qProvider) {
        $qProvider.errorOnUnhandledRejections(false);
    }]);

}());


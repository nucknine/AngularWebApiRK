(function () {
    "use strict";

    angular
        .module("companyManagement")
        .controller("MangementCompanyEditCtrl",
                     MangementCompanyEditCtrl);

    function MangementCompanyEditCtrl(mangementCompanyResource) {
        var vm = this;
        vm.mangementCompany = {};
        vm.message = '';

        mangementCompanyResource.get({ id: 5 },
            function (data) {
                vm.mangementCompany = data;
                vm.originalMangementCompany = angular.copy(data);
            },
            function (response) {
                vm.message = response.statusText + "\r\n";
                if (response.data.exceptionMessage)
                    vm.message += response.data.exceptionMessage;
            });

        if (vm.mangementCompany && vm.mangementCompany.mangementCompanyId) {
            vm.title = "Edit: " + vm.mangementCompany.mangementCompanyName;
        }
        else {
            vm.title = "New MangementCompany";
        }

        vm.submit = function () {
            vm.message = '';
            if (vm.mangementCompany.mangementCompanyId) {
                vm.mangementCompany.$update({ id: vm.mangementCompany.mangementCompanyId },
                    function (data) {
                        vm.message = "... Save Complete";
                    },
                    function (response) {
                        vm.message = response.statusText + "\r\n";
                        if (response.data.modelState) {
                            for (var key in response.data.modelState) {
                                vm.message += response.data.modelState[key] + "\r\n";
                            }
                        }
                        if (response.data.exceptionMessage)
                            vm.message += response.data.exceptionMessage;
                    });
            }
            else {
                vm.mangementCompany.$save(
                    function (data) {
                        vm.originalMangementCompany = angular.copy(data);

                        vm.message = "... Save Complete";
                    },
                    function (response) {
                        vm.message = response.statusText + "\r\n";
                        if (response.data.modelState) {
                            for (var key in response.data.modelState) {
                                vm.message += response.data.modelState[key] + "\r\n";
                            }
                        }
                        if (response.data.exceptionMessage)
                            vm.message += response.data.exceptionMessage;
                    });
            }
        };

        vm.cancel = function (editForm) {
            editForm.$setPristine();
            vm.mangementCompany = angular.copy(vm.originalMangementCompany);
            vm.message = "";
        };

    }
}());

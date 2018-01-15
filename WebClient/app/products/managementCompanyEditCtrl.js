(function () {
    "use strict";

    angular
        .module("companyManagement")
        .controller("ManagementCompanyEditCtrl",
                     ManagementCompanyEditCtrl);

    function ManagementCompanyEditCtrl(managementCompaniesResource) {
        var vm = this;
        vm.managementCompany = {};
        vm.message = '';

        managementCompaniesResource.get({ id: 3 },
            function (data) {
                vm.managementCompany = data;
                vm.originalManagementCompany = angular.copy(data);
            },
            function (response) {
                vm.message = response.statusText + "\r\n";
                if (response.data.exceptionMessage)
                    vm.message += response.data.exceptionMessage;
            });

        if (vm.managementCompany && vm.managementCompany.managementCompanyId) {
            vm.title = "Edit: " + vm.managementCompany.managementCompanyName;
        }
        else {
            vm.title = "New ManagementCompany";
        }

        vm.submit = function () {
            vm.message = '';
            if (vm.managementCompany.managementCompanyId) {
                vm.managementCompany.$update({ id: vm.managementCompany.managementCompanyId },
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
                vm.managementCompany.$save(
                    function (data) {
                        vm.originalManagementCompany = angular.copy(data);

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
            vm.managementCompany = angular.copy(vm.originalManagementCompany);
            vm.message = "";
        };

    }
}());

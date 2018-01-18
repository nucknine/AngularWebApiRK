(function () {
    "use strict";

    angular
        .module("companyManagement")
        .controller("managementCompanyEditCtrl",
        managementCompanyEditCtrl);

    function managementCompanyEditCtrl(managementCompaniesResource) {
        var vm = this;
        vm.managementCompany = {};
        vm.message = '';
        vm.title = '';
        vm.id = 2;

        vm.select = function () {
            managementCompaniesResource.get({ id: vm.id },
                function (data) {
                    vm.managementCompany = data;
                    console.log('data:' + data);
                    vm.originalManagementCompany = angular.copy(data);

                    if (vm.managementCompany.managementCompanyId && vm.managementCompany.name) {
                        vm.title = "Edit: " + vm.managementCompany.name;
                    }
                    else {
                        vm.title = "New Management Company";
                    }
                },
                function (response) {                    
                    vm.message = response.statusText + "\r\n";
                    if (response.data.exceptionMessage)
                        vm.message += response.data.exceptionMessage;
                });
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

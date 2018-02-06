(function () {
    "use strict";
    angular
        .module("companyManagement")
        .controller("managementCompanyListCtrl",
        managementCompanyListCtrl);

    function managementCompanyListCtrl(managementCompaniesResource, currentUser) {
        var vm = this;
        vm.managementCompanyHomes = [];
        vm.managementCompany = {};
        vm.email = currentUser.getUsername();
        vm.managementCompany.managementCompanyId = 0;




        managementCompaniesResource.query({
            $filter: "substringof(Email, '" + vm.email + "')"
        },
            function (data) {

                if (data[0]) {
                    vm.managementCompany = data[0];
                    vm.managementCompany.managementCompanyId = data[0].managementCompanyId * 1;
                    vm.originalmanagementCompany = angular.copy(data[0]);
                    vm.title = "Edit: " + vm.managementCompany.name;
                }
                


                if (vm.managementCompany.managementCompanyId) {
                    managementCompaniesResource.findHomes({ id: vm.managementCompany.managementCompanyId, flag: true },
                        function (data) {
                            vm.managementCompanyHomes.push(data);
                        },
                        function (response) {

                            vm.message = response + "\r\n";
                            if (response.data.exceptionMessage)
                                vm.message += response.data.exceptionMessage;
                        });


                }



            });

        if (!vm.managementCompany.managementCompanyId) {
            managementCompaniesResource.get({ id: 0 },
                function (data) {
                    console.log("data " + data);
                    vm.managementCompany = data;
                    
                    vm.managementCompany.email = currentUser.getUsername();
                    
                    vm.title = "New Company";
                    vm.originalmanagementCompany = angular.copy(data);
                }
            );
        }

        //Form

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







        //List of all companies
        //function managementCompanyListCtrl(managementCompaniesResource, currentUser) {
        //    var vm = this;
        //    vm.managementCompanyHomes = [];
        //    vm.managementCompanies = {};
        //    vm.id = [1, 2, 3];
        //    vm.email = currentUser.getUsername();

        //    managementCompaniesResource.query({
        //        $filter: "substringof(Email, '" + vm.email + "')"
        //    },
        //        function (data) {
        //            vm.managementCompanies = data;
        //        });

        //    for (var i = 1; i <= vm.id.length; i++) {
        //        managementCompaniesResource.findHomes({ id: i, flag: true },
        //            function (data) {
        //                vm.managementCompanyHomes.push(data);
        //            },
        //            function (response) {
        //                vm.message = response + "\r\n";
        //                if (response.data.exceptionMessage)
        //                    vm.message += response.data.exceptionMessage;
        //            });
        //    }




    }
}());

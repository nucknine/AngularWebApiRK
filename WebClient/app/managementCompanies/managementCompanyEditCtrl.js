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
        vm.email = currentUser.getUsername();
        vm.id = 0;


        //get company by email
        //if (vm.email) {
        //    managementCompaniesResource.query(
       
        //        {
        //            $filter: "substringof(Email, '" + vm.email + "')"
        //        },
        //        function (data) {

        //            vm.habitant.habitantId = data[0].habitantId * 1;
        //            habitantsResource.get({ id: vm.habitant.habitantId },
        //                function (data) {
        //                    vm.habitant = data;
        //                    vm.originalHabitant = angular.copy(data);
        //                    vm.title = "Edit: " + vm.habitant.name + ' ' + vm.habitant.surname;
        //                }
        //            );

        //        },
        //        function (response) {
        //            console.log('response query by email' + response);
        //        }
        //    );

        //    if (!vm.habitant[0]) {
        //        vm.title = "New Habitant";
        //        habitantsResource.get({ id: 0 },
        //            function (data) {
        //                vm.habitant = data;
        //                vm.habitant.email = vm.email;
        //                vm.title = "New Habitant";
        //                vm.originalHabitant = angular.copy(data);
        //            }
        //        );
        //    }
        //}

        managementCompaniesResource.get({ id: vm.id },
            function (data) {
                vm.managementCompany = data;
                vm.originalmanagementCompany = angular.copy(data);

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
}());

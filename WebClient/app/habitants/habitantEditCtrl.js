(function () {
    "use strict";

    angular
        .module("companyManagement")
        .controller("habitantEditCtrl",
        habitantEditCtrl);

    function habitantEditCtrl(habitantsResource, homesResource, managementCompaniesResource, currentUser) {
        var vm = this;
        vm.habitant = {};
        vm.message = '';
        vm.title = '';
        vm.email = currentUser.getProfile().username;
        vm.homes = {};
        vm.company = '';
        console.log("Edit Ctrl " + vm.email);

        //oncahnge select
        vm.homeSelect = function () {
            vm.homes.forEach(function (house) {
                if (vm.habitant.homeId == house.homeId) {
                    vm.companyId = house.managementCompanyId;
                    vm.habitant.managementCompanyId = vm.companyId;
                }

            });

            managementCompaniesResource.query(
                {
                    $filter: "ManagementCompanyId eq " + vm.companyId
                }
                ,
                function (data) {
                    vm.company = data[0].name;
                });
        };

        //get homes
        homesResource.query({},
            function (data) {
                vm.homes = data;
            });

        //get habitant by email
        habitantsResource.query(
            {
                $filter: "substringof(Email, '" + vm.email + "')"
            },
            function (data) {
                console.log('data query by email' + data);
                vm.habitant.habitantId = data[0].habitantId * 1;

                if (data) {
                    habitantsResource.get({ id: vm.habitant.habitantId },
                        function (data) {
                            vm.habitant = data;
                            vm.originalHabitant = angular.copy(data);
                            vm.title = "Edit: " + vm.habitant.name + ' ' + vm.habitant.surname;
                        }
                    );



                }
                else {
                    //vm.habitantId = 0;
                    vm.title = "New Habitant";

                    habitantsResource.get({ id: 0 },
                        function (data) {
                            vm.habitant = data;
                            console.log("new");
                            vm.originalHabitant = angular.copy(data);
                        }
                    );
                }
            },
            function (response) {
                console.log('response query by email' + response);
            }
        );        

        vm.submit = function () {
            vm.habitant.homeId *= 1;
            vm.message = '';
            if (vm.habitant.habitantId) {
                vm.habitant.$update({ id: vm.habitant.habitantId * 1 },
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
                vm.habitant.$save(
                    function (data) {
                        vm.originalHabitant = angular.copy(data);

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
            vm.habitant = angular.copy(vm.originalHabitant);
            vm.message = "";
        };

    }
}());

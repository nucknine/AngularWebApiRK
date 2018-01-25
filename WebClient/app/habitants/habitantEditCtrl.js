(function () {
    "use strict";

    angular
        .module("companyManagement")
        .controller("habitantEditCtrl",
        habitantEditCtrl);

    //.controller("MainCtrl",
    //    ["userAccount", "currentUser", MainCtrl]);

    function habitantEditCtrl(habitantsResource, homesResource, managementCompaniesResource, currentUser) {
        var vm = this;
        vm.habitant;
        vm.message = '';
        vm.title = '';
        vm.email = currentUser.getProfile().username;
        vm.homes = {};

        vm.company = '';

        //oncahnge select
        vm.homeSelect = function () {
            vm.homes.forEach(function (house) {
                if (vm.habitant.homeId == house.homeId) {
                    vm.companyId = house.managementCompanyId;
                }

            });

            managementCompaniesResource.query(
                {
                    $filter: "ManagementCompanyId eq " + vm.companyId,

                }
                ,
                function (data) {
                    vm.company = data[0].name;
                });
        }

        //get homes
        homesResource.query({},
            function (data) {
                vm.homes = data;
            });


        habitantsResource.query(
            {
                $filter: "startswith(Email, '" + vm.email + "')",
            },
            function (data) {
                vm.habitantId = data[0].habitantId;

                if (vm.habitantId) {                    

                    habitantsResource.get({ id: vm.habitantId },
                        function (data) {
                            vm.habitant = data;
                            vm.originalHabitant = angular.copy(data);
                        }
                    );

                    console.log('vm.habitant.habitantId ' + vm.habitant.habitantId);
                    console.log(vm.habitant);

                    if (vm.habitant && vm.habitant.habitantId) {
                        vm.title = "Edit: " + vm.habitant.name + ' ' + vm.habitant[0].surname;
                    }
                    else {
                        vm.title = "New Habitant";
                    }
                }
            });
        //if (vm.habitant.name == data[0].name) {
        //    vm.title = "Edit: " + vm.habitant.name + ' ' + vm.habitant[0].surname;
        //    console.log("EDIT");
        //}
        //else {
        //    vm.title = "New Habitant";
        //    console.log("NEW");
        //    habitantsResource.get(
        //        { id: 0 },
        //        function (data) {
        //            vm.habitant = data;
        //            vm.originalhabitant = angular.copy(data);
        //        }
        //    );
        //}

        //    },
        //    function (response) {
        //        vm.message = response.statusText + "\r\n";
        //        if (response.data.exceptionMessage)
        //            vm.message += response.data.exceptionMessage;
        //    }
        //);

        //get habitant


        



        vm.submit = function () {
            vm.message = '';
            if (vm.habitant.habitantId) {
                vm.habitant.$update({ id: vm.habitant.habitantId },
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

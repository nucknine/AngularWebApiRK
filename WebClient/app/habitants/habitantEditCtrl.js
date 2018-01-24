(function () {
    "use strict";

    angular
        .module("companyManagement")
        .controller("habitantEditCtrl",
        habitantEditCtrl);

    //.controller("MainCtrl",
    //    ["userAccount", "currentUser", MainCtrl]);

    function habitantEditCtrl(habitantsResource, currentUser) {
        var vm = this;
        vm.habitant;
        vm.message = '';
        vm.title = '';
        vm.email = currentUser.getProfile().username;

        if (vm.email) {
            habitantsResource.query(
                {
                    $filter: "startswith(Email, '" + vm.email + "')",
                },
                function (data) {
                    vm.habitant = data;
                    vm.originalhabitant = angular.copy(data);
                    console.log(data);
                    if (vm.habitant[0].habitantId && vm.habitant[0].name && vm.email == vm.habitant[0].email) {
                        vm.title = "Edit: " + vm.habitant[0].name + ' ' + vm.habitant[0].surname;
                    }
                    else {
                        vm.title = "New Habitant";

                        habitantsResource.get(
                            { id: 0 },                            
                            function (data) {
                                vm.habitant = data;
                                vm.originalhabitant = angular.copy(data);
                            }
                        );
                    }

                },
                function (response) {
                    vm.message = response.statusText + "\r\n";
                    if (response.data.exceptionMessage)
                        vm.message += response.data.exceptionMessage;
                }
            );
        }


        vm.submit = function () {
            vm.message = '';
            if (vm.habitant[0].habitantId) {
                vm.habitant[0].$update({ id: vm.habitant[0].habitantId },
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
                vm.habitant[0].$save(
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

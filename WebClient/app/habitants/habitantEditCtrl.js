(function () {
    "use strict";

    angular
        .module("companyManagement")
        .controller("habitantEditCtrl", [
            "currentUser",
            "habitantsResource",
        habitantEditCtrl]);

    function habitantEditCtrl(habitantsResource, currentUser) {
        var vm = this;
        vm.habitant = {};
        vm.message = '';
        vm.title = '';
        vm.email = 'habitant1@mail.ru';//curentUser.getProfile();
        
        habitantsResource.query(
            {     
                $filter: "contains(Email, '"+'habitant1@mail.ru'+"')"        
            },
            function (data) {
                vm.habitant = data;
                vm.originalhabitant = angular.copy(data);

                if (vm.habitant.habitantId && vm.habitant.name) {
                    vm.title = "Edit: " + vm.habitant.name;
                }
                else {
                    vm.title = "New Habitant";
                }

            },
            function (response) {
                vm.message = response.statusText + "\r\n";
                if (response.data.exceptionMessage)
                    vm.message += response.data.exceptionMessage;
            }
        );
               

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

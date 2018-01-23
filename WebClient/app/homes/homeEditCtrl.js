(function () {
    "use strict";

    angular
        .module("companyManagement")
        .controller("homeEditCtrl",
        homeEditCtrl); 

    function homeEditCtrl(homesResource) {
        var vm = this;
        vm.home = {};
        vm.message = '';
        vm.title = '';
        vm.id = 2;



        vm.select = function () {
            homesResource.get({ id: vm.id },
                function (data) {
                    vm.home = data;
                    vm.originalhome = angular.copy(data);

                    if (vm.home.homeId && vm.home.name) {
                        vm.title = "Edit: " + vm.home.name;
                    }
                    else {
                        vm.title = "New Home";
                    }
                },
                function (response) {
                    vm.message = response.statusText + "\r\n";
                    if (response.data.exceptionMessage)
                        vm.message += response.data.exceptionMessage;
                });

            homesResource.roleUser({},
                function (data) {
                    console.log(data);
                });

        }



        vm.submit = function () {
            vm.message = '';
            if (vm.home.homeId) {
                vm.home.$update({ id: vm.home.homeId },
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
                vm.home.$save(
                    function (data) {
                        vm.originalHome = angular.copy(data);

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
            vm.home = angular.copy(vm.originalHome);
            vm.message = "";
        };

    }
}());

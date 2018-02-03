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

        managementCompaniesResource.query({
            $filter: "substringof(Email, '" + vm.email + "')"
        },
            function (data) {
                vm.managementCompany = data[0];
                vm.managementCompany.managementCompanyId = data[0].managementCompanyId * 1;


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

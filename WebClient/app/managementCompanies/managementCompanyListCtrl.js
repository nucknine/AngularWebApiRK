(function () {
    "use strict";
    angular
        .module("companyManagement")
        .controller("managementCompanyListCtrl",
        ["managementCompaniesResource",
            managementCompanyListCtrl]);

    function managementCompanyListCtrl(managementCompaniesResource) {
        var vm = this;
        vm.managementCompanyHomes = {};
        vm.managementCompanies = {};

        managementCompaniesResource.query({
            //$filter: "contains(ManagementCompanyCode, 'GDN') and Price ge 5 and Price le 20",
            $orderby: "Name desc"
        },
            function (data) {
                vm.managementCompanies = data;                              
            });

        //managementCompaniesResource.query({
        //    //$filter: "contains(ManagementCompanyCode, 'GDN') and Price ge 5 and Price le 20",
        //    //$orderby: "Name desc"
        //},
        //    function (data) {
        //        vm.managementCompanyHomes = data;
        //        console.log(data);
        //    });

        

        managementCompaniesResource.get({ id: 1, flag: true },
            function (data) {                               
                vm.managementCompanyHomes = data;
            },
            function (response) {                
                vm.message = response + "\r\n";                
                if (response.data.exceptionMessage)
                    vm.message += response.data.exceptionMessage;
            });

        

        // Alternative code using variables instead of hard-coded values
        //vm.searchCriteria = "GDN";
        //vm.sortProperty = "Price";
        //vm.sortDirection = "desc";

        //managementCompanyResource.query({
        //    $filter: "contains(ManagementCompanyCode, '" + vm.searchCriteria + "')" +
        //        " or contains(ManagementCompanyName, '" + vm.searchCriteria + "')",
        //    $orderby: vm.sortProperty + " " + vm.sortDirection
        //}, function (data) {
        //    vm.managementCompanys = data;
        //})

    }
}());

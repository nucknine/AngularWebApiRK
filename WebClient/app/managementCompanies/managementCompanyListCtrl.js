(function () {
    "use strict";
    angular
        .module("companyManagement")
        .controller("managementCompanyListCtrl",
        ["managementCompaniesResource",
            managementCompanyListCtrl]);

    function managementCompanyListCtrl(managementCompaniesResource) {
        var vm = this;
        vm.managementCompanyHomes = [];
        vm.managementCompanies = {};
        vm.id = [1,2,3];

        managementCompaniesResource.query({
            //$filter: "contains(ManagementCompanyCode, 'GDN') and Price ge 5 and Price le 20",
            //$orderby: "Name desc"
        },
            function (data) {
                vm.managementCompanies = data;
            });
        
        for (var i = 1; i <= vm.id.length; i++) {
        managementCompaniesResource.findHomes({ id: i, flag: true },
            function (data) {
                vm.managementCompanyHomes.push(data);
            },
            function (response) {
                vm.message = response + "\r\n";
                if (response.data.exceptionMessage)
                    vm.message += response.data.exceptionMessage;
            });
        }








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

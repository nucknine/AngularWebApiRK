(function () {
    "use strict";
    angular
        .module("companyManagement")
        .controller("managementCompanyListCtrl",
        ["managementCompaniesResource",
            managementCompanyListCtrl]);

    function managementCompanyListCtrl(managementCompaniesResource) {
        var vm = this;

        managementCompaniesResource.query({
            //$filter: "contains(ManagementCompanyCode, 'GDN') and Price ge 5 and Price le 20",
            $orderby: "Name desc"
        },
            function (data) {
                vm.managementCompanies = data;
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

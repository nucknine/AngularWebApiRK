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
            //$filter: "contains(MangementCompanyCode, 'GDN') and Price ge 5 and Price le 20",
            $orderby: "Name desc"
        },
            function (data) {
                vm.managementCompanies = data;
            });

        // Alternative code using variables instead of hard-coded values
        //vm.searchCriteria = "GDN";
        //vm.sortProperty = "Price";
        //vm.sortDirection = "desc";

        //mangementCompanyResource.query({
        //    $filter: "contains(MangementCompanyCode, '" + vm.searchCriteria + "')" +
        //        " or contains(MangementCompanyName, '" + vm.searchCriteria + "')",
        //    $orderby: vm.sortProperty + " " + vm.sortDirection
        //}, function (data) {
        //    vm.mangementCompanys = data;
        //})

    }
}());

(function () {
    "use strict";
    angular
        .module("companyManagement")
        .controller("habitantListCtrl",
        ["habitantsResource", habitantListCtrl]);

    function habitantListCtrl(habitantsResource) {
        var vm = this;
        vm.habitants = {};

        habitantsResource.query(
            //{            
            //$filter: "contains(ManagementCompanyCode, 'GDN') and Price ge 5 and Price le 20",
            //$orderby: "Name desc"
            //}
            //,
            function (data) {
                vm.habitants = data;
            });
    }    
}());

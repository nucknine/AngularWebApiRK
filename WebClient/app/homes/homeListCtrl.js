(function () {
    "use strict";
    angular
        .module("companyManagement")
        .controller("homeListCtrl",
        ["homesResource",
            homeListCtrl]);

    function homeListCtrl(homesResource) {
        var vm = this;
        vm.homes = {};
                
        homesResource.query(
            //{            
            //$filter: "contains(ManagementCompanyCode, 'GDN') and Price ge 5 and Price le 20",
            //$orderby: "Name desc"
            //}
            //,
            function (data) {                
                vm.homes = data;
            });


        vm.test = function () {
            homesResource.get({ id: 2 },

                function (data) {
                    vm.data = data;
                });
        }
        
                
    }
}());
(function () {
    'use strict';

    var app = angular.module('app.user',['app.services']);


    app.controller('UserCtrl', ['$scope', '$filter' , '$http', '$uibModal', 'AccountService', 'ConstantService', UserCtrl]);


    function UserCtrl($scope, $filter, $http, $uibModal,AccountService,ConstantService) {

        $scope.searchKeywords = '';
        $scope.filteredStores = [];
        $scope.row = '';
        $scope.select = select;
        $scope.onFilterChange = onFilterChange;
        $scope.onNumPerPageChange = onNumPerPageChange;
        $scope.onOrderChange = onOrderChange;
        $scope.search = search;
        $scope.order = order;
        $scope.numPerPageOpt = [3, 5, 10, 20];
        $scope.numPerPage = $scope.numPerPageOpt[2];
        $scope.currentPage = 1;
        $scope.currentPage = [];
         function select(page) {
            var end, start;
            start = (page - 1) * $scope.numPerPage;
            end = start + $scope.numPerPage;
            return $scope.currentPageStores = $scope.filteredStores.slice(start, end);
        };

        function onFilterChange() {
            $scope.select(1);
            $scope.currentPage = 1;
            return $scope.row = '';
        };

        function onNumPerPageChange() {
            $scope.select(1);
            return $scope.currentPage = 1;
        };

        function onOrderChange() {
            $scope.select(1);
            return $scope.currentPage = 1;
        };

        function search() {
            $scope.filteredStores = $filter('filter')($scope.stores, $scope.searchKeywords);
            return $scope.onFilterChange();
        };

        function order(rowName) {
            if ($scope.row === rowName) {
            return;
            }
            $scope.row = rowName;
            $scope.filteredStores = $filter('orderBy')($scope.stores, rowName);
            return $scope.onOrderChange();
        };





        $scope.userList = [];

        var init = function(){
            AccountService.GetAllUsers({}, function(err,result){
                console.log(result);
                $scope.userList = result.data;
            });

            ConstantService.GetValue('UserStatus', function(err,result){

                if(err){
                    console.log(err);
                }else{
                    console.log(result);
                    $scope.userStatus = result.data;
                }
                
            });

        };

        $scope.createUser = function () {

            var modalInstance = $uibModal.open({
                // animation: $scope.animationsEnabled,
                animation: true,
                templateUrl: 'ModalCreateUser.html',
                controller: 'ModalInstanceCtrl',
                backdrop: 'static',
                size: 'lg',
                resolve: {
                    items: function () {
                        return '12';
                    }
                }
            });

            modalInstance.result.then(function (newUser) {
                //$scope.selected = selectedItem;
            }, function () {
                //log.info('Modal dismissed at: ' + new Date());
            });
        };



        init();
    }

    function ModalCreateUserInstanceCtrl($scope, $uibModalInstance, items) {
        // $scope.items = items;

        // $scope.selected = {
        //     item: $scope.items[0]
        // };
        console.log('sss');


        $scope.ok = function() {
            console.log('sss');

            $uibModalInstance.close('000');
        };

        $scope.cancel = function() {
            $uibModalInstance.dismiss("cancel");
        };

        $scope.createUser = function() {
            $uibModalInstance.close({ user: 'andy'});
        };

    }


})(); 



































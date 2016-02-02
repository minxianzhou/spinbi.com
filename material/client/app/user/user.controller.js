(function () {
    'use strict';

    var app = angular.module('app.user',['app.services']);


    app.controller('UserCtrl', ['$scope', '$filter' , '$http', '$uibModal', 'AccountService', 'ConstantService', UserCtrl ]);


    function UserCtrl($scope, $filter, $http, $uibModal, AccountService, ConstantService) {

        // $scope.searchKeywords = '';
        // $scope.filteredStores = [];
        // $scope.row = '';
        // $scope.select = select;
        // $scope.onFilterChange = onFilterChange;
        // $scope.onNumPerPageChange = onNumPerPageChange;
        // $scope.onOrderChange = onOrderChange;
        // $scope.search = search;
        // $scope.order = order;
        // $scope.numPerPageOpt = [3, 5, 10, 20];
        // $scope.numPerPage = $scope.numPerPageOpt[2];
        // $scope.currentPage = 1;
        // $scope.currentPage = [];
        //  function select(page) {
        //     var end, start;
        //     start = (page - 1) * $scope.numPerPage;
        //     end = start + $scope.numPerPage;
        //     return $scope.currentPageStores = $scope.filteredStores.slice(start, end);
        // };

        // function onFilterChange() {
        //     $scope.select(1);
        //     $scope.currentPage = 1;
        //     return $scope.row = '';
        // };

        // function onNumPerPageChange() {
        //     $scope.select(1);
        //     return $scope.currentPage = 1;
        // };

        // function onOrderChange() {
        //     $scope.select(1);
        //     return $scope.currentPage = 1;
        // };

        // function search() {
        //     $scope.filteredStores = $filter('filter')($scope.stores, $scope.searchKeywords);
        //     return $scope.onFilterChange();
        // };

        // function order(rowName) {
        //     if ($scope.row === rowName) {
        //     return;
        //     }
        //     $scope.row = rowName;
        //     $scope.filteredStores = $filter('orderBy')($scope.stores, rowName);
        //     return $scope.onOrderChange();
        // };





        $scope.userList = [];
        $scope.selectedUser = null;

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

        $scope.editUser = function (user) {
            $scope.selectedUser = user;

            var modalInstance = $uibModal.open({
                // animation: $scope.animationsEnabled,
                animation: true,
                templateUrl: 'ModalCreateUser.html',
                controller: 'ModalCreateUserInstanceCtrl',
                backdrop: 'static',
                size: 'lg',
                resolve: {
                    user: function () {
                        return user;
                    },
             
                    userStatus: function(){
                        return $scope.userStatus;
                    }
                }
            });

            modalInstance.result.then(function (newUser) {
                console.log(newUser);
                $scope.selectedUser = newUser;
                //$scope.selected = selectedItem;
            }, function () {
                //log.info('Modal dismissed at: ' + new Date());
            });
        };



        init();
    }

    app.controller('ModalCreateUserInstanceCtrl', ['$scope', '$uibModalInstance', 'AccountService', 'user', 'userStatus', ModalCreateUserInstanceCtrl]);
    function ModalCreateUserInstanceCtrl($scope, $uibModalInstance, AccountService, user, userStatus) {
        
        console.log(userStatus);

        $scope.user = user;
        $scope.userStatus = userStatus;


        $scope.ok = function() {
            // console.log('sss');

            // $uibModalInstance.close('000');
            AccountService.UpdateUser($scope.user, function(err,result){
                if(err)
                    console.log(err);
                else   
                    console.log(result);
                 $uibModalInstance.close($scope.user);
            })
            
           
        };

        $scope.cancel = function() {
            $uibModalInstance.dismiss("cancel");
        };


        function saveUser(){
            AccountService.UpdateUser($scope.user, function(err,result){
                if(err)
                    console.log(err);
                else   
                    console.log(result);
                
            })

        }

       

    }


})(); 



































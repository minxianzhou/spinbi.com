(function () {
    'use strict';

    var app = angular.module('app.user',['app.services']);


    app.controller('UserCtrl', ['$scope', '$filter' , '$http', '$uibModal', 'AccountService', UserCtrl]);


    function UserCtrl($scope, $filter, $http, $uibModal,AccountService) {


        $scope.userList = [];

        var init = function(){
            AccountService.GetAllUsers({}, function(err,result){
                console.log(result);
                $scope.userList = result.data;
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
                $scope.selected = selectedItem;
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

        $scope.ok = function() {
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



































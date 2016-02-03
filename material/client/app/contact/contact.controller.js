(function () {
    'use strict';

    var app = angular.module('app.contact',['app.services']);


    app.controller('ContactCtrl', ['$scope', '$filter' , '$http', '$uibModal', 'AccountService', 'ConstantService', ContactCtrl ]);


    function ContactCtrl($scope, $filter, $http, $uibModal, AccountService, ConstantService) {

        $scope.contactList = [];
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

        $scope.createContact = function () {


            var modalInstance = $uibModal.open({
                // animation: $scope.animationsEnabled,
                animation: true,
                templateUrl: 'ModalCreateContact.html',
                controller: 'ModalCreateContactInstanceCtrl',
                backdrop: 'static',
                size: 'lg',
                resolve: {
                   
                }
            });

            modalInstance.result.then(function () {
              
                //$scope.selected = selectedItem;
            }, function () {
                //log.info('Modal dismissed at: ' + new Date());
            });
        };



        init();
    }

    app.controller('ModalCreateContactInstanceCtrl', ['$scope', '$uibModalInstance', 'AccountService', ModalCreateContactInstanceCtrl]);
    function ModalCreateContactInstanceCtrl($scope, $uibModalInstance, AccountService) {
        
        


        $scope.ok = function() {

            // AccountService.UpdateUser($scope.user, function(err,result){
            //     if(err)
            //         console.log(err);
            //     else   
            //         console.log(result);
            //      $uibModalInstance.close($scope.user);
            // })
            
            $uibModalInstance.close('ok');
           
        };

        $scope.cancel = function() {
            $uibModalInstance.dismiss("cancel");
        };


    

       

    }


})(); 



































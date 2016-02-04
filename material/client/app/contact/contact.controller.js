(function () {
    'use strict';

    var app = angular.module('app.contact',['app.services']);


    app.controller('ContactCtrl', ['$scope', '$filter' , '$http', '$uibModal', 'ContactService','DialogService', ContactCtrl ]);


    function ContactCtrl($scope, $filter, $http, $uibModal, ContactService, DialogService) {

        $scope.contactList = [];
        $scope.selectedUser = null;

        $scope.show = function(){
            DialogService.ShowAlert('this is alert title','my description about andy');
        };

   


        var init = function(){

            


            ContactService.GetAllContacts(function(err, result){
                if(err){
                    console.log(err);
                }else{
                    console.log(result);
                    $scope.contactList = result.data
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

    app.controller('ModalCreateContactInstanceCtrl', ['$scope', '$uibModalInstance', 'ContactService', ModalCreateContactInstanceCtrl]);
    function ModalCreateContactInstanceCtrl($scope, $uibModalInstance, ContactService) {
        
        
        $scope.contact = {};

        $scope.ok = function() {

            ContactService.CreateContact($scope.contact, function(err,result){
                if(err)
                    console.log(err);
                else   
                    console.log(result);
                 $uibModalInstance.close();
            })
            
            $uibModalInstance.close('ok');
           
        };

        $scope.cancel = function() {
            $uibModalInstance.dismiss("cancel");
        };


    

       

    }


})(); 



































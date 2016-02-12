(function () {
    'use strict';

    var app = angular.module('app.contact',['app.services']);


    app.controller('ContactCtrl', ['$scope', '$filter' , '$http', '$uibModal', 'ContactService','DialogService', ContactCtrl ]);


    function ContactCtrl($scope, $filter, $http, $uibModal, ContactService, DialogService) {

        $scope.contactList = [];
        $scope.selectedContact = null;

        $scope.search = {
            sortType : 'Date',
            sortOrder : 'ASE',
            limit: 20,
            key : ''   
        }

   


        var init = function(){

            // ContactService.GetAllContacts(function(err, result){
            //     if(err){
            //         console.log(err);
            //     }else{
            //         console.log(result);
            //         $scope.contactList = result.data
            //     }
            // });
            
            ContactService.SearchContacts($scope.search , function(err, result){
                if(err){
                    console.log(err);
                }else{
                    console.log(result);
                    $scope.contactList = result.data
                }
            });


        };

        $scope.openContactModal = function (contact) {


            if(typeof contact === 'undefined'){
                $scope.mode = 'New';
            }else{
                $scope.mode = 'Edit';
            }


            var modalInstance = $uibModal.open({
                // animation: $scope.animationsEnabled,
                animation: true,
                templateUrl: 'ModalContact.html',
                controller: 'ModalContactInstanceCtrl',
                backdrop: 'static',
                size: 'lg',
                resolve: {
                    contact : function(){
                        return contact;
                    }
                }
            });

            modalInstance.result.then(function (contact) {

                if($scope.mode == 'New'){
                    $scope.contactList.push(contact);
                }else{
                    $scope.selectedContact = contact;
                }
                
            }, function () {

                console.log('xx');
                //log.info('Modal dismissed at: ' + new Date());
            });
        };



        init();
    }

    app.controller('ModalContactInstanceCtrl', ['$scope', '$uibModalInstance', 'ContactService','contact', ModalContactInstanceCtrl]);
    function ModalContactInstanceCtrl($scope, $uibModalInstance, ContactService, contact) {
        

        console.log(contact);

        if(typeof contact === 'undefined'){
            $scope.mode = 'New';
            $scope.contact = {};
        }else{
            $scope.mode = 'Edit';
            $scope.contact = contact;
        }
            

        $scope.create = function() {

            ContactService.CreateContact($scope.contact, function(err,result){
                if(err)
                    console.log(err);
                else{

                    console.log(result);
                    $uibModalInstance.close(result.data);        
                }   
            })
        };

        $scope.update = function() {
            ContactService.UpdateContacts($scope.contact, function(err,result){
                if(err)
                    console.log(err);
                else{
                    console.log(result);
                    $uibModalInstance.close();
                }

                    
            })
            $uibModalInstance.close('ok');
        };

        $scope.cancel = function() {
            $uibModalInstance.dismiss("cancel");
        };
    }


})(); 



































(function () {
    'use strict';

    var app = angular.module('app.contact',['app.services']);


    app.controller('ContactCtrl', ['$scope',  '$http', '$uibModal', 'ContactService','DialogService', ContactCtrl ]);


    function ContactCtrl($scope, $http, $uibModal, ContactService, DialogService) {

        $scope.contactList = [];
        $scope.selectedContact = null;

        $scope.search = {
            sortType : 'Date',
            sortOrder : 'ASE',
            limit: 20,
            key : ''   
        }

   


        var init = function(){

     
            // ContactService.SearchContacts($scope.search , function(err, result){
            //     if(err){
            //         console.log(err);
            //     }else{
            //         console.log(result);
            //         $scope.contactList = result.data;
            //     }
            // });

            $scope.getRecentContacts();


        };

        $scope.searchContacts = function () {

            ContactService.SearchContacts($scope.search , function(err, result){
                if(err){
                    console.log(err);
                }else{
                    console.log(result);
                    $scope.contactList = result.data;
                }
            });
        }


        $scope.getRecentContacts = function () {

            ContactService.SearchContacts({
                sortType : 'Date',
                sortOrder : 'ASE',
                limit: 20,
                key : ''   
            } , function(err, result){
                if(err){
                    console.log(err);
                }else{
                    console.log(result);
                    $scope.contactList = result.data;
                }
            });
        }



        $scope.openContactModal = function (contact) {

            var inputContact = null;
            if(typeof contact === 'undefined'){
                $scope.contactModalmode = 'New';
            }else{
                $scope.contactModalmode = 'Edit';
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

                if($scope.contactModalmode == 'New'){
                    $scope.contactList.push(contact);
                }else{
                    $scope.selectedContact = contact;
                }
                
            }, function () {
                //  modal cancel exit

            });



        };



        init();
    }

    app.controller('ModalContactInstanceCtrl', ['$scope', '$uibModalInstance', 'ContactService','contact', ModalContactInstanceCtrl]);
    function ModalContactInstanceCtrl($scope, $uibModalInstance, ContactService, contact) {
        

        //console.log(contact);

        if(typeof contact === 'undefined'){
            $scope.contactModalmode = 'New';
            $scope.contact = {};
        }else{
            $scope.contactModalmode = 'Edit';
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



































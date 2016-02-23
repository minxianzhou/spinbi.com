(function () {
    'use strict';

    var app = angular.module('app.forms',['app.services']);


    app.controller('FormGenerateCtrl', ['$scope', '$filter' , '$http', '$uibModal','$window', 'ContactService', 'FormService','DialogService', FormGenerateCtrl]);

    function FormGenerateCtrl($scope, $filter, $http, $uibModal, $window,ContactService, FormService, DialogService) {
        

        $scope.contactList = [];
        $scope.selectedContact = null;

        $scope.search = {
            sortType : 'Date',
            sortOrder : 'ASE',
            limit: 20,
            key : ''   
        }

        var init = function(){
            $scope.getRecentContacts();
        };

  //       function downloadURI(uri, name) {


		//   // var link = document.createElement("a");
		//   // link.download = name;
		//   // link.href = uri;
		//   // link.click();

		//   // var link = $('#mylink');
		//   // link.attr('href',uri);
		//   // console.log(link);
		//   // link[0].click();

		//   window.open(uri, '_blank');
		// }


        // $scope.genForms = function () {

        //     FormService.GenerateOfferForm({} , function(err, result){
        //         if(err){
        //             console.log(err);
        //         }else{
        //             console.log(result);
                 
        //             downloadURI(result.data.link,'ddd.pdf');


				    //  // anchor.attr({
				    //  //     href: result.data.link,
				    //  //     target: '_blank',
				    //  //     download: 'ddddd.pdf'
				    //  // })[0].click();
        //         }
        //     });
        // }


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
                templateUrl: 'ModalFormContact.html',
                controller: 'ModalContactFormInstanceCtrl',
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

      	// run init function 
      	init();
    }


    app.controller('ModalContactFormInstanceCtrl', ['$scope', '$uibModalInstance', 'ContactService', 'FormService','contact', ModalContactFormInstanceCtrl]);
    function ModalContactFormInstanceCtrl($scope, $uibModalInstance, ContactService, FormService, contact) {
        

        //console.log(contact);


        function UpdateLinks(uri, name) {


		  // var link = document.createElement("a");
		  // link.download = name;
		  // link.href = uri;
		  // link.click();

		  var link = $('#downloadOfferLink');
		  link.attr('href',uri);
		  link.attr('download',name);
		  console.log(link);
		  // link[0].click();

		  //window.open(uri, '_blank');
		}

		$scope.linkEnable = {
			offer: false,
			listing: false
		};


        $scope.genForms = function () {

            FormService.GenerateOfferForm({} , function(err, result){
                if(err){
                    console.log(err);
                }else{
                    console.log(result);
                 
                    UpdateLinks(result.data.link,'test.pdf');
                    $scope.linkEnable.offer = true;

				     // anchor.attr({
				     //     href: result.data.link,
				     //     target: '_blank',
				     //     download: 'ddddd.pdf'
				     // })[0].click();
                }
            });
        }

        
        $scope.genListingForms = function () {

            FormService.GenerateListingForm({} , function(err, result){
                if(err){
                    console.log(err);
                }else{
                    console.log(result);
       
                    var link = $('#downloadListingLink');
					link.attr('href',result.data.link);
					link.attr('download','test.pdf');
                    $scope.linkEnable.listing = true;

                }
            });
        }

        $scope.cancel = function() {
            $uibModalInstance.dismiss("cancel");
        };
    }

})(); 









































































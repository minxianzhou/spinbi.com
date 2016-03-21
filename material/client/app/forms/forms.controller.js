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


        $scope.getPropertyInfo = function () {

            FormService.GetPropertyInfo($scope.search.key , function(err, result){
                if(err){
                    console.log(err);
                }else{
                    console.log(result);
                    //$scope.contactList = result.data;
                }
            });
        }

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
        

    	var init = function(){
    		$scope.getOfferByAgent();
    		$scope.getListingByAgent();
    	}

        $scope.contact = contact;
        $scope.selectedOffer = null;
        $scope.selectedListing = null;

        $scope.offers = [];
        $scope.listings = [];
        $scope.formList = [];

        $scope.property = {
        	mls_num : '',
        	address: ''
        };

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


        $scope.openOfferPanel = function(offer){
        	$scope.selectedOffer = offer;
        	updateSelectedOfferFormList();
            $('.modal-header').css('overflow','hidden' );
            $('#action-button').addClass('shiftOut');
            $('.offer-panel').addClass('open');
        }

        $scope.closeOfferPanel = function(){
            
            $('#action-button').removeClass('shiftOut');
            $('.offer-panel').removeClass('open');
            setTimeout(function(){
                $('.modal-header').css('overflow','visible' );    
            },500);
            
        }


        $scope.openListingPanel = function(listing){
        	$scope.selectedListing = listing;
        	updateSelectedListingFormList();
            $('.modal-header').css('overflow','hidden' );
            $('#action-button').addClass('shiftOut');
            $('.listing-panel').addClass('open');
        }

        $scope.closeListingPanel = function(){
            
            $('#action-button').removeClass('shiftOut');
            $('.listing-panel').removeClass('open');
            setTimeout(function(){
                $('.modal-header').css('overflow','visible' );    
            },500);
            
        }




		$scope.linkEnable = {
			offer: false,
			listing: false
		};



		var updateSelectedOfferFormList = function(){
	

			FormService.GetFormsByOffer($scope.selectedOffer._id , function(err, result){

				console.log(result);
				$scope.formList = result.data;

			});

		}

		var updateSelectedListingFormList = function(){
		

			FormService.GetFormsByListing($scope.selectedListing._id , function(err, result){

				console.log(result);
				$scope.formList = result.data;

			});

		}

        $scope.genOfferForms = function () {


            FormService.GenerateOfferForm({Contact: contact, Offer: $scope.selectedOffer} , function(err, result){
                if(err){
                    console.log(err);
                }else{
                    console.log(result);

                    updateSelectedOfferFormList();
                }
            });

        }

        
        $scope.genListingForms = function () {
            FormService.GenerateListingForm({Contact: contact, Listing: $scope.selectedListing} , function(err, result){
                if(err){
                    console.log(err);
                }else{
                     console.log(result);
                     updateSelectedListingFormList();
                }
            });
        }








        $scope.createOffer = function(){
            FormService.AddOffer(
            	{	
            		
            		contactId: $scope.contact._id
            		
            	} , function(err, result){
                if(err){
                    console.log(err);
                }else{
                    console.log(result);
                    $scope.offers.push(result.data);

                }
            });
        }

        $scope.updateOffer = function(){
            FormService.UpdateOffer(
                $scope.selectedOffer, 
                function(err, result){
                if(err){
                    console.log(err);
                }else{
                    console.log(result);
                    //$scope.offers.push(result.data);

                }
            });
        }

        $scope.getOfferByAgent = function(){
            FormService.GetOffersByAgent({ contactId: $scope.contact._id} , function(err, result){
                if(err){
                    console.log(err);
                }else{
                    console.log(result);
                    
                    $scope.offers = result.data;
                }
            });
        }









        $scope.createListing = function(){
            FormService.AddListing(
            	{	
            		contactId: $scope.contact._id
            		
            	} , function(err, result){
                if(err){
                    console.log(err);
                }else{
                    console.log(result);
                    $scope.listings.push(result.data);

                }
            });
        }

        $scope.updateListing = function(){
            FormService.UpdateListing(
                $scope.selectedListing, 
                function(err, result){
                if(err){
                    console.log(err);
                }else{
                    console.log(result);
                    //$scope.offers.push(result.data);

                }
            });
        }

        $scope.getListingByAgent = function(){
            FormService.GetListingsByAgent({ contactId: $scope.contact._id} , function(err, result){
                if(err){
                    console.log(err);
                }else{
                    console.log(result);
                    
                    $scope.listings = result.data;
                }
            });
        }












        $scope.loadPropertyInfo = function(){
            FormService.GetPropertyInfo($scope.property.mls_num , function(err, result){
                if(err){
                    console.log(err);
                }else{
                    console.log(result);
                    var property = result.data.Property;

                    //$scope.property.address = property.Address.AddressText.replace('|', ', ');
                    $scope.selectedOffer.property_address = property.Address.AddressText.replace('|', ', ');
                    
                }
            });
        }

        $scope.cancel = function() {
            $uibModalInstance.dismiss("cancel");
        };

        init();
    }

})(); 









































































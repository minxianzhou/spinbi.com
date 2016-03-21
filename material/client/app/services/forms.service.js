	'use strict';

var services = angular.module('app.services.form',[]);

services.factory('FormService', ['$http','appConfig', function($http,appConfig) {
  return {



  	GenerateOfferForm : function(data, callback ) {
        var baseLink= appConfig.setting.apiBaseLink + 'form/offer';   

        $http.post(
          baseLink, 
          data,
          {}
        ).then(function(result){
           callback(null, result);
        },function(err){
       		callback(err);
        });
  	},

    GenerateListingForm : function( data, callback ) {
      var baseLink= appConfig.setting.apiBaseLink + 'form/listing';    
      $http.post(
            baseLink, 
            data,
            {}
        ).then(function(res){
           callback(null, res);
        },function(err){
          callback(err);
        });
    },





    GetFormsByOffer : function( offerId, callback ) {
      var baseLink= appConfig.setting.apiBaseLink + 'form/getFormByOffer';
      $http.post(
            baseLink, 
   
            { OfferId : offerId }
        ).then(function(res){
           callback(null, res);
        },function(err){
          callback(err);
        });
    },

    GetFormsByListing : function( listingId, callback ) {
      var baseLink= appConfig.setting.apiBaseLink + 'form/getFormByListing';
      $http.post(
            baseLink, 
   
            { ListingId : listingId }
        ).then(function(res){
           callback(null, res);
        },function(err){
          callback(err);
        });
    },



    AddOffer : function( data, callback ) {
      var baseLink= appConfig.setting.apiBaseLink + 'offer';

      $http.post(
            baseLink,
            data, 
            {}
        ).then(function(res){
           callback(null, res);
        },function(err){
          callback(err);
        });
    },

    UpdateOffer : function( data, callback ) {
      var baseLink= appConfig.setting.apiBaseLink + 'offer';
      $http.put(
            baseLink,
            data, 
            {}
        ).then(function(res){
           callback(null, res);
        },function(err){
          callback(err);
        });
    },


    GetOffersByAgent : function( data, callback ) {
      var baseLink= appConfig.setting.apiBaseLink + 'offer/getOffers';

      $http.post(
            baseLink,
            data,
            {}
        ).then(function(res){
           callback(null, res);
        },function(err){
          callback(err);
        });
    },
    
    AddListing : function( data, callback ) {
      var baseLink= appConfig.setting.apiBaseLink + 'listing';

      $http.post(
            baseLink,
            data, 
            {}
        ).then(function(res){
           callback(null, res);
        },function(err){
          callback(err);
        });
    },

    UpdateListing : function( data, callback ) {
      var baseLink= appConfig.setting.apiBaseLink + 'listing';
      $http.put(
            baseLink,
            data, 
            {}
        ).then(function(res){
           callback(null, res);
        },function(err){
          callback(err);
        });
    },

    GetListingsByAgent : function( data, callback ) {
      var baseLink= appConfig.setting.apiBaseLink + 'listing/getListings';

      $http.post(
            baseLink,
            data,
            {}
        ).then(function(res){
           callback(null, res);
        },function(err){
          callback(err);
        });
    },

    GetPropertyInfo : function( propertyNumber, callback ) {
      var baseLink= appConfig.setting.apiBaseLink + 'mls/single/' + propertyNumber;

      $http.get(
            baseLink, 
            {}
        ).then(function(res){
           callback(null, res);
        },function(err){
          callback(err);
        });
    }


  }
}]);
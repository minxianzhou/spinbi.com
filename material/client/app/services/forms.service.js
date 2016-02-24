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
    }
  }
}]);
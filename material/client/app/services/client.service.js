'use strict';

var services = angular.module('app.services.client',[]);

services.factory('ClientService', ['$http', function($http) {
  return {


		ClientService : function(data, successCallback, errCallback ) {
      
      var baseLink= appConfig.setting.apiBaseLink +'client';    


      $http.post(
          baseLink, 
        	data,
          {}
      ).then(function(res){
         successCallback(res);

         if(typeof errCallback !== 'undefined')
         		errCallback(null);
      },function(err){
      	if(typeof errCallback !== 'undefined')
         		errCallback(err);
      });

			return data;
		}







  }
}]);
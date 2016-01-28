'use strict';

var services = angular.module('app.services');

services.factory('ClientService', ['$http', function($http) {
  return {


		ClientService : function(data, successCallback, errCallback ) {
          
      var baseLink= 'http://localhost:1000/api/translate';

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
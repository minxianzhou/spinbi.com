'use strict';

var service = angular.module('app.services', []);

service.factory('AccountService', ['$http', function($http) {
  return {


		CreateUser : function(data, successCallback, errCallback ) {
          
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
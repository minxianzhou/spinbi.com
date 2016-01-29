'use strict';

var services = angular.module('app.services');

services.factory('AccountService', ['$http','appConfig', function($http, appConfig) {
  return {


		CreateUser : function(data, successCallback, errCallback ) {
          
      var baseLink= appConfig.setting.apiBaseLink + 'user';

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

			//return data;
		},

    GetAllUsers : function(data, callback ) {
          
      var baseLink= appConfig.setting.apiBaseLink + 'user';

      $http({
        method: 'GET',
        url: baseLink
      }).then(function(response) {
        callback(null, response);
      }, function(response) {
        callback( response);
      });


      //return data;
    }  







  }
}]);
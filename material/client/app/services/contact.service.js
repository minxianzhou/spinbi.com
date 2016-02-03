'use strict';

var services = angular.module('app.services.contact',[]);

services.factory('ContactService', ['$http','appConfig', function($http,appConfig) {
  return {
		CreateContact : function(data, callback ) {
      var baseLink= appConfig.setting.apiBaseLink +'contact';    
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
'use strict';

var services = angular.module('app.services.constant',[]);

services.factory('ConstantService', ['$http','appConfig', function($http,appConfig) {
  return {


		GetValue : function(key, Callback ) {
          
      var baseLink= appConfig.setting.apiBaseLink +'constant/' + key;
      console.log(baseLink);

      $http({
        method: 'GET',
        url: baseLink
      }).then(function(response) {
        Callback(null, response);
      }, function(err) {
        if(typeof errorCallback !== 'undefined')
          errCallback(err);
      });
		}







  }
}]);
'use strict';

var services = angular.module('app.services.account',[]);

services.factory('AccountService', ['$http','appConfig', function($http, appConfig) {
  return {


		CreateUser : function(data, successCallback, errCallback ) {
          
      var baseLink = appConfig.setting.apiBaseLink + 'user';

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

    UpdateUser : function(data, callback ) {
          
      var baseLink = appConfig.setting.apiBaseLink + 'user';

      $http.put(
          baseLink,
          data
      ).then(function(res){
         callback(null, res);
      },function(err){
        if(typeof errCallback !== 'undefined')
            errCallback(err);
      });

    },

    UpdateProfile : function(data, callback ) {
          
      var baseLink = appConfig.setting.apiBaseLink + 'profile';

      $http.put(
          baseLink,
          data
      ).then(function(res){
         callback(null, res);
      },function(err){
        if(typeof errCallback !== 'undefined')
            errCallback(err);
      });

    },


    GetAllUsers : function(data, callback ) {
          
      var baseLink = appConfig.setting.apiBaseLink + 'user';

      $http({
        method: 'GET',
        url: baseLink
      }).then(function(response) {
        callback(null, response);
      }, function(response) {
        callback( response);
      });


      //return data;
    },
    GetAccountInfo : function(callback ) {
          
      var baseLink = appConfig.setting.apiBaseLink + 'account';

      $http({
        method: 'GET',
        url: baseLink
      }).then(function(response) {
        callback(null, response);
      }, function(response) {
        callback( response);
      });


      //return data;
    },
    SignIn : function(data, callback ) {
          
      var baseLink = appConfig.setting.apiBaseLink + 'login';

      $http.post(
          baseLink, 
          data,
          {}
      ).then(function(res){
        callback(null, res.data);
      },function(err){
        callback(err);
      });

    },
    SignOut : function(callback) {
          
      var baseLink = appConfig.setting.apiBaseLink + 'logout';

      $http({
        method: 'GET',
        url: baseLink
      }).then(function(response) {
        callback(null, response);
      }, function(response) {
        callback( response);
      });
    }  


  }
}]);




















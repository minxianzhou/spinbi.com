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
		},
    GetAllContacts : function( callback ) {
      var baseLink= appConfig.setting.apiBaseLink +'contact';    
      $http.get(
          baseLink, 
          {}
      ).then(function(res){
         callback(null, res);
      },function(err){
        callback(err);
      });
    },
    SearchContacts : function( data,  callback ) {
      var baseLink= appConfig.setting.apiBaseLink +'contact/search';    
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
    UpdateContacts : function( data, callback ) {
      var baseLink= appConfig.setting.apiBaseLink +'contact';    
      $http.put(
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
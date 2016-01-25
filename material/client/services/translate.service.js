'use strict';

var service = angular.module('app.services', []);

service.factory('TranslationService', ['$http', function($http) {
  return {


		CreateTranslationFeild : function(data, successCallback, errCallback ) {
          
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
		},

		GetTranslationFeilds : function(successCallback, errCallback ) {
            
      var baseLink= 'http://localhost:1000/api/translate';

      $http({
        method: 'GET',
        url: baseLink
      }).then(function(response) {
        successCallback(response);
      }, function(response) {
        if(typeof errorCallback !== 'undefined')
          errCallback( response);
      });


		},

    DeleteTranslationFeilds : function(deleteId, successCallback, errCallback ) {
       
      var baseLink= 'http://localhost:1000/api/translate?_id=' + deleteId;

      $http.delete(
          baseLink
      ).then(function(res){
         successCallback(res);

         if(typeof errCallback !== 'undefined')
            errCallback(null);
      },function(err){
        if(typeof errCallback !== 'undefined')
            errCallback(err);
      });



    },

    UpdateTranslationFeilds : function(data, successCallback, errCallback ) {
       
      var baseLink= 'http://localhost:1000/api/translate';

      $http.put(
          baseLink,
          data
      ).then(function(res){
         successCallback(res);

         if(typeof errCallback !== 'undefined')
            errCallback(null);
      },function(err){
        if(typeof errCallback !== 'undefined')
            errCallback(err);
      });



    }








  }
}]);
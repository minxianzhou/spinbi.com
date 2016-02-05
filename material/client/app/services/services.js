'use strict';
var app_service = angular.module(
	'app.services',
	[
		'app.services.translation',
		'app.services.account',
		'app.services.constant',
		'app.services.contact',
		'app.services.dialog'
	]
);




app_service.factory('authInterceptor', function ($rootScope, $q, $window) {
  return {
    request: function (config) {
	    config.headers = config.headers || {};

	    config.headers['Authorization'] =  'test andy';


  		if ($window.localStorage.token) {
        	config.headers['Authorization'] =  $window.localStorage.token;
  		}
  		return config;
    },
    responseError: function (response) {
      console.log(response.status);
      if (response.status === 401) {
        // handle the case where the user is not authenticated
      }
      if (response.status === 403) {

        var pathname = $window.location.pathname.substr($window.location.pathname.indexOf("/")+1).split(/\//)[0];
        if(pathname == 'admin'){
          window.location = '/admin/login';
        }
        else window.location = '/agent/login';
      }
      return response || $q.when(response);
    }
  };
})


.config(function ($httpProvider) {
  $httpProvider.defaults.headers.post['XSRF-AUTH'] = 
        "some accessToken to be generated later";
  $httpProvider.interceptors.push('authInterceptor');
});


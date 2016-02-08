(function () {
    'use strict';

    var app = angular.module('app.header',['app.services']);

    // app.directive('customPage', customPage);

    app.controller('HeaderCtrl', ['$scope', '$rootScope', '$window' , '$location', 'AccountService', HeaderCtrl]);
    function HeaderCtrl($scope, $rootScope, $window, $location, AccountService) {



    	$scope.accountUserName = function(){
			// var userInfo = $window.localStorage;

			
			console.log($rootScope);
			//return $rootScope.UserInfo.firstName + ' ' + $rootScope.UserInfo.lastName;

			if(typeof $rootScope.UserInfo === 'undefined'){
				return '';
			}else{
				return $rootScope.UserInfo.firstName + ' ' + $rootScope.UserInfo.lastName;
			}
			

		}

		$scope.logout = function(){
			AccountService.SignOut(function(err){
				
				$window.localStorage.clear();
				delete $rootScope.UserInfo;


				$location.path('/account/signin');

			});
		}
    }





})(); 



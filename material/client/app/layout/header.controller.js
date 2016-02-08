(function () {
    'use strict';

    var app = angular.module('app.header',['app.services']);

    // app.directive('customPage', customPage);

    app.controller('HeaderCtrl', ['$scope', '$rootScope', '$window' , '$location', 'AccountService', HeaderCtrl]);
    function HeaderCtrl($scope, $rootScope, $window, $location, AccountService) {



    	$scope.accountUserName = function(){
			//console.log($rootScope);

			if($rootScope.accountInfo.user != null){
				return $rootScope.accountInfo.user.firstName + ' ' + $rootScope.accountInfo.user.lastName;
			}else{
				return '';
			}
		}

		$scope.logout = function(){
			AccountService.SignOut(function(err){
				
				$window.localStorage.clear();
				
				$rootScope.accountSync(function(){
					$location.path('/account/signin');	
				});

			});
		}
    }





})(); 



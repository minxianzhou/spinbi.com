(function () {
    'use strict';

    var app = angular.module('app.account',['app.services']);

    // app.directive('customPage', customPage);

    app.controller('SignUpCtrl', ['$scope', '$rootScope', '$filter' , '$http', '$uibModal', 'AccountService', SignUpCtrl]);
    function SignUpCtrl($scope, $rootScope, $filter, $http, $uibModal, AccountService) {

    	

        $scope.firstName = '';
        $scope.lastName = '';
        $scope.email = '';
		$scope.password = '';


		$scope.signup = function(){
			AccountService.CreateUser({
	        	firstName:$scope.firstName ,
	        	lastName:$scope.lastName ,
	        	password:$scope.password ,
	        	email:$scope.email
	        }, function success(result){
	        	console.log(result);
	        }, function error(err){
	        	console.log(err);
	        });	
		}
    }


    app.controller('SignInCtrl', ['$scope', '$rootScope', '$window', '$location', 'AccountService', SignInCtrl]);
    function SignInCtrl($scope, $rootScope, $window, $location, AccountService) {


    	if($rootScope.isLogin())
    		$window.location = "#/dashboard";
    	
        $scope.email = '';
		$scope.password = '';
		$scope.msg = '';

		$scope.signin = function(){

			AccountService.SignIn({
	        	email: $scope.email ,
	        	password: $scope.password
	        }, function success(err, result){

	        	if( result.status == 'ok'){	
	        		$window.localStorage.Authorization = result.data.token._id;

	        		$rootScope.accountSync(function(){
						$location.path('/dashboard');	
					});
	        		
	        	}else{
	        		//console.log(result.messages);
	        		$scope.msg = result.messages;
	        	}
	        	
	        });	
		}
    }




})(); 



































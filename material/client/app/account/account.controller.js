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

    	
        $scope.email = '';
		$scope.password = '';
		$scope.msg = '';

		$scope.signin = function(){

			AccountService.SignIn({
	        	email: $scope.email ,
	        	password: $scope.password
	        }, function success(err, result){

	        	if( result.status == 'ok'){	
	        		//console.log(result.data._id);
	        		$window.localStorage.Authorization = result.data.token._id;
	        		// $window.localStorage.firstName = result.data.firstName;
	        		// $window.localStorage.lastName = result.data.lastName;
	        		// $window.localStorage.email = result.data.email;
	        		// $window.localStorage.type = result.data.type;
	        		// $window.localStorage.phone = result.data.phone;
	        		// $window.localStorage.company = result.data.company;
	        	
	        		$rootScope.UserInfo = result.data.user;

	        		$location.path('/dashboard');
	        	}else{
	        		//console.log(result.messages);
	        		$scope.msg = result.messages;
	        	}
	        	
	        });	
		}
    }




})(); 



































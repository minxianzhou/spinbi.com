(function () {
    'use strict';

    var app = angular.module('app.account',['app.services']);

    // app.directive('customPage', customPage);

    app.controller('SignUpCtrl', ['$scope', '$filter' , '$http', '$uibModal', 'AccountService', SignUpCtrl]);


    function SignUpCtrl($scope, $filter, $http, $uibModal, AccountService) {

    	

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




})(); 



































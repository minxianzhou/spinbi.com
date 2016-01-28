(function () {
    'use strict';

    var app = angular.module('app.account',['app.services']);

    // app.directive('customPage', customPage);

    app.controller('SignUpCtrl', ['$scope', '$filter' , '$http', '$uibModal', SignUpCtrl]);


    function SignUpCtrl($scope, $filter, $http, $uibModal) {


        $scope.username = '';
        $scope.password = '';
        $scope.email = '';




    }




})(); 



































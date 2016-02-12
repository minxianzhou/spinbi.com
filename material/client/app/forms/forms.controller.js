(function () {
    'use strict';

    var app = angular.module('app.forms',['app.services']);


    app.controller('FormGenerateCtrl', ['$scope', '$filter' , '$http', 'ConstantService', 'TranslationService','DialogService', FormGenerateCtrl]);

    function FormGenerateCtrl($scope, $filter, $http, ConstantService, TranslationService, DialogService) {
        
        $scope.selectedFormType = '';
      
    }



})(); 



































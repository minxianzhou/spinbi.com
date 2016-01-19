(function () {
    'use strict';

    var app = angular.module('app.table');

    // app.config(function($httpProvider) {
    //     //Enable cross domain calls
    //     $httpProvider.defaults.useXDomain = true;

    //     //Remove the header containing XMLHttpRequest used to identify ajax call 
    //     //that would prevent CORS from working
    //     delete $httpProvider.defaults.headers.common['X-Requested-With'];
    // });


    app.controller('TranslateCtrl', ['$scope', '$filter' , '$http', TranslateCtrl]);


    function TranslateCtrl($scope, $filter, $http) {
        
        $scope.link ='';  

        $scope.result ='';  

        $scope.translate = function(){
            console.log($scope.link );

            var config = {

            };

            $http.post(
                    'http://localhost:1000/api/content?callback=JSON_CALLBACK', 
                    {
                        link: $scope.link 
                    }, 
                    config
                ).then(function(res){
                    console.log(res);
                    $scope.result = res.data;  
                },function(err){

                });

        };
    }

})(); 
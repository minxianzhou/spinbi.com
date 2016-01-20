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


    app.controller('TranslateCtrl', ['$scope', '$filter' , '$http', '$mdToast', TranslateCtrl]);


    function TranslateCtrl($scope, $filter, $http, $mdToast) {
        
        $scope.link ='';  

        $scope.result ='';  
        $scope.loading = false;  
        $scope.successed = false; 
        $scope.started = false;  


        $scope.translate = function(){
            console.log($scope.link );

            if($scope.link == ''){

                // $mdToast.show({
                //     controller: 'ToastCustomDemo',
                //     templateUrl: 'toast-template.html',
                //     parent : $document[0].querySelector('#toastBounds'),
                //     hideDelay: 6000,
                //     position: $scope.getToastPosition()
                // });    
                return false;    
            }


            $scope.started = true;  
            $scope.loading = true;  
            $scope.successed = false; 

            var config = {

            };

            $http.post(
                    'http://135.23.248.123:8080/api/content', 
                    {
                        link: $scope.link 
                    }, 
                    config
                ).then(function(res){
                    console.log(res);

                    var doc = document.getElementById('returnResult').contentWindow.document;
                    doc.open();
                    doc.write(res.data);
                    doc.close();

                    $scope.loading = false;  
                    $scope.successed = true; 

                    //$scope.result = res.data;  
                },function(err){
                    $scope.loading = false;  
                    $scope.successed = false; 
                });

        };
    }

})(); 
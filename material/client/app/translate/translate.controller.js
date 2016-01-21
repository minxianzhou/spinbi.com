(function () {
    'use strict';

    var app = angular.module('app.translate',['app.services']);

    // app.config(function($httpProvider) {
    //     //Enable cross domain calls
    //     $httpProvider.defaults.useXDomain = true;

    //     //Remove the header containing XMLHttpRequest used to identify ajax call 
    //     //that would prevent CORS from working
    //     delete $httpProvider.defaults.headers.common['X-Requested-With'];
    // });




    app.controller('TranslateCtrl', ['$scope', '$filter' , '$http', '$mdToast','TranslationService', TranslateCtrl]);



    function TranslateCtrl($scope, $filter, $http, $mdToast, TranslationService) {
        
        $scope.link ='';  

        $scope.result ='';  
        $scope.loading = false;  
        $scope.successed = false; 
        $scope.started = false;  


        // console.log(TranslationService.CreateTranslationFeild({andy:'handsome'}));

        $scope.createItem = function(){


            // var baseLink= 'http://localhost:1000/api/translate';
            // $http.post(
            //         baseLink, 
            //         {
            //             language : 'ZH',
            //             pattern : 'room',
            //             text : '房间',
            //             length : 0
            //         }, 
            //         {}
            //     ).then(function(res){
                   
            //         //$scope.result = res.data;  
            //     },function(err){
            //        if(err)
            //             console.log(err);
            //     });

            TranslationService.CreateTranslationFeild(
                {
                    language : 'ZH',
                    pattern : 'room',
                    text : '房间',
                    length : 0
                },
                function(response){
                    console.log(response);
                }
            );  


        };


        $scope.print = function(){

            //$('#returnResult').print();
            console.log(window);
            window.frames[0].focus();
            window.frames[0].print();
        };


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

            var baseLink= 'http://localhost:1000/api/content';
            $scope.started = true;  
            $scope.loading = true;  
            $scope.successed = false; 

            var config = {

            };

            $http.post(
                    baseLink, 
                    {
                        link: $scope.link 
                    }, 
                    config
                ).then(function(res){
                    console.log(res);

                    var doc = document.getElementById('returnResult').contentWindow.document;
                    doc.open();

                    var cssHtml = '<style type="text/css">@media print{body{ background-color:#FFFFFF; background-image:none; color:#000000 }#ad{ display:none;}#leftbar{ display:none;}#contentarea{ width:100%;}}</style>';


                    doc.write( cssHtml +res.data);
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



    app.controller('TranslateManagementCtrl', ['$scope', '$filter' , '$http', '$mdToast','TranslationService', TranslateManagementCtrl]);
    function TranslateManagementCtrl($scope, $filter, $http, $mdToast, TranslationService) {
        $scope.states = [
            {
                code: 'CA',
                desc: "Canada"
            }
        ];
    }







})(); 
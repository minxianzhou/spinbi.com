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
            window.frames[0].focus();
            window.frames[0].print();
        };

        $scope.clear = function(){
            $scope.link =''; 
            $scope.loading = false;  
            $scope.successed = false; 
            $scope.started = false;     
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

                    var ifm = document.getElementById('returnResult');
                    var doc = ifm.contentWindow.document;
                    doc.open();

                    var cssHtml = '<style type="text/css">@media print{body{ background-color:#FFFFFF; background-image:none; color:#000000 }#ad{ display:none;}#leftbar{ display:none;}#contentarea{ width:100%;}}</style>';


                    doc.write( cssHtml +res.data);
                    doc.close();

                    

                    // resize the height of ifram
                    setTimeout(function(){
                        //console.log(document.getElementById('returnResult').contentWindow.document.body.offsetHeight);    
                        ifm.height = ifm.contentWindow.document.body.scrollHeight + 100 + 'px';
                    },100);
                    

                    $scope.loading = false;  
                    $scope.successed = true; 
                    

                },function(err){
                    $scope.loading = false;  
                    $scope.successed = false; 
                });

        };
    }



    app.controller('TranslateManagementCtrl', ['$scope', '$filter' , '$http', '$mdToast','TranslationService', TranslateManagementCtrl]);
    function TranslateManagementCtrl($scope, $filter, $http, $mdToast, TranslationService) {


        $scope.languages = [
            {
                code: 'zh',
                desc: "中文"
            },
            {
                code: 'ru',
                desc: "Русский язык"
            },
            {
                code: 'pt',
                desc: "Portugal"
            },
            {
                code: 'es',
                desc: "Español"
            },
            {
                code: 'ja',
                desc: "日本語"
            }
        ];

        $scope.sortTypes = [ 'Date', 'Alphabet', 'Length' ];
        $scope.sortOrders = [ 'ASC', 'DESC' ];
         
        $scope.searchPattern = '';




        $scope.getSortString = function(){
            var query = '';

            // choose filter
            if($scope.selectedSortType == 'Date'){ query += 'date' }
            else if($scope.selectedSortType == 'Alphabet'){ query += 'pattern' }
            else if($scope.selectedSortType == 'Length'){ query += 'length' }
            else { query += 'Date' }

            // choose sort order
            if($scope.selectedSortOrder == 'DESC'){ query = '-' + query; }
   

            return query;
        };

        $scope.getFilterString = function(){
            var condition =  {
                language : $scope.selectedLanguage
            };

            if($scope.searchPattern != '')
                condition.pattern = $scope.searchPattern;
            
   

            return condition;
        };




        $scope.selectedLanguage = $scope.languages[0].code;
        $scope.selectedSortType= $scope.sortTypes[0];
        $scope.selectedSortOrder = $scope.sortOrders[0];



        $scope.pendingItemList = [];
        $scope.itemList = [];

        //--------------------------------------
        // new item control
        //--------------------------------------

        // add pending item 
        $scope.addPendingItem = function(){
            
            $scope.pendingItemList.push({
                language : $scope.selectedLanguage,
                pattern : '',
                text : '',
                length : 0,
                date : new Date().toISOString()
            });
        };

        // remove pending item
        $scope.removePendingItem = function(removeItem){
            $scope.pendingItemList = $scope.pendingItemList.filter(function(obj) {
                return obj !== removeItem;
            });
        };

        // save pending item
        $scope.savePendingItem = function(saveItem){

            if( saveItem.pattern == '' || saveItem.text == ''){

            }else{
                TranslationService.CreateTranslationFeild(saveItem,function(response, err){

                        if(response.status == 200){
                            saveItem._id = response.data._id;
                            saveItem.length = response.data.length;
                            $scope.addItem(saveItem);
                            $scope.removePendingItem(saveItem);
                        }else{
                            console.log(err);
                        }
                    }
                );          
            }         


        };


        //--------------------------------------
        // existing item control
        //--------------------------------------


        // add new item into list
        $scope.addItem = function(newItem){
            $scope.itemList.push(newItem);
        };

        $scope.removeItemFromExistingList = function(removeItem){
            $scope.itemList = $scope.itemList.filter(function(obj) {
                return obj !== removeItem;
            });
        };

        // remove existing item
        $scope.removeItem = function(removeItem){
            TranslationService.DeleteTranslationFeilds(removeItem._id,function(response, err){
                    if(response.status == 200){
                        $scope.removeItemFromExistingList(removeItem);
                    }else{
                        console.log(err);
                    }
                }
            );
        };        


        // update existing item
        $scope.updateItem = function(updateItem){
            TranslationService.UpdateTranslationFeilds(updateItem,function(response, err){

                    if(response.status == 200){
                        //$scope.removeItemFromExistingList(removeItem);
                    }else{
                        console.log(err);
                    }
                    
                }
            );
        }; 



        // is item in edit mode
        $scope.isItemEditMode = function(item){
            if(typeof item.editMode === 'undefined' || item.editMode == false)
                return false
            else
                return true;
        };

        $scope.changeToItemEditMode = function(item){
            item.editMode = true;
        };

        $scope.changeToItemViewMode = function(item){
            item.editMode = false;
            $scope.updateItem(item);
        };


        var init = function(){

            TranslationService.GetTranslationFeilds(function(res){
                $scope.itemList = res.data;
            });

        };


        init();


    }

})(); 



































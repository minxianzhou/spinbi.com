(function () {
    'use strict';

    var app = angular.module('app.translate',['app.services']);


    app.controller('TranslateCtrl', ['$scope', '$filter' , '$http', 'ConstantService', 'TranslationService','DialogService', TranslateCtrl]);



    function TranslateCtrl($scope, $filter, $http, ConstantService, TranslationService, DialogService) {
        
        $scope.link ='';  

        $scope.result ='';  
        $scope.loading = false;  
        $scope.successed = false; 
        $scope.started = false;  

        ConstantService.GetValue('Languages',function(err, result){
            console.log(result);
            $scope.languages = result.data;
            $scope.selectedLanguage = 'zh'; 
        });


        $scope.print = function(){
            window.frames[0].focus();
            window.frames[0].print();
        };

        $scope.clear = function(){
            $scope.link =''; 
            $scope.selectedLanguage = 'zh'; 
            $scope.loading = false;  
            $scope.successed = false; 
            $scope.started = false;     
        };

        $scope.translate = function(){

            if($scope.link == ''){
                DialogService.ShowAlert('URL Cannot be empty !','please input a valide MLS url ...');                
                return false;    
            }else if( $scope.link.indexOf('v3.torontomls.net') == -1 ){
                DialogService.ShowAlert('Invalied URL Input','please input a valide MLS url ...');
                return false;
            }




            $scope.started = true;  
            $scope.loading = true;  
            $scope.successed = false; 

            TranslationService.Translate($scope.link, $scope.selectedLanguage, function(err, res){

                if(err){
                    $scope.loading = false;  
                    $scope.successed = false; 
                }else{

                     var ifm = document.getElementById('returnResult');
                    var doc = ifm.contentWindow.document;
                    doc.open();

                    var cssHtml = '<style type="text/css">@media print{body{ background-color:#FFFFFF; background-image:none; color:#000000 }#ad{ display:none;}#leftbar{ display:none;}#contentarea{ width:100%;}}</style>';


                    doc.write( cssHtml +res.data);
                    doc.close();

                    

                    // resize the height of ifram
                    setTimeout(function(){ 
                        ifm.height = ifm.contentWindow.document.body.scrollHeight + 100 + 'px';
                    },100);
                    

                    $scope.loading = false;  
                    $scope.successed = true; 
                }

            });

        };
    }



    app.controller('TranslateManagementCtrl', ['$scope', '$filter' , '$http', '$mdToast','ConstantService', 'TranslationService', TranslateManagementCtrl]);
    function TranslateManagementCtrl($scope, $filter, $http, $mdToast, ConstantService, TranslationService) {


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



        $scope.deleteMode = false;
        $scope.changeDeleteMode = function(){
            if($scope.deleteMode == false)
                $scope.deleteMode = true;
            else
                $scope.deleteMode = false;
        }

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



































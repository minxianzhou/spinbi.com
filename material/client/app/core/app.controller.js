(function () {
    'use strict';

    angular.module('app')
    .controller('AppCtrl', [ '$scope', '$rootScope', '$state', '$document', 'appConfig', 'AccountService', AppCtrl]) // overall control
    
    function AppCtrl($scope, $rootScope, $state, $document, appConfig, AccountService) {


        // -----------------------------------------
        // Init Account Information Contol 
        // -----------------------------------------
        $rootScope.aa = 'from root scope';
        $rootScope.accountInfo = {
            isLogin : false,
            user : null
        };

        $rootScope.isLogin = function(){ return $rootScope.accountInfo.isLogin; }
        $rootScope.isAdmin = function(){
            if($rootScope.isLogin() && $rootScope.accountInfo.user.type == 'Administrator' )
                return true;
            else
                return false;
        };
        $rootScope.accountSync = function(callback){
            AccountService.GetAccountInfo(function(err, result){

                if(err || result.data == null){
                    $rootScope.accountInfo.isLogin = false;
                    $rootScope.accountInfo.user = null;
                }else{
                    $rootScope.accountInfo.isLogin = true;
                    $rootScope.accountInfo.user = result.data;
                }
                //console.log($rootScope.accountInfo.user);

                if(typeof callback !== 'undefined')
                    callback();
            });

        }
        $rootScope.accountSync();

        // -----------------------------------------
        // end of seation
        // -----------------------------------------


        $scope.pageTransitionOpts = appConfig.pageTransitionOpts;
        $scope.main = appConfig.main;
        $scope.color = appConfig.color;
        $scope.setting = appConfig.setting;

        $scope.$watch('main', function(newVal, oldVal) {
            // if (newVal.menu !== oldVal.menu || newVal.layout !== oldVal.layout) {
            //     $rootScope.$broadcast('layout:changed');
            // }

            if (newVal.menu === 'horizontal' && oldVal.menu === 'vertical') {
            $rootScope.$broadcast('nav:reset');
            }
            if (newVal.fixedHeader === false && newVal.fixedSidebar === true) {
            if (oldVal.fixedHeader === false && oldVal.fixedSidebar === false) {
                $scope.main.fixedHeader = true;
                $scope.main.fixedSidebar = true;
            }
            if (oldVal.fixedHeader === true && oldVal.fixedSidebar === true) {
                $scope.main.fixedHeader = false;
                $scope.main.fixedSidebar = false;
            }
            }
            if (newVal.fixedSidebar === true) {
            $scope.main.fixedHeader = true;
            }
            if (newVal.fixedHeader === false) {
            $scope.main.fixedSidebar = false;
            }
        }, true);


        $rootScope.$on("$stateChangeSuccess", function (event, currentRoute, previousRoute) {
            $document.scrollTo(0, 0);
        });
    }

})(); 
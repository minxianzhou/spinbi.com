(function () {
    'use strict';

    var app = angular.module('app.home',['app.services']);


    app.controller('HomeCtrl', ['$scope', HomeCtrl ]);


    function HomeCtrl($scope) {

        $scope.title = 'Home PG';

        $scope.myInterval = 4000;
          $scope.noWrapSlides = false;
          $scope.active = 0;

        var resize = function(){
            $('#slider').height($(window).height()-80);
            $('#slider .slide-img').height($(window).height()-80);
          }



        var init = function(){
            setTimeout(function(){

                $(window).on('resize', function  () {
                    console.log($(window).height());
                    resize();
                })
                resize();    
            },10);
            

        };





        init();
    }

  

})(); 



































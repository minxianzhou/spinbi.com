(function () {
    'use strict';

    var app = angular.module('app.home',['app.services']);


    app.controller('HomeCtrl', ['$scope', HomeCtrl ]);


    function HomeCtrl($scope) {

        $scope.title = 'Home PG';

        // $scope.myInterval = 4000;
        // $scope.noWrapSlides = false;
        // $scope.active = 0;


        $scope.sliders = [];
        $scope.carouselIndex = 0;



        $scope.nextSlide = function(){
            if($scope.carouselIndex+1 < $scope.sliders.length)    
                $scope.carouselIndex++;
        }

        $scope.preSlide = function(){
            if($scope.carouselIndex >  0)    
                $scope.carouselIndex--;
        }


        var resize = function(){
            $('.slider').height($(window).height()-80);
            $('.slider .layer').height($(window).height()-80);
          }



        var init = function(){

            $scope.sliders.push({
                title: 'Slider #1'
                , subtitle: 'subtitle'
                , imgUrl: '/images/slider/1.jpg'
            });

            $scope.sliders.push({
                title: 'Slider #1'
                , subtitle: 'subtitle'
                , imgUrl: '/images/slider/2.jpg'
            });

            $scope.sliders.push({
                title: 'Slider #1'
                , subtitle: 'subtitle'
                , imgUrl: '/images/slider/3.jpg'
            });

            $scope.sliders.push({
                title: 'Slider #1'
                , subtitle: 'subtitle'
                , imgUrl: '/images/slider/4.jpg'
            });

            $scope.sliders.push({
                title: 'Slider #1'
                , subtitle: 'subtitle'
                , imgUrl: '/images/slider/5.jpg'
            });


            setTimeout(function(){

                $(window).on('resize', function  () {
                    console.log($(window).height());
                    resize();
                })
                resize();    
<<<<<<< HEAD
            },500);
=======
            },10);
            

>>>>>>> origin/master
        };



        init();
    }

  

})(); 



































(function () {
    'use strict';

    angular.module('app')
        .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider,$locationProvider) {
            var routes, setRoutes;

            routes = [
                'account/signup','account/signin',
                'ui/cards', 'ui/typography', 'ui/buttons', 'ui/icons', 'ui/grids', 'ui/widgets', 'ui/components', 'ui/timeline', 'ui/lists', 'ui/pricing-tables',
                'map/maps',
                'table/static', 'table/dynamic', 'table/responsive',
                'form/elements', 'form/layouts', 'form/validation', 'form/wizard',
                'chart/echarts', 'chart/echarts-line', 'chart/echarts-bar', 'chart/echarts-pie', 'chart/echarts-scatter', 'chart/echarts-more',
                'page/404', 'page/500', 'page/blank', 'page/forgot-password', 'page/invoice', 'page/lock-screen', 'page/profile', 'page/signin', 'page/signup',
                'app/calendar','views/dashboard','translate/translate', 'translate/management', 'contact/new', 'contact/search', 'user/user'

            ]

            setRoutes = function(route) {
                var config, url;
                url = '/' + route;
                config = {
                    url: url,
                    templateUrl: 'app/' + route + '.html'
                };
                $stateProvider.state(route, config);
                return $stateProvider;
            };

            routes.forEach(function(route) {
            return setRoutes(route);
            });

            // $urlRouterProvider
            //     .when('/', '/dashboard')
            //     .otherwise('/dashboard');

            $urlRouterProvider
                .when('/', '/dashboard')
                .when('/signup', '/account/signup')
                .otherwise('/home');


            $stateProvider.state('dashboard', {
                url: '/dashboard',
                templateUrl: 'app/dashboard/dashboard.html'
            });

            $stateProvider.state('home', {
                url: '/home',
                templateUrl: 'app/landing/home.html'
            });

            $stateProvider.state('membership', {
                url: '/membership',
                templateUrl: 'app/landing/membership.html'
            });


       


            //$locationProvider.html5Mode(true);

        }]
    );

})(); 
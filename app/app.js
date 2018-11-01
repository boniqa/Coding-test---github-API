var gitApp = angular.module( 'gitApp', ['ngRoute']);

gitApp.config(function ($routeProvider){
    $routeProvider
      .when('/profile',
                {
                    controller: 'gitHubController',
                    templateUrl: 'templates/profile.html'
                })
                .when('/release/:name',
                {
                  controller: 'ReleaseController',
                  templateUrl: 'templates/release.html'
                })
                .when('/commits/:name',
                {
                  controller: 'CommitController',
                  templateUrl: 'templates/commits.html'
                })
                .otherwise({redirectTo: '/profile'});
});

// gitApp.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider) {
//
//   $urlRouterProvider.otherwise('/');
//
//     $stateProvider
//     .state('profile', {
//       url: '/profile',
//       controller: 'gitHubController',
//       templateUrl: 'templates/profile.html'
//
//     })
//     .state('otherwise', {
//       url: '/profile',
//       templateUrl: 'templates/profile.html',
//       controller: 'gitHubController'
//
//     });
// }]);

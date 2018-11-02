var gitApp = angular.module( 'gitApp', ['ui.router', 'ngAnimate', 'ngTable']);

gitApp.service('SpinnerService', ['$rootScope', function($rootScope) {
  function showSpinner($rootScope){
    console.log('here');
    $('.loading').show();
  };
  function hideSpinner($rootScope){
    console.log('now here');
    $('.loading').hide();
  };

  var count = 0;
  return {
    transitionStart: function() { if (++count > 0) showSpinner(); },
    transitionEnd: function() { if (--count <= 0) hideSpinner(); },
  }
}]);

gitApp.run(function($transitions) {

  $transitions.onStart({ }, function(trans) {
    var SpinnerService = trans.injector().get('SpinnerService');
    SpinnerService.transitionStart();
    trans.promise.finally(SpinnerService.transitionEnd);
  });
})

// gitApp.run(run);
// run.$inject = ['$rootScope'];
// function run ($rootScope) {
//   $rootScope.spinner = {active: true};
// }





// gitApp.run(['$rootScope' , function($rootScope){
//   $rootScope.$on('$viewContentLoading', function(e, toState, toParams, fromState, fromParams, options){
//     // console.log('in $stateChangeStart');
//     // if( toState.resolve){
//       $rootScope.isLoading = true;
//     // }
//   });
//
//   $rootScope.$on('$viewContentLoaded', function(e, toState, toParams, fromState, fromParams){
//     // console.log('in $stateChangeSuccess');
//     // if( toState.resolve){
//       $rootScope.isLoading = false;
//     // }
//   });
// }]);
// gitApp.config(function ($routeProvider){
//     $routeProvider
//       .when('/profile',
//                 {
//                     controller: 'gitHubController',
//                     templateUrl: 'templates/profile.html'
//                 })
//                 .when('/release/:name',
//                 {
//                   controller: 'ReleaseController',
//                   templateUrl: 'templates/release.html'
//                 })
//                 .when('/commits/:name',
//                 {
//                   controller: 'CommitController',
//                   templateUrl: 'templates/commits.html'
//                 })
//                 .otherwise({redirectTo: '/profile'});
// });

gitApp.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('home', {
      url: '/',
      controller: 'gitHubController',
      templateUrl: 'templates/home.html',
      resolve: {
              result: ['RepoService', function(RepoService){
                return RepoService.getRepos();
              }],
              info: ['RepoService', function(RepoService){
                return RepoService.getInfo();
              }]
       }
     })
     .state('release', {
       url: '/release/:name',
       controller: 'ReleaseController',
       templateUrl: 'templates/release.html',
       resolve: {
         result: ['RepoService', '$stateParams', function(RepoService, $stateParams){
           var name = $stateParams.name;
           return RepoService.getReposReleases(name);
         }]
       }

     })
     .state('commits', {
       url: '/commits/:name',
       controller: 'CommitController',
       templateUrl: 'templates/commits.html',
       resolve: {
         result: ['RepoService', '$stateParams', function(RepoService, $stateParams){
           var name = $stateParams.name;
           return RepoService.getReposCommits(name);
         }]
       }

     });
  }]);

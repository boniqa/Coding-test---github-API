var gitApp = angular.module( 'gitApp', ['ui.router']);

gitApp.run(['$rootScope' , function($rootScope){
  $rootScope.on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams, options){
    console.log('in $stateChangeStart');
  });

  $rootScope.on('$stateChangeSuccess', function(e, toState, toParams, fromState, fromParams){
    console.log('in $stateChangeSuccess');
  });
}]);
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

gitApp.config(['$stateProvider', '$urlRouterProvider', 'RepoService', '$q', function ($stateProvider, $urlRouterProvider, RepoService, $q) {

  $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('home', {
      url: '/',
      controller: 'gitHubController',
      templateUrl: 'templates/home.html',
      resolve: {
        'allRepos' : function(){
          var theResolvePromise = $q.defer();
          theResolvePromise.resolve({
              repos: ['RepoService', function(RepoService){
                return RepoService.getRepos();
              }],
           });
           console.log(theResolvePromise.promise);
           return theResolvePromise.promise;
       }
     }
        // result: ['$q', '$stateParams', 'RepoService', function ($q, $stateParams, RepoService) {
        //                     console.log(RepoService.getRepos());
        //                     RepoService.getRepos()
        //                         .then(function (result) {
        //                             console.log(result);
        //                             // return result;
        //                         }).catch(function (result) {
        //                             var deferred = $q.defer();
        //                             if (result.status < 500) { deferred.resolve(result); } else { deferred.reject(result); }
        //                             // return deferred.promise;
        //                             console.log(deferred.promise);
        //                         });
        //               }],

    })
    // .state('release', {
    //   url: '/release/:name',
    //   controller: 'ReleaseController',
    //   templateUrl: 'templates/release.html',
    //   resolve: {
    //     result: function(RepoService, $stateParams){
    //       var name = $stateParams.name;
    //
    //       return RepoService.getReposReleases(name);
    //     }
    //   }
    //
    // })
    // .state('commits', {
    //   url: '/commits/:name',
    //   controller: 'CommitController',
    //   templateUrl: 'templates/commits.html',
    //   resolve: {
    //     result: function(RepoService, $stateParams){
    //       var name = $stateParams.name;
    //       return RepoService.getReposCommits(name);
    //     }
    //   }
    //
    // });
;

}]);

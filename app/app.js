angular.module( 'gitApp', ['ui.router', 'ngAnimate', 'ngTable']);


angular.module('gitApp').run(function($transitions) {

  $transitions.onStart({ }, function(trans) {
    var SpinnerService = trans.injector().get('SpinnerService');
    SpinnerService.transitionStart();
    trans.promise.finally(SpinnerService.transitionEnd);
  });
})


angular.module('gitApp').config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

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

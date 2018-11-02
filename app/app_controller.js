gitApp.controller('gitHubController', ['$scope', 'result', function( $scope, result ) {

  $scope.repoData = result;
  // init();
  //
  // function init(){
  //   RepoService.getInfo().then(function(data){
  //     $scope.userData = data;
  //     // console.log( $scope.userData);
  //   });
  //
  //   RepoService.getRepos().then(function(data){
  //     $scope.repoData = data;
  //   });
  //
  // }

}]);

gitApp.controller('ReleaseController', ['$scope', 'RepoService', '$stateParams', function ($scope, RepoService, $stateParams){
  $scope.releasesData = [];
  var repo_name = $stateParams.name;
  init();

  function init(){
    RepoService.getReposReleases(repo_name).then(function(data){
      $scope.releasesData = data;
      console.log($scope.releasesData);
      $scope.repo = repo_name;
    });
  }

}]);

gitApp.controller('CommitController', ['$scope', 'RepoService', '$stateParams', function ($scope, RepoService, $stateParams){
  $scope.commitsData = [];
  var repo_name = $stateParams.name;
  init();

  function init(){
    RepoService.getReposCommits(repo_name).then(function(data){
      $scope.commitsData = data;
      $scope.repo = repo_name;
      // console.log($scope.commitsData);
    });
  }

}]);

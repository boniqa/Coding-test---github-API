gitApp.controller('gitHubController', ['$scope', 'result', 'info', 'NgTableParams', '$filter',function( $scope, result, info, NgTableParams, $filter) {

  $scope.repoData = result;
  $scope.userData = info;
  $scope.repoTable = new NgTableParams({
    page: 1,
    count: $scope.repoData.length
}, {
    counts: [],
    total: 1,
    getData: function (params) {
        $scope.data = params.sorting() ? $filter('orderBy')($scope.repoData, params.orderBy()) : $scope.repoData;
        $scope.data = params.filter() ? $filter('filter')($scope.data, params.filter()) : $scope.data;
        // $scope.data = $scope.data.slice(0, 20);
        return $scope.data;
    }
});

$scope.getMoreData = function () {
    $scope.data = $scope.repoData.slice(0, $scope.data.length + 20);
};
  // $scope.repoTable = new ngTableParams({}, { dataset: $scope.repoData });
  // console.log($scope.repoTable);
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

gitApp.controller('ReleaseController', ['$scope', 'result', '$stateParams', 'NgTableParams', '$filter', function ($scope, result, $stateParams, NgTableParams, $filter){
  $scope.releasesData = result;
  $scope.repo_name = $stateParams.name;

  $scope.relTable = new NgTableParams({
    page: 1,
    count: $scope.releasesData.length
}, {
    counts: [],
    total: 1,
    getData: function (params) {
        $scope.data = params.sorting() ? $filter('orderBy')($scope.releasesData, params.orderBy()) : $scope.releasesData;
        $scope.data = params.filter() ? $filter('filter')($scope.data, params.filter()) : $scope.data;
        // $scope.data = $scope.data.slice(0, 20);
        return $scope.data;
    }
});

  // init();
  //
  // function init(){
  //   RepoService.getReposReleases(repo_name).then(function(data){
  //     $scope.releasesData = data;
  //     console.log($scope.releasesData);
  //     $scope.repo = repo_name;
  //   });
  // }

}]);

gitApp.controller('CommitController', ['$scope',  'result', '$stateParams', 'NgTableParams', '$filter', function ($scope,  result, $stateParams, NgTableParams, $filter){
  $scope.commitsData = result;
  $scope.repo_name = $stateParams.name;

  $scope.comTable = new NgTableParams({
    page: 1,
    count: $scope.commitsData.length
}, {
    counts: [],
    total: 1,
    getData: function (params) {
        $scope.data = params.sorting() ? $filter('orderBy')($scope.commitsData, params.orderBy()) : $scope.commitsData;
        $scope.data = params.filter() ? $filter('filter')($scope.data, params.filter()) : $scope.data;
        // $scope.data = $scope.data.slice(0, 20);
        //  console.log($scope.data.commit);
        return $scope.data;
    }
});

  // init();
  //
  // function init(){
  //   RepoService.getReposCommits(repo_name).then(function(data){
  //     $scope.commitsData = data;
  //     $scope.repo = repo_name;
  //     // console.log($scope.commitsData);
  //   });
  // }

}]);

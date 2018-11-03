gitApp.controller('gitHubController', ['$scope', 'result', 'info', 'NgTableParams', '$filter',function( $scope, result, info, NgTableParams, $filter) {

  $scope.repoData = result;
  $scope.userData = info;
  $scope.repoTable = new NgTableParams({
    page: 1,
    count: 10
}, {
    counts: [],
    total: $scope.repoData.length,
    getData: function (params) {
        data = params.sorting() ? $filter('orderBy')($scope.repoData, params.orderBy()) : $scope.repoData;
        data = params.filter() ? $filter('filter')(data, params.filter()) : data;
        return data.slice((params.page() - 1) * params.count(), params.page() * params.count());
    }
});

}]);

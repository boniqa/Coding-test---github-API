gitApp.controller('CommitController', ['$scope',  'result', '$stateParams', 'NgTableParams', '$filter', function ($scope,  result, $stateParams, NgTableParams, $filter){
  $scope.commitsData = result;
  $scope.repo_name = $stateParams.name;

  $scope.comTable = new NgTableParams({
    page: 1,
    count: 10
}, {
    counts: [],
    total: $scope.commitsData.length,
    getData: function (params) {
        data = params.sorting() ? $filter('orderBy')($scope.commitsData, params.orderBy()) : $scope.commitsData;
        data = params.filter() ? $filter('filter')(data, params.filter()) : data;
        return data.slice((params.page() - 1) * params.count(), params.page() * params.count());

    }
});
}]);

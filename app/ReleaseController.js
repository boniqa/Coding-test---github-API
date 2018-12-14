angular.module('gitApp').controller('ReleaseController', ['$scope', 'result', '$stateParams', 'NgTableParams', '$filter', function ($scope, result, $stateParams, NgTableParams, $filter){
  $scope.releasesData = result;
  $scope.repo_name = $stateParams.name;
  $scope.relTable = new NgTableParams({
    page: 1,
    count: 10
}, {
    counts: [],
    total: $scope.releasesData.length,
    getData: function (params) {
        data = params.sorting() ? $filter('orderBy')($scope.releasesData, params.orderBy()) : $scope.releasesData;
        data = params.filter() ? $filter('filter')(data, params.filter()) : data;
        return data.slice((params.page() - 1) * params.count(), params.page() * params.count());

    }
});
}]);

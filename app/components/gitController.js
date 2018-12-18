angular.module('gitApp').controller('gitHubController', ['$scope', '$uibModal','result', 'info', 'NgTableParams', '$filter',function( $scope, $uibModal, result, info, NgTableParams, $filter) {
    
    $scope.dynamicPopover = {
        content: 'Hello, World!',
        templateUrl: 'components/myPopoverTemplate.html',
        title: 'Title'
      };

    $scope.openModal = function(){
        $scope.items = ['item1', 'item2', 'item3'];
        $scope.animationsEnabled = true;
        var modalInstance = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'components/myModalTemplate.html',
            controller: 'modalController',
            size: 'sm',
            resolve: {
                items: function(){
                    return $scope.items;
                }              
            }
          });

        // modalInstance.result.then(function (selectedItem) {
        //     $scope.selected = selectedItem;
        //   }, function () {
            
        //   });
    };

    $scope.repoData = result;
    $scope.userData = info;
    $scope.repoTable = new NgTableParams({
    page: 1,
    count: 10
}, {
    counts: [],
    total: $scope.repoData.length,
    getData: function (params) {
        var data = params.sorting() ? $filter('orderBy')($scope.repoData, params.orderBy()) : $scope.repoData;
        data = params.filter() ? $filter('filter')(data, params.filter()) : data;
        return data.slice((params.page() - 1) * params.count(), params.page() * params.count());
    }
});



}])
.controller('modalController', ['items', '$uibModalInstance', '$scope', function( items, $uibModalInstance, $scope){
    
    $scope.test= 'hello test';
    $scope.items = items;
    $scope.selected = {
        item: $scope.items[0]
      };

      $scope.ok = function () {
        $uibModalInstance.close($scope.selected.item);
      };
    
      $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
      };
    
}]);

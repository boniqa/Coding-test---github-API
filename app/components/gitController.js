angular.module('gitApp').controller('gitHubController', ['$scope', '$uibModal','result', 'info', 'NgTableParams', '$filter','RepoService', function( $scope, $uibModal, result, info, NgTableParams, $filter, RepoService) {
    $scope.repoData = result;
    $scope.userData = info;

    $scope.items = ['item1', 'item2', 'item3'];

    $scope.dynamicPopover = {
        content: 'Hello, World!',
        templateUrl: 'components/myPopoverTemplate.html',
        title1: 'New Title',
        title2: 'New Title'
      };


    $scope.refresh = function(){
        RepoService.getRepos().then(function(result){
            $scope.repoData = result;
        }).catch(function(err){
            console.error('Error while fetching repos', err);            
        });
    };

    $scope.openModal = function(repo){        
        
        $scope.animationsEnabled = true;
        var modalInstance = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'components/myModalTemplate.html',
            controller: 'modalController',
            size: 'lg',
            resolve: {
                repo: function(){
                    return repo;
                }         
            }
          });

        // modalInstance.result.then(function (selectedItem) {
        //     $scope.selected = selectedItem;
        //   }, function () {
            
        //   });
    };

   
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
.controller('modalController', ['repo', '$uibModalInstance', '$scope', function( repo, $uibModalInstance, $scope){
    $scope.repo = repo;

      $scope.ok = function () {
        $uibModalInstance.close();
      };

}]);

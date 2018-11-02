gitApp.factory('RepoService', ['$http', '$q', function($http, $q){

  var factory = {};
  // factory.getInfo= function(){
  //   return $http.get("https://api.github.com/orgs/comapi")
  //             .then(
  //                     function(response){
  //                         return response.data;
  //                     },
  //                     function(errResponse){
  //                         console.error('Error while fetching info');
  //                         return $q.reject(errResponse);
  //                     }
  //             );
  // };

  factory.getRepos= function() {
    return $http.get("https://api.github.com/orgs/comapi/repos")
              .then(
                      function(response){
                          return response.data;
                      },
                      function(errResponse){
                          console.error('Error while fetching repos');
                          return $q.reject(errResponse);
                      }
              );
  };

  factory.getReposCommits= function(repo_name) {
    return $http.get("https://api.github.com/repos/comapi/" + repo_name + "/commits")
              .then(
                      function(response){
                          return response.data;
                      },
                      function(errResponse){
                          console.error('Error while fetching commits');
                          return $q.reject(errResponse);
                      }
              );
  };


  factory.getReposReleases= function(repo_name) {
    return $http.get("https://api.github.com/repos/comapi/" + repo_name + "/releases")
              .then(
                      function(response){
                          return response.data;
                      },
                      function(errResponse){
                          console.error('Error while fetching releases');
                          return $q.reject(errResponse);
                      }
              );
  };

  return factory;

}]);

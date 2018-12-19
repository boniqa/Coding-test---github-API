var customNgTable = customNgTableProvider();
describe('app git controller test', function(){
    beforeEach(angular.mock.module('ui.router'));
    beforeEach(module(function ($urlRouterProvider) {
        $urlRouterProvider.deferIntercept();
    }));
    beforeEach(function(){
        var self = this;

        module('gitApp');
        module('ui.router');
        module('ngAnimate');
        module('ngTable');

        this.$uibModal = {
            open: function(){

            }
        };

        this.RepoService = {
            getRepos: function(){
                return [];
            }
        }

        inject(function (_$rootScope_, _$controller_, _$filter_, _$q_) {
            var self = this;
            this.$rootScope = _$rootScope_;
            var $controller = _$controller_;
            this.$filter = _$filter_;
            this.$scope = this.$rootScope.$new();
            this.$q = _$q_;

            this.gitHubController = $controller('gitHubController',
                {
                    $scope: this.$scope,
                    info: 'info',
                    result: ['Franek'],
                    NgTableParams: customNgTable.provider(),
                    $filter: this.$filter,
                    $uibModal: this.$uibModal,
                    RepoService: this.RepoService

                });

        });

    });

    it('should initialise correctly', function(done){

        expect(this.$scope.repoData).toEqual(['Franek']);
        expect(this.$scope.userData).toBe('info');

        done();
    });
     

    it("should check ngTable getData", function(done){
		this.$scope.repoData = [{
			repo: {
				name: "full-name"
			}
		},{
			repo: {
				name: "some"
			}
		},{
			repo: {
				name: "name"
			}
		}];

		expect(customNgTable.getData().length).toBe(3);
		done();
	});

    it(" should check if opening modal is workig", function(){

        var resolveResults = { };

        spyOn(this.$uibModal, "open" ).and.callFake( function(data){ 
        //    expect(data.resolve.repo()).toBe('text');
            for( var key in data.resolve){
                resolveResults[key] =  data.resolve[key]() ;
            }
        });

        this.$scope.openModal("text");

        expect(this.$uibModal.open).toHaveBeenCalled();
        expect(resolveResults.repo).toBe('text');


    });

    it("should react to refresh button", function(done){
        var self = this;

        spyOn(self.RepoService, "getRepos").and.callFake(function(){
            return self.$q.resolve([]);
        });

        this.$scope.refresh();
        this.$rootScope.$apply();
        expect(this.$scope.repoData).toEqual([]);
        done();

    });
});
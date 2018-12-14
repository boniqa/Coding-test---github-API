var customNgTable = customNgTableProvider();
describe('app git controller test', function(){

    beforeEach(function(){
        var self = this;

        module('gitApp');
        module('ui.router');
        module('ngAnimate');
        module('ngTable');


        inject(function (_$rootScope_, _$controller_, _$filter_) {
            var self = this;
            this.$rootScope = _$rootScope_;
            var $controller = _$controller_;
            this.$filter = _$filter_;
            this.$scope = this.$rootScope.$new();

            this.gitHubController = $controller('gitHubController',
                {
                    $scope: this.$scope,
                    info: 'info',
                    result: ['Franek'],
                    NgTableParams: customNgTable.provider(),
                    $filter: this.$filter,

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

});
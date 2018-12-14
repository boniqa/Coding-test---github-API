var customNgTable = customNgTableProvider();
describe('app commits controller test', function(){

    beforeEach(function(){
        var self = this;

        module('gitApp');
        module('ui.router');
        module('ngAnimate');
        module('ngTable');

        // $scope,  result, $stateParams, NgTableParams, $filter

        this.$stateParams = {
            name: "comapi-quickstarts"
        };


        inject(function (_$rootScope_, _$controller_, _$filter_) {
            var self = this;
            this.$rootScope = _$rootScope_;
            var $controller = _$controller_;
            this.$filter = _$filter_;
            this.$scope = this.$rootScope.$new();

            this.CommitController = $controller('CommitController',
                {
                    $scope: this.$scope,
                    $stateParams: this.$stateParams,
                    result: ['Franek'],
                    NgTableParams: customNgTable.provider(),
                    $filter: this.$filter,

                });

        });

    });

    it('should initialise correctly', function(done){

        expect(this.$scope.commitsData).toEqual(['Franek']);
        expect(this.$scope.repo_name).toBe('comapi-quickstarts');
        done();
    });
     

    it("should check ngTable getData", function(done){
		this.$scope.commitsData = [{
			commit: {
				name: "full-name"
			}
		},{
			commit: {
				name: "some"
			}
		},{
			commit: {
				name: "name"
			}
		}];

		expect(customNgTable.getData().length).toBe(3);
		done();
	});

});
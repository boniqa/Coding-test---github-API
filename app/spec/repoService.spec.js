describe('app service test', function(){

    beforeEach(angular.mock.module('ui.router'));

    beforeEach(module(function ($urlRouterProvider) {
            $urlRouterProvider.deferIntercept();
    }));

    beforeEach(function(done){
        var self = this;


        module('gitApp');
        // module('ui.router');
        module('ngAnimate');
        module('ngTable');


        inject(function (_$httpBackend_, _RepoService_ ) {
			self.$httpBackend = _$httpBackend_;
            self.RepoService = _RepoService_;
        });

        done();

    });

    it('should get an api info from services', function (done) {

		// Which HTTP requests do we expect to occur, and how do we respond?
        this.$httpBackend.expectGET("https://api.github.com/orgs/comapi")
			.respond(function (method, url, data, headers) {
				return [200, {
                    "id": "23361707",
                    "name":"comapi",
                    "description":"Helping businesses conquer mobile first messaging",
                    "created_at":"2016-11-09T15:29:41Z",
                    "updated_at":"2018-08-08T23:04:30Z"
                }];
			});

        this.RepoService.getInfo()
        .then(function(RepoData){

            expect(RepoData.id).toBe("23361707");
            expect(RepoData.name).toBe("comapi");
            expect(RepoData.description).toBe("Helping businesses conquer mobile first messaging");

            done();
        });

		this.$httpBackend.flush();

    });

    it('should return error if api info doesnt exist', function (done) {

		// Dummy responses for the auth requests
        this.$httpBackend.expectGET("https://api.github.com/orgs/comapi")
			.respond(function (method, pushUrl, data, headers) {
				return [404, /*body*/{}, /*headers*/{}, 'Not found'];
			});

        this.RepoService.getInfo()
            .catch(function(error){
            expect(error.status).toBe(404);
            done();
        });

		this.$httpBackend.flush();

    });


    it('should get repos data from service', function (done) {

		// Which HTTP requests do we expect to occur, and how do we respond?
        this.$httpBackend.expectGET("https://api.github.com/orgs/comapi/repos")
			.respond(function (method, url, data, headers) {
				return [200, {
                    "id": "73819524",
                    "name":"comapi-quickstarts",
                    "full_name":"comapi/comapi-quickstarts"
                }];
			});

        this.RepoService.getRepos()
        .then(function(RepoData){

            expect(RepoData.id).toBe("73819524");
            expect(RepoData.name).toBe("comapi-quickstarts");
            expect(RepoData.full_name).toBe("comapi/comapi-quickstarts");

            done();
        });

		this.$httpBackend.flush();

    });

    it('should return error if repos dont exist', function (done) {

		// Dummy responses for the auth requests
        this.$httpBackend.expectGET("https://api.github.com/orgs/comapi/repos")
			.respond(function (method, pushUrl, data, headers) {
				return [404, /*body*/{}, /*headers*/{}, 'Not found'];
			});

        this.RepoService.getRepos()
            .catch(function(error){
            expect(error.status).toBe(404);
            done();
        });

		this.$httpBackend.flush();

    });

    it('should get commits data from service', function (done) {
        var repo_name = 'comapi-quickstarts';
		// Which HTTP requests do we expect to occur, and how do we respond?
        this.$httpBackend.expectGET("https://api.github.com/repos/comapi/" + repo_name + "/commits")
			.respond(function (method, url, data, headers) {
				return [200, {
                    "message": "Update dependencies to latest",
                    "author":{
                        "name":"Dave Baddeley"
                    }
                }];
			});

        this.RepoService.getReposCommits(repo_name)
        .then(function(RepoData){

            expect(RepoData.message).toBe("Update dependencies to latest");
            expect(RepoData.author.name).toBe("Dave Baddeley"); 

            done();

        });

		this.$httpBackend.flush();

    });

    it('should return error if commits dont exist', function (done) {
        var repo_name = 'comapi-quickstarts';
		// Dummy responses for the auth requests
        this.$httpBackend.expectGET("https://api.github.com/repos/comapi/" + repo_name + "/commits")
			.respond(function (method, pushUrl, data, headers) {
				return [404, /*body*/{}, /*headers*/{}, 'Not found'];
			});

        this.RepoService.getReposCommits(repo_name)
            .catch(function(error){
            expect(error.status).toBe(404);
            done();
        });

		this.$httpBackend.flush();

    });


    it('should get releases data from service', function (done) {
        var repo_name = 'comapi-sdk-js';
		// Which HTTP requests do we expect to occur, and how do we respond?
        this.$httpBackend.expectGET("https://api.github.com/repos/comapi/" + repo_name + "/releases")
			.respond(function (method, url, data, headers) {
				return [200, {
                    "id": "13219673",
                    "name":"1.1.3 Release"
                    
                }];
			});

        this.RepoService.getReposReleases(repo_name)
        .then(function(RepoData){

            expect(RepoData.id).toBe("13219673");
            expect(RepoData.name).toBe("1.1.3 Release"); 

            done();

        });

		this.$httpBackend.flush();

    });

    it('should return error if releases dont exist', function (done) {
        var repo_name = 'comapi-sdk-js';
		// Dummy responses for the auth requests
        this.$httpBackend.expectGET("https://api.github.com/repos/comapi/" + repo_name + "/releases")
			.respond(function (method, pushUrl, data, headers) {
				return [404, /*body*/{}, /*headers*/{}, 'Not found'];
			});

        this.RepoService.getReposReleases(repo_name)
            .catch(function(error){
            expect(error.status).toBe(404);
            done();
        });

		this.$httpBackend.flush();

    });



    });
  
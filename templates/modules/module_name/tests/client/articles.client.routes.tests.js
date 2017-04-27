(function () {
  'use strict';

  describe('module_name Route Tests', function () {
    // Initialize global variables
    var $scope,
      module_nameService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _module_nameService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      module_nameService = _module_nameService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('module_name');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/module_name');
        });

        it('Should be abstract', function () {
          expect(mainstate.abstract).toBe(true);
        });

        it('Should have template', function () {
          expect(mainstate.template).toBe('<ui-view/>');
        });
      });

      describe('List Route', function () {
        var liststate;
        beforeEach(inject(function ($state) {
          liststate = $state.get('module_name.list');
        }));

        it('Should have the correct URL', function () {
          expect(liststate.url).toEqual('');
        });

        it('Should not be abstract', function () {
          expect(liststate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(liststate.templateUrl).toBe('/modules/module_name/client/views/list-module_name.client.view.html');
        });
      });

      describe('View Route', function () {
        var viewstate,
          module_nameController,
          mockArticle;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('module_name.view');
          $templateCache.put('/modules/module_name/client/views/view-article.client.view.html', '');

          // create mock article
          mockArticle = new module_nameService({
            _id: '525a8422f6d0f87f0e407a33',
            title: 'An Article about MEAN',
            content: 'MEAN rocks!'
          });

          // Initialize Controller
          module_nameController = $controller('module_nameController as vm', {
            $scope: $scope,
            articleResolve: mockArticle
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:articleId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.articleResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            articleId: 1
          })).toEqual('/module_name/1');
        }));

        it('should attach an article to the controller scope', function () {
          expect($scope.vm.article._id).toBe(mockArticle._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('/modules/module_name/client/views/view-article.client.view.html');
        });
      });

      describe('Handle Trailing Slash', function () {
        beforeEach(inject(function ($state, $rootScope, $templateCache) {
          $templateCache.put('/modules/module_name/client/views/list-module_name.client.view.html', '');

          $state.go('module_name.list');
          $rootScope.$digest();
        }));

        it('Should remove trailing slash', inject(function ($state, $location, $rootScope) {
          $location.path('module_name/');
          $rootScope.$digest();

          expect($location.path()).toBe('/module_name');
          expect($state.current.templateUrl).toBe('/modules/module_name/client/views/list-module_name.client.view.html');
        }));
      });
    });
  });
}());

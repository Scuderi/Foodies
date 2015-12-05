'use strict';

describe('Controller: FromcontrollerCtrl', function () {

  // load the controller's module
  beforeEach(module('recipiesTestApp'));

  var FromcontrollerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FromcontrollerCtrl = $controller('FromcontrollerCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(FromcontrollerCtrl.awesomeThings.length).toBe(3);
  });
});

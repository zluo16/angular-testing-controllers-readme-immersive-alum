describe('MainController', function() {
  beforeEach(module('app'))

  var $controller

  beforeEach(inject(function(_$controller_){
    $controller = _$controller_
  }))

  it("should have Steve Job's name", function() {
    let $scope = {}

    let controller = $controller('MainController', { $scope: $scope })
    expect(controller.name).toEqual('Steve Jobs')
  })
});

describe('Basic Functionality', function() {
  it('should add two numbers', function() {
    expect(addNumbers(1, 3)).toBe(4)
    expect(addNumbers(343, 9283)).toBe(9626)
    expect(addNumbers(1223, 21)).toBe(1244)
    expect(addNumbers(10, 653)).toBe(663)
    expect(addNumbers('99', 1)).toBe(100)
    expect(addNumbers('23', '59')).toBe(82)
  })
})

function MainController() {
    this.name = 'Steve Jobs';
}

function addNumbers(first, second) {
  return parseFloat(first, 10) + parseFloat(second, 10)
}

angular
    .module('app')
    .controller('MainController', MainController);

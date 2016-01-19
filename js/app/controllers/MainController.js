function MainController() {
    this.name = 'Bill Gates';
}

angular
    .module('app')
    .controller('MainController', MainController);
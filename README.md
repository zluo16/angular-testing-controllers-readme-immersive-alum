# Testing Controllers

## Overview

Controllers are extremely powerful, but so is testing our controllers. Imagine if you could make changes to your code in confidence that you wouldn't break any existing functionality - oh wait, we can! (As long as we test.)

## Objectives

- Describe Test Driven Development (TDD)
- Install Jasmine and Karma
- Describe what ngMock is
- Install and inject ngMock
- Write a unit test for a Controller

## Test Driven Development (TDD)

If you haven't done any testing before, your normal coding cycle would be churning out code like there's no tomorrow. However, with Test Driven Development (TDD), you've guessed it - every part of the development we do is driven by tests.

Instead of writing code, fixing bugs, writing more code, blah blah, we start off by writing a unit test. This test will initially fail, as we haven't written any code.

Let's create a function that adds two values together. Instead of going straight into the deep end and writing the function, we write the test first:

```js
describe('Basic Functionality', function () {
  it('should add two numbers', function () {
    expect(addNumbers(1, 3)).toBe(4);
  });
});
```

What's this crazy syntax? When we run our tests, we use syntax that is provided to us by a framework called Jasmine. Jasmine gives us a set of predefined functions (such as `it`, `expect`, etc) that allow us to describe, quite simply, what we want the test to achieve.

Above, we're telling our test runner that in our `Basic Functionality` block, we have a test that expects our number adding function to output `4` when we add `1` and `3` together.

The test will then run, notice we haven't *actually* defined our number adding function, and fail. Right. Let's create the number adding function then!

```js
function addNumbers(numberOne, numberTwo) {
}
```

Great - now we're getting started. Let's run our test again - doh! Failed. We haven't actually done any logic, so the function still won't output `4`, which is what our test is looking for.

Simple - let's just return `4`! Then it passes all of our tests!

```js
function addNumbers(numberOne, numberTwo) {
  return 4;
}
```

Perfect, our tests now pass. Wait! Hold on a minute - when we try and use that function with any other numbers, we're going to always get `4` back! 

How can we test for this? Test it again! Realistically, our tests should always test our functions with many different parameters, expecting correct answers from our functions. That way, if we have a test adding `1` and `3` (to equal `4`), and also adding `50` and `24329` (to equal `24379`), we can, with some confidence, know that our number adding function actually works as we expect.

Let's modify our first test:

```js
describe('Basic Functionality', function () {
  it('should add two numbers', function () {
    expect(addNumbers(1, 3)).toBe(4);
    expect(addNumbers(343, 9283)).toBe(9626);
    expect(addNumbers(1223, 21)).toBe(1244);
    expect(addNumbers(10, 653)).toBe(663);
  });
});
```

Okay, now we've got multiple test cases, let's run our tests again. As expected, our first one passed (as our number adding function is only returning `4`), but the others have failed. Now we need to head back to our number adder and actually implement it correctly.

```js
function addNumbers(numberOne, numberTwo) {
  return numberOne + numberTwo;
}
```

We run our tests again and they all pass - happy days! The code goes into production, but two days later we receive a bug report saying that when people are adding `2` and `2` together, they get `22` instead of `4`. Oh no, what could've gone wrong?

Our function doesn't support strings! In JavaScript, if we were to do `"2" + 2`, we'd get `22` as the result because the `+` operator adds two strings together, as well as actually doing addition between two numbers.

Let's head back to our tests, and add some use-cases for when the function gets called with parameters that don't match what it expects.

```js
describe('Basic Functionality', function () {
  it('should add two numbers', function () {
    expect(addNumbers(1, 3)).toBe(4);
    expect(addNumbers(343, 9283)).toBe(9626);
    expect(addNumbers(1223, 21)).toBe(1244);
    expect(addNumbers(10, 653)).toBe(663);
    expect(addNumbers('99', 1)).toBe(100);
    expect(addNumbers('23', '59')).toBe(82);
  });
});
```

If we run our tests again, they will fail (as we expect). Now, we can head back to our code and make amendments to handle these use cases.
 
```js
function addNumbers(numberOne, numberTwo) {
  return parseFloat(numberOne, 10) + parseFloat(numberTwo, 10);
}
```

Brilliant. Our tests run and pass and we have a well coded, tested piece of code. We can then make changes to this code further, running our tests against it along the way, ensuring no previous expected functionality has been broken.

## Jasmine and Karma

To do TDD, we need to install Jasmine and Karma. Clone this repo completely.

Open your terminal, and run

```bash
sudo npm install -g karma-cli
```

This will install the Karma command line interface tool, so we can run tests using `karma`.

We also need a copy of Karma for our project, as well as Jasmine too.

Karma command line interface starts up the karma server for us, and the local copy for our project allows us to access the API's that karma offers.

```bash
npm install karma --save-dev
npm install jasmine-core --save-dev
npm install karma-spec-reporter --save-dev
npm install karma-jasmine --save-dev
npm install karma-chrome-launcher --save-dev
```

Sorted! Run `karma start` on your command line to see it run (and pass!) our basic test (expecting `'foo'` to equal `'foo'`).

## ngMock - ngWhat?

When we test our code, we need to be able to get deep inside it and see what everything is doing. However, in normal day-to-day coding, we cannot do that - that's where ngMock saves the day.

ngMock is a module that Angular provides us to embed into our tests in order to inject and mock our controllers, directives etc into our tests. ngMock also extends some core services that Angular provides, in order for us to inspect them and control them differently to how they would run in the browser.

To embed this into our tests, all we need to do is tell karma to include it when we specify what files we'd like to test. Take a look at `karma.conf.js` inside this repo - we've done that for you.

## Writing our own unit test

This is where all of the above come in. In this repo (that you should've already cloned!), we've got an example controller called `MainController` inside `js/app/controllers`. We've also got an example test at `tests/MainController.spec.js`. Let's modify this test to inject our example controller.

Let's change the `describe` block to match our controller's name. This way, when we look at the results in the console, we can tell what is actually being tested. (Change "example test" to MainController).

Now, we need to know what app we're using before each test, much like us using `ng-app` in our HTML. To do this, we use `ngMock`'s `module` function.

We can do this like so:

```js
describe('MainController', function() {
  beforeEach(module('app'));
});
```

This tells Jasmine to use the `app` module for every test for our `MainController`.

Now, we need to inject the controller service given to us by `ngMock`. This allows us to call a function with the name of the controller we'd like, as well as specify a custom `$scope` object for the controller to play with.

```js
describe('MainController', function() {
  beforeEach(module('app'));

  var $controller;

  beforeEach(inject(function(_$controller_){
    $controller = _$controller_;
  }));
});
```

Now, inside each of our tests (the `it` should blocks), we can call the `$controller` function, asking for it to return `MainController`.

Let's create a test to check if the name is set correctly inside the controller.

```js
describe('MainController', function() {
  beforeEach(module('app'));

  var $controller;

  beforeEach(inject(function(_$controller_){
    $controller = _$controller_;
  }));

  it('should have Steve Jobs name', function() {
    var $scope = {};

    var controller = $controller('MainController', { $scope: $scope });
    expect(controller.name).toEqual('Steve Jobs');
  });
});
```

If we run `karma start` now, you'll notice our test fails. Go into the `MainController.js` file inside `js/app/controllers` and see if you can figure out why, and see if you can get our unit test to pass!

You'll notice we pass through our own $scope - this is to allow us to read what `$scope` would be equal to inside the controller. If our controller adjusts `$scope`, we can test the properties on our own `$scope` inside our tests.
<p class='util--hide'>View <a href='https://learn.co/lessons/angular-testing-controllers-readme'>Testing Controllers </a> on Learn.co and start learning to code for free.</p>

'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
    'ngSanitize',
    'colorpicker.module',
    'JsonPrettyPrint',
    'jsonFormatter',
    'flow',
    'ui.bootstrap',
    'ui.bootstrap.datetimepicker',
    'myApp.view1',
    'myApp.view2',
    'myApp.version',
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/view1'});
}]);

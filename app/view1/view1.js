'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', function($scope) {

        $scope.passbook = {};
        //$scope.passstyle = 'boardingPass';
        $scope.passbook.formatVersion = 1;

        /*
        $scope.passbook.foregroundColor = 'rgb(105,51,51)';
        $scope.passbook.backgroundColor = 'rgb(51,102,105)';
        $scope.passbook.labelColor = 'rgb(51,102,105)';
        $scope.passbook.serialNumber = '123456';
        */

        $scope.passbook.barcode = {};
        $scope.passbook.barcode.format = 'PKBarcodeFormatQR';
        $scope.images = ['logo', 'icon', 'thumbnail', 'footer', 'background', 'strip'];

        $scope.open = {
            expirationDate: false,
            relevantDate: false,
            date3: false,
            date4: false,
            date5: false,
            date6: false
        };

        //

        //$scope.passbook.beacons = [];
        //$scope.passbook.locations = [];



        $scope.$watch('passbook.barcode.message', function (newValue) {
            $scope.passbook.barcode.altText = newValue;
        });

        $scope.$watch('passstyle', function (newValue, oldValue) {
            //$scope.passbook = ({newValue: {}});
            if (newValue !== undefined && newValue !== oldValue) {
                $scope.passbook[newValue] = {};
                $scope.passbook[newValue].primaryFields = [];
                //$scope.passbook.primaryFields.push({});

                $scope.passbook[newValue].secondaryFields = [];
                //$scope.passbook.secondaryFields.push({});

                $scope.passbook[newValue].auxiliaryFields = [];
                //$scope.passbook.auxiliaryFields.push({});//.;

                if (oldValue !== undefined) {
                    delete $scope.passbook[oldValue];
                }
            }


        });

        $scope.getLocations = function() {
            if ($scope.passbook.locations === undefined) {
                return null;
            } else {

                return $scope.passbook.locations;
            }
        }


        $scope.getPrimaryFields = function() {
            if ($scope.passbook[$scope.passstyle]) {
                return $scope.passbook[$scope.passstyle].primaryFields
            } else {
                return null;
            }
        };

        $scope.getSecondaryFields = function() {
            if ($scope.passbook[$scope.passstyle]) {
                return $scope.passbook[$scope.passstyle].secondaryFields
            } else {
                return null;
            }
        };

        $scope.getAuxiliaryFields = function() {
            if ($scope.passbook[$scope.passstyle]) {
                return $scope.passbook[$scope.passstyle].auxiliaryFields
            } else {
                return null;
            }
        };

        $scope.getPKPassJson = function(val) {
            //console.log("passbook " + JSON.stringify(val));
            return JSON.stringify(val);
        };

        $scope.addField = function(fieldArray, valueName) {
            if (fieldArray === null || fieldArray === undefined) {
                $scope.passbook[valueName] = [];
                fieldArray = $scope.passbook[valueName];
            }
            fieldArray.push({});
        }

        $scope.deleteField = function(fieldArray, item, valueName) {
            var index = fieldArray.indexOf(item);
            fieldArray.splice(index, 1);
            if (fieldArray.length <= 0) {
                console.log("array empty");
                //delete fieldArray;
                if (valueName !== undefined) {
                    delete $scope.passbook[valueName];
                }
            }
        }

        $scope.openCalendar = function(e, date) {
            e.preventDefault();
            e.stopPropagation();

            $scope.open[date] = true;
        };


}])
    .directive('pkFieldDirectory', function() {
        return {
            restrict: 'E',
            scope: {
                field: '=',
                fieldArray: '=',
                index: '='
            },
            controller: 'View1Ctrl',
            templateUrl: 'view1/pk-field-directory.html'
        };
    });
;
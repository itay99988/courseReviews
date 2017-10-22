'use strict';

// Declare app level module which depends on views, and components
let app = angular.module('myApp', [
  'ngRoute',
  'ui.bootstrap',
  'myApp.version'
]).
  config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');
  }])
  .controller('searchController', ['$scope', '$http', '$window', '$modal', function ($scope, $http, $window, $modal) {
    $http({
      method: "GET",
      url: "courses"
    }).then(function success(response) {
      $scope.courses = response.data;
    }, function myError(response) {
      console.log(response.statusText);
    });

    $scope.loadModalForm = function (course) {
      $scope.currentCourse = course;
      $modal.open({
        templateUrl: 'coursemodal.html',
        controller: 'modalController',
        scope: $scope
      })
        .result.then(function () {
          // console.log('closed');
        }, function () {
          // console.log('canceled');
        });
    }
  }])
  .controller('modalController', ['$scope', '$modalInstance', function ($scope, $modalInstance) {
    $scope.closeModal = function () {
      $modalInstance.close();
    }
  }]);


app.filter('searchFilter', function () {
  return function (arr, searchString, filtersOn, side, exam) {
    //process filters
    let courseSide = "";
    let courseExam = "";
    if (filtersOn) {
      if (side)
        courseSide = "West";
      else
        courseSide = "East";

      if (exam)
        courseExam = "Assignment";
      else
        courseExam = "Exam";
    }
    //filters off and no searchword
    if ((!searchString || searchString == "") && !filtersOn) {
      return arr;
    }
    //filters on and no searchword
    if ((!searchString || searchString == "") && filtersOn) {
      var result = [];
      angular.forEach(arr, function (el) {
        if (el.side.indexOf(courseSide) != -1 && el.exam.indexOf(courseExam) != -1) {
          result.push(el);
        }
      });
      console.log(result);
      return result;
    }
    //there is a searchword
    var result = [];
    angular.forEach(arr, function (el) {
      if ((el.cname.toLowerCase().indexOf(searchString) != -1 || el.fac.toLowerCase().indexOf(searchString) != -1) && el.side.indexOf(courseSide) != -1 && el.exam.indexOf(courseExam) != -1) {
        result.push(el);
      }
    });
    return result;
  };
});
'use strict';

var myapp = angular.module('myapp', ["highcharts-ng"]);

myapp.controller('myctrl', function ($scope, $timeout) {
  $scope.interval = 1000;
  $scope.showJSON = true;
  $scope.prettyJSON = true;

  $scope.chartTypes = [
    {"id": "line", "title": "Line"},
    {"id": "spline", "title": "Smooth line"},
    {"id": "area", "title": "Area"},
    {"id": "areaspline", "title": "Smooth area"},
    {"id": "column", "title": "Column"},
    {"id": "bar", "title": "Bar"},
    {"id": "pie", "title": "Pie"},
    {"id": "scatter", "title": "Scatter"}
  ];

  $scope.dashStyles = [
    {"id": "Solid", "title": "Solid"},
    {"id": "ShortDash", "title": "ShortDash"},
    {"id": "ShortDot", "title": "ShortDot"},
    {"id": "ShortDashDot", "title": "ShortDashDot"},
    {"id": "ShortDashDotDot", "title": "ShortDashDotDot"},
    {"id": "Dot", "title": "Dot"},
    {"id": "Dash", "title": "Dash"},
    {"id": "LongDash", "title": "LongDash"},
    {"id": "DashDot", "title": "DashDot"},
    {"id": "LongDashDot", "title": "LongDashDot"},
    {"id": "LongDashDotDot", "title": "LongDashDotDot"}
  ];

  $scope.chartSeries = [
    {"name": "Some data", "data": [1, 2, 4, 7, 3]},
    {"name": "Some data 3", "data": [3, 1, null, 5, 2], connectNulls: true},
    {"name": "Some data 2", "data": [5, 2, 2, 3, 5], type: "column"},
    {"name": "My Super Column", "data": [1, 1, 2, 3, 2], type: "column"}
  ];

  $scope.chartStack = [
    {"id": '', "title": "No"},
    {"id": "normal", "title": "Normal"},
    {"id": "percent", "title": "Percent"}
  ];

  // adds the data points [1,10,20] to a randomly selected series
  $scope.addPoints = function () {
    var seriesArray = $scope.chartConfig.series;
    var rndIdx = Math.floor(Math.random() * seriesArray.length);
    seriesArray[rndIdx].data = seriesArray[rndIdx].data.concat([1, 10, 20])
  };

  // adds random data points to all series
  $scope.addPointsToAll = function () {
    var seriesArr = $scope.chartConfig.series;
    var length = seriesArr.length;
    for(var i=0; i<length; i++)
    {
      var rand1 = Math.floor(Math.random() * 20);
      var rand2 = Math.floor(Math.random() * 20);
      var rand3 = Math.floor(Math.random() * 20);
      seriesArr[i].data = seriesArr[i].data.concat([rand1, rand2, rand3]);
    }
    $timeout($scope.addPointsToAll, $scope.interval);
  };

  $scope.start = function () {
    $timeout($scope.addPointsToAll, $scope.interval);
  }

  $scope.stop = function () {
    
  }

  // we can push an array of data to the series array
  // without giving it any other properties and it will generate
  $scope.addSeries = function () {
    var rnd = [];
    for (var i = 0; i < 10; i++) {
      rnd.push(Math.floor(Math.random() * 20) + 1)
    }
    $scope.chartConfig.series.push({
      data: rnd
    })
  }

  $scope.removeRandomSeries = function () {
    var seriesArray = $scope.chartConfig.series;
    var rndIdx = Math.floor(Math.random() * seriesArray.length);
    seriesArray.splice(rndIdx, 1)
  }

  $scope.removeSeries = function (id) {
    var seriesArray = $scope.chartConfig.series;
    seriesArray.splice(id, 1)
  }

  $scope.toggleHighCharts = function () {
    this.chartConfig.useHighStocks = !this.chartConfig.useHighStocks
  }

  $scope.replaceAllSeries = function () {
    var data = [
      { name: "first", data: [10] },
      { name: "second", data: [3] },
      { name: "third", data: [13] }
    ];
    $scope.chartConfig.series = data;
  };

  $scope.chartConfig = {
    options: {
      chart: {
        type: 'areaspline'
      },
      plotOptions: {
        series: {
          stacking: ''
        }
      }
    },
    series: $scope.chartSeries,
    title: {
      text: 'Helloo'
    },
    credits: {
      enabled: false
    },
    loading: false,
    size: {
      width: 700,
      height: 380
    }
  }

  $scope.reflow = function () {
    $scope.$broadcast('highchartsng.reflow');
  };

  $scope.increaseSpeed = function() {
    if($scope.interval === 1000) {
      $scope.interval = 200;
    } else if ($scope.interval === 200) {
      $scope.interval = 100;
    }
  }

  $scope.decreaseSpeed = function() {
    if($scope.interval === 100) {
      $scope.interval = 200;
      } else if ($scope.interval === 200) {
          $scope.interval = 1000;
      }
  }


});
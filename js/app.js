'use strict';

var myapp = angular.module('myapp', ["highcharts-ng", "ngAnimate"]);

myapp.controller('myctrl', function ($scope, $timeout) {
  $scope.interval = 1000;
  $scope.showJSON = false;
  $scope.prettyJSON = true;
  $scope.chartList = [];
  $scope.chartSeries =[];
  $scope.numCharts= 0;  // keep track of how many charts (for ID)
  $scope.optionsHover = false;
  $scope.optionsShow = false;

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
    {"name": "Some data", "data": [1, 2, 4, 7, 9]},
    {"name": "Some data 3", "data": [3, 4, null, 5, 11], connectNulls: true},
    {"name": "Some data 2", "data": [1, 2, 3, 5], type: "column"},
    {"name": "My Super Column", "data": [1, 1, 2, 8, 9], type: "column"},
    // we can omit the type and let highcharts interpret it
    {"name": "My Super Column", "data": [[1,4], [2,3], [3,4], null, [4,2], [5,3]]}
  ];

  $scope.chartStack = [
    {"id": '', "title": "No"},
    {"id": "normal", "title": "Normal"},
    {"id": "percent", "title": "Percent"}
  ];

  $scope.colors = ['#7cb5ec', '#434348', '#90ed7d', '#f7a35c', '#8085e9', '#f15c80', '#e4d354', '#8085e8', '#8d4653', '#91e8e1'];

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
    var index = parseInt(Math.random() * $scope.colors.length);
    var newColor = $scope.colors[index];
    $scope.chartConfig.series.push({
      color: newColor,
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

  var seriesClick = function(seriesObj,event) {
    alert(seriesObj.name + ' clicked\n' +
                      'Alt: ' + event.altKey + '\n' +
                      'Control: ' + event.ctrlKey + '\n' +
                      'Shift: ' + event.shiftKey + '\n');
    console.log(event);
    // we have many things we can look at when a series is clicked such as:
    // 
  }

  $scope.chartConfig = {
    options: {
      chart: {
        type: 'line',
        animation: false,
        reflow: true
      },
      plotOptions: {
        series: {
          cursor: 'pointer',
          events: {
            click: function (event) {
              var seriesObj = this;
              seriesClick(seriesObj,event);
            }
          }
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
      //width: 700,
      //height: 380
    }
  }

  $scope.reflow = function () {
    console.log("reflow() called");
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
angular.module('MyApp',['ngMaterial', 'ngMessages', 'material.svgAssetsCache'])

.controller("bookCtrl",function($scope,$http) {
    $scope.$watch('search', function() {
    fetch();
    });

    $scope.search = "harry potter";

    function fetch() {
    $http.get("https://www.googleapis.com/books/v1/volumes?q=" + $scope.search).then(function(res) {
  		console.log(res.data);
      $scope.relatedBooks = res.data.items;
      $scope.bookInfo = res.data.items[0].volumeInfo;
      $scope.saleInfo = res.data.items[0].saleInfo;
      $scope.related = res.data;
    });


  }
    $scope.update = function(book) {
      $scope.search = book.volumeInfo.title;
    };
	})


//AppCtrl
.controller('AppCtrl', function($scope, $mdDialog) {
  $scope.status = '  ';
  $scope.customFullscreen = false;
  $scope.showTabDialog = function(ev) {
    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'tabDialog.tmpl.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true
    })
  };
  function DialogController($scope, $mdDialog) {
    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.answer = function(answer) {
      $mdDialog.hide(answer);
    };
  }
});

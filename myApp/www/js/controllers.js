angular.module('starter.controllers', [])
/*通用控制器*/
  .controller('homepageCtrl', function($scope,$state) {
    $scope.gotoCargo = function (params) {
     $state.go('oilshipcheck');
    }
    $scope.gotoDangerousGoods = function (params) {
     $state.go('dangerousgoods');
    }
  })

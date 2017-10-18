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

  .controller('loginPageCtrl', function($scope,$state,$http,$q,$rootScope) {
     $scope.loginData = {
       "account":"",
       "password":""
     }
     $scope.doLogin = function () {
       if($scope.loginData.account==""||$scope.loginData.password=="")
         alert("账号和密码都不能为空！");
       else{
         var defer = $q.defer();
         $http({
           method: 'get',
           url: './templates/LoginInfo.json'
         }).success(function (data) {
           $scope.result = jsonsql.query("select * from json.members where (account=='"+$scope.loginData.account+"')",data);
           if($scope.result==null||$scope.result==''){
             alert("用户不存在！");
           }else if($scope.result[0].password==$scope.loginData.password){
             $rootScope.account=$scope.result[0].password;
             $state.go('homepage');
           }else{
             alert("密码错误！");
           }
         }).error(function (data) {
           defer.reject(data);
         })
       }
     }
  })
  .controller('changePwdCtrl', function($scope,$state,$rootScope,$q,$http,$rootScope) {
     $scope.user={
       "pwd1":"",
       "pwd2":""
     }
     console.log($rootScope.account);
     $scope.changePwd = function () {
       if($scope.user.pwd1==""||$scope.user.pwd2=="") alert("输入框不能为空！");
       if($scope.user.pwd1!=$scope.user.pwd2){
         alert("两次密码不一致");
       }else{
        /* var defer = $q.defer();
         $http({
           method: 'get',
           url: './templates/LoginInfo.json'
         }).success(function (data) {
          // $scope.result = jsonsql.query("select * from json.members where (account=='"+$scope.loginData.account+"')",data);
          for(var key in data.members){
            if(data.members[key].account==$rootScope.account){
              data.members[key].password = $scope.user.pwd1;
            }

          }
         }).error(function (data) {
           defer.reject(data);
         })*/
         $http({
           method: 'POST',
           url: './templates/LoginInfo.json',
           params:{
             'require': data
           }

         }).success(function(data,status,headers,config){

         }).error(function(data,status,headers,config){

         });
       }
     }
  })

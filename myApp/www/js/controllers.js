angular.module('starter.controllers', [])
/*通用控制器*/
  .controller('homepageCtrl', function($scope,$state,$rootScope,logoutService) {
    $scope.gotoCargo = function (params) {
     $state.go('oilshipcheck');
    }
    $scope.gotoDangerousGoods = function (params) {
     $state.go('dangerousgoods');
    }
    //弹出确认框
    $scope.showConfirm = function(){
      logoutService.logout();
    }
  })

  .controller('loginPageCtrl', function($scope,$state,$http,$q,$rootScope,locals) {

    if(locals.get("isPassword")=="false"){
      var bool_pwd = false;
    }else{
      var bool_pwd = true;
    }
    if(locals.get("account")==""||locals.get("account")==undefined){
      $scope.loginData = {
        account:"",
        password:"",
        checked: bool_pwd
      }
    }else {
      $scope.loginData = {
        account:locals.get("account"),
        password:locals.get("password"),
        checked: bool_pwd
      }
    }



    $scope.doLogin = function () {
    console.log($scope.loginData.checked);
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
            //密码正确
          }else if($scope.result[0].password==$scope.loginData.password){
          //设置全局变量
            $rootScope.username = $scope.result[0].user;
            //设置缓存
            locals.set("username",$scope.result[0].user);
            locals.set("account",$scope.result[0].account);
            locals.set("password",$scope.result[0].password);
            locals.set("isPassword",$scope.loginData.checked);
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

  /*修改密码的功能目前暂不能实现*/
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

  //ng-repeat去除重复
  .filter('unique', function () {
    return function (collection, keyname) {
      var output = [],
        keys = [];
      angular.forEach(collection, function (item) {
        var key = item[keyname];
        if (keys.indexOf(key) === -1) {
          keys.push(key);
          output.push(item);
        }
      });
      return output;
    };
  });

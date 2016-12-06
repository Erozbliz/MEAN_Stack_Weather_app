var myApp = angular.module('myApp');

myApp.controller('UsersController', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams){
	console.log('UsersController loaded...');

	$scope.getUsers = function(){
		$http.get('/api/users').success(function(response){
			console.log(response);
			$scope.users = response;
		});
	}

	$scope.getUser = function(){
		var id = $routeParams.id;
		$http.get('/api/users/'+id).success(function(response){
			$scope.user = response;
		});
	}

	$scope.addUser = function(){
		console.log($scope.user);
		$http.post('/api/users/', $scope.user).success(function(response){
			window.location.href='#/users';
		});
	}

	$scope.updateUser = function(){
		console.log('updateUser');
		var id = $routeParams.id;
		$http.put('/api/users/'+id, $scope.user).success(function(response){
			window.location.href='#/users';
		});
	}

	$scope.removeUser = function(id){
		$http.delete('/api/users/'+id).success(function(response){
			window.location.href='#/users';
		});
	}

	//Obtenir la météo d'une seule ville
	 $scope.getWeather = function() {
      $http.get('http://api.openweathermap.org/data/2.5/weather?q=Sherbrooke&APPID=83512f0ca80b87807f61db32870c85d7&units=metric')
        .success(function(data) {
          console.log(data);
          $scope.name = data.name;
          $scope.main = data.main;
          $scope.wind = data.wind;
          $scope.clouds = data.clouds;
        })
        .error(function(data) {
          console.log('error: ' + data);
        });

    };

    $scope.getAllWeather = function() {
    	listCity = ['Quebec', "Montreal"];
		alldataweather = [];
		for (i = 0; i < listCity.length; i++) {
		    $http.get('http://api.openweathermap.org/data/2.5/weather?q='+listCity[i]+'&APPID=83512f0ca80b87807f61db32870c85d7&units=metric')
	        .success(function(data) {
	          //console.log(data);
	          alldataweather.push(data);
	        })
	        .error(function(data) {
	          console.log('error: ' + data);
	        });
		}
		//ajout dans le scope
	 	$scope.alldataweathers = alldataweather;
		//console.log(alldataweather);
    };


    $scope.search = function() {
    	var myCity = angular.copy($scope.searchCity);
        console.log('search ' + myCity);
        $http.get('http://api.openweathermap.org/data/2.5/weather?q='+myCity+'&APPID=83512f0ca80b87807f61db32870c85d7&units=metric')
        .success(function(data) {
          console.log(data);
          $scope.name = data.name;
          $scope.main = data.main;
          $scope.wind = data.wind;
          $scope.clouds = data.clouds;
        })
        .error(function(data) {
          console.log('error: ' + data);
        });
    };


    $scope.loginUser = function(){
		var id = angular.copy($scope.myid);
		var loginName = "";
		var request = $http.get('/api/users/'+id)
		.success(function(response){
			loginName = response.name;
			console.log(loginName);
		})
        .error(function(response) {
          console.log('error: ' + response);
        });
        request.on('error', function(err) {
		   console.log('errerrerr');
		});
		request.end();
	}

	
}]);
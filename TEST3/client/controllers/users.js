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
			console.log("Inscription de");
			console.log(response);
			sessionStorage.setItem("_id_session",response._id); //On sauvegarde
			sessionStorage.setItem("name_session",response.name); //On sauvegarde
			sessionStorage.setItem("fav_session",response.fav); //On sauvegarde
			window.location.href='#/users';
		});
	}

	$scope.loginUser = function(){
		var id = angular.copy($scope.myid);
		console.log($scope.user);
		$http.get('/api/users/'+id)
		.success(function(response){
			loginId = response._id;
			if(loginId==id){
				console.log("ok "+loginId);
				sessionStorage.setItem("_id_session",response._id); //On sauvegarde
				sessionStorage.setItem("name_session",response.name); //On sauvegarde
				sessionStorage.setItem("fav_session",response.fav); //On sauvegarde
				boleanvar=true;
				//alert("redirect");
	    		window.location.href='#/users';
			}else{
				console.log(response);

			}
		})
	    .error(function(response) {
	      console.log('error: ' + response);
	    });


	}

	$scope.updateUser = function(){
		console.log('updateUse++++r');
		var id = $routeParams.id;
		sessionStorage.clear();
		$http.put('/api/users/'+id, $scope.user).success(function(response){

			sessionStorage.setItem("_id_session",response._id); //On sauvegarde
			sessionStorage.setItem("name_session",response.name); //On sauvegarde
			sessionStorage.setItem("fav_session",response.fav); //On sauvegarde
			sessionStorage.setItem("lol","3333lol"); //On sauvegarde

			alert(response.fav);
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
    	var mystr = sessionStorage.getItem("fav_session");
    	var arrayListCity = [];
    	if(mystr!=null){
    		 arrayListCity = mystr.split(':::');

    	}else{
    		arrayListCity =listCity;
    	}
		alldataweather = [];
		for (i = 0; i < arrayListCity.length; i++) {
		    $http.get('http://api.openweathermap.org/data/2.5/weather?q='+arrayListCity[i]+'&APPID=83512f0ca80b87807f61db32870c85d7&units=metric')
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


    function parseFav(strFav){

    }




	
}]);
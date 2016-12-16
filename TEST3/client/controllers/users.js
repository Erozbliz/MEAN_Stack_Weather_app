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
			localStorage.setItem("_id_session",response._id); //On sauvegarde
			localStorage.setItem("name_session",response.name); //On sauvegarde
			localStorage.setItem("fav_session",response.fav); //On sauvegarde
			window.location.href='#/users';
		});
	}

	$scope.loginUser = function(){
		var id = angular.copy($scope.myid);
		if(id!=null){
			console.log($scope.user);
			$http.get('/api/users/'+id)
			.success(function(response){
				loginId = response._id;
				if(loginId==id){
					console.log("ok "+loginId);
					localStorage.setItem("_id_session",response._id); //On sauvegarde
					localStorage.setItem("name_session",response.name); //On sauvegarde
					localStorage.setItem("fav_session",response.fav); //On sauvegarde
					boleanvar=true;
					//alert("redirect");
		    		window.location.href='#/users';
				}else{
					console.log("erreur id"+response);
					$(".erreur").text("Erreur id introuvable");
				}
			})
		    .error(function(response) {
		      console.log('error: ' + response);
		    });
		}else{
			$(".erreur").text("Erreur id vide");
		}

	}

	$scope.updateUser = function(){
		//console.log('updateUser');
		var id = $routeParams.id;
		localStorage.clear();
		$http.put('/api/users/'+id, $scope.user).success(function(response){

			localStorage.setItem("_id_session",response._id); //On sauvegarde
			localStorage.setItem("name_session",$scope.user.name); //On sauvegarde
			localStorage.setItem("fav_session",$scope.user.fav); //On sauvegarde

			//alert(response.fav);
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
          $scope.weather = data.weather[0];
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
    	//listCity = ['Quebec', "Montreal"];
    	var mystr = localStorage.getItem("fav_session");
    	var arrayListCity = [];
    	var alldataweather = [];
    	

    	if(mystr!=null){
    		 arrayListCity = mystr.split(',');

    	}else{
    		arrayListCity = null;
    	}

    	//si il existe bien des fav
    	if(arrayListCity!=null){
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
    	}
		

		
    };

    //Bouton Afficher météo
    $scope.search = function() {
    	var myCity = angular.copy($scope.searchCity);
    	var lat = "55.5";
    	var lon = "-55.5";
    	var map;
        console.log('search ' + myCity);
        $http.get('http://api.openweathermap.org/data/2.5/weather?q='+myCity+'&APPID=83512f0ca80b87807f61db32870c85d7&units=metric')
        .success(function(data) {
          console.log(data);
          $scope.weather = data.weather[0];
          $scope.name = data.name;
          $scope.main = data.main;
          $scope.wind = data.wind;
          $scope.clouds = data.clouds;
          lon=data.coord.lon;
          console.log("long search "+data.coord.lon);
	      lat=data.coord.lat;

	      	//MAPBOX API
			mapboxgl.accessToken = 'pk.eyJ1IjoiZXJvemJsaXoiLCJhIjoiZ1NRZ3E3VSJ9.eNN6tS7Qhbke9Moz0IkrfA';
		   	map = new mapboxgl.Map({
		        container: 'map',
		        style: 'mapbox://styles/mapbox/streets-v9',
		        center: [lon, lat], // starting position
		        zoom: 11 // starting zoom
		    });

		   	//GENERATION DU GRAPHIQUE type 1
		    printGraphTemp(1,0,0,myCity);
        })
        .error(function(data) {
          console.log('error: ' + data);
        });
    };

    //api.openweathermap.org/data/2.5/weather?lat=35&lon=139&APPID=83512f0ca80b87807f61db32870c85d7&units=metric
    $scope.myPositionGps = function() {

    	var lat = "55.5";
    	var lon = "-55.5";
    	var msg = "";
    	var options = {
		  enableHighAccuracy: true,
		  timeout: 10000,
		  maximumAge: 0
		};

    	if (navigator.geolocation) {
	        navigator.geolocation.getCurrentPosition(
	        function(position) {
			  //do_something(position.coords.latitude, position.coords.longitude);
			  		lat = position.coords.latitude;
			  		lon = position.coords.longitude;
				  	console.log("lat:"+lat +" long:"+lon);
				  	//Genere la carte en fonction de la latitude et longitude
				  	mapBoxGenerate(lat, lon);
				  	//GENERATION DU GRAPHIQUE type 0
		    		printGraphTemp(0,lat,lon,"");
				}, 
				error, 
				options
			);
	    } else { 
	        msg = "Geolocation is not supported by this browser.";
	        alert(msg);
	        console.log(msg);
	    }

    	
    };

    //Genere la carte en fonction de la latitude et longitude
    function mapBoxGenerate(lat, lon){
    	var map;
    	console.log("lat:"+lat +" long:"+lon);
        $http.get('http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&APPID=83512f0ca80b87807f61db32870c85d7&units=metric')
        .success(function(data) {
          console.log(data);
          $scope.weather = data.weather[0];
          $scope.name = data.name;
          $scope.main = data.main;
          $scope.wind = data.wind;
          $scope.clouds = data.clouds;

	      	//MAPBOX API
			mapboxgl.accessToken = 'pk.eyJ1IjoiZXJvemJsaXoiLCJhIjoiZ1NRZ3E3VSJ9.eNN6tS7Qhbke9Moz0IkrfA';
		   	map = new mapboxgl.Map({
		        container: 'map',
		        style: 'mapbox://styles/mapbox/streets-v9',
		        center: [lon, lat], // starting position
		        zoom: 14 // starting zoom
		    });
        })
        .error(function(data) {
          console.log('error: ' + data);
        });

    }

    //Si il ya des erreur avec le gps
	function error(err) {
		alert(err.message);
	  console.warn('ERROR(' + err.code + '): ' + err.message);
	};


	//Test pour graph pas utilsé
	$scope.graphTemp = function() {
    	var myCity = angular.copy($scope.searchCity);
        console.log('search ' + myCity);
        $http.get('http://api.openweathermap.org/data/2.5/forecast?q='+myCity+'&APPID=83512f0ca80b87807f61db32870c85d7&units=metric')
        .success(function(data) {
          console.log(data);
		   	//exemple pour une température //data.list[1].dt_txt
		    var temp1 = data.list[0].main.temp;
		    var day = data.list[0].dt_txt;
		    var daySm = day.slice(0,-9);
		
		    //data pour le graphiques
		    $ladata = [              
						{ label: "00:00",  y: data.list[0].main.temp  },
						{ label: "03:00", y: data.list[1].main.temp  },
						{ label: "06:00", y: data.list[2].main.temp  },
						{ label: "09:00",  y: data.list[3].main.temp  },
						{ label: "12:00",  y: data.list[4].main.temp  },
						{ label: "15:00",  y: data.list[5].main.temp  },
						{ label: "18:00",  y: data.list[6].main.temp  },
						{ label: "21:00",  y: data.list[7].main.temp  },
						{ label: "24:00",  y: data.list[8].main.temp  }
					];
		 //chart
		 $scope.chart = new CanvasJS.Chart("chartContainerJs", 
         {
            title:{
            text: "Température "+daySm +""
            },
             data: [
            {
              type: "line",
              dataPoints: $ladata
            }
            ]
          });
           $scope.chart.render();
        })
        .error(function(data) {
          console.log('error: ' + data);
        });
    };


    //Génere un graphique en fonction si type 0 alors url avec latitude et longitude sinon url avec le nom de la ville
    function printGraphTemp(type, lat, long, ville){
    	var typeUrl = "";
    	if(type==0){
    		console.log('TYPE 0 LAT ' + lat+' LONG '+long);
    		typeUrl = 'http://api.openweathermap.org/data/2.5/forecast?lat='+lat+'&lon='+long+'&APPID=83512f0ca80b87807f61db32870c85d7&units=metric';
    	}else{
    		console.log('TYPE 1 VILLE ' + ville);
    		typeUrl = 'http://api.openweathermap.org/data/2.5/forecast?q='+ville+'&APPID=83512f0ca80b87807f61db32870c85d7&units=metric';
    	}

        $http.get(typeUrl)
        .success(function(data) {
          console.log(data);
		   	//exemple pour une température //data.list[1].dt_txt
		    var temp1 = data.list[0].main.temp;
		    var day = data.list[0].dt_txt;
		    var daySm = day.slice(0,-9);
		
		    //data pour le graphiques
		    $ladata = [              
						{ label: "00:00",  y: data.list[0].main.temp  },
						{ label: "03:00", y: data.list[1].main.temp  },
						{ label: "06:00", y: data.list[2].main.temp  },
						{ label: "09:00",  y: data.list[3].main.temp  },
						{ label: "12:00",  y: data.list[4].main.temp  },
						{ label: "15:00",  y: data.list[5].main.temp  },
						{ label: "18:00",  y: data.list[6].main.temp  },
						{ label: "21:00",  y: data.list[7].main.temp  },
						{ label: "24:00",  y: data.list[8].main.temp  }
					];
		 //chart
		 $scope.chart = new CanvasJS.Chart("chartContainerJs", 
         {
            title:{
            text: "Température "+daySm +""
            },
             data: [
            {
              type: "line",
              dataPoints: $ladata
            }
            ]
          });
           $scope.chart.render();
        })
        .error(function(data) {
          console.log('error: ' + data);
        });
    }







   

    $scope.myUserSession = localStorage.getItem("name_session");
    $scope.myIdSession = localStorage.getItem("_id_session");

	
}]);



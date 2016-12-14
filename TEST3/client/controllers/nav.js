var myApp = angular.module('myApp');

//Controlleur pour la barre de navigation
myApp.controller('NavController', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams){
	console.log('NavController loaded...');




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

	//change la nav bar si l'utilisateur est connecté
	$scope.isLogged = function(){
		var _id_session = localStorage.getItem("_id_session");
		var name_session = localStorage.getItem("name_session");
		if(_id_session==null){
			//pas de var de session
			//console.log('false');
			$scope._id_session = "vide";
			return false;
		}else{
			//console.log('true');
			$scope._id_session = _id_session;
			return true;
		}
	}


	$scope.logOut = function() {
    	localStorage.clear();
    	//window.location.href='#/users';
    }


     //On utilise l'id pour savoir si les favoris n'ont pas changé
    $scope.refreshSession = function() {
    	console.log(' refreshSession ');
    	var id = localStorage.getItem("_id_session");
		var loginName = "";
		var request = $http.get('/api/users/'+id)
		.success(function(response){
			loginName = response.name;
			localStorage.setItem("_id_session",response._id); //On sauvegarde
			localStorage.setItem("name_session",response.name); //On sauvegarde
			localStorage.setItem("fav_session",response.fav); //On sauvegarde
			console.log(loginName);
		})
	    .error(function(response) {
	      console.log('error refreshSession: ' + response);
	    });
    }

  




  /*	$scope.myVar = false;

    $scope.$watch('myVar', function() {
        //alert('hey, myVar has changed!');
    });

    $scope.buttonClicked = function() {
        $scope.myVar = isLogged; // This will trigger $watch expression to kick in
    };
*/
	
}]);



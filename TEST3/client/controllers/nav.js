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
		var _id_session = sessionStorage.getItem("_id_session");
		var name_session = sessionStorage.getItem("name_session");
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
    	sessionStorage.clear();
    	//window.location.href='#/users';
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
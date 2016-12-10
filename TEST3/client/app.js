var myApp = angular.module('myApp',['ngRoute']);



myApp.config(function($routeProvider){
	$routeProvider.when('/', {
		controller:'UsersController',
		templateUrl: 'views/users.html'
	})
	.when('/#', {
		controller:'BooksController',
		templateUrl: 'views/users.html'
	})
	.when('/books', {
		controller:'BooksController',
		templateUrl: 'views/books.html'
	})
	.when('/books/details/:id',{
		controller:'BooksController',
		templateUrl: 'views/book_details.html'
	})
	.when('/books/add',{
		controller:'BooksController',
		templateUrl: 'views/add_book.html'
	})
	.when('/books/edit/:id',{
		controller:'BooksController',
		templateUrl: 'views/edit_book.html'
	})
	.when('/users', {
		controller:'UsersController',
		templateUrl: 'views/users.html'
	})
	.when('/users/details/:id',{
		controller:'UsersController',
		templateUrl: 'views/user_details.html'
	})
	.when('/users/add',{
		controller:'UsersController',
		templateUrl: 'views/add_user.html'
	})
	.when('/users/edit/:id',{
		controller:'UsersController',
		templateUrl: 'views/edit_user.html'
	})
	.when('/users/login',{
		controller:'UsersController',
		templateUrl: 'views/login_user.html'
	})
	.otherwise({
		redirectTo: '/'
	});
});

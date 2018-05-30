// Declare myApp as angular module. ALWAYS TAKE NOTE OF SEMICOLNS(;)
var myApp = angular.module('myApp', ['angularUtils.directives.dirPagination', 'ui.bootstrap']);


// Creating a Angular Controller
myApp.controller('LoginCtrl', function LoginCtrl($scope, $http, $window, $location) {


	$scope.clearForm = function() {
		$scope.email = ""; //change to email if no username in fvcking database
		$scope.password = "";
	}

	
	$scope.logIn = function () {

		var userData = {
			'email'			: $scope.email,
			'password'   	: $scope.password
		}

		
		$http.post('models/Login/login-accounts.php', userData)
		.then(response => {
			
			var utype = response.data;
			utype = utype.substr(1, 1);
			if (utype == "0") {
				$window.location.href = 'accounts.php';
			} else if(utype == "1") {
				$window.location.href = 'agriculturist.php'; // lagay mo dito yung sa agriculturist for the mean time kasi tang ina ang hirap gumawa ng mobile app.
			} else {
				swal("Sorry!", "Invalid Email or password", "error")
			}

			
		}).catch(error => {
			swal("Sorry!", error, "error")
			console.log(error);
		})

	}
			
});

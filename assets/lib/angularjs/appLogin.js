var myApp = angular.module('rpApp', ['angularUtils.directives.dirPagination', 'toaster', 'ngAnimate']);


myApp.directive('fileInput', function($parse) {
	return {
		link: function($scope, element, attrs) {
			element.on("change", function(event) {
				var files = event.target.files;
				$parse(attrs.fileInput).assign($scope, element[0].files);
				$scope.$apply();
			})
		}
	}
});



myApp.controller('LoginCtrl', function LoginCtrl($scope, $http, $location, $window, toaster) {

	


	$scope.logIn = function() {
		var loginData = {
			'email'					: $scope.email,
			'password'			: $scope.password,
		}
		$http.post(base_url + 'Login/loginAuth', loginData)
		.then(response => {
			swal({
			  title: "Thank You!",
			  text: "Your account has been created.",
			  type: "success",
			  timer: 1500,
			  showConfirmButton: false
			});	
			
			
		}).catch(error => {
			swal("Sorry!", error, "error")
			console.log(error);
		})
	}


	$scope.c_signup = function() {	
		var deptData = {
			'firstname'				: $scope.firstname,
			'lastname'				: $scope.lastname,
			'email'						: $scope.email,
			'country'					: $scope.country
		}
		$http.post(base_url + 'Main/c_signup', deptData)
		.then(response => {
			swal({
			  title: "Thank You!",
			  text: "Your account has been created.",
			  type: "success",
			  timer: 1500,
			  showConfirmButton: false
			});	
			
			
		}).catch(error => {
			swal("Sorry!", error, "error")
			console.log(error);
		})
	}


	$scope.c_joinus = function() {

		var cit = JSON.stringify($scope.cit_selected);
		var sub = JSON.stringify($scope.selected);
		var deptData = {
			'firstname'					: $scope.firstname,
			'lastname'					: $scope.lastname,
			'email'							: $scope.email,
			'mobile'						: $scope.mobile,
			'sex'								: $scope.sex,
			'address'						: $scope.address,
			'city'						  : $scope.city,
			'state'							: $scope.state,
			'zipcode'						: $scope.zipcode,
			'country'						: $scope.country,
			'language'					: $scope.language,
			'citation'					: cit,
			'highesteducation'	: $scope.highesteducation,
			'subjectarea'				: sub,
			'description'				: $scope.description
		}
		$http.post(base_url + 'Main/c_joinus', deptData)
		.then(response => {
			swal({
			  title: "Thank You!",
			  text: "Your account has been created.",
			  type: "success",
			  timer: 1500,
			  showConfirmButton: false
			});	
			
			
		}).catch(error => {
			swal("Sorry!", error, "error")
			console.log(error);
		})
	}
});






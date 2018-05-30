(function () {
	'use strict';

	angular
		.module('myApp', ['angularUtils.directives.dirPagination'])
		.controller('DataCollectionCtrl', DataCollectionCtrl)
		.directive('repeatDone', function() {
			return function(scope, element, attrs) {
				if(scope.$last) {
					scope.$eval(attrs.repeatDone);
				}
			}
		});


	function DataCollectionCtrl($scope, $http) {

		$scope.clearForm = function() {
			$scope.firstname = "";
			$scope.lastname = "";
			$scope.job = "";
			$scope.city = "";
			$scope.location = "";
			$scope.email = "";
			$scope.mobile = "";
		}

		$scope.getList = function() {
			$scope.company = [];
			$http.get(base_url + 'Company/getList')
				.then(function (response) {
					$scope.company = response.data;
				}, function(error) {
					alert(error);
				});
		}

		$scope.getList();

		$scope.getData = function() {
			$scope.datacollection = [];
			$http.get(base_url + 'DataCollection/getData/62a984d52f')
				.then(function (response) {
					$scope.datacollection = response.data;
				}, function(error) {
					alert(error);
				});
		}

		$scope.getList();
		$scope.insertData = function () {
			
			var userData = {
				'firstname': $scope.firstname,
				'lastname' : $scope.lastname,
				'job' 	   : $scope.job,
				'city' 	   : $scope.city,
				'location' : $scope.location,
				'email'    : $scope.email,
				'mobile'   : $scope.mobile,
				'companyid': '0912378'
			}
			$http.post(base_url + 'User/addUser', userData).then(response => {
				$scope.clearForm();
				swal({
				  title: "Thank You!",
				  text: "for sharing your information.",
				  type: "success",
				  timer: 2000,
				  showConfirmButton: false
				});
				
			}).catch(error => {
				swal("Sorry!", "An error has occured. Check console.", "error")
				console.log(error);
			})

			

		}

		$scope.command = function() {

			$http.post(base_url + 'User/addUser', {
				'firstname': $scope.firstname,
				'lastname' : $scope.lastname,
				'job' 	   : $scope.job,
				'city' 	   : $scope.city,
				'location' : $scope.location,
				'email'    : $scope.email,
				'mobile'   : $scope.mobile,
				'companyid': '0912378'
			}).then(function () {
				//Materialize.toast('record successfully saved!', 3000, 'light-blue');
				$scope.clearForm();
				$("#messageForm").modal("open")
			});
			
		}
		/*

		$scope.getData = function(user_id, fullname, username, acct_type) {
			$scope.user_id = user_id;
      $scope.fullname = fullname;
      $scope.username = username;
      $scope.acct_type = acct_type;
      $scope.action = "update";

		}

		$scope.deleteData = function(user_id) {
			if(confirm("Are you sure you want to delete this record?")) {
				$http.post("index.php/Accounts/deactivate", {'user_id': user_id})
				.then(function() {
					Materialize.toast('user deactivated!', 3000, 'red');
					$scope.clearForm();
					$scope.getList();
				})
				.error(function() {
					console.log("Error");
				})
			} else {
				return false;
			}
		}*/

	}
	

})();











		



var myApp = angular.module('myApp', ['angularUtils.directives.dirPagination']);

myApp.controller('CompanyCtrl', function CompanyCtrl($scope, $http) {

		$scope.initModals = function() {
			$('.modal-trigger').leanModal();
		}
		

		$scope.clearForm = function() {
			$scope.companyid = "";
			$scope.companyname = "";
			$scope.description = "";
			$scope.address ="";
			$scope.mobile ="";
			$scope.logo ="";
			$scope.action = "submit"
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
			$scope.company = [];
			$http.get(base_url + 'Company/getData')
				.then(function (response) {
					$scope.company = response.data;
				}, function(error) {
					alert(error);
				});
		}

		$scope.getList();

		$scope.command = function() {

			$http.post(base_url + 'Company/command', {
				'action' 			: $scope.action,
				'companyid' 	: $scope.companyid,
				'companyname' : $scope.companyname,
				'description' : $scope.description,
				'address' 		: $scope.address,
				'mobile' 			: $scope.mobile,
				'username' 		: $scope.username,
				'password' 		: $scope.password
			}).then(function () {
				//Materialize.toast('record successfully saved!', 3000, 'light-blue');
				$scope.clearForm();
				$("#companyForm").modal("toggle")
				$scope.getList();
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

	});
	










		


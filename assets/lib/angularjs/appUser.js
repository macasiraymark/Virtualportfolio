var myApp = angular.module('myApp', ['angularUtils.directives.dirPagination']);


myApp.service('CommonProp', ['$location', function($location) {

  return {
    getCompany: function() {
      companyid = localStorage.getItem("companyid");
      return companyid;
    },
    setCompany: function(value) {
      localStorage.setItem("companyid", value);
      companyid = value;
    },
    remCompany: function() {
    	localStorage.clear();
    },
    logoutUser: function() {
      auth.$signOut();
      console.log("Logged Out Successfully");
      email = "";
      localStorage.removeItem('userEmail');
      $location.path('/home');
    }
  }
}]);

myApp.controller('AccountsCtrl', function AccountsCtrl($scope, $http, $location, CommonProp) {

	$scope.clearForm = function() {
		$scope.fullname = "";
		$scope.username = "";
		$scope.getAccountsList();
		$scope.action = "add";
	}


	$scope.changePassword = function () {

		if($scope.newpassword == $scope.confirmpassword) {
			var userData = {
				'password': $scope.newpassword
			}
			$http.post(base_url + 'User/changePassword', userData)
			.then(response => {
				$scope.clearForm();
				$("#changePasswordForm").modal("toggle");
				swal({
				  title: "Success!",
				  text: "Password Successfully Changed",
				  type: "success",
				  timer: 1300,
				  showConfirmButton: false
				});			
			}).catch(error => {
				swal("Sorry!", error, "error")
				console.log(error);
			})

		} else {
			swal("Sorry!", "Passwords didn't match", "error");
		}
			
		
	}

			
});



myApp.controller('TasksCtrl', function TasksCtrl($scope, $http, $location, $window, CommonProp) {

	$scope.clearForm = function() {
		$scope.assignedto = "";
		$scope.task = "";
		$scope.task_dp = "";
		$scope.action = "add";
	}

	$scope.getUserTasks = function () {
		$scope.tasks = []; 
		$http.get(base_url + 'User/getUserTasks')
		.then(response => {
			$scope.tasks = response.data;
		}).catch(error => {
			swal("Sorry!", "An error has occured. Check console.", "error")
			console.log(error);
		})
	}


	$scope.viewTaskDetails = function (refid, task, description, priority, task_dp, status) {
		$scope.refid = refid; 
		$scope.title = task; 
		$scope.description = description; 
		$scope.task_dp = task_dp; 
		$scope.priority = priority; 
		$scope.status = status; 
		$scope.action = "update"; 
	}

	$scope.cu_task = function () {	
		var dataArray = {
			'refid'				: $scope.refid,
			'status'			: $scope.status,
			'comment'			: $scope.comment,
			'action'  			: $scope.action
		}
		$http.post(base_url + 'User/cu_task', dataArray)
		.then(response => {
			$scope.clearForm();
			if ($scope.action == "add") {
				$scope.message = "New Record Saved"
			} else {
				$scope.message = "Record Updated"
			}
			$("#TasksModal").modal("toggle");
			$scope.getCompanyTasks();
			swal({
			  title: "Thank You!",
			  text: $scope.message,
			  type: "success",
			  timer: 1300,
			  showConfirmButton: false
			});			
		}).catch(error => {
			swal("Sorry!", error, "error")
			console.log(error);
		})

	}

			
});
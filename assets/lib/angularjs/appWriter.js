var myApp = angular.module('rpApp', ['angularUtils.directives.dirPagination']);


myApp.directive('fileInput', function($parse) {
	return {
		link: function($scope, element, attrs) {
			element.on("change", function(event) {
				var files = event.target.files;
				var file = files[0];
				$parse(attrs.fileInput).assign($scope, element[0].files);
				$scope.$apply();
			})
		}
	}
});

myApp.directive('attachmentFile', function($parse) {
	return {
		restrict: 'A',
		link: function($scope, element, attributes) {
			var model = $parse(attributes.attachmentFile);
			var assign = model.assign;
			element.bind('change', function() {
				var files = [];
				angular.forEach(element[0].files, function(file) {
					files.push(file);
				});
				$scope.$apply(function() {
					assign($scope, files);
				});
			});
		}
	}
});



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

myApp.controller('MyProfileCtrl', function MyProfileCtrl($scope, $http, $location, CommonProp) {

	$scope.uploadAvatar = function() {
		var ciController = base_url + 'Writer/uploadAvatar';
		var formData = new FormData();
		angular.forEach($scope.files, function(file) {
			formData.append('file', file);
			var fname = file.name;
		});
		$http.post(ciController, formData, {
			transformRequest: angular.identity,
			headers: {'Content-Type': undefined, 'Process-Data':false}
		}).then(function(response) {
			swal({
			  title: "Thank You!",
			  text: $scope.message,
			  type: "success",
			  timer: 1300,
			  showConfirmButton: false
			});	
			$scope.getWriterData();
		}).catch(error => {
			swal("Sorry!", error, "error")
			console.log(error);
		})
	}

	$scope.clearForm = function() {
		$scope.fullname = "";
		$scope.username = "";
		$scope.getAccountsList();
		$scope.action = "add";
	}

	$scope.loadCountries = function() {
		$scope.countries = []; 
		$http.get(base_url + 'assets/js/countries.json')
		.then(response => {
			$scope.countries = response.data;
		}).catch(error => {
			swal("Sorry!", "An error has occured. Check console.", "error")
			console.log(error);
		});
	}

	$scope.loadStates = function() {
		$scope.states = []; 
		$http.get(base_url + 'assets/js/states.json')
		.then(response => {
			$scope.states = response.data;
		}).catch(error => {
			swal("Sorry!", "An error has occured. Check console.", "error")
			console.log(error);
		});
	}

	$scope.getWriterData = function () {
		$scope.writer = []; 
		$http.get(base_url + 'Writer/getWriterData')
		.then(response => {
			$scope.writer = response.data[0];
		}).catch(error => {
			swal("Sorry!", "An error has occured. Check console.", "error")
			console.log(error);
		})
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

	$scope.u_profile = function () {
		var cit = JSON.stringify($scope.cit_selected);
		var sub = JSON.stringify($scope.selected);
		var userData = {
			'userid'						: $scope.writer.userid,
			'firstname'					: $scope.writer.firstname,
			'lastname'					: $scope.writer.lastname,
			'email'							: $scope.writer.email,
			'mobile'						: $scope.writer.mobile,
			'sex'								: $scope.writer.sex,
			'address'						: $scope.writer.address,
			'city'						  : $scope.writer.city,
			'state'							: $scope.writer.state,
			'zipcode'						: $scope.writer.zipcode,
			'country'						: $scope.writer.country,
			'language'					: $scope.writer.language,
			'citation'					: cit,
			'highesteducation'	: $scope.writer.highesteducation,
			'subjectarea'				: sub,
			'description'				: $scope.writer.description
		}
		$http.post(base_url + 'Writer/u_profile', userData)
		.then(response => {
			
			$scope.getWriterData();
			swal({
			  title: "Thank You!",
			  text: "Account Information successfully saved",
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




myApp.controller('AttachmentsCtrl', function AttachmentsCtrl($scope, $http, $window, $location, CommonProp) {

	$scope.currentPage = 1;
  $scope.pageSize = 10;

	$scope.clearForm = function() {
		$scope.refid = "";
		$scope.engdetails = "";
		$scope.arbdetails = "";
		$scope.code = "";
		$scope.action = "add";
	}

	$scope.del_attachment = function (refid, filename) {
		swal({
				title:"Are you sure?",
				text: "You will not be able to recover this user!",
				type: "warning",
				showCancelButton: true,
				confirmButtonColor: "#DD6B55",
				confirmButtonText: "Yes, delete it!",
				cancelButtonText: "No, cancel pls!",
				closeOnConfirm: false,
				closeOnCancel: false
			},
			function (isConfirm) {
				if (isConfirm) {
					$http.post(base_url + 'Writer/del_attachment', {
							'refid'		 : refid,
							'filename' : filename
						})
						.then(response => {
							swal({
							  title: "Deleted",
							  text: "User has been deleted.",
							  type: "success",
							  timer: 1300,
							  showConfirmButton: false
							});	
							$scope.getAttachmentsByOrder();
						})
						.catch(error => {
							swal("Sorry!", "An error has occured. Check console.", "error")
							console.log(error);
						})

				} else {
					swal({
							  title: "Cancelled",
							  text: "Delete cancelled",
							  type: "success",
							  timer: 1300,
							  showConfirmButton: false
							});	
				}
			});
	}

	$scope.getAttachmentsByOrder = function() {
		var refid = localStorage.getItem("referenceKey");
		$scope.attachments = []; 
		$http.get(base_url + 'Writer/getAttachmentsByOrder/' + refid)
		.then(response => {
			$scope.attachments = response.data;
		}).catch(error => {
			swal("Sorry!", "An error has occured. Check console.", "error")
			console.log(error);
		})
	}		
});





myApp.controller('AdminChatCtrl', function AdminChatCtrl($scope, $http, $window, $location, $interval, CommonProp) {

	$scope.currentPage = 1;
  $scope.pageSize = 0;

  var promise = $interval(function() {
  	$scope.getAdminChatByUser();
  }, 5000)

  $scope.$on("$destroy", function(event) {
  	$interval.cancel(promise);
  })

	$scope.clearForm = function() {
		$scope.refid = "";
		$scope.engdetails = "";
		$scope.arbdetails = "";
		$scope.code = "";
		$scope.action = "add";
	}

	$scope.admichats = []; 
	$scope.getAdminChatByUser = function() {
		$http.get(base_url + 'Writer/getAdminChatByUser')
		.then(response => {
			$scope.admichats = response.data;
		}).catch(error => {
			swal("Sorry!", "An error has occured. Check console.", "error")
			console.log(error);
		})
	}

	$scope.postCommentToAdmin = function () {
		var userData = {
										'comment'		: $scope.comment,
									}
		$http.post(base_url + 'Writer/postCommentToAdmin', userData)
		.then(response => {
			$scope.getAdminChatByUser();
			$scope.comment = "";
		}).catch(error => {
			swal("Sorry!", error, "error")
			console.log(error);
		})
	}			
});




myApp.controller('ClientOrdersCtrl', function ClientOrdersCtrl($scope, $http, $window, $location, CommonProp) {

	$scope.currentPage = 1;
  $scope.pageSize = 10;


  $scope.uploadFiles = function(orderid) {
		var ciController = base_url + 'Client/uploadFiles/' + orderid;
		var formData = new FormData();

		angular.forEach($scope.attached_files, function(file, key) {
			var filename = 'attached_file'+key;
			formData.append(filename, file);
		});

		$http.post(ciController, formData, {
			transformRequest: angular.identity,
			headers: {'Content-Type': undefined, 'Process-Data':false}
		}).then(function(response) {
			swal({
			  title: "Thank You!",
			  text: "Account Information successfully saved",
			  type: "success",
			  timer: 1500,
			  showConfirmButton: false
			});		
		}).catch(error => {
			swal("Sorry!", error, "error")
			console.log(error);
		})
	}

	$scope.previewAttachments = function(event) {
		var files = event.target.files;
		$scope.attachments = [];
		angular.forEach(files, function(file) {
			$scope.attachments.push(file.name);
			var reader = new FileReader();
			reader.onload = function() {
				$scope.$apply;
			}
			reader.readAsDataURL(file);
		});
	}

	

	$scope.clearForm = function() {
		$scope.refid = "";
		$scope.engdetails = "";
		$scope.arbdetails = "";
		$scope.code = "";
		$scope.action = "add";
	}

	$scope.loadOrderData = function(refid) {
		localStorage.setItem("referenceKey", refid);
		$window.location.href = base_url + 'Writer/ViewOrder';
	}

	$scope.getAllForBidding = function() {
		$scope.orders = []; 
		$http.get(base_url + 'Writer/getAllForBidding')
		.then(response => {
			$scope.orders = response.data;
		}).catch(error => {
			swal("Sorry!", "An error has occured. Check console.", "error")
			console.log(error);
		})
	}

	$scope.getAllByCategory = function(category) {
		$scope.menus = []; 
		$http.get(base_url + 'Writer/getAllByCategory/' + category)
		.then(response => {
			$scope.menus = response.data;
		}).catch(error => {
			swal("Sorry!", "An error has occured. Check console.", "error")
			console.log(error);
		})
	}

	$scope.getOrderData = function() {
		var refid = localStorage.getItem("referenceKey");
		$scope.odata = [];
		$http.get(base_url + 'Writer/getOrderData/' + refid)
		.then(response => {
			$scope.odata = response.data[0];
		}).catch(error => {
			swal("Sorry!", "An error has occured. Check console.", "error")
			console.log(error);
		})
	}

	$scope.getOrderBids = function() {
		var refid = localStorage.getItem("referenceKey");
		$scope.bids = [];
		$http.get(base_url + 'Writer/getOrderBids/' + refid)
		.then(response => {
			$scope.bids = response.data;
			$scope.getMyBidByOrder();
		}).catch(error => {
			swal("Sorry!", "An error has occured. Check console.", "error")
			console.log(error);
		})
	}

	$scope.myBid = function(refid, amount) {
		$scope.refid = refid;
		$scope.amount = amount;
	}


	$scope.getMyBidByOrder = function() {
		var refid = localStorage.getItem("referenceKey");
		$scope.mybid = [];
		$http.get(base_url + 'Writer/getMyBidByOrder/' + refid)
		.then(response => {
			$scope.mybid = response.data[0];
		}).catch(error => {
			swal("Sorry!", "An error has occured. Check console.", "error")
			console.log(error);
		})
	}


	$scope.getAllOrders = function() {
		$scope.menus = []; 
		$http.get(base_url + 'Writer/getAllOrders')
		.then(response => {
			$scope.menus = response.data;
		}).catch(error => {
			swal("Sorry!", "An error has occured. Check console.", "error")
			console.log(error);
		})
	}

	$scope.getAllOrdersByClient = function() {
		var userid = localStorage.getItem("userid");
		$scope.orders = []; 
		$http.get(base_url + 'Writer/getAllOrdersByClient/' + userid)
		.then(response => {
			$scope.orders = response.data;
		}).catch(error => {
			swal("Sorry!", "An error has occured. Check console.", "error")
			console.log(error);
		})
	}


	$scope.submitBid = function () {
		var orderid = localStorage.getItem("referenceKey");
		(angular.isUndefined($scope.refid)==false ? $scope.action="update" : $scope.action="add");
		if($scope.amount < $scope.odata.minbid) {
			alert("Bid Too Low");
		} else if($scope.amount > $scope.odata.maxbid) {
			alert("Bid too High.");
		} else {
			
			var userData = {
										'refid'		  : $scope.refid,
										'orderid'		: orderid,
										'amount'		: $scope.amount,
										'action'		: $scope.action,
									}
			$http.post(base_url + 'Writer/submitBid', userData)
			.then(response => {
				
				$scope.getOrderBids();
				swal({
				  title: "Thank You!",
				  text: "Your Bid has been posted.",
				  type: "success",
				  timer: 1500,
				  showConfirmButton: false
				});			
			}).catch(error => {
				swal("Sorry!", error, "error")
				console.log(error);
			})
		}

	}

});


myApp.controller('MyOrdersCtrl', function MyOrdersCtrl($scope, $http, $window, $location, $interval, CommonProp) {


	$scope.currentPage = 1;
  $scope.pageSize = 10;

  var promise = $interval(function() {
  	$scope.getCommentsByOrder();
  }, 5000)

  $scope.$on("$destroy", function(event) {
  	$interval.cancel(promise);
  })



	$scope.uploadFiles = function(orderid) {
		var ciController = base_url + 'Writer/uploadFiles/' + orderid;
		var formData = new FormData();

		angular.forEach($scope.attached_files, function(file, key) {
			var filename = 'attached_file'+key;
			formData.append(filename, file);
		});

		$http.post(ciController, formData, {
			transformRequest: angular.identity,
			headers: {'Content-Type': undefined, 'Process-Data':false}
		}).then(function(response) {
			swal({
			  title: "Thank You!",
			  text: "Account Information successfully saved",
			  type: "success",
			  timer: 1500,
			  showConfirmButton: false
			});		
		}).catch(error => {
			swal("Sorry!", error, "error")
			console.log(error);
		})
	}

	$scope.clearForm = function() {
		$scope.fullname = "";
		$scope.username = "";
		$scope.getAccountsList();
		$scope.action = "add";
	}

	$scope.loadOrderData = function(refid) {
		localStorage.setItem("referenceKey", refid);
		$window.location.href = base_url + 'Writer/OrderDetails';
	}


	$scope.getOrdersByWriter = function () {
		$scope.myorders = []; 
		$http.get(base_url + 'Writer/getOrdersByWriter')
		.then(response => {
			$scope.myorders = response.data;
		}).catch(error => {
			swal("Sorry!", "An error has occured. Check console.", "error")
			console.log(error);
		})
	}

	$scope.getOrderData = function() {
		var refid = localStorage.getItem("referenceKey");
		$scope.odata = [];
		$http.get(base_url + 'Writer/getOrderData/' + refid)
		.then(response => {
			$scope.odata = response.data[0];
			
		}).catch(error => {
			swal("Sorry!", "An error has occured. Check console.", "error")
			console.log(error);
		})
	}


	$scope.sendOrder = function () {
		var orderid = localStorage.getItem("referenceKey");
		var userData = {
			'orderid'						: orderid,
			'clientid'					: $scope.odata.clientid,
			'subject'						: $scope.subject,
			'msgbody'						: $scope.msgbody,
		}
		$http.post(base_url + 'Writer/sendOrder', userData)
		.then(response => {
			alert(orderid);
			$scope.uploadFiles(orderid);
					
		}).catch(error => {
			swal("Sorry!", error, "error")
			console.log(error);
		})
	}

	$scope.comments = [];
	$scope.getCommentsByOrder = function() {
		var refid = localStorage.getItem("referenceKey");
		$http.get(base_url + 'Writer/getAllCommentsByOrder/' + refid)
		.then(response => {
			$scope.comments = response.data;

		}).catch(error => {
			console.log(error);
		})
	}


	$scope.postComment = function () {
		var orderid = localStorage.getItem("referenceKey");
		var userData = {
			'orderid' 						: orderid,
			'comment'      				: $scope.comment,
		}
		$http.post(base_url + 'Writer/postComment', userData)
		.then(response => {
			$scope.comment = "";
			swal("Success!", "Comment Posted", "success")
		}).catch(error => {
			console.log(error);
		})
	}

			
});
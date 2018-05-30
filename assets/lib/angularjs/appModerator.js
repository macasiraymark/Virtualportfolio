var myApp = angular.module('rpApp', ['angularUtils.directives.dirPagination', 'ui.bootstrap']);


myApp.service('CommonProp', function($location, $http) {

  return {
    getUser: function() {
      if(email == "") {
        email = localStorage.getItem("userEmail");
      }
      return email;
    },
    setUser: function(value) {
      localStorage.setItem("userEmail", value);
      email = value;
    },
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
    }
  }
});

myApp.controller('AccountsCtrl', function AccountsCtrl($scope, $http, $window, $location, CommonProp) {

	$scope.currentPage = 1;
  $scope.pageSize = 10;

	$scope.clearForm = function() {
		$scope.firstname = "";
		$scope.lastname = "";
		$scope.mobile = "";
		$scope.email = "";
		$scope.password = "";
		$scope.action = "add";
	}

	$scope.getAllAdmin = function () {
		$scope.accounts = []; 
		$http.get(base_url + 'Moderator/getAllAdmin')
		.then(response => {
			$scope.accounts = response.data;
		}).catch(error => {
			swal("Sorry!", "An error has occured. Check console.", "error")
			console.log(error);
		})
	}

	$scope.getAccountData = function () {
		$http.get(base_url + 'Moderator/getAccountData')
		.then(response => {
			var acct = response.data[0];
			if(angular.isUndefined(acct)==false) {
				$scope.firstname = acct.firstname;
				$scope.lastname = acct.lastname;
				$scope.mobile = acct.mobile;
				$scope.email = acct.email;
				$scope.action = "update";

			} else {
				$scope.action = "add";
			}
		}).catch(error => {
			swal("Sorry!", "An error has occured. Check console.", "error")
			console.log(error);
		})
	}

	$scope.loadAccountForm = function (userid) {
		$window.location.href = base_url + 'Moderator/AccountsForm/' + userid;
	}


	$scope.changePassword = function () {

		if($scope.newpassword == $scope.confirmpassword) {
			var userData = {
				'password': $scope.newpassword
			}
			$http.post(base_url + 'Moderator/changePassword', userData)
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

	$scope.cu_accounts = function () {
		var userData = {
			'userid'		: $scope.userid,
			'firstname'	: $scope.firstname,
			'lastname'	: $scope.lastname,
			'mobile'    : $scope.mobile,
			'email'   	: $scope.email,
			'password'  : $scope.password,
			'action'   	: $scope.action
		}
		$http.post(base_url + 'Moderator/cu_accounts', userData)
		.then(response => {
			
			$scope.getAllAdmin();
			swal({
			  title: "Thank You!",
			  text: "Account Information successfully saved",
			  type: "success",
			  timer: 1300,
			  showConfirmButton: false
			});			
		}).catch(error => {
			swal("Sorry!", error, "error")
			console.log(error);
		})

	}

	$scope.del_accounts = function (userid) {
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
					$http.post(base_url + 'Moderator/del_accounts', {
							'userid': userid
						})
					.then(response => {
						swal({
						  title: "Deleted",
						  text: "User has been deleted.",
						  type: "success",
						  timer: 1300,
						  showConfirmButton: false
						});	
						$scope.getAllAdmin();
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
			
});



myApp.controller('WritersCtrl', function WritersCtrl($scope, $http, $window, $location, $interval, CommonProp) {

	$scope.currentPage = 1;
  $scope.pageSize = 10;

	$scope.clearForm = function() {
		$scope.firstname = "";
		$scope.lastname = "";
		$scope.mobile = "";
		$scope.email = "";
		$scope.password = "";
		$scope.action = "add";
	}

	var promise = $interval(function() {
  	$scope.getCommentsByOrder();
  }, 5000)

  $scope.$on("$destroy", function(event) {
  	$interval.cancel(promise);
  })




	$scope.citations = ['MLA', 'APA', 'Chicago/Turabian', 'Harvard', 'Other'];


	$scope.cit_selected = [];

  $scope.cit_toggle = function (cit_item, cit_list) {
	  var idx = cit_list.indexOf(cit_item);
	  if (idx > -1) {
	    cit_list.splice(idx, 1);
	    $scope.counter--;
	  }
	  else {
	    cit_list.push(cit_item);
	    $scope.counter++;
	  }
	};

	$scope.cit_exists = function (cit_item, cit_list) {
	  return cit_list.indexOf(cit_item) > -1;
	};

	$scope.col1 = ['Assignment', 'Essay', 'Research Paper', 'Research Proposal', 'Report', 'Request(JOB)', 'Case Study', 'Graphic Design', 'Work for the Magazine'];

	$scope.col2 = ['Lab Report', 'Term Paper', 'Term Project', 'Part of Project', 'Summarization', 'Course Work', 'Answer Questions', 'Magazine work', 'Translation (English to Arabic)'];

	$scope.col3 = ['Revision to Correct Mistakes', 'Other – EXPLAIN IN “Order Details”', 'ARABIC ORDER - SPECIAL PLAC', 'Company / Articles / Power Point', 'CV : Normal/ Potoshop/ Infographics'];
  
 

  $scope.selected = [];
  $scope.counter = 0;

  $scope.toggle = function (item, list) {
	  var idx = list.indexOf(item);
	  if (idx > -1) {
	    list.splice(idx, 1);
	    $scope.counter--;
	  }
	  else {
	    list.push(item);
	    $scope.counter++;
	  }
	};

	$scope.exists = function (item, list) {
	  return list.indexOf(item) > -1;
	};


	$scope.comments = [];
	$scope.getCommentsByOrder = function() {
		var refid = localStorage.getItem("referenceKey");
		$http.get(base_url + 'Moderator/getAllCommentsByOrder/' + refid)
		.then(response => {
			$scope.comments = response.data;

		}).catch(error => {
			console.log(error);
		})
	}

	$scope.acct_type = '0';


	$scope.postComment = function () {
		var orderid = localStorage.getItem("referenceKey");
		if($scope.acct_type == 0) {
			$scope.myuserid = "adminid";
		} else if($scope.acct_type == 1) {
			$scope.myuserid = $scope.odata.writerid;
		} else if($scope.acct_type == 2) {
			$scope.myuserid = $scope.odata.clientid;
		}
		var userData = {
			'orderid' 						: orderid,
			'myuserid' 						: $scope.myuserid,
			'comment'      				: $scope.comment,
		}
		$http.post(base_url + 'Moderator/postComment', userData)
		.then(response => {
			$scope.comment = "";
			swal("Success!", "Comment Posted", "success")
		}).catch(error => {
			console.log(error);
		})
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

	$scope.getAllWriters = function () {
		localStorage.clear();
		$scope.writers = []; 
		$http.get(base_url + 'Moderator/getAllWriters')
		.then(response => {
			$scope.writers = response.data;
		}).catch(error => {
			swal("Sorry!", "An error has occured. Check console.", "error")
			console.log(error);
		})
	}

	$scope.getOrdersByWriter = function () {
		var userid = localStorage.getItem("userid");
		$scope.myorders = []; 
		$http.get(base_url + 'Moderator/getOrdersByWriter/' + userid)
		.then(response => {
			$scope.myorders = response.data;
		}).catch(error => {
			swal("Sorry!", "An error has occured. Check console.", "error")
			console.log(error);
		})
	}

	$scope.loadOrderData = function(refid) {
		localStorage.setItem("referenceKey", refid);
		$window.location.href = base_url + 'Moderator/OrderDetails';
	}

	$scope.getOrderData = function() {
		var refid = localStorage.getItem("referenceKey");
		$scope.odata = [];
		$http.get(base_url + 'Moderator/getOrderData/' + refid)
		.then(response => {
			$scope.odata = response.data[0];
			
		}).catch(error => {
			swal("Sorry!", "An error has occured. Check console.", "error")
			console.log(error);
		})
	}

	$scope.getWriterData = function () {
		var userid = localStorage.getItem("userid");
		$http.get(base_url + 'Moderator/getWriterData/' + userid)
		.then(response => {
			var w = response.data[0];
			if(angular.isUndefined(w)==false) {
				$scope.userid = w.userid;
				$scope.usercode = w.usercode;
				$scope.firstname = w.firstname;
				$scope.lastname = w.lastname;
				$scope.mobile = w.mobile;
				$scope.email = w.email;
				$scope.citation = w.citation;
				$scope.subjectarea = w.subjectarea;
				$scope.description = w.description;
				$scope.highesteducation = w.highesteducation;
				$scope.avatar = w.avatar;
				$scope.action = "update";

			} else {
				alert("empty")
				$scope.action = "add";
			}
		}).catch(error => {
			swal("Sorry!", "An error has occured. Check console.", "error")
			console.log(error);
		})
	}

	$scope.loadWriterForm = function (userid) {
		localStorage.setItem("userid", userid)
		$window.location.href = base_url + 'Moderator/WritersProfile/' + userid;
	}


	$scope.changePassword = function () {

		if($scope.newpassword == $scope.confirmpassword) {
			var userData = {
				'password': $scope.newpassword
			}
			$http.post(base_url + 'Moderator/changePassword', userData)
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

	$scope.cu_writers = function () {
		var cit = JSON.stringify($scope.cit_selected);
		var sub = JSON.stringify($scope.selected);
		(angular.isUndefined($scope.userid)== true ? $scope.action="add" : $scope.action="update")
		var userData = {
			'userid'						: $scope.userid,
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
			'description'				: $scope.description,
			'action'						: $scope.action
		}
		$http.post(base_url + 'Moderator/cu_writers', userData)
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

	$scope.del_writer = function (userid) {
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
					$http.post(base_url + 'Moderator/del_accounts', {
							'userid': userid
						})
					.then(response => {
						swal({
						  title: "Deleted",
						  text: "User has been deleted.",
						  type: "success",
						  timer: 1300,
						  showConfirmButton: false
						});	
						$scope.getAllWriters();
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

	$scope.del_comment = function (refid) {
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
				$http.post(base_url + 'Moderator/del_comment', {
						'refid': refid
					})
				.then(response => {
					$scope.getCommentsByOrder();
					swal({
					  title: "Deleted",
					  text: "User has been deleted.",
					  type: "success",
					  timer: 1300,
					  showConfirmButton: false
					});	
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
			
});



myApp.controller('ClientsCtrl', function ClientsCtrl($scope, $http, $window, $location, CommonProp) {

	$scope.currentPage = 1;
  $scope.pageSize = 10;

	$scope.clearForm = function() {
		$scope.firstname = "";
		$scope.lastname = "";
		$scope.mobile = "";
		$scope.email = "";
		$scope.password = "";
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

	$scope.getAllClients = function () {
		localStorage.clear();
		$scope.clients = []; 
		$http.get(base_url + 'Moderator/getAllClients')
		.then(response => {
			$scope.clients = response.data;
		}).catch(error => {
			swal("Sorry!", "An error has occured. Check console.", "error")
			console.log(error);
		})
	}

	$scope.getClientData = function () {
		var userid = localStorage.getItem("userid");
		$http.get(base_url + 'Moderator/getAccountData/' + userid)
		.then(response => {
			var c = response.data[0];
			if(angular.isUndefined(c)==false) {
				$scope.userid = c.userid;
				$scope.usercode = c.usercode;
				$scope.firstname = c.firstname;
				$scope.lastname = c.lastname;
				$scope.mobile = c.mobile;
				$scope.email = c.email;
				$scope.country = c.country;
				$scope.avatar = c.avatar;
				$scope.action = "update";

			} else {
				alert("empty")
				$scope.action = "add";
			}
		}).catch(error => {
			swal("Sorry!", "An error has occured. Check console.", "error")
			console.log(error);
		})
	}

	$scope.loadClientsProfile = function (userid) {
		localStorage.setItem("userid", userid)
		$window.location.href = base_url + 'Moderator/ClientsProfile';
	}


	$scope.cu_clients = function () {
		(angular.isUndefined($scope.userid)==true ? $scope.action="add" : $scope.action="update")
		var userData = {
			'userid'						: $scope.userid,
			'firstname'					: $scope.firstname,
			'lastname'					: $scope.lastname,
			'email'							: $scope.email,
			'mobile'						: $scope.mobile,
			'country'						: $scope.country,
			'action'						: $scope.action
		}
		$http.post(base_url + 'Moderator/cu_clients', userData)
		.then(response => {
			
			$scope.getAllClients();
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

	$scope.del_accounts = function (userid) {
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
					$http.post(base_url + 'Moderator/del_accounts', {
							'userid': userid
						})
						.then(response => {
							swal({
							  title: "Deleted",
							  text: "User has been deleted.",
							  type: "success",
							  timer: 1300,
							  showConfirmButton: false
							});	
							$scope.getAllClients();
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
			
});


myApp.controller('ResourcesCtrl', function ResourcesCtrl($scope, $http, $window, $location, CommonProp) {

	$scope.currentPage = 1;
  $scope.pageSize = 10;

	$scope.clearForm = function() {
		$scope.firstname = "";
		$scope.lastname = "";
		$scope.mobile = "";
		$scope.email = "";
		$scope.password = "";
		$scope.action = "add";
	}

	$scope.uploadFiles = function(orderid) {
		var ciController = base_url + 'Moderator/uploadFiles/' + orderid;
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

	$scope.getAllResources = function (category) {
		$scope.resources = []; 
		$http.get(base_url + 'Moderator/getAllResources/' + category)
		.then(response => {
			$scope.resources = response.data;
		}).catch(error => {
			swal("Sorry!", "An error has occured. Check console.", "error")
			console.log(error);
		})
	}

	$scope.cu_clients = function () {
		(angular.isUndefined($scope.userid)==true ? $scope.action="add" : $scope.action="update")
		var userData = {
			'userid'						: $scope.userid,
			'firstname'					: $scope.firstname,
			'lastname'					: $scope.lastname,
			'email'							: $scope.email,
			'mobile'						: $scope.mobile,
			'country'						: $scope.country,
			'action'						: $scope.action
		}
		$http.post(base_url + 'Moderator/cu_clients', userData)
		.then(response => {
			
			$scope.getAllClients();
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

	$scope.del_accounts = function (userid) {
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
				$http.post(base_url + 'Moderator/del_accounts', {
						'userid': userid
					})
				.then(response => {
					swal({
					  title: "Deleted",
					  text: "User has been deleted.",
					  type: "success",
					  timer: 1300,
					  showConfirmButton: false
					});	
					$scope.getAllClients();
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
			
});



myApp.controller('OrderMenuCtrl', function OrderMenuCtrl($scope, $http, $window, $location, CommonProp) {

	$scope.currentPage = 1;
  $scope.pageSize = 10;

	$scope.clearForm = function() {
		$scope.refid = "";
		$scope.engdetails = "";
		$scope.arbdetails = "";
		$scope.code = "";
		$scope.action = "add";
	}

	$scope.getAllByCategory = function(category) {
		$scope.menus = []; 
		$http.get(base_url + 'Moderator/getAllByCategory/' + category)
		.then(response => {
			$scope.menus = response.data;
		}).catch(error => {
			swal("Sorry!", "An error has occured. Check console.", "error")
			console.log(error);
		})
	}


	$scope.getMenuData = function (refid, code, engdetails, arbdetails, category) {
		$scope.refid = refid;
		$scope.code = code;
		$scope.engdetails = engdetails;
		$scope.arbdetails = arbdetails;
		$scope.category = category;
		$scope.action = "update";
	}


	$scope.cu_ordermenu = function () {
		
		var userData = {
			'refid'					: $scope.refid,
			'code'					: $scope.code,
			'engdetails'		: $scope.engdetails,
			'arbdetails'		: $scope.arbdetails,
			'category'			: $scope.category,
			'action'				: $scope.action
		}
		$http.post(base_url + 'Moderator/cu_ordermenu', userData)
		.then(response => {
			
			$scope.getAllByCategory($scope.category);
			$scope.clearForm();
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

	$scope.del_ordermenu = function (refid) {
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
					$http.post(base_url + 'Moderator/del_ordermenu', {
							'refid': refid
						})
						.then(response => {
							swal({
							  title: "Deleted",
							  text: "User has been deleted.",
							  type: "success",
							  timer: 1300,
							  showConfirmButton: false
							});	
							$scope.getAllByCategory($scope.category);
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
					$http.post(base_url + 'Moderator/del_attachment', {
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
		$http.get(base_url + 'Moderator/getAttachmentsByOrder/' + refid)
		.then(response => {
			$scope.attachments = response.data;
		}).catch(error => {
			swal("Sorry!", "An error has occured. Check console.", "error")
			console.log(error);
		})
	}


			
});







myApp.controller('ClientOrdersCtrl', function ClientOrdersCtrl($scope, $http, $window, $location, CommonProp) {

	$scope.currentPage = 1;
  $scope.pageSize = 10;

	$scope.clearForm = function() {
		$scope.refid = "";
		$scope.engdetails = "";
		$scope.arbdetails = "";
		$scope.code = "";
		$scope.action = "add";
	}


	$scope.loadWriters = function() {
		$scope.writers = []; 
		$http.get(base_url + 'Moderator/getAllWriters')
		.then(response => {
			$scope.writers = response.data;
		}).catch(error => {
			swal("Sorry!", "An error has occured. Check console.", "error")
			console.log(error);
		})
	}


	$scope.loadOrderProfile = function (refid) {
		localStorage.setItem("referenceKey", refid)
		$window.location.href = base_url + 'Moderator/OrderProfile';
	}

	$scope.getAllByPending = function() {
		$scope.pendings = []; 
		$http.get(base_url + 'Moderator/getAllByPending')
		.then(response => {
			$scope.pendings = response.data;
		}).catch(error => {
			swal("Sorry!", "An error has occured. Check console.", "error")
			console.log(error);
		})
	}

	$scope.getAllForBidding = function() {
		$scope.orders = []; 
		$http.get(base_url + 'Moderator/getAllForBidding')
		.then(response => {
			$scope.orders = response.data;
		}).catch(error => {
			swal("Sorry!", "An error has occured. Check console.", "error")
			console.log(error);
		})
	}

	$scope.getAllByCategory = function(category) {
		$scope.menus = []; 
		$http.get(base_url + 'Moderator/getAllByCategory/' + category)
		.then(response => {
			$scope.menus = response.data;
		}).catch(error => {
			swal("Sorry!", "An error has occured. Check console.", "error")
			console.log(error);
		})
	}

	$scope.loadNumberOfReference = function() {
		$scope.numberofreferences = []; 
		$http.get(base_url + 'Moderator/getAllByCategory/numberofreference')
		.then(response => {
			$scope.numberofreferences = response.data;
		}).catch(error => {
			swal("Sorry!", "An error has occured. Check console.", "error")
			console.log(error);
		})
	}

	$scope.loadTimeOfDeadline = function() {
		$scope.deadlinets = []; 
		$http.get(base_url + 'Moderator/getAllByCategory/deadlinet')
		.then(response => {
			$scope.deadlinets = response.data;
		}).catch(error => {
			swal("Sorry!", "An error has occured. Check console.", "error")
			console.log(error);
		})
	}

	$scope.loadTypeOfReference = function() {
		$scope.typeofreferences = []; 
		$http.get(base_url + 'Moderator/getAllByCategory/typeofreference')
		.then(response => {
			$scope.typeofreferences = response.data;
		}).catch(error => {
			swal("Sorry!", "An error has occured. Check console.", "error")
			console.log(error);
		})
	}

	$scope.loadTypeOfOrder = function() {
		$scope.typeoforders = []; 
		$http.get(base_url + 'Moderator/getAllByCategory/typeoforder')
		.then(response => {
			$scope.typeoforders = response.data;
		}).catch(error => {
			swal("Sorry!", "An error has occured. Check console.", "error")
			console.log(error);
		})
	}


	$scope.loadLanguageLevel = function() {
		$scope.languagelevels = []; 
		$http.get(base_url + 'Moderator/getAllByCategory/languagelevel')
		.then(response => {
			$scope.languagelevels = response.data;
		}).catch(error => {
			swal("Sorry!", "An error has occured. Check console.", "error")
			console.log(error);
		})
	}

	$scope.loadAcademicLevel = function() {
		$scope.academiclevels = []; 
		$http.get(base_url + 'Moderator/getAllByCategory/academiclevel')
		.then(response => {
			$scope.academiclevels = response.data;
		}).catch(error => {
			swal("Sorry!", "An error has occured. Check console.", "error")
			console.log(error);
		})
	}

	$scope.loadNumberOfPages = function() {
		$scope.numberofpagess = []; 
		$http.get(base_url + 'Moderator/getAllByCategory/numberofpages')
		.then(response => {
			$scope.numberofpagess = response.data;
		}).catch(error => {
			swal("Sorry!", "An error has occured. Check console.", "error")
			console.log(error);
		})
	}

	$scope.loadPriority = function() {
		$scope.priorities = []; 
		$http.get(base_url + 'Moderator/getAllByCategory/priority')
		.then(response => {
			$scope.priorities = response.data;
		}).catch(error => {
			swal("Sorry!", "An error has occured. Check console.", "error")
			console.log(error);
		})
	}

	$scope.loadLineSpacing = function() {
		$scope.linespacings = []; 
		$http.get(base_url + 'Moderator/getAllByCategory/linespacing')
		.then(response => {
			$scope.linespacings = response.data;
		}).catch(error => {
			swal("Sorry!", "An error has occured. Check console.", "error")
			console.log(error);
		})
	}


	$scope.loadStyle = function() {
		$scope.styles = []; 
		$http.get(base_url + 'Moderator/getAllByCategory/style')
		.then(response => {
			$scope.styles = response.data;
		}).catch(error => {
			swal("Sorry!", "An error has occured. Check console.", "error")
			console.log(error);
		})
	}

	$scope.loadNeedPresentation = function() {
		$scope.presentations = []; 
		$http.get(base_url + 'Moderator/getAllByCategory/presentation')
		.then(response => {
			$scope.presentations = response.data;
		}).catch(error => {
			swal("Sorry!", "An error has occured. Check console.", "error")
			console.log(error);
		})
	}

	$scope.loadNumberOfSlide = function() {
		$scope.numberofslides = []; 
		$http.get(base_url + 'Moderator/getAllByCategory/numberofslide')
		.then(response => {
			$scope.numberofslides = response.data;
		}).catch(error => {
			swal("Sorry!", "An error has occured. Check console.", "error")
			console.log(error);
		})
	}

	$scope.loadIncludeReference = function() {
		$scope.includereferences = []; 
		$http.get(base_url + 'Moderator/getAllByCategory/includereference')
		.then(response => {
			$scope.includereferences = response.data;
		}).catch(error => {
			swal("Sorry!", "An error has occured. Check console.", "error")
			console.log(error);
		})
	}



	$scope.loadTypeOfWork = function() {
		$scope.typeofworks = []; 
		$http.get(base_url + 'Moderator/getAllByCategory/typeofwork')
		.then(response => {
			$scope.typeofworks = response.data;
		}).catch(error => {
			swal("Sorry!", "An error has occured. Check console.", "error")
			console.log(error);
		})
	}

	$scope.loadPlagiarism = function() {
		$scope.plagiarisms = []; 
		$http.get(base_url + 'Moderator/getAllByCategory/plagiarism')
		.then(response => {
			$scope.plagiarisms = response.data;
		}).catch(error => {
			swal("Sorry!", "An error has occured. Check console.", "error")
			console.log(error);
		})
	}

	$scope.loadFontSize = function() {
		$scope.fontsizes = []; 
		$http.get(base_url + 'Moderator/getAllByCategory/fontsize')
		.then(response => {
			$scope.fontsizes = response.data;
		}).catch(error => {
			swal("Sorry!", "An error has occured. Check console.", "error")
			console.log(error);
		})
	}

	$scope.loadOrderData = function(refid) {
		localStorage.setItem("referenceKey", refid);
		$window.location.href = base_url + 'Moderator/ViewOrder';
	}

	/*$scope.loadOrderProfile = function(refid) {
		localStorage.setItem("referenceKey", refid);
		$window.location.href = base_url + 'Moderator/OrderProfile';
	}*/

	$scope.getOrderData = function() {
		var refid = localStorage.getItem("referenceKey");
		$scope.odata = [];
		$http.get(base_url + 'Moderator/getOrderData/' + refid)
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
		$http.get(base_url + 'Moderator/getOrderBids/' + refid)
		.then(response => {
			$scope.bids = response.data;
		}).catch(error => {
			swal("Sorry!", "An error has occured. Check console.", "error")
			console.log(error);
		})
	}


	$scope.getAllOrders = function() {
		$scope.menus = []; 
		$http.get(base_url + 'Moderator/getAllOrders')
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
		$http.get(base_url + 'Moderator/getAllOrdersByClient/' + userid)
		.then(response => {
			$scope.orders = response.data;
		}).catch(error => {
			swal("Sorry!", "An error has occured. Check console.", "error")
			console.log(error);
		})
	}


	$scope.cu_clientorders = function () {
		
		var userData = {
			'refid' 							: $scope.refid,
			'orderid' 						: $scope.orderid,
			'firstname' 					: $scope.firstname,
			'lastname' 						: $scope.lastname,
			'email' 							: $scope.email,
			'clientid'      			: $scope.clientid,
      'subjectname'         : $scope.subjectname,
      'topic'               : $scope.topic,
      'typeofwork'          : $scope.typeofwork,
      'numberofreference'   : $scope.numberofreference,
      'typeoforder'         : $scope.typeoforder,
      'typeofreference'     : $scope.typeofreference,
      'languagelevel'       : $scope.languagelevel,
      'academiclevel'       : $scope.academiclevel,
      'numberofpages'       : $scope.numberofpages,
      'priority'            : $scope.priority,
      'linespacing'         : $scope.linespacing,
      'style'               : $scope.style,
      'deadlined'           : $scope.deadlined,
      'deadlinet'           : $scope.deadlinet,
      'fontsize'            : $scope.fontsize,
      'plagiarism'          : $scope.plagiarism,
      'presentation'        : $scope.presentation,
      'numberofslide'       : $scope.numberofslide,
      'includereference'    : $scope.includereference,
      'pptformat'           : $scope.pptformat,
      'details'             : $scope.details,
      'attachmentdetails'   : $scope.attachmentdetails,
      'rating'              : $scope.rating,
      'amount'              : $scope.amount,
      'writerpay'           : $scope.writerpay,
      'writerid'            : $scope.writerid,
			'action'							: $scope.action
		}
		$http.post(base_url + 'Moderator/cu_clientorders', userData)
		.then(response => {
			
			$scope.clearForm();
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


	$scope.cu_myorder = function () {
		var clientid = localStorage.getItem("userid");
		var userData = {
			'refid' 							: $scope.refid,
			'orderid' 						: $scope.orderid,
			'clientid' 						: clientid,
			'subjectname'         : $scope.subjectname,
      'topic'               : $scope.topic,
      'typeofwork'          : $scope.typeofwork,
      'numberofreference'   : $scope.numberofreference,
      'typeoforder'         : $scope.typeoforder,
      'typeofreference'     : $scope.typeofreference,
      'languagelevel'       : $scope.languagelevel,
      'academiclevel'       : $scope.academiclevel,
      'numberofpages'       : $scope.numberofpages,
      'priority'            : $scope.priority,
      'linespacing'         : $scope.linespacing,
      'style'               : $scope.style,
      'deadlined'           : $scope.deadlined,
      'deadlinet'           : $scope.deadlinet,
      'fontsize'            : $scope.fontsize,
      'plagiarism'          : $scope.plagiarism,
      'presentation'        : $scope.presentation,
      'numberofslide'       : $scope.numberofslide,
      'includereference'    : $scope.includereference,
      'pptformat'           : $scope.pptformat,
      'details'             : $scope.details,
      'attachmentdetails'   : $scope.attachmentdetails,
      'rating'              : $scope.rating,
      'amount'              : $scope.amount,
      'writerpay'           : $scope.writerpay,
      'writerid'            : $scope.writerid,
			'action'							: $scope.action
		}
		$http.post(base_url + 'Moderator/cu_myorder', userData)
		.then(response => {
			
			$scope.getAllOrdersByClient();
			$scope.clearForm();
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


	
	$scope.del_clientorders = function (refid) {
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
					$http.post(base_url + 'Moderator/del_clientorders', {
							'refid': refid
						})
						.then(response => {
							swal({
							  title: "Deleted",
							  text: "User has been deleted.",
							  type: "success",
							  timer: 1300,
							  showConfirmButton: false
							});	
							$scope.getAllOrdersByClient();
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
			
});








myApp.controller('AnnouncementsCtrl', function AnnouncementsCtrl($scope, $http, $location, CommonProp) {

	$scope.currentPage = 1;
  $scope.pageSize = 10;

	$scope.clearForm = function() {
		$scope.title = "";
		$scope.viewby = "";
		$scope.details = "";
		$scope.postexpiry = "";
		$scope.refid = "";
		$scope.action = "add";
	}

	$scope.activate = function(active) {
		if(active == true) {
			$scope.active == 1
		} else {
			$scope.active == 0
		}
		var userData = {
			'refid'				: $scope.refid,
			'active'			: $scope.active,
		}
		$http.post(base_url + 'Moderator/act_announcement', userData)
		.then(response => {
			$scope.getAllAnnouncements();	
			$scope.getAnnouncementsToClients();
		}).catch(error => {
			swal("Sorry!", error, "error")
			console.log(error);
		})
	}


	$scope.getAnnouncementsToClients = function () {
		$scope.toClients = []; 
		$http.get(base_url + 'Moderator/getAllAnnouncementsByView/' + 0)
		.then(response => {
			$scope.toClients = response.data;
		}).catch(error => {
			swal("Sorry!", "An error has occured. Check console.", "error")
			console.log(error);
		})
	}

	$scope.getAnnouncementsToWriters = function () {
		$scope.toWriters = []; 
		$http.get(base_url + 'Moderator/getAllAnnouncementsByView/' + 1)
		.then(response => {
			$scope.toWriters = response.data;
		}).catch(error => {
			swal("Sorry!", "An error has occured. Check console.", "error")
			console.log(error);
		})
	}

	$scope.getAnnouncementsToBoth = function () {
		$scope.toBoth = []; 
		$http.get(base_url + 'Moderator/getAllAnnouncementsByView/' + 2)
		.then(response => {
			$scope.toBoth = response.data;
		}).catch(error => {
			swal("Sorry!", "An error has occured. Check console.", "error")
			console.log(error);
		})
	}

	$scope.getAllAnnouncements = function () {
		$scope.announcements = []; 
		$http.get(base_url + 'Moderator/getAllAnnouncements')
		.then(response => {
			$scope.announcements = response.data;
		}).catch(error => {
			swal("Sorry!", "An error has occured. Check console.", "error")
			console.log(error);
		})
	}

	$scope.getData = function(refid, title, postexpiry, viewby, details, active) {
		(active == 1 ? $scope.active=true : $scope.active=false);
		$scope.refid = refid; 
		$scope.title = title; 
		$scope.postexpiry = postexpiry; 
		$scope.viewby = viewby;	
		$scope.details = details;	
		$scope.action = "update";	
	}


	$scope.cu_announcement = function () {
		var userData = {
			'refid'				: $scope.refid,
			'title'				: $scope.title,
			'details'  		: $scope.details,
			'dateposted'  : $scope.dateposted,
			'postedby'    : $scope.postedby,
			'viewby'   		: $scope.viewby,
			'active'   		: $scope.active,
			'postexpiry'  : $scope.postexpiry,
			'action'   		: $scope.action
		}
		$http.post(base_url + 'Moderator/cu_announcement', userData)
		.then(response => {

			$scope.getAllAnnouncements();
			$scope.getAnnouncementsToClients();
			$scope.clearForm();
			swal({
			  title: "Thank You!",
			  text: "Announcement Posted",
			  type: "success",
			  timer: 1300,
			  showConfirmButton: false
			});			
		}).catch(error => {
			swal("Sorry!", error, "error")
			console.log(error);
		})

	}

	$scope.del_announcement = function (refid) {
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
					$http.post(base_url + 'Moderator/del_announcement', {
							'refid': refid
						})
						.then(response => {
							swal({
							  title: "Deleted",
							  text: "User has been deleted.",
							  type: "success",
							  timer: 1300,
							  showConfirmButton: false
							});	
							$scope.getAllAnnouncements();
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
			
});




myApp.controller('OrderTableCtrl', function OrderTableCtrl($scope, $http, $window, $location, CommonProp) {

	$scope.currentPage = 1;
  $scope.pageSize = 10;

	$scope.clearForm = function() {
		$scope.title = "";
		$scope.viewby = "";
		$scope.details = "";
		$scope.postexpiry = "";
		$scope.refid = "";
		$scope.action = "add";
	}

	$scope.loadOrderData = function(refid) {
		localStorage.setItem("referenceKey", refid);
		$window.location.href = base_url + 'Moderator/ViewOrder';
	}

	$scope.loadWriters = function() {
		$scope.writers = []; 
		$http.get(base_url + 'Moderator/getAllWriters')
		.then(response => {
			$scope.writers = response.data;
		}).catch(error => {
			swal("Sorry!", "An error has occured. Check console.", "error")
			console.log(error);
		})
	}


	$scope.getAllForBidding = function() {
		$scope.orders = []; 
		$http.get(base_url + 'Moderator/getAllForBidding')
		.then(response => {
			$scope.orders = response.data;
		}).catch(error => {
			swal("Sorry!", "An error has occured. Check console.", "error")
			console.log(error);
		})
	}

	$scope.getOrderData = function() {
		var refid = localStorage.getItem("referenceKey");
		$scope.odata = [];
		$http.get(base_url + 'Moderator/getOrderDataInOrderTable/' + refid)
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
		$http.get(base_url + 'Moderator/getOrderBids/' + refid)
		.then(response => {
			$scope.bids = response.data;
		}).catch(error => {
			swal("Sorry!", "An error has occured. Check console.", "error")
			console.log(error);
		})
	}

	$scope.getAllByCategory = function(category) {
		$scope.menus = []; 
		$http.get(base_url + 'Moderator/getAllByCategory/' + category)
		.then(response => {
			$scope.menus = response.data;
		}).catch(error => {
			swal("Sorry!", "An error has occured. Check console.", "error")
			console.log(error);
		})
	}

	$scope.loadNumberOfReference = function() {
		$scope.numberofreferences = []; 
		$http.get(base_url + 'Moderator/getAllByCategory/numberofreference')
		.then(response => {
			$scope.numberofreferences = response.data;
		}).catch(error => {
			swal("Sorry!", "An error has occured. Check console.", "error")
			console.log(error);
		})
	}

	$scope.loadTimeOfDeadline = function() {
		$scope.deadlinets = []; 
		$http.get(base_url + 'Moderator/getAllByCategory/deadlinet')
		.then(response => {
			$scope.deadlinets = response.data;
		}).catch(error => {
			swal("Sorry!", "An error has occured. Check console.", "error")
			console.log(error);
		})
	}

	$scope.loadTypeOfReference = function() {
		$scope.typeofreferences = []; 
		$http.get(base_url + 'Moderator/getAllByCategory/typeofreference')
		.then(response => {
			$scope.typeofreferences = response.data;
		}).catch(error => {
			swal("Sorry!", "An error has occured. Check console.", "error")
			console.log(error);
		})
	}

	$scope.loadTypeOfOrder = function() {
		$scope.typeoforders = []; 
		$http.get(base_url + 'Moderator/getAllByCategory/typeoforder')
		.then(response => {
			$scope.typeoforders = response.data;
		}).catch(error => {
			swal("Sorry!", "An error has occured. Check console.", "error")
			console.log(error);
		})
	}


	$scope.loadLanguageLevel = function() {
		$scope.languagelevels = []; 
		$http.get(base_url + 'Moderator/getAllByCategory/languagelevel')
		.then(response => {
			$scope.languagelevels = response.data;
		}).catch(error => {
			swal("Sorry!", "An error has occured. Check console.", "error")
			console.log(error);
		})
	}

	$scope.loadAcademicLevel = function() {
		$scope.academiclevels = []; 
		$http.get(base_url + 'Moderator/getAllByCategory/academiclevel')
		.then(response => {
			$scope.academiclevels = response.data;
		}).catch(error => {
			swal("Sorry!", "An error has occured. Check console.", "error")
			console.log(error);
		})
	}

	$scope.loadNumberOfPages = function() {
		$scope.numberofpagess = []; 
		$http.get(base_url + 'Moderator/getAllByCategory/numberofpages')
		.then(response => {
			$scope.numberofpagess = response.data;
		}).catch(error => {
			swal("Sorry!", "An error has occured. Check console.", "error")
			console.log(error);
		})
	}

	$scope.loadPriority = function() {
		$scope.priorities = []; 
		$http.get(base_url + 'Moderator/getAllByCategory/priority')
		.then(response => {
			$scope.priorities = response.data;
		}).catch(error => {
			swal("Sorry!", "An error has occured. Check console.", "error")
			console.log(error);
		})
	}

	$scope.loadLineSpacing = function() {
		$scope.linespacings = []; 
		$http.get(base_url + 'Moderator/getAllByCategory/linespacing')
		.then(response => {
			$scope.linespacings = response.data;
		}).catch(error => {
			swal("Sorry!", "An error has occured. Check console.", "error")
			console.log(error);
		})
	}


	$scope.loadStyle = function() {
		$scope.styles = []; 
		$http.get(base_url + 'Moderator/getAllByCategory/style')
		.then(response => {
			$scope.styles = response.data;
		}).catch(error => {
			swal("Sorry!", "An error has occured. Check console.", "error")
			console.log(error);
		})
	}

	$scope.loadNeedPresentation = function() {
		$scope.presentations = []; 
		$http.get(base_url + 'Moderator/getAllByCategory/presentation')
		.then(response => {
			$scope.presentations = response.data;
		}).catch(error => {
			swal("Sorry!", "An error has occured. Check console.", "error")
			console.log(error);
		})
	}

	$scope.loadNumberOfSlide = function() {
		$scope.numberofslides = []; 
		$http.get(base_url + 'Moderator/getAllByCategory/numberofslide')
		.then(response => {
			$scope.numberofslides = response.data;
		}).catch(error => {
			swal("Sorry!", "An error has occured. Check console.", "error")
			console.log(error);
		})
	}

	$scope.loadIncludeReference = function() {
		$scope.includereferences = []; 
		$http.get(base_url + 'Moderator/getAllByCategory/includereference')
		.then(response => {
			$scope.includereferences = response.data;
		}).catch(error => {
			swal("Sorry!", "An error has occured. Check console.", "error")
			console.log(error);
		})
	}



	$scope.loadTypeOfWork = function() {
		$scope.typeofworks = []; 
		$http.get(base_url + 'Moderator/getAllByCategory/typeofwork')
		.then(response => {
			$scope.typeofworks = response.data;
		}).catch(error => {
			swal("Sorry!", "An error has occured. Check console.", "error")
			console.log(error);
		})
	}

	$scope.loadPlagiarism = function() {
		$scope.plagiarisms = []; 
		$http.get(base_url + 'Moderator/getAllByCategory/plagiarism')
		.then(response => {
			$scope.plagiarisms = response.data;
		}).catch(error => {
			swal("Sorry!", "An error has occured. Check console.", "error")
			console.log(error);
		})
	}

	$scope.loadFontSize = function() {
		$scope.fontsizes = []; 
		$http.get(base_url + 'Moderator/getAllByCategory/fontsize')
		.then(response => {
			$scope.fontsizes = response.data;
		}).catch(error => {
			swal("Sorry!", "An error has occured. Check console.", "error")
			console.log(error);
		})
	}



	$scope.submitToBidding = function () {
		var userData = {
			'refid'								: $scope.odata.refid,
			'subjectname'         : $scope.odata.subjectname,
      'topic'               : $scope.odata.topic,
      'typeofwork'          : $scope.odata.typeofwork,
      'numberofreference'   : $scope.odata.numberofreference,
      'typeoforder'         : $scope.odata.typeoforder,
      'typeofreference'     : $scope.odata.typeofreference,
      'languagelevel'       : $scope.odata.languagelevel,
      'academiclevel'       : $scope.odata.academiclevel,
      'numberofpages'       : $scope.odata.numberofpages,
      'priority'            : $scope.odata.priority,
      'linespacing'         : $scope.odata.linespacing,
      'style'               : $scope.odata.style,
      'deadlined'           : $scope.odata.deadlined,
      'deadlinet'           : $scope.odata.deadlinet,
      'fontsize'            : $scope.odata.fontsize,
      'plagiarism'          : $scope.odata.plagiarism,
      'presentation'        : $scope.odata.presentation,
      'numberofslide'       : $scope.odata.numberofslide,
      'includereference'    : $scope.odata.includereference,
      'pptformat'           : $scope.odata.pptformat,
      'details'             : $scope.odata.details,
      'amount'              : $scope.odata.amount,
      'maxbid'           		: $scope.odata.maxbid,
      'minbid'           		: $scope.odata.minbid,
      'writerid'            : $scope.odata.writerid,
		}
		$http.post(base_url + 'Moderator/submitToBidding', userData)
		.then(response => {

			$scope.getOrderData();
			$scope.clearForm();
			swal({
			  title: "Thank You!",
			  text: "Order is posted in Order Table",
			  type: "success",
			  timer: 1300,
			  showConfirmButton: false
			});			
		}).catch(error => {
			swal("Sorry!", error, "error")
			console.log(error);
		})

	}


	$scope.assignOrder = function (writerid, bid) {
		var refid = localStorage.getItem("referenceKey");
		var userData = {
			'refid' 							: refid,
			'writerid' 						: writerid,
			'writerpay' 					: bid,
		}
		$http.post(base_url + 'Moderator/assignOrder', userData)
		.then(response => {
			
			$scope.clearForm();
			swal({
			  title: "Success!",
			  text: "Writer Assigned to this Order",
			  type: "success",
			  timer: 1500,
			  showConfirmButton: false
			});			
		}).catch(error => {
			swal("Sorry!", error, "error")
			console.log(error);
		})

	}


	$scope.del_announcement = function (refid) {
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
					$http.post(base_url + 'Moderator/del_announcement', {
							'refid': refid
						})
						.then(response => {
							swal({
							  title: "Deleted",
							  text: "User has been deleted.",
							  type: "success",
							  timer: 1300,
							  showConfirmButton: false
							});	
							$scope.getAllAnnouncements();
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
			
});




myApp.controller('AdminChatCtrl', function AdminChatCtrl($scope, $http, $window, $location, $interval, CommonProp) {

	$scope.currentPage = 1;
  $scope.pageSize = 0;

  var promise = $interval(function() {
  	var userid = localStorage.getItem("sendTo");
  	$scope.getAdminChatByUser(userid);
  }, 3000)

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

	$scope.loadConversation = function(userid) {
		$scope.admichats = []; 
		localStorage.setItem("sendTo", userid);
		$scope.getAdminChatByUser(userid);
	}

	$scope.admichats = []; 
	$scope.getAdminChatByUser = function(userid) {
		$http.get(base_url + 'Moderator/getAdminChatByUser/' + userid)
		.then(response => {
			$scope.admichats = response.data;
		}).catch(error => {
			swal("Sorry!", "An error has occured. Check console.", "error")
			console.log(error);
		})
	}

	$scope.getAllWriters = function () {
		localStorage.clear();
		$scope.writers = []; 
		$http.get(base_url + 'Moderator/getAllWriters')
		.then(response => {
			$scope.writers = response.data;
		}).catch(error => {
			swal("Sorry!", "An error has occured. Check console.", "error")
			console.log(error);
		})
	}

	$scope.getAllClients = function () {
		localStorage.clear();
		$scope.clients = []; 
		$http.get(base_url + 'Moderator/getAllClients')
		.then(response => {
			$scope.clients = response.data;
		}).catch(error => {
			swal("Sorry!", "An error has occured. Check console.", "error")
			console.log(error);
		})
	}

	$scope.postCommentToAdmin = function () {
		$scope.fromid = localStorage.getItem("sendTo");
		var userData = {
										'fromid'		: $scope.fromid,
										'comment'		: $scope.comment,
									}
		$http.post(base_url + 'Moderator/postCommentToAdmin', userData)
		.then(response => {
			//$scope.getAdminChatByUser($scope.fromid);
			$scope.comment = "";
		}).catch(error => {
			swal("Sorry!", error, "error")
			console.log(error);
		})
	}			
});

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
		var ciController = base_url + 'Client/uploadAvatar';
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
			  text: "Profile Photo successfully uploaded",
			  type: "success",
			  timer: 1300,
			  showConfirmButton: false
			});	
			$scope.getClientData();
		}).catch(error => {
			swal("Sorry!", error, "error")
			console.log(error);
		})
	}

	$scope.clearForm = function() {
		$scope.fullname = "";
		$scope.username = "";
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


	$scope.getClientData = function () {
		$scope.client = []; 
		$http.get(base_url + 'Client/getClientData')
		.then(response => {
			$scope.client = response.data[0];
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
		var userData = {
			'userid'						: $scope.client.userid,
			'firstname'					: $scope.client.firstname,
			'lastname'					: $scope.client.lastname,
			'email'							: $scope.client.email,
			'mobile'						: $scope.client.mobile,
			'country'						: $scope.client.country,
		}
		$http.post(base_url + 'Client/u_profile', userData)
		.then(response => {
			
			$scope.getClientData();
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


myApp.controller('WritersCtrl', function WritersCtrl($scope, $http, $window, $location, CommonProp) {

	$scope.currentPage = 1;
  $scope.pageSize = 16;

	$scope.clearForm = function() {
		$scope.refid = "";
		$scope.engdetails = "";
		$scope.arbdetails = "";
		$scope.code = "";
		$scope.action = "add";
	}

	$scope.placeOrder = function(userid) {
		localStorage.setItem("writer", userid);
		$window.location.href = base_url + 'Client/SubmitOrder';
	}

	$scope.getAllWriters = function() {
		$scope.writers = [];
		$http.get(base_url + 'Client/getAllWriters')
		.then(response => {
			$scope.writers = response.data;
		}).catch(error => {
			swal("Sorry!", "An error has occured. Check console.", "error")
			console.log(error);
		})
	}

	$scope.loadWriterData = function(userid, usercode, firstname, lastname, state, country, citation, subjectarea, description, avatar) {
		$scope.userid = userid; 
		$scope.usercode = usercode; 
		$scope.firstname = firstname; 
		$scope.lastname = lastname; 
		$scope.state = state; 
		$scope.country = country; 
		$scope.citation = citation; 
		$scope.subjectarea = subjectarea; 
		$scope.description = description;	
		$scope.avatar = avatar;	
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


	$scope.submitBid = function () {
		var orderid = localStorage.getItem("referenceKey");
		(angular.isUndefined($scope.refid)==false ? $scope.action="update" : $scope.action="add");
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
					$http.post(base_url + 'Client/del_attachment', {
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
		$http.get(base_url + 'Client/getAttachmentsByOrder/' + refid)
		.then(response => {
			$scope.attachments = response.data;
		}).catch(error => {
			swal("Sorry!", "An error has occured. Check console.", "error")
			console.log(error);
		})
	}


			
});



myApp.controller('AnnouncementsCtrl', function AnnouncementsCtrl($scope, $http, $location, CommonProp) {

	$scope.currentPage = 1;
  $scope.pageSize = 5;



	$scope.getAnnouncementsToClients = function () {
		$scope.toClients = []; 
		$http.get(base_url + 'Client/getAllAnnouncementsByView')
		.then(response => {
			$scope.toClients = response.data;
		}).catch(error => {
			swal("Sorry!", "An error has occured. Check console.", "error")
			console.log(error);
		})
	}


			
});






myApp.controller('MyOrdersCtrl', function MyOrdersCtrl($scope, $http, $window, $location, $interval, CommonProp) {

	$scope.currentPage = 1;
  $scope.pageSize = 10;
	$scope.pptDtls = false;

	var promise = $interval(function() {

  	$scope.getCommentsByOrder();
  }, 5000)

  $scope.$on("$destroy", function(event) {
  	$interval.cancel(promise);
  })


	$scope.clearForm = function() {
		$scope.fullname = "";
		$scope.username = "";
		$scope.getAccountsList();
		$scope.action = "add";
	}

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

	$scope.showPPTDtls = function(presentation) {
		if(presentation == 'NO') {
	  	$scope.pptDtls = false;
		} else {
			$scope.pptDtls = true;
		}
	}

	$scope.loadOrderData = function(refid, status) {
		localStorage.setItem("referenceKey", refid);
		if(status == 0) {

			$window.location.href = base_url + 'Client/UpdateOrder';
		} else {
			$window.location.href = base_url + 'Client/ViewOrder';
		}
	}

	$scope.getOrderData = function() {
		var refid = localStorage.getItem("referenceKey");
		$scope.odata = [];
		$http.get(base_url + 'Client/getOrderData/' + refid)
		.then(response => {
			$scope.odata = response.data[0];
			$scope.refid = $scope.odata.refid;
			if( $scope.odata.presentation == 'NO') {
		  	$scope.pptDtls = false;
			} else {
				$scope.pptDtls = true;
			}
			$scope.action = "update";
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

	$scope.loadPPTFormat = function() {
		$scope.pptformats = []; 
		$http.get(base_url + 'Moderator/getAllByCategory/pptformat')
		.then(response => {
			$scope.pptformats = response.data;
		}).catch(error => {
			swal("Sorry!", "An error has occured. Check console.", "error")
			console.log(error);
		})
	}


	$scope.getOrdersByClient = function () {
		$scope.myorders = []; 
		$http.get(base_url + 'Client/getOrdersByClient')
		.then(response => {
			$scope.myorders = response.data;
		}).catch(error => {
			swal("Sorry!", "An error has occured. Check console.", "error")
			console.log(error);
		})
	}


	$scope.cu_order = function () {
		var writerid = localStorage.getItem("writer");
		(angular.isUndefined(writerid)==false ? $scope.writerid=writerid : $scope.writerid="");
		(angular.isUndefined($scope.action)==false ? $scope.action="update" : $scope.action="add");
		if ($scope.presentation == 'NO') {
      $scope.numberofslide = "";
      $scope.includereference = "";
      $scope.pptformat = "";
		};
		var userData = {
			'refid' 							: $scope.odata.refid,
			'orderid' 						: $scope.odata.orderid,
			'clientid'      			: $scope.odata.clientid,
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
      'attachmentdetails'   : $scope.odata.attachmentdetails,
      'rating'              : $scope.odata.rating,
      'amount'              : $scope.odata.amount,
      'writerpay'           : $scope.odata.writerpay,
      'writerid'            : $scope.writerid,
			'action'							: $scope.action
		}
		$http.post(base_url + 'Client/cu_order', userData)
		.then(response => {
			$scope.uploadFiles(response.data);
				
		}).catch(error => {
			swal("Sorry!", error, "error")
			console.log(error);
		})

	}

	$scope.comments = [];
	$scope.getCommentsByOrder = function() {
		var refid = localStorage.getItem("referenceKey");
		$http.get(base_url + 'Client/getAllCommentsByOrder/' + refid)
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
		$http.post(base_url + 'Client/postComment', userData)
		.then(response => {
			$scope.comment = "";
			swal("Success!", "Comment Posted", "success")
		}).catch(error => {
			console.log(error);
		})
	}

			
});
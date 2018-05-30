var myApp = angular.module('hrApp', ['angularUtils.directives.dirPagination', 'toaster', 'ngAnimate']);


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

myApp.service('CommonProp', ['$location', function($location) {

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





myApp.controller('AccountsCtrl', function AccountsCtrl($scope, $http, $location, $window, CommonProp) {

	$scope.clearForm = function() {
		$scope.fullname = "";
		$scope.username = "";
		$scope.password = "";
		$scope.departmentid = "";
		$scope.email = "";
		$scope.mobile = "";
		$scope.getUserList();
		$scope.action = "add";
	}

	$scope.viewProfile = function(userid) {
		localStorage.setItem("userid", userid);
		$window.location.href = base_url +'Admin/user_profile/' + userid;
	}

	

	$scope.getUserList = function () {
		$scope.accountsList = []; 
		$http.get(base_url + 'Admin/getUserList')
		.then(response => {
			$scope.accountsList = response.data;
		}).catch(error => {
			swal("Sorry!", "An error has occured. Check console.", "error")
			console.log(error);
		})
	}

	$scope.getCompanyDepts = function () {
		$scope.departments = []; 
		$http.get(base_url + 'Admin/getCompanyDepts')
		.then(response => {
			$scope.departments = response.data;
		}).catch(error => {
			swal("Sorry!", "An error has occured. Check console.", "error")
			console.log(error);
		})
	}

	$scope.getAdminDetails = function () {
		$http.get(base_url + 'Admin/getAdminDetails')
		.then(response => {
			var adminData = response.data[0];
			$scope.userid 			= adminData.userid;
			$scope.fullname 		= adminData.fullname;
			$scope.username 		= adminData.username;
			$scope.departmentid = adminData.departmentid;
			$scope.email 				= adminData.email;
			$scope.mobile 			= adminData.mobile;
		}).catch(error => {
			swal("Sorry!", "An error has occured. Check console.", "error")
			console.log(error);
		})
	}

	$scope.getAccountData = function (userid, fullname, departmentid, email, mobile, username) {
		$scope.userid = userid;
		$scope.fullname = fullname;
		$scope.departmentid = departmentid;
		$scope.email = email;
		$scope.mobile = mobile;
		$scope.username = username;
		$scope.action = "update";
	}

	$scope.changePassword = function () {

		if(!$scope.newpassword == "" ||
			!$scope.confirmpassword == ""){

			if($scope.newpassword == $scope.confirmpassword) {
				var userData = {
					'password': $scope.newpassword
				}
				$http.post(base_url + 'Admin/changePassword', userData)
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
		}else {
			swal({
				  title: "Sorry!",
				  text: "All Textfields are required.",
				  type: "error",
				  timer: 1300,
				  showConfirmButton: false
				});	
		}
		
	}

	$scope.updateAdmin = function () {
			
		var userData = {
			'userid'	: $scope.userid,
			'fullname'	: $scope.fullname,
			'username'	: $scope.username,
			'email'		: $scope.email,
			'mobile'	: $scope.mobile
		}
		$http.post(base_url + 'Admin/updateAdmin', userData)
		.then(response => {
			$scope.clearForm();
			$("#CompanyLogoModal").modal("toggle");
			swal({
			  title: "Thank You!",
			  text: "Your Admin Account has been updated",
			  type: "success",
			  timer: 1300,
			  showConfirmButton: false
			}, function() {
				$window.location.href = base_url +'Admin';
			});			
		}).catch(error => {
			swal("Sorry!", error, "error")
			console.log(error);
		})

	}

	$scope.cu_CompanyUser = function () {
			
		var userData = {
			'userid'				: $scope.userid,
			'fullname'			: $scope.fullname,
			'username'			: $scope.username,
			'departmentid'	: $scope.departmentid,
			'password'			: $scope.password,
			'email'					: $scope.email,
			'mobile'				: $scope.mobile,
			'action'  			: $scope.action
		}
		$http.post(base_url + 'Admin/cu_CompanyUser', userData)
		.then(response => {
			$scope.clearForm();
			if ($scope.action == "add") {
				$scope.message = "New Account Information Saved"
			} else {
				$scope.message = "User " + $scope.username + " has been Updated"
			}

			$("#AccountsModal").modal("toggle");
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

	$scope.restore = function(userid, fullname) {
		
		$http.post(base_url + 'Admin/restoreUser', {
				'userid': userid
			})
			.then(response => {
				swal({
				  title: "Restored",
				  text: "You have successfully restored " + fullname,
				  type: "success",
				  timer: 1300,
				  showConfirmButton: false
				});	
				$scope.getUserList();
			})
			.catch(error => {
				swal("Sorry!", "An error has occured. Check console.", "error")
				console.log(error);
			})


	}

	$scope.delete = function (userid) {
		swal({
				title:"Are you sure?",
				text: "You are about to deactivate a User.",
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
					$http.post(base_url + 'Admin/deleteUser', {
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
							$scope.getUserList();
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

myApp.controller('DepartmentsCtrl', function DepartmentsCtrl($scope, $http, $location, $window, CommonProp) {

	$scope.currentPage = 1;
  $scope.pageSize = 10;

	$scope.clearForm = function() {
		$scope.code = "";
		$scope.title = "";
		$scope.active = "";
		$scope.action = "add";
	}

	$scope.getDepartments = function () {
		$scope.departments = []; 
		$http.get(base_url + 'Admin/getDepartments')
		.then(response => {
			$scope.departments = response.data;
		}).catch(error => {
			swal("Sorry!", "An error has occured. Check console.", "error")
			console.log(error);
		});
	}




	$scope.getDepartmentData = function (refid, code, title, active) {
		$scope.refid = refid;
		$scope.code = code;
		$scope.title = title;
		$scope.active = active;
		$scope.action = "update";
	}

	$scope.deactivate = function (refid, deactivate) {
			
		var userData = {
			'refid'				: refid,
			'deactivate'	: deactivate
		}
		var msg = "";
		$http.post(base_url + 'Admin/deactivateDept', userData)
		.then(response => {
			$scope.getCompanyDepts();
			(deactivate == 0 ? msg="deactivated" : msg="restored")
			swal({
			  title: "Success",
			  text: "Record " + msg,
			  type: "success",
			  timer: 1300,
			  showConfirmButton: false
			});		

		}).catch(error => {
			swal("Sorry!", error, "error")
			console.log(error);
		})

	}

	$scope.cu_department = function () {	
		var deptData = {
			'refid'			: $scope.refid,
			'code'			: $scope.code,
			'title'			: $scope.title,
			'active'		: $scope.active,
			'action'  	: $scope.action
		}
		$http.post(base_url + 'Admin/cu_Departments', deptData)
		.then(response => {
			$scope.clearForm();
			if ($scope.action == "add") {
				$scope.message = "New Record Saved"
			} else {
				$scope.message = "Record Updated"
			}

			$("#DepartmentModal").modal("toggle");
			$scope.getDepartments();
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


	$scope.del_department = function (refid) {
		swal({
				title:"Are you sure?",
				text: "You are about to permanently delete a record.",
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
					$http.post(base_url + 'Admin/del_department', {
							'refid': refid
						})
						.then(response => {
							swal({
							  title: "Deleted",
							  text: "Record permanently deleted.",
							  type: "success",
							  timer: 1300,
							  showConfirmButton: false
							});	
							$scope.getDepartments();
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



myApp.controller('CompanyInfoCtrl', function CompanyInfoCtrl($scope, $http, $location, $window, CommonProp, toaster) {

	$scope.toast = function(toast_type, toast_title, toast_message) {
		toaster.pop({
			          type: toast_type,
			          title: toast_title,
			          body: toast_message,
			          timeout: 5000
			      	});
	}

	$scope.clearForm = function() {
		$scope.dis_profile();
	}

	$scope.dis_profile = function () { 
		($scope.ciForm = false ? '' : $scope.ciForm = true);
		$scope.update = false;
		$scope.btnEdit = true;
	}

	$scope.enb_profile = function () { 
		
		$scope.ciForm = false;
		$scope.update = true;
		$scope.btnEdit = false;
	}

	$scope.getCompanyInfo = function () {
		$scope.dis_profile(); 
		$http.get(base_url + 'Admin/getCompanyInfo')
		.then(response => {
			var compInfo = response.data[0];
			$scope.companyname = compInfo.companyname;
			$scope.website = compInfo.website;
			$scope.tel = compInfo.tel;
			$scope.fax = compInfo.fax;
			$scope.mob = compInfo.mob;
			$scope.parcelid = compInfo.parcelid;
			$scope.pobox = compInfo.pobox;
			$scope.address = compInfo.address;
			$scope.description = compInfo.description;
			$scope.logo = compInfo.logo;
			
		}).catch(error => {
			swal("Sorry!", "An error has occured. Check console.", "error")
			console.log(error);
		})
	}


	$scope.cu_CompProf = function () {	
		($scope.refid == undefined ? $scope.action = "add" : $scope.action = "update");
		var dataArray = {
			'refid' 			: $scope.refid,
			'companyname' : $scope.companyname,
			'website' 		: $scope.website,
			'tel' 				: $scope.tel,
			'fax' 				: $scope.fax,
			'mob' 				: $scope.mob,
			'parcelid' 		: $scope.parcelid,
			'pobox' 			: $scope.pobox,
			'address' 		: $scope.address,
			'description' : $scope.description,
			'logo' 				: $scope.logo,
			'action' 			: $scope.action,
		}
		$http.post(base_url + 'Admin/cu_CompProf', dataArray)
		.then(response => {
			$scope.getCompanyInfo();
			$scope.toast("success", "", "You have successfully updated Company Information.")	
			
		}).catch(error => {
			swal("Sorry!", error, "error")
			console.log(error);
		})
	}
	
});






myApp.controller('LetterHeadCtrl', function LetterHeadCtrl($scope, $http, $location, $window, toaster) {

	

	$scope.uploadHeader = function(refid) {
		var type = "_header";
		var empid = localStorage.getItem("empid");
		var ciController = base_url + 'Admin/do_uploadFile/' + type;
		var formData = new FormData();
		angular.forEach($scope.hfiles, function(file) {
			formData.append('file', file);
			var fname = file.name;
			$scope.filetype = fname.substr(fname.lastIndexOf('.')+1);
		});
		$http.post(ciController, formData, {
			transformRequest: angular.identity,
			headers: {'Content-Type': undefined, 'Process-Data':false}
		}).then(function(response) {
			
		}).catch(error => {
			swal("Sorry!", error, "error")
			console.log(error);
		})
	}

	$scope.uploadFooter = function() {
		var type = "_footer";
		var empid = localStorage.getItem("empid");
		var ciController = base_url + 'Admin/do_uploadFile/' + type;
		var formData = new FormData();
		angular.forEach($scope.ffiles, function(file) {
			formData.append('file', file);
			var fname = file.name;
			$scope.filetype = fname.substr(fname.lastIndexOf('.')+1);
		});
		$http.post(ciController, formData, {
			transformRequest: angular.identity,
			headers: {'Content-Type': undefined, 'Process-Data':false}
		}).then(function(response) {
			
		}).catch(error => {
			swal("Sorry!", error, "error")
			console.log(error);
		})
	}

	$scope.getLetterHead = function() {
		$http.get(base_url + 'Admin/getLetterHead')
		.then(response => {
			var lh = response.data[0];
			$scope.header = lh.header;
			$scope.footer = lh.footer;
		}).catch(error => {
			swal("Sorry!", "An error has occured. Check console.", "error")
			console.log(error);
		});
	}


	$scope.cu_letterhead = function() {	
		var empid = localStorage.getItem("empid");
		
		if(angular.isUndefined($scope.hfiles) == false) {
			$scope.h_fileType = $scope.hfiles[0].name.substring($scope.hfiles[0].name.lastIndexOf(".") + 1);
		}
		if(angular.isUndefined($scope.ffiles) == false) {
			$scope.f_fileType = $scope.ffiles[0].name.substring($scope.ffiles[0].name.lastIndexOf(".") + 1);
		}
		(angular.isUndefined($scope.refid) == false ? $scope.action="update" : $scope.action="add");
		var deptData = {
			'refid'							: $scope.refid,
			'h_fileType'				: $scope.h_fileType,
			'f_fileType'				: $scope.f_fileType,
			'action'  					: $scope.action
		}
		$http.post(base_url + 'Admin/cu_letterhead', deptData)
		.then(response => {
				$scope.uploadHeader();
				$scope.uploadFooter();
			
			
		}).catch(error => {
			swal("Sorry!", error, "error")
			console.log(error);
		})
	}


	$scope.del_labourcard = function (refid, empid, photo) {
		alert(photo)
		swal({
				title:"Are you sure?",
				text: "You are about to permanently delete this record.",
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
				$http.post(base_url + 'Employee/del_labourcard', {
						'refid': refid,
						'empid': empid,
						'photo': photo
					})
					.then(response => {
						$scope.clearForm();
						$scope.getLabourCard();
						swal({
						  title: "Deleted",
						  text: "Record permanently deleted.",
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
			}
		});
	}
});






myApp.controller('ImmiCardCtrl', function ImmiCardCtrl($scope, $http, $location, $window, CommonProp, toaster) {

	$scope.toast = function(toast_type, toast_title, toast_message) {
		toaster.pop({
			          type: toast_type,
			          title: toast_title,
			          body: toast_message,
			          timeout: 5000
			      	});
	}


	$scope.uploadFile = function() {
		var type = "_immigration_card";
		var ciController = base_url + 'Admin/do_uploadFile/' + type;
		var formData = new FormData();
		angular.forEach($scope.files, function(file) {
			formData.append('file', file);
			var fname = file.name;
			$scope.filetype = fname.substr(fname.lastIndexOf('.')+1);
		});
		$http.post(ciController, formData, {
			transformRequest: angular.identity,
			headers: {'Content-Type': undefined, 'Process-Data':false}
		}).then(function(response) {
			//alert(response);
		}).catch(error => {
			swal("Sorry!", error, "error")
			console.log(error);
		})
	}

	$scope.clearForm = function() {
		$scope.dis_profile();
	}

	$scope.dis_profile = function () { 
		($scope.ciForm = false ? '' : $scope.ciForm = true);
		$scope.update = false;
		$scope.btnEdit = true;
	}

	$scope.enb_profile = function () { 
		
		$scope.ciForm = false;
		$scope.update = true;
		$scope.btnEdit = false;
	}

	$scope.getImmiCard = function () {
		$scope.dis_profile(); 
		$http.get(base_url + 'Admin/getImmiCard')
		.then(response => {
			var ic = response.data[0];
			$scope.refid = ic.refid;
			$scope.ximmigrationcard_number = ic.immigrationcard_number;
			$scope.xexpirydate = ic.expirydate;
			$scope.xauthorizedperson = ic.authorizedperson;
			$scope.xrole = ic.role;
			
		}).catch(error => {
			swal("Sorry!", "An error has occured. Check console.", "error")
			console.log(error);
		})
	}


	$scope.cu_immicard = function () {	
		($scope.refid == undefined ? $scope.action = "add" : $scope.action = "update");
		var dataArray = {
			'refid' 								 : $scope.refid,
			'immigrationcard_number' : $scope.immigrationcard_number,
			'expirydate' 						 : $scope.expirydate,
			'authorizedperson' 			 : $scope.authorizedperson,
			'role' 									 : $scope.role,
			'filetype'							 : $scope.filetype,
			'action' 								 : $scope.action,
		}
		$http.post(base_url + 'Admin/cu_immicard', dataArray)
		.then(response => {
			$scope.getImmiCard();
			$scope.toast("success", "Success!", "You have successfully updated Company Immigration Card.")	
			
		}).catch(error => {
			swal("Sorry!", error, "error")
			console.log(error);
		})
	}
	
});


myApp.controller('LicMembersCtrl', function LicMembersCtrl($scope, $http, $location, $window, CommonProp) {

	$scope.clearForm = function() {
		$scope.srnumber = "";
		$scope.fullname = "";
		$scope.nationality = "";
		$scope.role = "";
		$scope.share = "";
		$scope.action = "add";
	}

	$scope.loadNationalities = function() {
		$scope.nationalities = []; 
		$http.get(base_url + 'assets/js/nationalities.json')
		.then(response => {
			$scope.nationalities = response.data;
		}).catch(error => {
			swal("Sorry!", "An error has occured. Check console.", "error")
			console.log(error);
		});
	}

	$scope.getCompanyLicMembers = function () { 
		$scope.licmembers = [];
		$http.get(base_url + 'Admin/getCompanyLicMembers')
		.then(response => {
			$scope.licmembers = response.data;
			
		}).catch(error => {
			
			console.log(error);
		})
	}

	$scope.getCompanyLicMembersData = function (refid, srnumber, fullname, nationality, role, share) { 
		$scope.refid  = refid;
		$scope.srnumber  = srnumber;
		$scope.fullname  = fullname;
		$scope.nationality  = nationality;
		$scope.role  = role;
		$scope.share  = share;
		$scope.action  = "update";
	}

	$scope.cu_LicMembers = function () {	
		
		($scope.refid == undefined ? $scope.action = "add" : $scope.action = "update");
		var dataArray = {
			'refid'					: $scope.refid,
			'srnumber'			: $scope.srnumber,
			'fullname'			: $scope.fullname,
			'nationality'		: $scope.nationality,
			'role'					: $scope.role,
			'share'					: $scope.share,
			'action'  			: $scope.action
		}
		$http.post(base_url + 'Admin/cu_LicMembers', dataArray)
		.then(response => {
			$scope.getCompanyLicMembers();
			$("#LicMembersModal").modal("toggle");
			swal({
			  title: "Thank You!",
			  text: $scope.message,
			  type: "success",
			  timer: 1300,
			  showConfirmButton: false
			});			
			$scope.clearForm();
		}).catch(error => {
			swal("Sorry!", error, "error")
			console.log(error);
		})
	}

	$scope.delete = function (refid) {
		swal({
			title:"Are you sure?",
			text: "You are about to permanently delete a record.",
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
				$http.post(base_url + 'Admin/deleteLicMembers', {
						'refid': refid
					})
					.then(response => {
						swal({
						  title: "Deleted",
						  text: "Record permanently deleted.",
						  type: "success",
						  timer: 1300,
						  showConfirmButton: false
						});	
						$scope.getCompanyLicMembers();
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



myApp.controller('LicActivityCtrl', function LicActivityCtrl($scope, $http, $location, $window, CommonProp) {

	$scope.clearForm = function() {
		$scope.activitycode = "";
		$scope.activityname = "";
		$scope.action = "add";
	}

	$scope.getCompanyLicActivity = function () { 
		$scope.licactivity = [];
		$http.get(base_url + 'Admin/getCompanyLicActivity')
		.then(response => {
			$scope.licactivity = response.data;
		}).catch(error => {
			console.log(error);
		})
	}

	$scope.getCompanyLicActivityData = function (refid, activitycode, activityname) { 
		$scope.refid  = refid;
		$scope.activitycode = activitycode;
		$scope.activityname = activityname;
		$scope.action  = "update";
	}

	$scope.cu_LicActivity = function () {	
		
		($scope.refid == undefined ? $scope.action = "add" : $scope.action = "update");
		var dataArray = {
			'refid'					: $scope.refid,
			'activitycode'	: $scope.activitycode,
			'activityname'	: $scope.activityname,
			'action'  			: $scope.action
		}
		$http.post(base_url + 'Admin/cu_LicActivity', dataArray)
		.then(response => {
			$scope.getCompanyLicActivity();
			$("#LicActivityModal").modal("toggle");
			swal({
			  title: "Thank You!",
			  text: $scope.message,
			  type: "success",
			  timer: 1300,
			  showConfirmButton: false
			});			
			$scope.clearForm();
		}).catch(error => {
			swal("Sorry!", error, "error")
			console.log(error);
		})
	}

	$scope.delete = function (refid) {
		swal({
			title:"Are you sure?",
			text: "You are about to permanently delete a record.",
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
				$http.post(base_url + 'Admin/deleteLicActivity', {
						'refid': refid
					})
					.then(response => {
						swal({
						  title: "Deleted",
						  text: "Record permanently deleted.",
						  type: "success",
						  timer: 1300,
						  showConfirmButton: false
						});	
						$scope.getCompanyLicActivity();
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





myApp.controller('IACCtrl', function IACCtrl($scope, $http, $location, $window, CommonProp) {

	$scope.clearForm = function() {
		$scope.assignedto = "";
		$scope.title = "";
		$scope.task_dp = "";
		$scope.description = "";
		$scope.priority = "";
		$scope.action = "add";
	}

	$scope.disIACForm = function () { 
		($scope.iacForm = false ? '' : $scope.iacForm = true);
		$scope.update = false;
		$scope.editIAC = true;
	}

	$scope.enbIACForm = function () { 
		($scope.iacForm = true ? '' : $scope.iacForm = false);
		$scope.update = true;
		$scope.editIAC = false;
	}

	$scope.getCompanyIAC = function () { 
		$scope.iacForm = true;
		$scope.editIAC = true;
		$http.get(base_url + 'Admin/getCompanyIAC')
		.then(response => {
			var iac = response.data[0];
			
			$scope.refid = iac.refid;
			$scope.ianumber = iac.ianumber;
			$scope.licensetype = iac.licensetype;
			$scope.legaltype = iac.legaltype;
			$scope.dateofapproval = iac.dateofapproval;
			$scope.dateofexpiry = iac.dateofexpiry;
			$scope.mainlicense = iac.mainlicense;
			$scope.amountpaid = iac.amountpaid;
			

		}).catch(error => {
			
			console.log(error);
		})
	}

	$scope.cu_iac = function () {	
		
		($scope.refid == undefined ? $scope.action = "add" : $scope.action = "update");
		var dataArray = {
			'refid'							: $scope.refid,
			'ianumber'					: $scope.ianumber,
			'licensetype'				: $scope.licensetype,
			'legaltype'					: $scope.legaltype,
			'dateofapproval'		: $scope.dateofapproval,
			'dateofexpiry'			: $scope.dateofexpiry,
			'mainlicense'				: $scope.mainlicense,
			'amountpaid'				: $scope.amountpaid,
			'action'  					: $scope.action
		}
		$http.post(base_url + 'Admin/cu_iac', dataArray)
		.then(response => {
			$scope.disIACForm();
			$scope.getCompanyIAC();
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

myApp.controller('EDLCtrl', function EDLCtrl($scope, $http, $location, $window, CommonProp) {

	$scope.uploadFile = function() {
		var type = "_economic_department_license";
		var ciController = base_url + 'Admin/do_uploadFile/' + type;
		var formData = new FormData();
		angular.forEach($scope.files, function(file) {
			formData.append('file', file);
			var fname = file.name;
			$scope.filetype = fname.substr(fname.lastIndexOf('.')+1);
		});
		$http.post(ciController, formData, {
			transformRequest: angular.identity,
			headers: {'Content-Type': undefined, 'Process-Data':false}
		}).then(function(response) {
			//alert(response);
		}).catch(error => {
			swal("Sorry!", error, "error")
			console.log(error);
		})
	}

	$scope.clearForm = function() {
		$scope.assignedto = "";
		$scope.title = "";
		$scope.task_dp = "";
		$scope.description = "";
		$scope.priority = "";
		$scope.action = "add";
	}

	$scope.disEDLForm = function () { 
		($scope.edlForm = false ? '' : $scope.edlForm = true);
		$scope.edlupdate = false;
		$scope.editEDL = true;
	}

	$scope.enbEDLForm = function () { 
		($scope.edlForm = true ? '' : $scope.edlForm = false);
		$scope.edlupdate = true;
		$scope.editEDL = false;
	}

	$scope.getCompanyEDL = function () { 
		$scope.edlForm = true;
		$scope.editEDL = true;
		$http.get(base_url + 'Admin/getCompanyEDL')
		.then(response => {
			var edl = response.data[0];
			
			$scope.refid = edl.refid;
			$scope.licensenumber = edl.licensenumber;
			$scope.tradename = edl.tradename;
			$scope.legaltype = edl.legaltype;
			$scope.dateofissue = edl.dateofissue;
			$scope.dateofexpiry = edl.dateofexpiry;
			$scope.mainlicense = edl.mainlicense;
			$scope.intllicense = edl.intllicense;
			$scope.dcci = edl.dcci;
			$scope.registernumber = edl.registernumber;
			

		}).catch(error => {
			
			console.log(error);
		})
	}

	$scope.cu_edl = function () {	
		
		($scope.refid == undefined ? $scope.action = "add" : $scope.action = "update");
		$scope.uploadFile();
		var dataArray = {
			'refid' 				: $scope.refid,
			'licensenumber' : $scope.licensenumber,
			'tradename' 		: $scope.tradename,
			'legaltype' 		: $scope.legaltype,
			'dateofissue' 	: $scope.dateofissue,
			'dateofexpiry'  : $scope.dateofexpiry,
			'mainlicense' 	: $scope.mainlicense,
			'intllicense' 	: $scope.intllicense,
			'dcci' 					: $scope.dcci,
			'registernumber': $scope.registernumber,
			'filetype'			: $scope.filetype,
			'action'				: $scope.action
		}
		$http.post(base_url + 'Admin/cu_edl', dataArray)
		.then(response => {
			$scope.disEDLForm();
			$scope.getCompanyEDL();
			console.log(response);
			swal({
			  title: "Success!",
			  text: "Business License Information saved.",
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



myApp.controller('EjariCtrl', function EjariCtrl($scope, $http, $location, $window, CommonProp) {

	$scope.uploadFile = function() {
		var type = "_ejari";
		var ciController = base_url + 'Admin/do_uploadFile/' + type;
		var formData = new FormData();
		angular.forEach($scope.files, function(file) {
			formData.append('file', file);
			var fname = file.name;
			$scope.filetype = fname.substr(fname.lastIndexOf('.')+1);
		});
		$http.post(ciController, formData, {
			transformRequest: angular.identity,
			headers: {'Content-Type': undefined, 'Process-Data':false}
		}).then(function(response) {
			//alert(response);
		}).catch(error => {
			swal("Sorry!", error, "error")
			console.log(error);
		})
	}

	$scope.clearForm = function() {
		$scope.assignedto = "";
		$scope.title = "";
		$scope.task_dp = "";
		$scope.description = "";
		$scope.priority = "";
		$scope.action = "add";
	}

	$scope.loadNationalities = function() {
		$scope.nationalities = []; 
		$http.get(base_url + 'assets/js/nationalities.json')
		.then(response => {
			$scope.nationalities = response.data;
		}).catch(error => {
			swal("Sorry!", "An error has occured. Check console.", "error")
			console.log(error);
		})
	}

	$scope.disEjariForm = function () { 
		($scope.ejariForm = false ? '' : $scope.ejariForm = true);
		$scope.ejariupdate = false;
		$scope.editEDL = true;
	}

	$scope.enbEjariForm = function () { 
		($scope.ejariForm = true ? '' : $scope.ejariForm = false);
		$scope.ejariupdate = true;
		$scope.editEDL = false;
	}

	$scope.getCompanyEjari = function () { 
		$scope.ejariForm = true;
		$scope.editEjari = true;
		$http.get(base_url + 'Admin/getCompanyEjari')
		.then(response => {
			var ejari = response.data[0];
			
			$scope.refid		= ejari.refid;
			$scope.contractnumber		= ejari.contractnumber;
			$scope.registrationdate		= ejari.registrationdate;
			$scope.ownername		= ejari.ownername;
			$scope.ownernumber		= ejari.ownernumber;
			$scope.nationality		= ejari.nationality;
			$scope.lessor_name		= ejari.lessor_name;
			$scope.lessor_issuer		= ejari.lessor_issuer;
			$scope.lessor_number		= ejari.lessor_number;
			$scope.lessor_tel		= ejari.lessor_tel;
			$scope.lessor_email		= ejari.lessor_email;
			$scope.startingdate		= ejari.startingdate;
			$scope.endingdate		= ejari.endingdate;
			$scope.contractamount		= ejari.contractamount;
			$scope.securitydeposit		= ejari.securitydeposit;
			$scope.actualamount		= ejari.actualamount;
			$scope.annualamount		= ejari.annualamount;
			$scope.tenantnumber		= ejari.tenantnumber;
			$scope.iacid		= ejari.iacid;
			$scope.issuer		= ejari.issuer;
			$scope.bldgname		= ejari.bldgname;
			$scope.landarea		= ejari.landarea;
			$scope.plotnumber		= ejari.plotnumber;
			$scope.landdm		= ejari.landdm;
			$scope.makani		= ejari.makani;
			$scope.prop_number		= ejari.prop_number;
			$scope.prop_type		= ejari.prop_type;
			$scope.prop_subtype		= ejari.prop_subtype;
			$scope.prop_usage		= ejari.prop_usage;
			$scope.size		= ejari.size;
			$scope.premisenumber		= ejari.premisenumber;

		}).catch(error => {
			
			console.log(error);
		})
	}

	$scope.cu_Ejari = function () {	
		
		($scope.refid == undefined ? $scope.action = "add" : $scope.action = "update");
		$scope.uploadFile();
		var dataArray = {
			'refid' 						: $scope.refid,
			'contractnumber' 		: $scope.contractnumber,
			'registrationdate' 	: $scope.registrationdate,
			'ownername' 				: $scope.ownername,
			'ownernumber' 			: $scope.ownernumber,
			'nationality' 			: $scope.nationality,
			'lessor_name' 			: $scope.lessor_name,
			'lessor_issuer' 		: $scope.lessor_issuer,
			'lessor_number' 		: $scope.lessor_number,
			'lessor_tel' 				: $scope.lessor_tel,
			'lessor_email' 			: $scope.lessor_email,
			'startingdate' 			: $scope.startingdate,
			'endingdate' 				: $scope.endingdate,
			'contractamount' 		: $scope.contractamount,
			'securitydeposit' 	: $scope.securitydeposit,
			'actualamount' 			: $scope.actualamount,
			'annualamount' 			: $scope.annualamount,
			'tenantnumber' 			: $scope.tenantnumber,
			'iacid' 						: $scope.iacid,
			'issuer' 						: $scope.issuer,
			'bldgname' 					: $scope.bldgname,
			'landarea' 					: $scope.landarea,
			'plotnumber' 				: $scope.plotnumber,
			'landdm' 						: $scope.landdm,
			'makani' 						: $scope.makani,
			'prop_number' 			: $scope.prop_number,
			'prop_type' 				: $scope.prop_type,
			'prop_subtype' 			: $scope.prop_subtype,
			'prop_usage' 				: $scope.prop_usage,
			'size' 							: $scope.size,
			'premisenumber' 		: $scope.premisenumber,
			'filetype' 					: $scope.filetype,
			'action'						: $scope.action
		}
		$http.post(base_url + 'Admin/cu_ejari', dataArray)
		.then(response => {
			$scope.disEjariForm();
			$scope.getCompanyEjari();
			swal({
			  title: "Success!",
			  text: "Business License Information saved.",
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

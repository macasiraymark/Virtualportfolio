var myApp = angular.module('hrApp', ['angularUtils.directives.dirPagination', 'toaster', 'ngAnimate']);


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





myApp.controller('EmployeeInfoCtrl', function EmployeeInfoCtrl($scope, $http, $location, $window, toaster) {

	$scope.currentPage = 1;
  $scope.pageSize = 10;

  

  $scope.loadPersonalInfo = function() {
  	$scope.heading_title = "Personal Information";
  	$scope.panel_personalinfo = true;

  	$scope.panel_passport = false;
  	$scope.panel_emiratesid = false;
  	$scope.panel_labourcard = false;
  	$scope.panel_visa = false;
  	$scope.panel_insurance = false;
  	$scope.panel_healthcard = false;

  }

  $scope.loadPassport = function() {
  	$scope.heading_title = "Passport Details";
  	$scope.panel_passport = true;

  	$scope.panel_personalinfo = false;
  	$scope.panel_emiratesid = false;
  	$scope.panel_labourcard = false;
  	$scope.panel_visa = false;
  	$scope.panel_insurance = false;
  	$scope.panel_healthcard = false;
  }


  $scope.loadEmiratesID = function() {
  	$scope.heading_title = "Passport Details";
  	$scope.panel_emiratesid = true;

  	$scope.panel_personalinfo = false;
  	$scope.panel_passport = false;
  	$scope.panel_labourcard = false;
  	$scope.panel_visa = false;
  	$scope.panel_insurance = false;
  	$scope.panel_healthcard = false;
  }

  $scope.loadLabourCard = function() {
  	$scope.heading_title = "Labour Card Details";
  	$scope.panel_labourcard = true;

  	$scope.panel_personalinfo = false;
  	$scope.panel_passport = false;
  	$scope.panel_emiratesid = false;
  	$scope.panel_visa = false;
  	$scope.panel_insurance = false;
  	$scope.panel_healthcard = false;
  }

  $scope.loadVisa = function() {
  	$scope.heading_title = "Visa Details";
  	$scope.panel_visa = true;

  	$scope.panel_personalinfo = false;
  	$scope.panel_passport = false;
  	$scope.panel_emiratesid = false;
  	$scope.panel_labourcard = false;
  	$scope.panel_insurance = false;
  	$scope.panel_healthcard = false;
  }

  $scope.loadInsurance = function() {
  	$scope.heading_title = "Insurance Details";
  	$scope.panel_insurance = true;

  	$scope.panel_personalinfo = false;
  	$scope.panel_passport = false;
  	$scope.panel_emiratesid = false;
  	$scope.panel_labourcard = false;
  	$scope.panel_visa = false;
  	$scope.panel_healthcard = false;
  }

  $scope.loadHealthCard = function() {
  	$scope.heading_title = "Professional Health Card";
  	$scope.panel_healthcard = true;

  	$scope.panel_personalinfo = false;
  	$scope.panel_passport = false;
  	$scope.panel_emiratesid = false;
  	$scope.panel_labourcard = false;
  	$scope.panel_visa = false;
  	$scope.panel_insurance = false;
  }
  
  $scope.loadPersonalInfo();

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

	$scope.editEmployeeInfo = function(empid) {
		localStorage.setItem("empid", empid);
		$window.location.href = base_url +'Employee/Employee_Information';
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


	$scope.getEmployeeList = function () {
		localStorage.clear();
		$scope.employeeList = []; 
		$http.get(base_url + 'Employee/getEmployeeList')
		.then(response => {
			$scope.employeeList = response.data;
		}).catch(error => {
			swal("Sorry!", "An error has occured. Check console.", "error")
			console.log(error);
		})
	}


	$scope.getEmployeeInfo = function () {
		var empid = localStorage.getItem("empid");
		$http.get(base_url + 'Employee/getEmployeeInfo/' + empid)
		.then(response => {
			var emp = response.data[0];
			$scope.empid 					= emp.empid;
			$scope.firstname 			= emp.firstname;
			$scope.middlename 		= emp.middlename;
			$scope.lastname 			= emp.lastname;
			$scope.email 					= emp.email;
			$scope.mobile 				= emp.mobile;
			$scope.dateofbirth 		= emp.dateofbirth;
			$scope.placeofbirth 	= emp.placeofbirth;
			$scope.homecountry 		= emp.homecountry;
			$scope.nationality 		= emp.nationality;
			$scope.sex 						= emp.sex;
			$scope.address 				= emp.address;
			$scope.city 					= emp.city;
			$scope.country 				= emp.country;
		}).catch(error => {
			swal("Sorry!", "An error has occured. Check console.", "error")
			console.log(error);
		})
	}

	$scope.cu_employeeinfo = function () {
		alert($scope.empid);
		($scope.empid == null ? $scope.action="add" : $scope.action="update")
		var userData = {
			'empid'				 : $scope.empid,
			'firstname'		 : $scope.firstname,
			'middlename'	 : $scope.middlename,
			'lastname'		 : $scope.lastname,
			'email'				 : $scope.email,
			'mobile'			 : $scope.mobile,
			'dateofbirth'	 : $scope.dateofbirth,
			'placeofbirth' : $scope.placeofbirth,
			'homecountry'	 : $scope.homecountry,
			'nationality'	 : $scope.nationality,
			'sex'					 : $scope.sex,
			'address'			 : $scope.address,
			'city'				 : $scope.city,
			'country'			 : $scope.country,
			'action'  		 : $scope.action
		}
		$http.post(base_url + 'Employee/cu_employeeinfo', userData)
		.then(response => {
			if ($scope.action == "add") {
				$scope.message = "New Account Information Saved"
			} else {
				$scope.message = "User " + $scope.username + " has been Updated"
			}

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




myApp.controller('PassportCtrl', function PassportCtrl($scope, $http, $location, $window, toaster) {

	$scope.uploadFile = function(refid) {
		var type = "_passport";
		var empid = localStorage.getItem("empid");
		var ciController = base_url + 'Employee/upload_EmployeeFile/' + refid + "/" + empid + "/" + type;
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
			swal({
			  title: "Thank You!",
			  text: $scope.message,
			  type: "success",
			  timer: 1300,
			  showConfirmButton: false
			});	
			$scope.getPassports();
		}).catch(error => {
			swal("Sorry!", error, "error")
			console.log(error);
		})
	}

	$scope.clearForm = function() {
		$scope.title = "";
		$scope.getCompanyDepts();
		$scope.action = "add";
	}
	$scope.file = {}

	$scope.getPassports = function () {
		var empid = localStorage.getItem("empid")
		$scope.passports = []; 
		$http.get(base_url + 'Employee/getPassports/' + empid)
		.then(response => {
			$scope.passports = response.data;
		}).catch(error => {
			swal("Sorry!", "An error has occured. Check console.", "error")
			console.log(error);
		})
	}


	$scope.cu_passport = function() {	
		var empid = localStorage.getItem("empid");
		$scope.fileType = $scope.files[0].name.substring($scope.files[0].name.lastIndexOf(".") + 1);
		($scope.refid == null ? $scope.action="add" : $scope.action="update");
		var deptData = {
			'refid'							: $scope.refid,
			'empid'							: empid,
			'passportnumber'		: $scope.passportnumber,
			'issuingauthority'	: $scope.issuingauthority,
			'dateofissue'				: $scope.dateofissue,
			'dateofexpiry'			: $scope.dateofexpiry,
			'passporttype'			: $scope.passporttype,
			'countrycode'				: $scope.countrycode,
			'placeofbirth'			: $scope.placeofbirth,
			'nationalnumber'		: $scope.nationalnumber,
			'fileType'				  : $scope.fileType,
			'action'  					: $scope.action
		}
		$http.post(base_url + 'Employee/cu_passport', deptData)
		.then(response => {
			$scope.uploadFile(response.data);
		}).catch(error => {
			swal("Sorry!", error, "error")
			console.log(error);
		})
	}


	$scope.del_passport = function (refid, empid, photo) {
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
				$http.post(base_url + 'Employee/del_passport', {
						'refid': refid,
						'empid': empid,
						'photo': photo
					})
					.then(response => {
						swal({
						  title: "Deleted",
						  text: "Record permanently deleted.",
						  type: "success",
						  timer: 1300,
						  showConfirmButton: false
						});	
						$scope.getPassports();
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






myApp.controller('EmiratesIDCtrl', function EmiratesIDCtrl($scope, $http, $location, $window, toaster) {

	$scope.uploadFile = function(refid) {
		var type = "_emiratesid";
		var empid = localStorage.getItem("empid");
		var ciController = base_url + 'Employee/upload_EmployeeFile/' + refid + "/" + empid + "/" + type;
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
			swal({
			  title: "Thank You!",
			  text: $scope.message,
			  type: "success",
			  timer: 1300,
			  showConfirmButton: false
			});	
			$scope.getEmiratesID();
		}).catch(error => {
			swal("Sorry!", error, "error")
			console.log(error);
		})
	}

	$scope.getEmiratesID = function () {
		var empid = localStorage.getItem("empid")
		$http.get(base_url + 'Employee/getEmiratesID/' + empid)
		.then(response => {
			var emid = response.data[0];
			if(angular.isUndefined(emid) == false) {

				$scope.refid 			= emid.refid;
				$scope.empdid 		= emid.empdid;
				$scope.emiratesid = emid.emiratesid;
				$scope.cardnumber = emid.cardnumber;
				$scope.expirydate = emid.expirydate;
				$scope.photo 			= emid.empid + "/" + emid.photo;
			}
		}).catch(error => {
			swal("Sorry!", "An error has occured. Check console.", "error")
			console.log(error);
		})
	}


	$scope.cu_emiratesid = function() {	
		var empid = localStorage.getItem("empid");
		
		if(angular.isUndefined($scope.files) == false) {
			$scope.fileType = $scope.files[0].name.substring($scope.files[0].name.lastIndexOf(".") + 1);
		}
		(!$scope.refid == '' ? $scope.action="update" : $scope.action="add");
		var deptData = {
			'refid'							: $scope.refid,
			'empid'							: empid,
			'emiratesid'				: $scope.emiratesid,
			'cardnumber'				: $scope.cardnumber,
			'expirydate'				: $scope.expirydate,
			'fileType'				  : $scope.fileType,
			'action'  					: $scope.action
		}
		$http.post(base_url + 'Employee/cu_emiratesid', deptData)
		.then(response => {
			alert(response.data)
			if(angular.isUndefined($scope.files) == false) {
				$scope.uploadFile(response.data);
			}
			if($scope.action=="update") {
				alert("success");
			}
		}).catch(error => {
			swal("Sorry!", error, "error")
			console.log(error);
		})
	}


	$scope.del_emiratesid = function (refid, empid, photo) {
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
				$http.post(base_url + 'Employee/del_passport', {
						'refid': refid,
						'empid': empid,
						'photo': photo
					})
					.then(response => {
						swal({
						  title: "Deleted",
						  text: "Record permanently deleted.",
						  type: "success",
						  timer: 1300,
						  showConfirmButton: false
						});	
						$scope.getPassports();
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





myApp.controller('LabourCardCtrl', function LabourCardCtrl($scope, $http, $location, $window, toaster) {

	$scope.clearForm = function() {
		$scope.refid 						= "";
		$scope.empdid 					= "";
		$scope.cardnumber 			= "";
		$scope.contract_date		= "";
		$scope.contract_expiry	= "";
		$scope.annual_salary		= "";
		$scope.basic_salary			= "";
		$scope.allowance				= "";
		$scope.annual_leave			= "";
		$scope.position				  = "";
		$scope.departmentid			= "";
		$scope.photo 						= "";
	}

	$scope.uploadFile = function(refid) {
		var type = "_labourcard";
		var empid = localStorage.getItem("empid");
		var ciController = base_url + 'Employee/upload_EmployeeFile/' + refid + "/" + empid + "/" + type;
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
			swal({
			  title: "Thank You!",
			  text: $scope.message,
			  type: "success",
			  timer: 1300,
			  showConfirmButton: false
			});	
			$scope.getLabourCard();
		}).catch(error => {
			swal("Sorry!", error, "error")
			console.log(error);
		})
	}

	$scope.loadDepartments = function() {
		$scope.departments = []; 
		$http.get(base_url + 'Employee/getDepartments')
		.then(response => {
			$scope.departments = response.data;
		}).catch(error => {
			swal("Sorry!", "An error has occured. Check console.", "error")
			console.log(error);
		});
	}

	$scope.getLabourCard = function () {
		var empid = localStorage.getItem("empid")
		$http.get(base_url + 'Employee/getLabourCard/' + empid)
		.then(response => {
			var lc = response.data[0];
			if(angular.isUndefined(lc) == false) {
				$scope.refid 						= lc.refid;
				$scope.empdid 					= lc.empdid;
				$scope.cardnumber 			= lc.cardnumber;
				$scope.contract_date		= lc.contract_date;
				$scope.contract_expiry	= lc.contract_expiry;
				$scope.annual_salary		= lc.annual_salary;
				$scope.basic_salary			= lc.basic_salary;
				$scope.allowance				= lc.allowance;
				$scope.annual_leave			= lc.annual_leave;
				$scope.position				  = lc.position;
				$scope.departmentid			= lc.departmentid;
				$scope.photo 						= lc.empid + "/" + lc.photo;
				
			}
		}).catch(error => {
			//swal("Sorry!", "An error has occured. Check console.", "error")
			console.log(error);
		})
	}


	$scope.cu_labourcard = function() {	
		var empid = localStorage.getItem("empid");
		
		if(angular.isUndefined($scope.files) == false) {
			$scope.fileType = $scope.files[0].name.substring($scope.files[0].name.lastIndexOf(".") + 1);
		}
		(!$scope.refid == '' ? $scope.action="update" : $scope.action="add");
		var deptData = {
			'refid'							: $scope.refid,
			'empid'							: empid,
			'cardnumber'				: $scope.cardnumber,
			'contract_date'			: $scope.contract_date,
			'contract_expiry'		: $scope.contract_expiry,
			'annual_salary'			: $scope.annual_salary,
			'basic_salary'			: $scope.basic_salary,
			'allowance'				  : $scope.allowance,
			'annual_leave'			: $scope.annual_leave,
			'position'				  : $scope.position,
			'departmentid'			: $scope.departmentid,
			'fileType'				  : $scope.fileType,
			'action'  					: $scope.action
		}
		$http.post(base_url + 'Employee/cu_labourcard', deptData)
		.then(response => {
			if(angular.isUndefined($scope.files) == false) {
				$scope.uploadFile(response.data);
			}
			if($scope.action=="update") {
				alert("success");
			}
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


myApp.controller('VisaCtrl', function VisaCtrl($scope, $http, $location, $window, toaster) { 

	$scope.clearForm = function() {
		$scope.refid 				 = "";
		$scope.empdid 			 = "";
		$scope.filenumber 	 = "";
		$scope.sponsor			 = "";
		$scope.dateofissue	 = "";
		$scope.dateofexpiry	 = "";
		$scope.uidnumber		 = "";
		$scope.visatype			 = "";
		$scope.photo				 = "";
	}

	$scope.uploadFile = function(refid) {
		var type = "_visa";
		var empid = localStorage.getItem("empid");
		var ciController = base_url + 'Employee/upload_EmployeeFile/' + refid + "/" + empid + "/" + type;
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
			swal({
			  title: "Thank You!",
			  text: $scope.message,
			  type: "success",
			  timer: 1300,
			  showConfirmButton: false
			});	
			$scope.getVisa();
		}).catch(error => {
			swal("Sorry!", error, "error")
			console.log(error);
		})
	}

	$scope.getVisa = function () {
		var empid = localStorage.getItem("empid")
		$http.get(base_url + 'Employee/getVisa/' + empid)
		.then(response => {
			var visa = response.data[0];
			if(angular.isUndefined(visa) == false) {
				$scope.refid 						= visa.refid;
				$scope.empdid 					= visa.empdid;
				$scope.filenumber 	 		= visa.filenumber;
				$scope.sponsor			 		= visa.sponsor;
				$scope.dateofissue	 		= visa.dateofissue;
				$scope.dateofexpiry	 		= visa.dateofexpiry;
				$scope.uidnumber		 		= visa.uidnumber;
				$scope.visatype			 		= visa.visatype;
				$scope.photo 						= visa.empid + "/" + visa.photo;
				
			}
		}).catch(error => {
			//swal("Sorry!", "An error has occured. Check console.", "error")
			console.log(error);
		})
	}


	$scope.cu_visa = function() {	
		var empid = localStorage.getItem("empid");
		
		if(angular.isUndefined($scope.files) == false) {
			$scope.fileType = $scope.files[0].name.substring($scope.files[0].name.lastIndexOf(".") + 1);
		}
		(!$scope.refid == '' ? $scope.action="update" : $scope.action="add");
		var deptData = {
			'refid'							: $scope.refid,
			'empid'							: empid,
			'filenumber'				: $scope.filenumber,
			'sponsor'						: $scope.sponsor,
			'dateofissue'				: $scope.dateofissue,
			'dateofexpiry'			: $scope.dateofexpiry,
			'uidnumber'					: $scope.uidnumber,
			'visatype'					: $scope.visatype,
			'fileType'				  : $scope.fileType,
			'action'  					: $scope.action
		}
		$http.post(base_url + 'Employee/cu_visa', deptData)
		.then(response => {
			if(angular.isUndefined($scope.files) == false) {
				$scope.uploadFile(response.data);
			}
			if($scope.action=="update") {
				alert("success");
			}
		}).catch(error => {
			swal("Sorry!", error, "error")
			console.log(error);
		})
	}


	$scope.del_visa = function (refid, empid, photo) {
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
						$scope.getVisa();
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




myApp.controller('InsuranceCtrl', function InsuranceCtrl($scope, $http, $location, $window, toaster) { 

	$scope.clearForm = function() {
		$scope.refid 				 = "";
		$scope.empdid 			 = "";
		$scope.policynumber 	 = "";
		$scope.policyperiod			 = "";
		$scope.passportnumber	 = "";
		$scope.provider	 = "";
		$scope.cover		 = "";
		$scope.photo				 = "";
	}

	$scope.uploadFile = function(refid) {
		var type = "_insurance";
		var empid = localStorage.getItem("empid");
		var ciController = base_url + 'Employee/upload_EmployeeFile/' + refid + "/" + empid + "/" + type;
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
			swal({
			  title: "Thank You!",
			  text: $scope.message,
			  type: "success",
			  timer: 1300,
			  showConfirmButton: false
			});	
			$scope.getInsurance();
		}).catch(error => {
			swal("Sorry!", error, "error")
			console.log(error);
		})
	}

	$scope.getInsurance = function () {
		var empid = localStorage.getItem("empid")
		$http.get(base_url + 'Employee/getInsurance/' + empid)
		.then(response => {
			var insurance = response.data[0];
			if(angular.isUndefined(insurance) == false) {
				$scope.refid 					 = insurance.refid;
				$scope.empdid 				 = insurance.empdid;
				$scope.policynumber 	 = insurance.policynumber;
				$scope.policyperiod		 = insurance.policyperiod;
				$scope.passportnumber	 = insurance.passportnumber;
				$scope.provider	 			 = insurance.provider;
				$scope.cover		 			 = insurance.cover;
				$scope.photo 					 = insurance.empid + "/" + insurance.photo;
				
			}
		}).catch(error => {
			//swal("Sorry!", "An error has occured. Check console.", "error")
			console.log(error);
		})
	}


	$scope.cu_insurance = function() {	
		var empid = localStorage.getItem("empid");
		
		if(angular.isUndefined($scope.files) == false) {
			$scope.fileType = $scope.files[0].name.substring($scope.files[0].name.lastIndexOf(".") + 1);
		}
		(!$scope.refid == '' ? $scope.action="update" : $scope.action="add");
		var deptData = {
			'refid'							: $scope.refid,
			'empid'							: empid,
			'policynumber' 			:	$scope.policynumber, 	
			'policyperiod' 			:	$scope.policyperiod,		
			'passportnumber' 		:	$scope.passportnumber,	
			'provider' 					:	$scope.provider,	 			
			'cover' 						:	$scope.cover,		 			
			'fileType'				  : $scope.fileType,
			'action'  					: $scope.action
		}
		$http.post(base_url + 'Employee/cu_insurance', deptData)
		.then(response => {
			if(angular.isUndefined($scope.files) == false) {
				$scope.uploadFile(response.data);
			}
			if($scope.action=="update") {
				alert("success");
			}
		}).catch(error => {
			swal("Sorry!", error, "error")
			console.log(error);
		})
	}


	$scope.del_insurance = function (refid, empid, photo) {
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
				$http.post(base_url + 'Employee/del_insurance', {
						'refid': refid,
						'empid': empid,
						'photo': photo
					})
					.then(response => {
						$scope.clearForm();
						$scope.getVisa();
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




myApp.controller('HealthCardCtrl', function HealthCardCtrl($scope, $http, $location, $window, toaster) { 

	$scope.clearForm = function() {
		$scope.refid 				  = "";
		$scope.empdid 			  = "";
		$scope.cardnumber 	 	= "";
		$scope.dateofissue		= "";
		$scope.dateofexpiry	 	= "";
		$scope.photo 					= "";;
	}

	$scope.uploadFile = function(refid) {
		var type = "_healthcard";
		var empid = localStorage.getItem("empid");
		var ciController = base_url + 'Employee/upload_EmployeeFile/' + refid + "/" + empid + "/" + type;
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
			swal({
			  title: "Thank You!",
			  text: $scope.message,
			  type: "success",
			  timer: 1300,
			  showConfirmButton: false
			});	
			$scope.getHealthCard();
		}).catch(error => {
			swal("Sorry!", error, "error")
			console.log(error);
		})
	}

	$scope.getHealthCard = function () {
		var empid = localStorage.getItem("empid")
		$http.get(base_url + 'Employee/getHealthCard/' + empid)
		.then(response => {
			var hc = response.data[0];
			if(angular.isUndefined(hc) == false) {
				$scope.refid 					 = hc.refid;
				$scope.empdid 				 = hc.empdid;
				$scope.cardnumber 	 	 = hc.cardnumber;
				$scope.dateofissue		 = hc.dateofissue;
				$scope.dateofexpiry	 	 = hc.dateofexpiry;
				$scope.photo 					 = hc.empid + "/" + hc.photo;
				
			}
		}).catch(error => {
			//swal("Sorry!", "An error has occured. Check console.", "error")
			console.log(error);
		})
	}


	$scope.cu_healthcard = function() {	
		var empid = localStorage.getItem("empid");
		
		if(angular.isUndefined($scope.files) == false) {
			$scope.fileType = $scope.files[0].name.substring($scope.files[0].name.lastIndexOf(".") + 1);
		}
		(!$scope.refid == '' ? $scope.action="update" : $scope.action="add");
		var deptData = {
			'refid'							: $scope.refid,
			'empid'							: empid,
			'cardnumber'				:	$scope.cardnumber,
			'dateofissue'				:	$scope.dateofissue,
			'dateofexpiry'			:	$scope.dateofexpiry,		
			'fileType'				  : $scope.fileType,
			'action'  					: $scope.action
		}
		$http.post(base_url + 'Employee/cu_healthcard', deptData)
		.then(response => {
			if(angular.isUndefined($scope.files) == false) {
				$scope.uploadFile(response.data);
			}
			if($scope.action=="update") {
				alert("success");
			}
		}).catch(error => {
			swal("Sorry!", error, "error")
			console.log(error);
		})
	}


	$scope.del_healthcard = function (refid, empid, photo) {
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
				$http.post(base_url + 'Employee/del_healthcard', {
						'refid': refid,
						'empid': empid,
						'photo': photo
					})
					.then(response => {
						$scope.clearForm();
						$scope.getVisa();
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






myApp.controller('DepartmentCtrl', function DepartmentCtrl($scope, $http, $location, $window, toaster) {

	$scope.clearForm = function() {
		$scope.title = "";
		$scope.getCompanyDepts();
		$scope.action = "add";
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




	$scope.getDeptData = function (refid, title) {
		$scope.refid = refid;
		$scope.title = title;
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
			'title'			: $scope.title,
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
			$scope.getCompanyDepts();
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


	$scope.delete = function () {
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
					$http.post(base_url + 'Admin/deleteDept', {
							'refid': $scope.refid
						})
						.then(response => {
							swal({
							  title: "Deleted",
							  text: "Record permanently deleted.",
							  type: "success",
							  timer: 1300,
							  showConfirmButton: false
							});	
							$("#DepartmentModal").modal("toggle");
							$scope.getCompanyDepts();
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



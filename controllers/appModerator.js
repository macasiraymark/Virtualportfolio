// Declare myApp as angular module. ALWAYS TAKE NOTE OF SEMICOLNS(;)
var myApp = angular.module('myApp', ['angularUtils.directives.dirPagination', 'ui.bootstrap']);




myApp.directive('fileInput', function($parse){
	return{
		link: function($scope, element, attrs){
			element.on("change", function(event){
				var files = event.target.files;
				var file = files[0];
				$parse(attrs.fileInput).assign($scope, element[0].files);
				$scope.$apply;
			});
		}
	}
});



// Creating a Angular Controller
myApp.controller('AccountsCtrl', function AccountsCtrl($scope, $http, $window, $location) {

	$scope.currentPage 	= 1;
  	$scope.pageSize 	= 10;

	$scope.clearForm = function() {
		$scope.firstname = "";
		$scope.midlename = "";
		$scope.lastname  = "";
		$scope.mobile 	 = "";
		$scope.email 	 = "";
		$scope.username  = "";
		$scope.password  = "";
		$scope.action 	 = "add";
	}

	$scope.reset = function() {
		$scope.firstname 		= "";
		$scope.middlename 		= "";
		$scope.lastname  		= "";
		$scope.mobile 	 		= "";
		$scope.email 	 		= "";
		$scope.contactnumber 	="";
		$scope.municipality 	= "";
		$scope.address 			= "";
		$scope.username  		= "";
		$scope.password  		= "";
	}

	$scope.accounts = [];
	$scope.getAllAccounts = function () {
		$http.get('models/accounts/select-accounts.php')
		.then(response => {
			$scope.accounts = response.data;
		}).catch(error => {
			swal("Sorry!", "An error has occured. Check console.", "error")
			console.log(error);
		})
	}

	$scope.getAccountData = function(a) {
		$scope.userid     		= a.userid;
		$scope.firstname   		= a.firstname
		$scope.middlename   	= a.middlename
		$scope.lastname   		= a.lastname
		$scope.contactnumber   	= a.contactnumber
		$scope.address   		= a.address
		$scope.municipality   	= a.municipality
		$scope.sector   		= a.sector
		$scope.email   			= a.email
		$scope.action     		= "update";
	}

	$scope.cu_accounts = function () {

		var userData = {
			'userid'				 : $scope.userid,
			'firstname'			 	 : $scope.firstname,
			'middlename'  	 		 : $scope.middlename,
			'lastname'			 	 : $scope.lastname,
			'contactnumber'  		 : $scope.contactnumber,
			'address'   		 	 : $scope.address,
			'municipality'   		 : $scope.municipality,
			'sector'  			 	 : $scope.sector,
			'email'  				 : $scope.email,
			'password'  		 	 : $scope.password,
			'action'   		   		 : $scope.action
		}

		var pathURL = "";
		if($scope.action == "add") {
			pathURL = 'models/accounts/add-action.php';
		} else if($scope.action == "update") {
			pathURL = 'models/accounts/update-action.php';
		}

		$http.post(pathURL, userData)
		.then(response => {

			$scope.getAllAccounts();

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
					$http.post('models/accounts/delete-action.php', {
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
						$scope.getAllAccounts();
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



		// Creating agriculturist controller.

myApp.controller('agriculturistCtrl', function agriculturistCtrl($scope, $http, $window, $location) {

	$scope.currentPage = 1;
  	$scope.pageSize = 10;

  	$scope.loadProfile = function(agriculturistid) {
  		localStorage.setItem("agriculturistid", agriculturistid);
  		$window.location.href = "agriculturist_profile.php";
	}	
	$scope.clearForm = function() {
		$scope.firstname 	= "";
		$scope.middlename 	= "";
		$scope.lastname 	= "";
		$scope.contact 		= "";
		$scope.address 		= "";
		$scope.municipality = "";
		$scope.province 	= "";
		$scope.agri_type 	= "";
		$scope.action 		= "add";
	}

	$scope.reset = function(){
		$scope.firstname 	= "";
		$scope.middlename 	= "";
		$scope.lastname 	= "";
		$scope.contact 		= "";
		$scope.address 		= "";
		$scope.municipality = "";
		$scope.province 	= "";
		$scope.agri_type 	= "";
	}

	$scope.getAllagriculturist = function () {
		$scope.agriculturist = [];
		$http.get('models/agriculturist/select-agriculturist.php')
		.then(response => {
			$scope.agriculturist = response.data;
		}).catch(error => {
			swal("Sorry!", "An error has occured. Check console.", "error")
			console.log(error);
		})
	}

	$scope.getagriculturistData = function() {
		var agriculturistid = localStorage.getItem("agriculturistid");
		$http.get('models/agriculturist/select-agriculturist-byrefid.php?agriculturistid='+agriculturistid)
		.then(response => {
			$scope.a = response.data[0];
		}).catch(error => {
			swal("Sorry!", "An error has occured. Check console.", "error")
			console.log(error);
		})
	}

	$scope.getAllCategories = function () {
		$scope.categories   = [];
		$http.get('models/category/select-category.php')
		.then(response => {
			$scope.categories = response.data;
		}).catch(error => {
			swal("Sorry!", "An error has occured. Check console.", "error")
			console.log(error);
		})
	}


	$scope.getAllSubCategories = function () {
		$scope.subcategories   = [];
		$http.get('models/subcategory/select-subcategory-bycategory.php?categoryid='+$scope.a.categoryid)
		.then(response => {
			$scope.subcategories = response.data;
		}).catch(error => {
			swal("Sorry!", "An error has occured. Check console.", "error")
			console.log(error);
		})
	}

	$scope.cu_agriculturist = function () {

		(angular.isUndefined($scope.a.refid) ? $scope.action="add" : $scope.action="update");

		var userData = {
			'refid'				: $scope.a.refid,
			'firstname'			: $scope.a.firstname,
			'middlename'  	 	: $scope.a.middlename,
			'lastname'			: $scope.a.lastname,
			'contact'  			: $scope.a.contact,
			'address'   		: $scope.a.address,
			'municipality'   	: $scope.a.municipality,
			'province'  		: $scope.a.province,
			'categoryid'  		: $scope.a.categoryid,
			'subcategoryid'  	: $scope.a.subcategoryid

		}


		var pathURL = "";
		if($scope.action == "add") {
			pathURL = 'models/agriculturist/add-action.php';
		} else if($scope.action == "update") {
			pathURL = 'models/agriculturist/update-action.php';
		}
		$http.post(pathURL, userData)
		.then(response => {

			$scope.getAllagriculturist();

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

	$scope.del_agriculturist = function (refid) {
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
					$http.post('models/agriculturist/delete-action.php', {
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
						$scope.getAllagriculturist();
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

	// Creating farmlocations controller.

myApp.controller('FarmlocationsCtrl', function FarmlocationsCtrl($scope, $http, $window, $location) {

	$scope.currentPage  = 1;
  	$scope.pageSize 	= 10;

	$scope.clearForm = function() {
		$scope.agriculturistid = "";
		$scope.address 	 = "";
		$scope.longitude = "";
		$scope.latitude  = "";
		$scope.farmtype  = "";
		$scope.action  	 = "add";
	}

	$scope.reset = function(){
		$scope.agriculturistid 	= "";
		$scope.address 	 		= "";
		$scope.longitude 		= "";
		$scope.latitude  		= "";
		$scope.farmtype  		= "";
	}

	$scope.getAllFarmlocations = function () {
		$scope.Farmlocations   = [];
		$http.get('models/farmlocations/select-farmlocations.php')
		.then(response => {
			
			$scope.Farmlocations = response.data;
		}).catch(error => {
			swal("Sorry!", "An error has occured. Check console.", "error")
			console.log(error);
		})
	}

	$scope.getFarmlocationByAgriculturist = function () {
		var agriculturistid = localStorage.getItem('agriculturistid');
		$scope.farmlocations = [];
		$http.get('models/farmlocations/select-farmlocations-byagriculturist.php?agriculturistid='+agriculturistid)
		.then(response => {
			$scope.farmlocations = response.data;
		}).catch(error => {
			swal("Sorry!", "An error has occured. Check console.", "error")
			console.log(error);
		})
	}

	$scope.getAllAgriculturist = function () {
	$scope.agriculturist = [];
		$http.get('models/agriculturist/select-agriculturist.php')
		.then(response => {
			$scope.agriculturist = response.data;
		}).catch(error => {
			swal("Sorry!", "An error has occured. Check console.", "error")
			console.log(error);
		})
	}

	$scope.getFarmlocationsData = function(af) {
		$scope.refid     			= af.refid;
		$scope.agriculturistid   	= af.agriculturistid
		$scope.address   			= af.address
		$scope.lastname   			= af.lastname
		$scope.longitude   			= af.longitude
		$scope.latitude   			= af.latitude
		$scope.active   			= af.active
		$scope.farmtype   			= af.farmtype
		$scope.action     			= "update";
	}

	$scope.cu_Farmlocations = function () {
		var agriculturistid = localStorage.getItem('agriculturistid');
		//eto naman pre short version ng if .. else statement

		(angular.isUndefined($scope.refid) ? $scope.action="add" :$scope.action="update");

			

			// if(angular.isUndefined(agriculturistid)) {
			// 	$scope.action="add";
			// } else {
			// 	$scope.action="update";
			// }
			
		var userData = {
			'refid'				: $scope.refid,
			'agriculturistid'	: $scope.agriculturistid,
			'address'  	 		: $scope.address,
			'longitude'			: $scope.longitude,
			'latitude'  		: $scope.latitude,
			'active'   			: $scope.active,
			'farmtype'   		: $scope.farmtype,
			'action'   		    : $scope.action
		}

		var pathURL = "";
		if($scope.action == "add") {
			pathURL = 'models/farmlocations/add-action.php';
		} else if($scope.action == "update") {
			pathURL = 'models/farmlocations/update-action.php';
		}
		$http.post(pathURL, userData)
		.then(response => {

			if(angular.isUndefined(agriculturistid)) {
				$scope.getAllFarmlocations();
			} else {
				$scope.getFarmlocationByAgriculturist();
			}


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

	$scope.del_Farmlocations = function (refid) {
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
					$http.post('models/farmlocations/delete-action.php', {
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
						$scope.getAllFarmlocations();
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









///////////////////////////////////////////////////////////////////////////





	//Creating category controller
myApp.controller('CategoryCtrl', function CategoryCtrl($scope, $http, $window, $location) {

	$scope.currentPage  = 1;
  	$scope.pageSize 	= 10;

	$scope.clearForm = function() {
		$scope.refid 		= "";
		$scope.title 	 	= "";
		$scope.description 	= "";
		$scope.datecreated  = "";
		$scope.createdby  	= "";
		$scope.action  	 	= "add";
	}

	$scope.reset = function(){
		$scope.refid 			= "";
		$scope.title 	 		= "";
		$scope.description 		= "";
		$scope.datecreated  	= "";
		$scope.createdby  		= "";
	}

	$scope.getAllCategory = function () {
		$scope.Category   = [];
		$http.get('models/category/select-category.php')
		.then(response => {
			$scope.Category = response.data;
		}).catch(error => {
			swal("Sorry!", "An error has occured. Check console.", "error")
			console.log(error);
		})
	}

	$scope.getCategoryData = function(ac) {
		$scope.refid     			= ac.refid;
		$scope.title   				= ac.title
		$scope.description   		= ac.description
		$scope.datecreated   		= ac.datecreated
		$scope.createdby   			= ac.createdby
		$scope.action     			= "update";
	}

	$scope.ac_Category = function () {

		var userData = {
			'refid'				: $scope.refid,
			'title'				: $scope.title,
			'description'  	 	: $scope.description,
			'action'   		    : $scope.action
		}

		var pathURL = "";
		if($scope.action == "add") {
			pathURL = 'models/category/add-action.php';
		} else if($scope.action == "update") {
			pathURL = 'models/category/update-action.php';
		}
			
		$http.post(pathURL, userData)
		.then(response => {


			swal({
			  title: "Thank You!",
			  text: "Account Information successfully saved",
			  type: "success",
			  timer: 1300,
			  showConfirmButton: false
			});
			$scope.getAllCategory();
			$('#myModal').modal('toggle');
		}).catch(error => {
			swal("Sorry!", error, "error")
			console.log(error);
		})

	}

	$scope.del_Category = function (refid) {
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
					$http.post('models/category/delete-action.php', {
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
						$scope.getAllCategory();
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


// ///////////////////////////////////////////////////////////////////////////////

//Creating subcategory controller
myApp.controller('SubCategoryCtrl', function SubCategoryCtrl($scope, $http, $window, $location) {

	$scope.currentPage  = 1;
  	$scope.pageSize 	= 10;

	$scope.clearForm = function() {
		$scope.refid 		= "";
		$scope.categoryid 	= "";
		$scope.title 	 	= "";
		$scope.description 	= "";
		$scope.datecreated  = "";
		$scope.createdby  	= "";
		$scope.action  	 	= "add";
	}

	$scope.reset = function(){
		$scope.refid 			= "";
		$scope.categoryid       = "";
		$scope.title 	 		= "";
		$scope.description 		= "";
		$scope.datecreated  	= "";
		$scope.createdby  		= "";
	}

	$scope.getAllCategories = function () {
		$scope.categories   = [];
		$http.get('models/category/select-category.php')
		.then(response => {
			$scope.categories = response.data;
		}).catch(error => {
			swal("Sorry!", "An error has occured. Check console.", "error")
			console.log(error);
		})
	}

	$scope.getAllSubCategory = function () {
		$scope.subCategories   = [];
		$http.get('models/subcategory/select-subcategory.php')
		.then(response => {
			$scope.subCategories = response.data;
		}).catch(error => {
			swal("Sorry!", "An error has occured. Check console.", "error")
			console.log(error);
		})
	}

	$scope.getSubCategoryData = function(as) {
		$scope.refid     			= as.refid;
		$scope.categoryid           = as.categoryid
		$scope.title   				= as.title
		$scope.description   		= as.description
		$scope.datecreated   		= as.datecreated
		$scope.createdby   			= as.createdby
		$scope.action     			= "update";
	}

	$scope.as_SubCategory = function () {

		var userData = {
			'refid'				: $scope.refid,
			'categoryid'		: $scope.categoryid,
			'title'				: $scope.title,
			'description'  	 	: $scope.description,
			'action'   		    : $scope.action
		}


		var pathURL = "";
		if($scope.action == "add") {
			pathURL = 'models/subcategory/add-action.php';
		} else if($scope.action == "update") {
			pathURL = 'models/subcategory/update-action.php';
		}
			
		$http.post(pathURL, userData)
		.then(response => {


			swal({
			  title: "Thank You!",
			  text: "Account Information successfully saved",
			  type: "success",
			  timer: 1300,
			  showConfirmButton: false
			});
			$scope.getAllSubCategory();
			$('#myModal').modal('toggle');
		}).catch(error => {
			swal("Sorry!", error, "error")
			console.log(error);
		})

	}

	$scope.del_SubCategory = function (refid) {
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
					$http.post('models/subcategory/delete-action.php', {
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
						$scope.getAllSubCategory();
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












/////////////////////////////////////////////////////////////////////////////////////
// Creating portfolios controller.

myApp.controller('portfoliosCtrl', function portfoliosCtrl($scope, $http, $window, $location) {

	$scope.currentPage = 1;
  	$scope.pageSize = 10;

	$scope.clearForm = function() {
		$scope.agriculturistid 	= "";
		$scope.filename 		= "";
		$scope.dateposted 		= "";
		$scope.postedby 		= "";
		$scope.category 		= "";
		$scope.subcateogry 		= "";
		$scope.action 			= "add";
	}

	$scope.reset = function(){
		$scope.agriculturistid 	= "";
		$scope.filename 		= "";
		$scope.dateposted 		= "";
		$scope.postedby 		= "";
		$scope.category 		= "";
		$scope.subcateogry 		= "";
	}

	$scope.getAllportfolio = function () {
		$scope.portfolios = [];
		$http.get('models/portfolios/select-portfolios.php')
		.then(response => {
			$scope.portfolios = response.data;
		}).catch(error => {
			swal("Sorry!", "An error has occured. Check console.", "error")
			console.log(error);
		})
	}

	$scope.getPortfolioByAgriculturist = function () {
		var agriculturistid = localStorage.getItem('agriculturistid');
		$scope.portfolios = [];
		$http.get('models/portfolios/select-portfolios-byagriculturist.php?agriculturistid='+agriculturistid)
		.then(response => {
			$scope.portfolios = response.data;
		}).catch(error => {
			swal("Sorry!", "An error has occured. Check console.", "error")
			console.log(error);
		})
	}

	$scope.getAllAgriculturist = function () {
	$scope.agriculturist = [];
		$http.get('models/agriculturist/select-agriculturist.php')
		.then(response => {
			$scope.agriculturist = response.data;
		}).catch(error => {
			swal("Sorry!", "An error has occured. Check console.", "error")
			console.log(error);
		})
	}



	$scope.portfolioData = function(ap) {
		$scope.refid     		= ap.refid;
		$scope.agriculturistid  = ap.agriculturistid;
		$scope.filename   		= ap.filename;
		$scope.dateposted   	= ap.dateposted;
		$scope.postedby   		= ap.postedby;
		$scope.category   		= ap.category;
		$scope.subcategory   	= ap.subcategory;
		$scope.action     		= "update";
	}

	$scope.getAllAgriculturist = function () {
	$scope.agriculturist = [];
		$http.get('models/agriculturist/select-agriculturist.php')
		.then(response => {
			$scope.agriculturist = response.data;
		}).catch(error => {
			swal("Sorry!", "An error has occured. Check console.", "error")
			console.log(error);
		})
	}

	$scope.getAllCategories = function () {
		$scope.categories   = [];
		$http.get('models/category/select-category.php')
		.then(response => {
			$scope.categories = response.data;
		}).catch(error => {
			swal("Sorry!", "An error has occured. Check console.", "error")
			console.log(error);
		})
	}

	$scope.getAllSubCategories = function () {
		$scope.subcategories   = [];
		$http.get('models/subcategory/select-subcategory-bycategory.php?categoryid='+$scope.categoryid)
		.then(response => {
			
			$scope.subcategories = response.data;
			
		}).catch(error => {
			swal("Sorry!", "An error has occured. Check console.", "error")
			console.log(error);
		})
	}


	$scope.getAllportfolios = function () {
		$scope.categories   = [];
		$http.get('models/portfolios/select-portfolios.php')
		.then(response => {
			$scope.categories = response.data;
		}).catch(error => {
			swal("Sorry!", "An error has occured. Check console.", "error")
			console.log(error);
		})
	}








	$scope.uploadPortfolio = function() {
		var uploadFile = "models/portfolios/add-action.php";
		var formData = new FormData();

		angular.forEach($scope.files, function(file) {
			formData.append('file', file);
			var fname = file.name;
		});
		formData.append('agriculturistid', $scope.agriculturistid);
		formData.append('categoryid', $scope.categoryid);
		formData.append('subcategoryid', $scope.subcategoryid);


		$http.post(uploadFile, formData, {
			transformRequest: angular.identity,
			headers: {'Content-Type': undefined, 'Process-Data':false}
		}).then(function(response) {
			$scope.getAllportfolio();

			swal({
			  title: "Thank You!",
			  text: "Profile Photo successfully uploaded",
			  type: "success",
			  timer: 1300,
			  showConfirmButton: false
			});	

		}).catch(error => {
			swal("Sorry!", error, "error")
			console.log(error);
		})
	}
























	


	$scope.del_portfolios = function (refid) {
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
					$http.post('models/portfolios/delete-action.php', {
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
						$scope.getAllportfolios();
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


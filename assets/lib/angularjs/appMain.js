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



myApp.controller('MainCtrl', function MainCtrl($scope, $http, $location, $window, toaster) {

	

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






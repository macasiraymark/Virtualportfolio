<?php include './partials/header.php' ?>
<div ng-controller="agriculturistCtrl" ng-init="getagriculturistData()">
  
		<div class="right_col" role="main" >
          <div class="">
            <div class="page-title">
              <div class="title_left">
                <h3>User Profile</h3>
              </div>

              <div class="title_right">
                <div class="col-md-5 col-sm-5 col-xs-12 form-group pull-right top_search">
                  <div class="input-group">
                    
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="clearfix"></div>

            <div class="row">
              <div class="col-md-12 col-sm-12 col-xs-12">
                <div class="x_panel">
                  <div class="x_title">
                    <h2>User Report <small>Activity report</small></h2>
                    <ul class="nav navbar-right panel_toolbox">
                      <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
                      </li>
                      <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><i class="fa fa-wrench"></i></a>
                        <ul class="dropdown-menu" role="menu">
                          <li><a href="#">Settings 1</a>
                          </li>
                          <li><a href="#">Settings 2</a>
                          </li>
                        </ul>
                      </li>
                      <li><a class="close-link"><i class="fa fa-close"></i></a>
                      </li>
                    </ul>
                    <div class="clearfix"></div>
                  </div>
                  <div class="x_content">
                    <div class="col-md-3 col-sm-3 col-xs-12 profile_left">
                      
                      <h3>{{a.firstname +" "+a.lastname}}</h3>

                      <ul class="list-unstyled user_data">
                        <li><i class="fa fa-home user-profile-icon"></i> {{ a.address +", "+a.municipality +", "+ a.province}}
                        </li>

                        <li>
                          <i class="fa fa-phone-square user-profile-icon"></i> {{a.contact}}
                        </li>

                       
                      </ul>

                      <!-- <a class="btn btn-success"><i class="fa fa-edit m-right-xs"></i>Edit Profile</a> -->
                      <br />
                  </div>

                    <div class="col-md-9 col-sm-9 col-xs-12">
                    		<div class="" role="tabpanel" data-example-id="togglable-tabs">
                        <ul id="myTab" class="nav nav-tabs bar_tabs" role="tablist">
                          <li role="presentation" class="active"><a href="#tab_content1" id="home-tab" role="tab" data-toggle="tab" aria-expanded="true">Personal Details</a>
                          </li>
                          <li role="presentation" class=""><a href="#tab_content2" role="tab" id="profile-tab" data-toggle="tab" aria-expanded="false">Portfolios</a>
                          </li>
                          <li role="presentation" class=""><a href="#tab_content3" role="tab" id="profile-tab2" data-toggle="tab" aria-expanded="false">Farm Locations</a>
                          </li>
                        </ul>
                        <div id="myTabContent" class="tab-content">
                          <div role="tabpanel" class="tab-pane fade active in" id="tab_content1" aria-labelledby="home-tab">

                            <div class="row">
                              <div class="form-horizontal">
                                <div class="form-group">
                                  <label class="control-label col-sm-2">Firstname</label>
                                  <div class="col-sm-8">
                                    <input ng-model="a.firstname"  class="form-control" />
                                  </div>
                                </div>

                                <div class="form-group">
                                  <label class="control-label col-sm-2">Middlename</label>
                                  <div class="col-sm-8">
                                    <input ng-model="a.middlename"  class="form-control" />
                                  </div>
                                </div>

                                <div class="form-group">
                                  <label class="control-label col-sm-2">Lastname</label>
                                  <div class="col-sm-8">
                                    <input ng-model="a.lastname"  class="form-control" />
                                  </div>
                                </div>

                                <div class="form-group">
                                  <label class="control-label col-sm-2">Contact</label>
                                  <div class="col-sm-8">
                                    <input ng-model="a.contact"  class="form-control" />
                                  </div>
                                </div>

                                <div class="form-group">
                                  <label class="control-label col-sm-2">Address</label>
                                  <div class="col-sm-8">
                                    <input ng-model="a.address"  class="form-control" />
                                  </div>
                                </div>

                                <div class="form-group">
                                  <label class="control-label col-sm-2">Municipality</label>
                                  <div class="col-sm-8">
                                    <input ng-model="a.municipality"  class="form-control" />
                                  </div>
                                </div>

                                <div class="form-group">
                                  <label class="control-label col-sm-2">Province</label>
                                  <div class="col-sm-8">
                                    <input ng-model="a.province"  class="form-control" />
                                  </div>
                                </div>

                                <div class="form-group">
                                  <label class="control-label col-sm-2">Category</label>
                                  <div class="col-sm-8">
                                    <input ng-model="a.title"  class="form-control" />
                                  </div>
                                </div>
                                <div class="form-group">
                                  <label class="control-label col-sm-2">SubCategory</label>
                                  <div class="col-sm-8">
                                    <input ng-model="a.SubCategory"  class="form-control" />
                                  </div>
                                </div>

                                <div class="form-group">
                                  <div class="col-sm-12 pull-right">
                                    <button class="btn btn-success" ng-click="cu_agriculturist()">Update</button>
                                  </div>
                                </div>
                                
                              </div>
                            </div>
                              
                          </div>











              <!-- second tab -->
            <div role="tabpanel" class="tab-pane fade" id="tab_content2" aria-labelledby="profile-tab" ng-controller="portfoliosCtrl" ng-init="getPortfolioByAgriculturist()">
            <h5>Portfoio List</h5>
                <button class="btn btn-success btn-sm" ng-click="clearForm()" data-toggle="modal" data-target="#myModal">
                  <i class="fa fa-users"></i> Add Record 
                </button>
              <div class="table-responsive">
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>File Name</th>
                      <th>Date Posted</th>
                      <th> </th>
                      <th>Category</th>
                      <th>Sub Category</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr dir-paginate="ap in portfolios|orderBy:sortKey:reverse|filter:search|itemsPerPage: pageSize" pagination-id="portfolios" current-page="currentPage">

                      <td> {{ (currentPage-1)*pageSize + $index+1 }} </td>
                      <td> {{ ap.filename }} </td>
                      <td> {{ ap.dateposted }} </td>
                      <td> {{ ap.postedby }} </td>
                      <td> {{ ap.category}} </td>
                      <td> {{ ap.subcategory }} </td>
                      <td>
                        <button ng-click="getportfoliostData(ap)" data-toggle="modal" data-target="#myModal" class="btn btn-xs btn-primary">
                          <i class="fa fa-pencil-square-o"></i>
                        </button>
                        <button ng-click="del_portfolios(ap.refid)" class="btn btn-xs btn-danger">
                          <i class="fa fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <dir-pagination-controls
                  max-size="5"
                  direction-links="true"
                  boundary-links="true" 
                  pagination-id="portfolios">
                </dir-pagination-controls>

          <!-- Modal -->
            <div id="myModal" class="modal fade" role="dialog">
              <div class="modal-dialog">

            <!-- Modal content-->
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Portfolio Form</h4>
              </div>
              <div class="modal-body">
                <div class="row">
                  
                  <div class="form-group col-sm-12 has-feedback">
                    <label for=""> Agriculturist </label>
                    <select ng-model="agriculturistid" 
                            ng-init="getAllAgriculturist()"
                            ng-options="a.refid as a.firstname +' '+ a.lastname for a in agriculturist"
                            class="form-control">
                    </select>
                  </div>

                  <div class="form-group col-sm-10 has-feedback">
                    <label> Select File </label>
                    <input type="file" file-input="files" ng-model="file" />

                  </div>

                  <div class="form-group col-sm-6 has-feedback">
                    <label for=""> Category </label>
                    <select ng-model="categoryid" 
                            ng-init="getAllCategories()"
                            ng-change="getAllSubCategories()"
                            ng-options="c.refid as c.title for c in categories"
                            class="form-control">
                    </select>
                  </div>

                  <div class="form-group col-sm-6 has-feedback">
                    <label for=""> Sub Category </label>
                    <select ng-model="subcategoryid" 
                            ng-options="c.refid as c.title for c in subcategories"
                            class="form-control">
                    </select>
                  </div>
                </div>
              </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-success" ng-click="uploadPortfolio()">Submit <span><span class="fa fa-paper-plane"></span></button>

                  <button type="reset" value="reset" class="btn btn-primary" ng-click="reset()"> Reset <span class="fa fa-refresh"></span></button>

                  <button type="button" class="btn btn-danger" data-dismiss="modal">Close <span><span class="fa fa-times"></span> </button>
                  </div>
                </div>
              </div>
            </div>

    <!-- #/ END OF MODAL -->
             
                </div>
            </div>

              




              <!-- third tab -->
    <div role="tabpanel" class="tab-pane fade" id="tab_content3" aria-labelledby="profile-tab" ng-controller="FarmlocationsCtrl" ng-init="getFarmlocationByAgriculturist()">

        <div class="x_content">


      <button class="btn btn-success btn-sm" ng-click="clearForm()" data-toggle="modal" data-target="#farmLocationModal"><i class="fa fa-users"></i> Add Record </button>
      
    
      <form class="form-inline pull-right">
        <div class="form-group">
          <input type="text" ng-model="search" class="form-control" id="search" placeholder="Search">
        </div>
      </form>

        <div class="table-responsive">
        <table class="table table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Address</th>
              <th>Longitude</th>
              <th>Latitude</th>
              <th>Farmtype</th>
              <th>Action</th>
            </tr>
          </thead>
            <tbody>
                <tr dir-paginate="af in farmlocations|orderBy:sortKey:reverse|filter:search|itemsPerPage: pageSize" pagination-id="Farmlocations" current-page="currentPage">
                  <td> {{ (currentPage-1)*pageSize + $index+1 }} </td>
                  <td> {{ af.address }} </td>
                  <td> {{ af.longitude }} </td>
                  <td> {{ af.latitude }} </td>
                  <td> {{ af.farmtype }} </td>
                  <td>
                <button ng-click="getFarmlocationsData(af)" data-toggle="modal" data-target="#farmLocationModal" class="btn btn-xs btn-primary" data-toggle="tooltip" data-placement="top" title="Edit"><i class="fa fa-pencil-square-o"></i> </button>

                <button ng-click="del_Farmlocations(af.refid)" class="btn btn-xs btn-danger"><i class="fa fa-trash" data-toggle="tooltip" data-placement="top" title="Delete"></i></button>   
                  </td>
                </tr>
              </tbody>
          </table>
            <dir-pagination-controls
                  max-size="5"
                  direction-links="true"
                  boundary-links="true" 
                  pagination-id="Farmlocations">
            </dir-pagination-controls>


                  <!-- Modal -->
    <div id="farmLocationModal" class="modal fade" role="dialog">
              <div class="modal-dialog">

                <!-- Modal content-->
                <div class="modal-content">
                  <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">Farmlocations Form </h4>
                  </div>
                  <div class="modal-body">
                    <div class="row">
                      
                    <div class="form-group col-sm-12 has-feedback">
                        <label for=""> Agriculturist </label>
                        <select ng-model="agriculturistid" 
                                ng-init="getAllAgriculturist()"
                                ng-options="a.refid as a.firstname +' '+ a.lastname for a in agriculturist"
                                class="form-control">
                        </select>
                      </div>

                      <div class="form-group col-sm-12 has-feedback">
                        <label for=""> Address </label>
                        <input ng-model="address" type="text" class="form-control">
                      </div>

                      <div class="form-group col-sm-6 has-feedback">
                        <label for=""> Longitude </label>
                        <input ng-model="longitude" type="text" class="form-control">
                      </div>

                      <div class="form-group col-sm-6 has-feedback">
                        <label for=""> Latitude </label>
                        <input ng-model="latitude" type="text" class="form-control">
                      </div>


                      <div class="form-group col-sm-12 has-feedback">
                        <label for=""> Farmtype </label>
                        <input ng-model="farmtype" type="text" class="form-control">
                      </div>   

                    </div>

                  </div>
                  <div class="modal-footer">

                    <button type="button" class="btn btn-success" ng-click="cu_Farmlocations()">Submit <i class="fa fa-paper-plane"></i></button>

                    <button type="reset" value="reset" class="btn btn-primary" ng-click="reset()"> Reset <i class="fa fa-refresh"></i></button>

                    <button type="button" class="btn btn-danger" data-dismiss="modal">Close <i class="fa fa-times"> </i></button>
                  </div>
                </div>
              </div>
    </div>

  <!-- #/ END OF MODAL -->
        </div>
      </div>
    </div>                  
<?php include './partials/footer.php' ?>
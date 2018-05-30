<?php include 'partials/header.php'; ?>

<div ng-controller="agriculturistCtrl" ng-init="getAllagriculturist()">
  
  <!-- page content -->
  <div class="right_col" role="main">
    <div class="">
      <div class="page-title">
        <div class="title_left">

          <h3>Agriculturist</h3><i class="fa fa-users pull-right"></i>

        </div>

      </div>

      <div class="clearfix"></div>

      <div class="row">
        <div class="col-md-12 col-sm-12 col-xs-12">
          <div class="x_panel">

            <div class="x_title">
              <h2>Agriculturist List</h2>
              <span class="fa fa-th-list form-control-feedback right"></span>
              <div class="clearfix"></div>
            </div>


            <div class="x_content">


              <button class="btn btn-success btn-sm" ng-click="clearForm()" data-toggle="modal" data-target="#myModal">
                <i class="fa fa-users"></i> Add Record 
              </button>
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
                      <th>First Name</th>
                      <th>Middle Name</th>
                      <th>Last Name</th>
                      <th>Contact</th>
                      <th>Adress</th>
                      <th>Municipality</th>
                      <th>Province</th>
                      <th>Agri Type</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr dir-paginate="ag in agriculturist|orderBy:sortKey:reverse|filter:search|itemsPerPage: pageSize" pagination-id="agriculturist" current-page="currentPage">

                      <td> {{ (currentPage-1)*pageSize + $index+1 }} </td>
                      <td> {{ ag.firstname }} </td>
                      <td> {{ ag.middlename }} </td>
                      <td> {{ ag.lastname }} </td>
                      <td> {{ ag.contact }} </td>
                      <td> {{ ag.address }} </td>
                      <td> {{ ag.municipality }} </td>
                      <td> {{ ag.province }} </td>
                      <td> {{ ag.title }} </td>
                      <td>
                        <button ng-click="loadProfile(ag.refid)" class="btn btn-xs btn-primary" data-toggle="tooltip" data-placement="top" title="View profile">
                          <i class="fa fa-pencil-square-o"></i>
                        </button>
                        <button ng-click="del_agriculturist(ag.refid)" class="btn btn-xs btn-danger" data-toggle="tooltip" data-placement="top" title="Delete">
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
                  pagination-id="agriculturist">
                </dir-pagination-controls>
              </div>


            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- /page content -->


  <!-- Modal -->
  <div id="myModal" class="modal fade" role="dialog">
    <div class="modal-dialog">

      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">Agriculturist Form</h4>
        </div>
        <div class="modal-body">
          <div class="row">
            
            <div class="form-group col-sm-12 has-feedback">
              <label for=""> Firstname </label>
              <input ng-model="a.firstname" type="text" class="form-control">
            </div>

            <div class="form-group col-sm-12 has-feedback">
              <label for=""> Middlename </label>
              <input ng-model="a.middlename" type="text" class="form-control">
            </div>

            <div class="form-group col-sm-12 has-feedback">
              <label for=""> Lastname </label>
              <input ng-model="a.lastname" type="text" class="form-control">
            </div>

            <div class="form-group col-sm-6 has-feedback">
              <label for=""> Contact </label>
              <input ng-model="a.contact" type="text" class="form-control">
            </div>


            <div class="form-group col-sm-6 has-feedback">
              <label for=""> Address </label>
              <input ng-model="a.address" type="text" class="form-control">
            </div>

            <div class="form-group col-sm-6 has-feedback has-feedback-left">
              <label for=""> Municipality </label>
              <input ng-model="a.municipality" type="text" class="form-control">
            </div>

            <div class="form-group col-sm-6 has-feedback">
              <label for=""> Province </label>
              <input ng-model="a.province" type="text" class="form-control">
            </div>

            <div class="form-group col-sm-6">
              <label for=""> Category </label>
              <select ng-model="a.categoryid" 
                      ng-init="getAllCategories()"
                      ng-change="getAllSubCategories()"
                      ng-options="c.refid as c.title for c in categories"
                      class="form-control">
              </select>
            </div>

            <div class="form-group col-sm-6">
              <label for=""> Sub Category </label>
              <select ng-model="a.subcategoryid" 
                      ng-options="c.refid as c.title for c in subcategories"
                      class="form-control">
              </select>
            </div>
          </div>

          

        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-success" ng-click="cu_agriculturist()">Submit <span><span class="fa fa-paper-plane"></span></button>

          <button type="reset" value="reset" class="btn btn-primary" ng-click="reset()"> Reset <span class="fa fa-refresh"></span></button>

          <button type="button" class="btn btn-danger" data-dismiss="modal">Close <span><span class="fa fa-times"></span> </button>
        </div>
      </div>

    </div>
  </div>

  <!-- #/ END OF MODAL -->

  
</div>

<?php include 'partials/footer.php'; ?>
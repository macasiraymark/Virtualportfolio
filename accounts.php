<?php include 'partials/header.php'; ?>

<div ng-controller="AccountsCtrl" ng-init="getAllAccounts()">

  <!-- page content -->
  <div class="right_col" role="main">
    <div class="">
      <div class="page-title">
        <div class="title_left">

        <h3>Accounts</h3> <i class="fa fa-users pull-right"></i>
      </div>

      <div class="clearfix"></div>

      <div class="row">
        <div class="col-md-12 col-sm-12 col-xs-12">
          <div class="x_panel has-feedback">
            <div class="x_title">
              <h2>Accounts List</h2>
              <span class="glyphicon glyphicon-th-list form-control-feedback"></span>
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
                      <th>Last name</th>
                      <th>Contact Number</th>
                      <th>Adress</th>
                      <th>Municipality</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>

                    <tr dir-paginate="a in accounts|orderBy:sortKey:reverse|filter:search|itemsPerPage: pageSize" pagination-id="accounts" current-page="currentPage">

                      <td> {{ (currentPage-1)*pageSize + $index+1 }} </td>
                      <td> {{ a.firstname }} </td>
                      <td> {{ a.middlename }} </td>
                      <td> {{ a.lastname }} </td>
                      <td> {{ a.contactnumber }} </td>
                      <td> {{ a.address }} </td>
                      <td> {{ a.municipality }} </td>
                      <td>
                        <button ng-clic k="getAccountData(a)" data-toggle="modal" data-target="#myModal" class="btn btn-xs btn-primary" data-toggle="tooltip" data-placement="top" title="Edit">
                          <i class="fa fa-pencil-square-o"></i>
                        </button>
                        <button ng-click="del_accounts(a.userid)" class="btn btn-xs btn-danger" data-toggle="tooltip" data-placement="top" title="Delete">
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
                  pagination-id="accounts">
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

          <h2 class="modal-title">Account Form</h2>

        </div>
        <div class="modal-body">
          <div class="row">

            <div class="form-group col-sm-12 has-feedback">
              <label for="required"> Firstname </label>
              <input ng-model="firstname" type="text" class="form-control"  >
            </div>

            <div class="form-group col-sm-12 has-feedback">
              <label for=""> Middlename </label>
              <input ng-model="middlename" type="text" class="form-control" required>
            </div>

            <div class="form-group col-sm-12 has-feedback">
              <label for=""> Lastname </label>
              <input ng-model="lastname" type="text" class="form-control" required>
            </div>

            <div class="form-group col-sm-6 has-feedback">
              <label for=""> Email </label>
              <input ng-model="email" type="email" class="form-control" required>
            </div>

            <div class="form-group col-sm-6 has-feedback">
              <label for=""> Contactnumber </label>
              <input ng-model="contactnumber" type="text" class="form-control" required>
            </div>

            <div class="form-group col-sm-6 has-feedback">
              <label for=""> Address </label>
              <input ng-model="address" type="text" class="form-control" required>
            </div>

            <div class="form-group col-sm-6 has-feedback">
              <label for=""> Municipality </label>
              <input ng-model="municipality" type="text" class="form-control" required>
            </div>

           <!--  <div class="form-group col-sm-6 has-feedback">
              <label for=""> Username </label>
              <input ng-model="username" type="text" class="form-control" required>
            </div> -->

            <div class="form-group col-sm-6 has-feedback">
              <label for=""> Password </label>
              <input ng-model="password" type="password" class="form-control" ng-minlength='6' required>
            </div>
          </div>



        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-success" ng-click="cu_accounts()">Submit <span class="fa fa-paper-plane"></span></button>

          <button type="reset" value="reset" class="btn btn-primary" ng-click = "reset()"> Reset <span class="fa fa-refresh"></span></button>

          <button type="button" class="btn btn-danger" data-dismiss="modal">Close <span class="fa fa-times"></span></button>
        </div>
      </div>

    </div>
  </div>

  <!-- #/ END OF MODAL -->


</div>

<?php include 'partials/footer.php'; ?>

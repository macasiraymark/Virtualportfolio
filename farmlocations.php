<?php include 'partials/header.php'; ?>

<div ng-controller="FarmlocationsCtrl" ng-init="getAllFarmlocations()">
  
  <!-- page content -->
  <div class="right_col" role="main">
    <div class="">
      <div class="page-title">
        <div class="title_left">

          <h3>Farm Location</h3><i class="fa fa-users pull-right"></i>

        </div>

      </div>

      <div class="clearfix"></div>

      <div class="row">
        <div class="col-md-12 col-sm-12 col-xs-12">
          <div class="x_panel">

            <div class="x_title">
              <h2>Farm Location List</h2>
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
                      <th>Agriculturist</th>
                      <th>Address</th>
                      <th>Longitude</th>
                      <th>Latitude</th>
                      <th>Farmtype</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr dir-paginate="af in Farmlocations|orderBy:sortKey:reverse|filter:search|itemsPerPage: pageSize" pagination-id="Farmlocations" current-page="currentPage">

                      <td> {{ (currentPage-1)*pageSize + $index+1 }} </td>
                      <td> {{ af.firstname +" "+af.lastname }} </td>
                      <td> {{ af.address }} </td>
                      <td> {{ af.longitude }} </td>
                      <td> {{ af.latitude }} </td>
                      <td> {{ af.farmtype }} </td>
                      <td>
                        <button ng-click="getFarmlocationsData(af)" data-toggle="modal" data-target="#myModal" class="btn btn-xs btn-primary" data-toggle="tooltip" data-placement="top" title="Edit">
                          <i class="fa fa-pencil-square-o"></i>
                        </button>
                        <button ng-click="del_Farmlocations(af.refid)" class="btn btn-xs btn-danger">
                          <i class="fa fa-trash" data-toggle="tooltip" data-placement="top" title="Delete"></i>
                        </button>
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
        <div class="modal-footer">
          <button type="button" class="btn btn-success" ng-click="cu_Farmlocations()">Submit <span class="fa fa-paper-plane"></button>

          <button type="reset" value="reset" class="btn btn-primary" ng-click="reset()"> Reset <span class="fa fa-refresh"></span></button>

          <button type="button" class="btn btn-danger" data-dismiss="modal">Close <span> <span class="fa fa-times"> </span></button>
        </div>
      </div>

    </div>
  </div>

  <!-- #/ END OF MODAL -->

  
</div>

<?php include 'partials/footer.php'; ?>
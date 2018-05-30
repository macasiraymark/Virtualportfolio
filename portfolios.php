<?php include 'partials/header.php'; ?>

<div ng-controller="portfoliosCtrl" ng-init="getAllportfolio()">
  
  <!-- page content -->
  <div class="right_col" role="main">
    <div class="">
      <div class="page-title">
        <div class="title_left">

          <h3>Portfolios</h3><i class="fa fa-users pull-right"></i>

        </div>

      </div>

      <div class="clearfix"></div>

      <div class="row">
        <div class="col-md-12 col-sm-12 col-xs-12">
          <div class="x_panel">

            <div class="x_title">
              <h2>Portfolios</h2>
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
                      <th>File Name</th>
                      <th>Date Posted</th>
                      <!-- <th>Posted By</th> -->
                      <th>Category</th>
                      <th>Sub Category</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr dir-paginate="ap in portfolios|orderBy:sortKey:reverse|filter:search|itemsPerPage: pageSize" pagination-id="portfolios" current-page="currentPage">

                      <td> {{ (currentPage-1)*pageSize + $index+1 }} </td>
                      <td> {{ ap.firstname +" "+ap.lastname }} </td>
                      <td> {{ ap.filename }} </td>
                      <td> {{ ap.dateposted }} </td>
                      <!-- <td> {{ ap.postedby }} </td> -->
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

<?php include 'partials/footer.php'; ?>
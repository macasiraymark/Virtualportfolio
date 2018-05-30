<?php include 'partials/header.php'; ?>

<div ng-controller="SubCategoryCtrl" ng-init="getAllSubCategory()">
  
  <!-- page content -->
  <div class="right_col" role="main">
    <div class="">
      <div class="page-title">
        <div class="title_left">

          <h3>Sub-Category</h3><i class="fa fa-users pull-right"></i>

        </div>

      </div>

      <div class="clearfix"></div>

      <div class="row">
        <div class="col-md-12 col-sm-12 col-xs-12">
          <div class="x_panel">

            <div class="x_title">
              <h2>Sub-Category List</h2>
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
                      <th>Title</th>
                      <th>Category</th>
                      <th>Description</th>
                      <th>Datecreated</th>
                     <!--  <th>Createdby</th> -->
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr dir-paginate="as in subCategories |orderBy:sortKey:reverse|filter:search|itemsPerPage: pageSize" pagination-id="SubCategory" current-page="currentPage">

                      <td> {{ (currentPage-1)*pageSize + $index+1 }} </td>
                      <td> {{ as.title }} </td>
                      <td> {{ as.category }}</td>
                      <td> {{ as.description }} </td>
                      <td> {{ as.datecreated }} </td>
                      <!-- <td> {{ as.createdby }} </td>
 -->                      <td>
                        <button ng-click="getSubCategoryData(as)" data-toggle="modal" data-target="#myModal" class="btn btn-xs btn-primary">
                          <i class="fa fa-pencil-square-o"></i>
                        </button>
                        <button ng-click="del_SubCategory(as.refid)" class="btn btn-xs btn-danger" data-toggle="tooltip" data-placement="top" title="Delete">
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
                  pagination-id="SubCategory">
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
          <h4 class="modal-title">Category Form </h4>
        </div>
        <div class="modal-body">
          <div class="row">
            
            <div class="form-group col-sm-12 has-feedback">
              <label for=""> Title </label>
              <input ng-model="title" type="text" class="form-control">
            </div>
            <!-- ito yung sinasabi kong select box pre-->
            <div class="form-group col-sm-12 has-feedback">
              <label for=""> Category </label>
              <select ng-model="categoryid" 
                      ng-init="getAllCategories()"
                      ng-options="c.refid as c.title for c in categories"
                      class="form-control">
                
              </select>
              
            </div>

            <div class="form-group col-sm-12 has-feedback">
              <label for=""> Description </label>
              <input ng-model="description" type="text" class="form-control">
            </div>


        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-success" ng-click="as_SubCategory()">Submit <span class="fa fa-paper-plane"></button>

          <button type="reset" value="reset" class="btn btn-primary" ng-click="reset()"> Reset <span class="fa fa-refresh"></span></button>

          <button type="button" class="btn btn-danger" data-dismiss="modal">Close <span> <span class="fa fa-times"> </span></button>
        </div>
      </div>

    </div>
  </div>

  <!-- #/ END OF MODAL -->

  
</div>

<?php include 'partials/footer.php'; ?>
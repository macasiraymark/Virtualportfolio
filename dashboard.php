<?php include 'partials/header.php'; ?>
<?php include 'config/database.php'; ?>
<div >
  
  <!-- page content -->
  <div class="right_col" role="main">
    <div class="">
      <div class="page-title">
        <div class="title_left">
          <h1>Welcome Moderator(s)</h1>
          <!-- <div id="particles-js"> -->
          </div>
        </div>
            
      </div>

      <div class="clearfix"></div>

      <div class="row">
        <div class="col-md-12 col-sm-12 col-xs-12">
          <div class="x_panel">

            <div class="x_title">
              <div class="row top_tiles">
              <div class="animated flipInY col-lg-3 col-md-3 col-sm-6 col-xs-12">

                <div class="tile-stats">
                  <?php 

                    $pdoQuery = "SELECT * FROM tbl_accounts";

                    $pdoResult = $connection->query($pdoQuery);

                    $pdoRowCount = $pdoResult->rowCount();
                                        
                   ?>
                  <div class="icon"><i class="fa fa-user"></i></div>
                  <?php echo "<div class='count'>$pdoRowCount</div>" ?>
                  <h3>Admin <i class="fa fa-spin fa-spinner"></i></h3>
                  <p>Number of moderators</p>
                </div>
              </div>

              <div class="animated flipInY col-lg-3 col-md-3 col-sm-6 col-xs-12">
                <div class="tile-stats">
                  <?php 

                    $pdoQuery = "SELECT * FROM tbl_agriculturist";

                    $pdoResult = $connection->query($pdoQuery);

                    $pdoRowCount = $pdoResult->rowCount();
                                        
                   ?>

                  <div class="icon"><i class="fa fa-users "></i></div>
                  <?php echo "<div class='count'>$pdoRowCount</div>" ?>
                  <h3>Agriculturists <i class="fa fa-spin fa-spinner"></i></h3>
                  <p>Number of agriculturists</i></p>
                </div>
              </div>

              <div class="animated flipInY col-lg-3 col-md-3 col-sm-6 col-xs-12">
                <div class="tile-stats">
                  <?php 

                    $pdoQuery = "SELECT * FROM tbl_portfolios";

                    $pdoResult = $connection->query($pdoQuery);

                    $pdoRowCount = $pdoResult->rowCount();
                                        
                   ?>
                  <div class="icon"><i class="fa fa-folder"></i></div>
                  <?php echo "<div class='count'>$pdoRowCount</div>" ?>
                  <h3>Portfolios <i class="fa fa-spin fa-spinner"></i></h3>
                  <p>Number of Portfolios submitted.</p>
                </div>
              </div>

              <div class="animated flipInY col-lg-3 col-md-3 col-sm-6 col-xs-12">
                <div class="tile-stats">
                  
                  <?php 

                    $pdoQuery = "SELECT * FROM tbl_category";

                    $pdoResult = $connection->query($pdoQuery);

                    $pdoRowCount = $pdoResult->rowCount();
                                        
                   ?>
                  <div class="icon"><i class="fa fa-tree"></i></div>
                  <?php echo "<div class='count'>$pdoRowCount</div>" ?>
                  <h3>Farm Type <i class="fa fa-spin fa-refresh"></i></h3>
                  <p>Number of Farm Type submitted</p>
                </div>
              </div>
            </div>
              <div class="clearfix"></div>
            </div>

            <div class="x_content">
             <div class="col-md-12 col-sm-12 col-xs-12">
                <div class="x_panel">
                  <div class="x_title">
                  
    
                    <div class="clearfix"></div>
                  </div>
                  <div class="x_content">
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- /page content -->

  
</div>

<?php include 'partials/footer.php'; ?>

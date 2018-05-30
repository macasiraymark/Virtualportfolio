<!DOCTYPE html>
<html lang="en">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <!-- Meta, title, CSS, favicons, etc. -->
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="shortcut icon" href="./assets/img/da-logo.png" type="image/x-icon">
    <title>Virtual Portfolio | </title>

    <!-- Bootstrap -->
    <link href="assets/template/gentelella-master/vendors/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Font Awesome -->
    <link href="assets/template/gentelella-master/vendors/font-awesome/css/font-awesome.min.css" rel="stylesheet">
    <!-- NProgress -->
    <link href="assets/template/gentelella-master/vendors/nprogress/nprogress.css" rel="stylesheet">

    <!-- Custom Theme Style -->
    <link href="assets/template/gentelella-master/build/css/custom.min.css" rel="stylesheet">
    

    <!-- SweetAlert -->
    <link rel="stylesheet" type="text/css" href="assets/lib/sweetalert/dist/sweetalert.css">
    <!-- AnimateCss -->
    <link rel="stylesheet" type="text/css" href="assets/lib/animate.css/animate.css">


  </head>

  <body class="nav-md" ng-app="myApp" ng-controller="AccountsCtrl" >
    <div class="container body">
      <div class="main_container">
        <div class="col-md-3 left_col">
          <div class="left_col scroll-view">
            <div class="navbar nav_title" style="border: 0;">
              <a href="http://rfo02.da.gov.ph/" target="_blank" class="site_title"><img src="./assets/img/da-logo.ico" class="animate infinite zoomInRight"> <span>Virtual Portfolio</span></a>
            </div>

            <div class="clearfix"></div>

            <!-- menu profile quick info -->
<!--             <div class="profile clearfix">
              <div class="profile_pic">
                <img src="images/img.jpg" alt="..." class="img-circle profile_img">
              </div>
              <div class="profile_info">
                <span>Welcome,</span>
                <h2>John Doe</h2>
              </div>
              <div class="clearfix"></div>
            </div> -->
            <!-- /menu profile quick info -->

            <br />

            <!-- sidebar menu -->
            <div id="sidebar-menu" class="main_menu_side hidden-print main_menu">
              <div class="menu_section">
                <h3>Welcome</h3>
                <ul class="nav side-menu">
                  <li><a><i class="fa fa-dashboard"></i> Dashboard <span class="fa fa-chevron-down"></span></a>
                    <ul class="nav child_menu">
                      <li><a href="dashboard.php">Dashboard</a></li>
                    </ul>
                  </li>
                  <li><a><i class="fa fa-user"></i> Accounts <span class="fa fa-chevron-down"></span></a>
                    <ul class="nav child_menu">
                      <li><a href="./accounts.php">Accounts</a></li>
                    </ul>
                  </li>
                  <li><a><i class="fa fa-spin fa-gear"></i> Settings <span class="fa fa-chevron-down"></span></a>
                    <ul class="nav child_menu">
                      <li><a href="geotagging.php">Get Geocode</a></li>
                      <li><a href="farmlocations.php">Farm Locations</a></li>
                    </ul>
                  </li>
        
                  <li><a><i class="fa fa-spin fa-gears"></i> Production <span class="fa fa-chevron-down"></span></a>
                    <ul class="nav child_menu">
                      <li><a href="category.php">Category</a></li>
                      <li><a href="subcategory.php">Sub Category</a></li>
                    </ul>
                  </li>

                  <li><a><i class="fa fa-users"></i> Farmers <span class="fa fa-chevron-down"></span></a>
                    <ul class="nav child_menu">
                      <li><a href="agriculturist.php">Agriculturist</a></li>
                      <li><a href="portfolios.php">Agriculturist Portfolios</a></li>
                      <li><a href="agriculturist_profile.php">Agriculurist Profile</a></li>
                    </ul>
                  </li>
                  <li><a><i class="fa fa-file-pdf-o"></i>Reports PDF <span class="fa fa-chevron-down"></span></a>
                    <ul class="nav child_menu">
                      <li><a href="pdf-accounts.php">Accounts Reports</a></li>
                      <li><a href="pdf-agriculturists.php">Agriculturist Reports</a></li>
                      <li><a href="pdf-farmlocations.php">Farm Locations Reports</a></li>
                    </ul>
                  </li>
                    <li><a><i class="fa fa-file-pdf-o"></i>Reports Excel <span class="fa fa-chevron-down"></span></a>
                    <ul class="nav child_menu">
                      <li><form action="Excel-Agriculturist-report.php" method="post" class="navbar-form navbar-right">
                      <button type="submit" name="export_excel"  class="btn btn-success">
                        <i class="fa fa-file-excel-o"></i> Export to Excel
                      </button>
              </form></li>
                    </ul>
                  </li>
                </ul>
                  <div class="menu_section">
                                  <h3>menu</h3>
                  <!-- <h2 style="color:#31f776; text-align:center;" class="animated infinite bounceInUp"><strong>Making a difference globally</strong></h2> -->
                  
                </div>
              </div>
              

            </div>
            <!-- /sidebar menu -->

            <!-- /menu footer buttons -->
            <div class="sidebar-footer hidden-small">
              
              <a data-toggle="tooltip" data-placement="top" title="Logout" href="index.php">
                <span class="glyphicon glyphicon-off" aria-hidden="false"></span>
              </a>
            </div>
            <!-- /menu footer buttons -->
          </div>
        </div>

        <!-- top navigation -->
        <div class="top_nav">
          <div class="nav_menu">
            <nav>
              <div class="nav toggle">
                <a id="menu_toggle"><i class="fa fa-bars"></i></a>
              </div>

              <ul class="nav navbar-nav navbar-right">
               

                <li role="presentation" class="dropdown">
                 <!--  <a href="javascript:;" class="dropdown-toggle info-number" data-toggle="dropdown" aria-expanded="false">
                    <i class="fa fa-envelope-o"></i>
                    <span class="badge bg-green">6</span>
                  </a> -->
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <!-- /top navigation -->
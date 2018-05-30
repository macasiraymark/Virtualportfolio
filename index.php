<?php include './partials/header-login.php' ?>

  <body class="log-in" ng-app="myApp">
      <div>

      <a class="hiddenanchor" id="signin"></a>

      <div class="login_wrapper">
        <div class="animate form login_form">
          <section class="login_content">
            <form class="" ng-controller="LoginCtrl" action="">
              <h1>Virtual Library</h1>
              <h2>Department of Agriculture</h2>
              <div>
                <input type="text" ng-model="email" class="form-control" placeholder="Enter E-mail" required="signin-email" data-toggle="tooltip" title="Enter E-mail" type="email" />
              </div>
              <div>
                <input type="password" ng-model="password" class="form-control" placeholder="Enter Password" required="control-label sr-only" data-toggle="tooltip" title="Enter Password" />
              </div>
              <div>
                <a class="btn btn-default submit btn-lg" ng-click="logIn()" data-toggle="tooltip" title="Proceed">Log in</a>
                <!-- <a class="reset_pass" href="#">Lost your password?</a> -->
              </div>

              <div class="clearfix"></div>

              <div class="separator">


                <div class="clearfix"></div>
                <br />

                <div>
                  <h1><i><img src="./assets/img/da-logo.ico" class="animated infinite bounceIn" ></i> Department of Agriculture</h1>
                  <p>©2018 All Rights Reserved. Department of Agriculture</p>
                </div>
              </div>
            </form>
          </section>
        </div>
          <h1></h1>
      </div>
    </div>
  </body>

<?php include './partials/footer-login.php' ?>

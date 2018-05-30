<?php 
	session_start();
	echo 'Welcome '.$_SESSION['username'];
	echo '<br> <a href="index.php?action">Logout</a>'
 ?>

  <?php 
    if (isset($_POST['bttLogin'])){
      require 'config/database.php';
      $username = $_POST['username'];
      $password = $_POST['password'];
      $result = mysqli_query($con, 'select * from accounts where username="'.$username.'" and password="'.$password.'"');
      if (mysqli_num_rows($result)==1){
        $_SESSION['username'] = $username;
        header('Location: dashboard.php');
      }
      else
        echo "Account is invalid";
    }
    if(isset($_GET['logout'])){
      session_unregister('username');
    }
   ?>
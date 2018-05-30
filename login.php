<?php
//Include database connection
require("./config/db.php");

//Include class StudentLogin
// require("../classes/StudentLogin.php");

if(isset($_POST['submit'])) {
    $refid = trim($_POST['refid']);

    $loginStud = new StudentLogin($refid);
    $rtnLogin = $loginStud->StudLogin();
}



$db->close();
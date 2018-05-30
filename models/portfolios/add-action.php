<?php 
	//Call of Load database configuration
	require '../../config/database.php';

  $data = json_decode(file_get_contents("php://input"));

  $agriculturistid    = $_POST['agriculturistid'];
  $categoryid 		    = $_POST['categoryid'];
  $subcategoryid 	    = $_POST['subcategoryid'];

  // CREATE PERSONAL FOLDER OF Agriculturist
  	$path = "../../uploads/portfolios/".$agriculturistid;
  	if (!is_dir($path)) {
  		$old = umask(0);
  		mkdir($path, 0777);
  		umask($old);
  	}

  $tmp_file = $_FILES['file']['tmp_name'];
  $file = $_FILES['file']['name'];
  $folderName = $path."/".$file;

  if (move_uploaded_file($tmp_file, $folderName)) {
    $query = "INSERT INTO tbl_portfolios(refid, agriculturistid, filename, dateposted, postedby, categoryid, subcategoryid) VALUES (:refid, :agriculturistid, :filename, :dateposted, :postedby, :categoryid, :subcategoryid)";

    $stmt = $connection->prepare($query);

    $refid = password_hash($file, PASSWORD_DEFAULT);
    $refid = substr($refid, 15, 10);

    $dataArray = array(
        ':refid'            => $refid, 
        ':agriculturistid'  => $agriculturistid, 
        ':filename'         => $file, 
        ':dateposted'       => date('/m/d/Y'), 
        ':postedby'         => "", 
        ':categoryid'       => $categoryid, 
        ':subcategoryid'    => $subcategoryid
      );
    $stmt->execute($dataArray);
  }
?>
<?php 
	error_reporting(E_ALL ^ E_NOTICE);
	require '../../config/database.php';

	$categoryid = $_GET['categoryid'];

	
	$query = "SELECT refid, categoryid, title, description, datecreated, createdby FROM tbl_subcategory WHERE categoryid=:categoryid";

	

	$stmt = $connection->prepare($query);
	$stmt->execute(array(':categoryid' => $categoryid ));


	while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
		$data[] = $row;
	}

	if(!empty($data)) {  //kung empty yung $data dito di siya magrerelease ng mga data
		print json_encode($data);
	}

?>
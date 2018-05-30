<?php 
	header("Access-Control-Allow-Origin: *");
	require '../../config/database.php';

	
	$query = "SELECT refid, title, description, datecreated, createdby FROM tbl_category";

	$stmt = $connection->prepare($query);
	$stmt->execute();

	while($row = $stmt->fetch()){
		$data[] = $row;
	}

	print json_encode($data);
?>


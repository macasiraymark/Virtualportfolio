<?php 
	//Call of Load Database configuration
	require '../../config/database.php';

  $data = json_decode(file_get_contents("php://input"));

	$query = "UPDATE tbl_subcategory SET title=:title, description=:description, categoryid=:categoryid WHERE refid=:refid";

	$stmt = $connection->prepare($query);

	$dataArray = array(
			':refid' 				=> $data->refid,
			':categoryid' 			=> $data->categoryid,
			':title' 				=> $data->title,
			':description'			=> $data->description
		);

	$stmt->execute($dataArray);
?>
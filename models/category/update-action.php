<?php 
	//Call of Load Database configuration
	require '../../config/database.php';

  $data = json_decode(file_get_contents("php://input"));

	$query = "UPDATE tbl_category SET title=:title, description=:description WHERE refid=:refid";

	$stmt = $connection->prepare($query);

	$dataArray = array(
			':refid' 				=> $data->refid,
			':title' 				=> $data->title,
			':description'			=> $data->description
		);

	$stmt->execute($dataArray);
?>
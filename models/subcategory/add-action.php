<?php 
	//Call of Load database configuration
	require '../../config/database.php';

  $data = json_decode(file_get_contents("php://input"));


	$query = "INSERT INTO tbl_subcategory (refid, categoryid, title, description, datecreated, createdby) VALUES (:refid, :categoryid, :title, :description, :datecreated, :createdby)";

	$stmt = $connection->prepare($query);


	$refid = password_hash($data->title, PASSWORD_DEFAULT);
	$refid = substr($refid, 15, 10);

	$dataArray = array(
			':refid' 				=> $refid,
			':categoryid'			=> $data->categoryid,
			':title'				=> $data->title,
			':description' 			=> $data->description,
			':datecreated' 			=> date('m/d/Y H:i:s'),
			':createdby' 			=> "",
		);
	$stmt->execute($dataArray);
?>
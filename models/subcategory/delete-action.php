<?php 
	//Call of Database configuration
	require '../../config/database.php';

	$data = json_decode(file_get_contents("php://input"));

	$query = "DELETE FROM tbl_subcategory WHERE refid = :refid";

	$stmt = $connection->prepare($query);

	$dataArray = array(
			':refid' => $data->refid,
		);
	$stmt->execute($dataArray);
?>
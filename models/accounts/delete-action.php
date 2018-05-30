<?php
	//Call of Load Database configuration
	require '../../config/database.php';

  $data = json_decode(file_get_contents("php://input"));

	$query = "DELETE FROM tbl_accounts WHERE userid = :userid";

	$stmt = $connection->prepare($query);

	$dataArray = array(
								':userid' => $data->userid,
							);
	$stmt->execute($dataArray);
?>
<?php 
	//Call of Load database configuration
	require '../../config/database.php';

  $data = json_decode(file_get_contents("php://input"));


	$query = "INSERT INTO tbl_farmlocations (refid, agriculturistid, address, longitude, latitude, active, farmtype) VALUES (:refid, :agriculturistid, :address, :longitude, :latitude, :active, :farmtype)";

	$stmt = $connection->prepare($query);


	$refid = password_hash($data->agriculturistid, PASSWORD_DEFAULT);
	$refid = substr($refid, 15, 10);

	$dataArray = array(
			':refid' 				=> $refid,
			':agriculturistid' 		=> $data->agriculturistid,
			':address'				=> $data->address,
			':longitude' 			=> $data->longitude,
			':latitude' 			=> $data->latitude,
			':farmtype' 			=> $data->farmtype,
			':active' 				=> 1,
		);
	$stmt->execute($dataArray);
?>
<?php 
	//Call of Load Database configuration
	require '../../config/database.php';

  $data = json_decode(file_get_contents("php://input"));

	$query = "UPDATE tbl_farmlocations SET agriculturistid=:agriculturistid, address=:address, longitude=:longitude, latitude=:latitude, farmtype=:farmtype WHERE refid=:refid";

	$stmt = $connection->prepare($query);

	$dataArray = array(
			':refid' 				=> $data->refid,
			':agriculturistid' 		=> $data->agriculturistid,
			':address'				=> $data->address,
			':longitude' 			=> $data->longitude,
			':latitude' 			=> $data->latitude,
			':farmtype' 			=> $data->farmtype,
		);

	$stmt->execute($dataArray);
?>
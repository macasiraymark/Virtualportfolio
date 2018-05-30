<?php
	//Call of Load Database configuration
	require '../../config/database.php';

  $data = json_decode(file_get_contents("php://input"));

	$query = "UPDATE tbl_accounts SET firstname=:firstname, middlename=:middlename, lastname=:lastname, contactnumber=:contactnumber, address=:address, municipality=:municipality WHERE userid=:userid";

	$stmt = $connection->prepare($query);


	$dataArray = array(
								':userid' 				=> $data->userid,
								':firstname' 			=> $data->firstname,
								':middlename' 			=> $data->middlename,
								':lastname' 			=> $data->lastname,
								':contactnumber' 		=> $data->contactnumber,
								':address' 				=> $data->address,
								':municipality' 		=> $data->municipality,
							);
	$stmt->execute($dataArray);

?>

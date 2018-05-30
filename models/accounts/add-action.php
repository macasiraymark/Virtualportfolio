<?php
	//Call of Load database configuration
	require '../../config/database.php';

  $data = json_decode(file_get_contents("php://input"));

	$query = "INSERT INTO tbl_accounts(userid, firstname, middlename, lastname, contactnumber, address, municipality, sector, email, password, acct_type, active, attempts) VALUES (:userid, :firstname, :middlename, :lastname, :contactnumber, :address, :municipality, :sector, :email, :password, :acct_type, :active, :attempts)";

	$stmt = $connection->prepare($query);

	$userid = password_hash($data->username.date('d/m/Y H:i:s'), PASSWORD_DEFAULT);
	$userid = substr($userid, 15, 10);

	$dataArray = array(
								':userid' 				=> $userid,
								':firstname' 			=> $data->firstname,
								':middlename' 			=> $data->middlename,
								':lastname' 			=> $data->lastname,
								':contactnumber' 		=> $data->contactnumber,
								':address' 				=> $data->address,
								':municipality' 		=> $data->municipality,
								':sector' 				=> $data->sector,
								':email' 				=> $data->email,
								':password' 			=> password_hash($data->password, PASSWORD_DEFAULT),
								':acct_type' 			=> 0,
								':attempts' 			=> 0,
								':active' 				=> 1
							);

	$stmt->execute($dataArray);
?>
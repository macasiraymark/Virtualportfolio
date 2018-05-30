<?php 
	//Call of Load database configuration
	require '../../config/database.php';

  $data = json_decode(file_get_contents("php://input"));


	$query = "INSERT INTO tbl_agriculturist (refid, firstname, middlename, lastname, contact, address, municipality, province, active, categoryid, subcategoryid, datecreated, createdby) VALUES (:refid, :firstname, :middlename, :lastname, :contact, :address, :municipality, :province, :active, :categoryid, :subcategoryid, :datecreated, :createdby)";

	$stmt = $connection->prepare($query);


	$refid = password_hash($data->firstname, PASSWORD_DEFAULT);
	$refid = substr($refid, 15, 10);

	$dataArray = array(
			':refid' 			=> $refid,
			':firstname' 		=> $data->firstname,
			':middlename'		=> $data->middlename,
			':lastname' 		=> $data->lastname,
			':contact' 			=> $data->contact,
			':address' 			=> $data->address,
			':municipality' 	=> $data->municipality,
			':province' 		=> $data->province,
			':active' 			=> 1,
			':categoryid' 		=> $data->categoryid,
			'subcategoryid'		=> $data->subcategoryid,
			'datecreated'		=> $data->datecreated,
			'createdby'			=> $data->createdby
		);
	$stmt->execute($dataArray);
?>
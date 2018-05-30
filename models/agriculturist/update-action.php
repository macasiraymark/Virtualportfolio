<?php 
	//Call of Load Database configuration
	require '../../config/database.php';

  $data = json_decode(file_get_contents("php://input"));

	$query = "UPDATE tbl_agriculturist SET firstname=:firstname, middlename=:middlename, lastname=:lastname, contact=:contact, address=:address, municipality=:municipality, province=:province, categoryid=:categoryid, subcategoryid=:subcategoryid, datecreated=:datecreated, createdby=:createdby WHERE refid=:refid";

	$stmt = $connection->prepare($query);

	$dataArray = array(
			':refid' 			=> $data->refid,
			':firstname' 		=> $data->firstname,
			':middlename'		=> $data->middlename,
			':lastname' 		=> $data->lastname,
			':contact' 			=> $data->contact,
			':address' 			=> $data->address,
			':municipality' 	=> $data->municipality,
			':province' 		=> $data->province,
			':categoryid' 		=> $data->categoryid,
			':subcategoryid' 	=> $data->subcategoryid,
			':datecreated' 		=> $data->datecreated,
			':createdby' 		=> $data->createdby

		);

	$stmt->execute($dataArray);
?>
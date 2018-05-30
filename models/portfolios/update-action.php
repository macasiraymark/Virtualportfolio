<?php 
	//Call of Load Database configuration
	require '../../config/database.php';

  $data = json_decode(file_get_contents("php://input"));

	$query = "UPDATE tbl_portfolios SET agriculturistid=:agriculturistid, filename=:filename, dateposted=:dateposted, postedby=:postedby, category=:category, subcategory=:subcategory WHERE refid=:refid";

	$stmt = $connection->prepare($query);

	$dataArray = array(
			':refid' 			=> $data->refid,
			':agriculturistid' 	=> $data->agriculturistid,
			':filename'			=> $data->filename,
			':dateposted' 		=> $data->dateposted,
			':postedby' 		=> $data->postedby,
			':category' 		=> $data->category,
			':subcategory' 		=> $data->subcategory,


		);

	$stmt->execute($dataArray);
?>
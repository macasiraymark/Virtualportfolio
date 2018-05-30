<?php 
	require '../../config/database.php';

	
	$query = "SELECT t1.refid, t1.agriculturistid, t1.address, t1.longitude, t1.latitude, t1.active, t1.farmtype, t2.firstname, t2.lastname FROM tbl_farmlocations AS t1 LEFT JOIN tbl_agriculturist AS t2 ON t2.refid=t1.agriculturistid";

	$stmt = $connection->prepare($query);
	$stmt->execute(array());

	while($row = $stmt->fetch()){
		$data[] = $row;
	}

	if(!empty($data)) {
		
		print json_encode($data);
	}
?>
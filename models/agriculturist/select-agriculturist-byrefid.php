<?php 
	require '../../config/database.php';

	$refid = $_GET['agriculturistid'];

	$query = "SELECT t1.refid, t1.firstname, t1.middlename, t1.lastname, t1.contact, t1.address, t1.municipality, t1.province, t1.active, t1.categoryid, t1.subcategoryid, t2.title, t3.title AS SubCategory FROM tbl_agriculturist AS t1 LEFT JOIN tbl_category AS t2 ON t1.categoryid = t2.refid LEFT JOIN tbl_subcategory AS t3 ON t1.subcategoryid=t3.refid WHERE t1.refid=:refid";

	$stmt = $connection->prepare($query);
	$stmt->execute(array(':refid' => $refid ));

	while($row = $stmt->fetch()){	
		$data[] = $row;
	}

	print json_encode($data);
?>
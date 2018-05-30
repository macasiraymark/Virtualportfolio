<?php 
	require '../../config/database.php';

	$agriculturistid = $_GET['agriculturistid'];

	
	// $query = "SELECT t1.refid, t1.agriculturistid, t1.address, t1.longitude, t1.latitude, t1.farmtype,   t3.title AS category, t4.title AS subcategory FROM tbl_portfolios AS t1  LEFT JOIN tbl_category AS t3 ON t3.refid=t1.categoryid LEFT JOIN tbl_subcategory AS t4 ON t4.refid=t1.subcategoryid WHERE t1.agriculturistid=:agriculturistid";
	
	 $query = "SELECT refid, agriculturistid, address, longitude, latitude, active, farmtype FROM tbl_farmlocations WHERE agriculturistid=:agriculturistid";

	$stmt = $connection->prepare($query);
	$stmt->execute(array(':agriculturistid' => $agriculturistid));

	while($row = $stmt->fetch()){
		$data[] = $row;
	}

	if(!empty($data)){
		print json_encode($data);
	}
?>
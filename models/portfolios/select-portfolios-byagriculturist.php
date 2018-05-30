<?php 
	require '../../config/database.php';

	$agriculturistid = $_GET['agriculturistid'];
  
	$query = "SELECT t1.refid, t1.agriculturistid, t1.filename, t1.dateposted, t1.postedby, t1.categoryid, t1.subcategoryid,  t3.title AS category, t4.title AS subcategory FROM tbl_portfolios AS t1  LEFT JOIN tbl_category AS t3 ON t3.refid=t1.categoryid LEFT JOIN tbl_subcategory AS t4 ON t4.refid=t1.subcategoryid WHERE t1.agriculturistid=:agriculturistid";

	$stmt = $connection->prepare($query);
	$stmt->execute(array(':agriculturistid' => $agriculturistid));

	while($row = $stmt->fetch()){	
		$data[] = $row;
	}

	print json_encode($data);
?>
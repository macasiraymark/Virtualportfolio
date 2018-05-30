<?php 
	require '../../config/database.php';
  
	$query = "SELECT t1.refid, t1.agriculturistid, t1.filename, t1.dateposted, t1.postedby, t1.categoryid, t1.subcategoryid, t2.firstname, t2.lastname, t3.title AS category, t4.title AS subcategory FROM tbl_portfolios AS t1 LEFT JOIN tbl_agriculturist AS t2 ON t2.refid=t1.agriculturistid LEFT JOIN tbl_category AS t3 ON t3.refid=t1.categoryid LEFT JOIN tbl_subcategory AS t4 ON t4.refid=t1.subcategoryid";

	$stmt = $connection->prepare($query);
	$stmt->execute(array());

	while($row = $stmt->fetch()){	
		$data[] = $row;
	}

	print json_encode($data);
?>
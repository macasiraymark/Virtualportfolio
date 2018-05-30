<?php 
	require '../../config/database.php';

	
	$query = "SELECT t1.refid, t1.categoryid, t1.title, t1.description, t1.datecreated, t1.createdby, t2.title AS category FROM tbl_subcategory AS t1 LEFT JOIN tbl_category AS t2 ON t1.categoryid=t2.refid";

	// no Alias, come up with error
	// $query = "SELECT refid, categoryid, title, description, datecreated,createdby, title AS category FROM tbl_subcategory AS t1 LEFT JOIN tbl_category AS t2 ON categoryid = refid";

	$stmt = $connection->prepare($query);
	$stmt->execute();

	while($row = $stmt->fetch()){
		$data[] = $row;
	}

	print json_encode($data);
?>
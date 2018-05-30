<?php
	require '../../config/database.php';

	$query = "SELECT userid, firstname, middlename, lastname, contactnumber, address, municipality, sector, email, password, acct_type, active, attempts FROM tbl_accounts";

	$stmt = $connection->prepare($query);
	$stmt->execute(array());

	while($row = $stmt->fetch()) {
		$data[] = $row;
	}

	print json_encode($data);

?>

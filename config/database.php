<?php 
	$DB_HOST = "localhost";
	$DB_USER = "root";
	$DB_PASS = "";
	$DB_NAME = "db_virtualportfolio";

	try {
		$connection = new PDO("mysql:host=$DB_HOST;dbname=$DB_NAME", $DB_USER, $DB_PASS);
		$connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		
	} 
	catch (PDOException $e) {
		echo $e->getMessage();
	}
?>
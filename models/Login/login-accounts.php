<?php

	require '../../config/database.php';

	$data = json_decode(file_get_contents("php://input"));

	$email 		= $data->email;
	$password 	= $data->password;


	$query = "SELECT userid, firstname, middlename, lastname, email, password, acct_type FROM tbl_accounts WHERE email=:email AND active=1";


	$stmt = $connection->prepare($query);
	$stmt->execute(array(':email' => $email ));


	$rowCount = $stmt->rowCount();


	if($rowCount > 0) {

		$row = $stmt->fetch(PDO::FETCH_ASSOC); 

		$userid 			= $row['userid'];
	    $firstname 			= $row['firstname'];
	    $lastname 			= $row['lastname'];
	    $stored_hash 		= $row['password']; //take note of this stored hash
	    $acct_type 			= $row['acct_type'];
		

		
		if(password_verify($password, $stored_hash)) {

			session_start();
			$sess_array = array(
                    'userid'        => $userid,
                    'firstname'     => $firstname,
                    'lastname'         => $lastname,
                    'email'         => $email,
                    'acct_type'         => $acct_type,
                  );
		    $_SESSION["sess_data"] = $sess_array;
		      
		    print json_encode($acct_type);

		} 

	}	
?>
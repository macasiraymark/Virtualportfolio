<?php
if ($_FILES["file"]["error"] > 0)
{
    echo "Error: " . $_FILES["file"]["error"] . "<br>";
}
else
{
    echo "Upload: " . $_FILES["file"]["name"] . "<br>";
    echo "Type: " . $_FILES["file"]["type"] . "<br>";
    echo "Size: " . ($_FILES["file"]["size"] / 1024) . " Kb<br>";
    //echo "Stored in: " . $_FILES["file"]["tmp_name"];
	$a=$_FILES["file"]["tmp_name"];
	//echo $a;
	
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
//your database name


// path where your CSV file is located
//define('CSV_PATH','C:/xampp/htdocs/');
//<!-- C:\\xampp\\htdocs -->
// Name of your CSV file
$csv_file = $a;

if (($getfile = fopen($csv_file, "r")) !== FALSE) {
         $data = fgetcsv($getfile, 1000, ",");
   while (($data = fgetcsv($getfile, 1000, ",")) !== FALSE) {
     //$num = count($data);
	   //echo $num;
        //for ($c=0; $c < $num; $c++) {
            $result = $data;
        	$str = implode(",", $result);
        	$slice = explode(",", $str);

            $col1 = $slice[0];
            $col2 = $slice[1];
            $col3 = $slice[2];
			$col4 = $slice[3];
            $col4 = $slice[4];
            $col4 = $slice[5];
            $col4 = $slice[6];
            $col4 = $slice[7];
            $col4 = $slice[8];

$query = "INSERT INTO tbl_agriculturist(firstname, middlename, lastname ,contact, address, municipality, province,categoryid, subcategoryid) VALUES('".$col1."','".$col2."','".$col3."','".$col4."','".$col5."','".$col5."','".$col6."','".$col7."','".$col8."')";
$s=mysql_query($query, $connect );
}
}
echo "<script>alert('Record successfully uploaded.');window.location.href='agriculturist.php';</script>";
//echo "File data successfully imported to database!!";
mysql_close($connect);
}
?>
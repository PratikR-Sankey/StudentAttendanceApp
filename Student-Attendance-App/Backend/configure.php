<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Content-Type: application/json');
 
  $db_username = 'root';
 $db_password = '';
 $db_name = 'studentattendanceapp';
 $db_host = 'localhost';				
$con = new mysqli($db_host, $db_username, $db_password,$db_name);
 
if ($con->connect_error) {
    die('Error : ('. $con->connect_errno .') '. $con->connect_error);
}
?>
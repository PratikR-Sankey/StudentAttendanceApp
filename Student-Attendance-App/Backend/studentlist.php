<?php
include("configure.php");
header('Content-Type: application/json');
header('Access-Control-Allow-Headers: Access-Control-Allow-Origin, Content-Type');
header('Access-Control-Allow-Origin: *');

header('Content-Type: application/json');

function does_user_exist($division)
{
    $con=mysqli_connect("localhost","root","","studentattendanceapp");
    $qry="select username from registration where division='$division'";
    $result=mysqli_query($con,$qry);
    while($row = mysqli_fetch_array($result)) {
        $studentlist[] = $row['username'];
}
         echo json_encode($studentlist);
}
$jsonText = file_get_contents('php://input');
$json = json_decode($jsonText);
$con=mysqli_connect("localhost","root","","studentattendanceapp");
$division = mysqli_real_escape_string($con, trim($json->division));
if(isset($division))
     {
        if (!empty($division)) 
        {
            does_user_exist($division);
        }
        else 
        {
            $json->status=100;
            $json->message='You must fill all the fields';
            unset($json->type);
            echo json_encode($json);
   }
     }
?>
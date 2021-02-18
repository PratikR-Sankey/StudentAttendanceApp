
<?php
include('Database.php');
header('Content-Type: application/json');

 $jsonText = file_get_contents('php://input');
   $json = json_decode($jsonText,true);
 foreach ($json as $row) {
$qry="select id,username,email from registration where email='".$row["email"]."' and password='".$row["password"]."'";

$result=mysqli_query($connect,$qry);

$total_rows = mysqli_num_rows($result);

if ($total_rows == 1) {

   $json['status']=200;
     	$json['message']='Sign In Success';
     	unset($json[0]);
     	 echo json_encode($json);
        
    while($row = mysqli_fetch_assoc($result))  
           {  
                $json_array[] = $row;  
           }
           echo json_encode($json_array);  

}
else {

    $response["failed"] = 1;

    echo json_encode($response);
}
}
?>
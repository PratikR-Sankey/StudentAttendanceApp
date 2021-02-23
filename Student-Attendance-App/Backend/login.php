<?php
include("configure.php");
header('Content-Type: application/json');
header('Access-Control-Allow-Headers: Access-Control-Allow-Origin, Content-Type');
header('Access-Control-Allow-Origin: *');

header('Content-Type: application/json');

function does_user_exist($password,$email)
{
$con=mysqli_connect("localhost","root","","studentattendanceapp");
$qry="select id,username,email from registration where email='$email' and password='$password'";
$data=array();
$result=mysqli_query($con,$qry);
$total_rows = mysqli_num_rows($result);

if ($total_rows == 1) {
$row = mysqli_fetch_assoc($result); 
array_push($data, array("id"=>$row['id'],"username:"=>$row['username'],"email:"=>$row['email'],));

   $json['Status']=200;
     	$json['Message']='Sign In Success';
      $json['Data']=$data;
      unset($json[0]);
     	 echo json_encode($json);
}
else {

    $json['Status']=400;
    $json['Message']='Wrong email or password';
    echo json_encode($json);
}
}

$jsonText = file_get_contents('php://input');
   $json = json_decode($jsonText);
   $con=mysqli_connect("localhost","root","","studentattendanceapp");
      $email = mysqli_real_escape_string($con, trim($json->email));
     $password = mysqli_real_escape_string($con, trim($json->password));
     if(isset($email,$password))
     {
  if (!filter_var($email, FILTER_VALIDATE_EMAIL)) 
  {
  $json->status=401;
     $json->message='Invalid Email Format.';
     unset($json->password);
     unset($json->email);
     echo json_encode($json);
  }
  elseif (! preg_match('/^[a-zA-Z0-9]{3,}$/', $password)) 
   {
     $json->status=401;
     $json->message='Password must be longer than 3 characters.';
     unset($json->password);
     unset($json->email);
     echo json_encode($json);
  }
  elseif (!empty($email)  && !empty($password)) 
  {
      does_user_exist($password,$email);
    }
    else 
   {
     $json->status=100;
     $json->message='You must fill all the fields';
     unset($json->password);
     unset($json->email);     
     echo json_encode($json);
   }
  } 
?>
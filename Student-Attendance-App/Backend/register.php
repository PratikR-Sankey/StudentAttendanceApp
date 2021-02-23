
<?php

header('Content-Type: application/json');
header('Access-Control-Allow-Headers: Access-Control-Allow-Origin, Content-Type');
header('Access-Control-Allow-Origin: *');

function does_user_exist($username,$password,$email,$mobile,$type,$division)
{
	$con=mysqli_connect("localhost","root","","studentattendanceapp");
$query = "SELECT * FROM `registration` WHERE email='$email'";
$result=mysqli_query($con,$query);
if(mysqli_num_rows($result)>0)
{
	$json['status']=400;
	$json['message']=' Sorry '.$email.' is already exist.';
   echo json_encode($json);
   mysqli_close($con);
}
else
{
	$sql = "INSERT INTO `registration`(`username`, `password`, `email`, `mobile`, `type`, `division`) VALUES ('$username', '$password', '$email', '$mobile', '$type', '$division')";

	$is_inserted=mysqli_query($con,$sql);
   if($is_inserted == 1)
   {
		$json['status']=200;
     	$json['message']='Account created, Welcome '.$username;
 	}
	else 
	{
		$json['status']=401;
     	$json['message']='Something Went wrong';
    }
   echo json_encode($json);
   mysqli_close($con);
}
}

   $jsonText = file_get_contents('php://input');
   $json = json_decode($jsonText);
   $con=mysqli_connect("localhost","root","","studentattendanceapp");
    
  $username = mysqli_real_escape_string($con, trim($json->username));
  $password = mysqli_real_escape_string($con, trim($json->password));
  $email = mysqli_real_escape_string($con, trim($json->email)); 
  $mobile = mysqli_real_escape_string($con, (int)$json->mobile);
  $type = mysqli_real_escape_string($con, trim($json->type));
  $division = mysqli_real_escape_string($con, trim($json->division));
    
   	if(isset($username,$email,$mobile,$type,$password,$division))
{
   
   if (! preg_match ("/^[a-zA-Z]*$/", $username)) 
   {
     $json->status=401;
     $json->message='Only alphabets are allowed.';
     unset($json->password);
     unset($json->email); 
     unset($json->username);
     unset($json->type);
     unset($json->mobile);
     unset($json->division);    
     echo json_encode($json);
	}
	elseif (! preg_match ("/^[0-9]{10}+$/", $mobile) ) 
   {
    $json->status=401;
     $json->message='Only 10 digit mobile number  is allowed.';
     unset($json->password);
     unset($json->email);  
     unset($json->username);
     unset($json->type);
     unset($json->mobile);
     unset($json->division);    
     
     echo json_encode($json);
	}
	elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) 
	{
   $json->status=401;
     $json->message='Invalid Email Format.';
     unset($json->password);
     unset($json->email);   
     unset($json->username);
     unset($json->type);
     unset($json->mobile);
     unset($json->division);    
     
     echo json_encode($json);
	}
	elseif (! preg_match('/^[a-zA-Z0-9]{3,}$/', $password)) 
   {
   	 $json->status=401;
     $json->message='Password must be longer than 3 characters.';
     unset($json->password);
     unset($json->email);
     unset($json->username);
     unset($json->type);
     unset($json->mobile);
     unset($json->division);    
     
     echo json_encode($json);
	}
 	elseif (!empty($username) && !empty($email) && !empty($mobile) && !empty($type) && !empty($password) && !empty($division)) 
 	{
     does_user_exist($username,$password,$email,$mobile,$type,$division);
    }
  
   else 
   {
	$json->status=100;
     $json->message='You must fill all the fields';
     unset($json->password);
     unset($json->email);     
     unset($json->username);
     unset($json->type);
     unset($json->mobile);
     unset($json->division);    
     
     echo json_encode($json);
      }
 }
?> 

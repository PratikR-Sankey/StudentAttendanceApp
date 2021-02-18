
<?php
header('Content-Type: application/json');

function does_user_exist($username,$password,$email,$mobile,$type,$division)
{
    include('Database.php');
$query = "SELECT * FROM `registration` WHERE email='$email'";
$result=mysqli_query($connect,$query);
if(mysqli_num_rows($result)>0)
{
	$json['status']=400;
	$json['message']=' Sorry '.$email.' is already exist.';
   echo json_encode($json);
   mysqli_close($connect);
}
else
{
	$sql = "INSERT INTO `registration`(`username`, `password`, `email`, `mobile`, `type`, `division`) VALUES ('$username', '$password', '$email', '$mobile', '$type', '$division')";

	$is_inserted=mysqli_query($connect,$sql);
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
   $json = json_decode($jsonText,true);
   foreach ($json as $row) 
   {
			does_user_exist($row['username'],$row['password'],$row['email'],$row['mobile'],$row['type'],$row['division']);
 		
	}
   	

	
/*if(isset($username,$email,$mobile,$type,$password,$division))
{
   
   if (! preg_match ("/^[a-zA-z]*$/", $username) ) 
   {
	 $json['status']=401;
     $json['message']='Only alphabets and whitespace are allowed.';
     echo json_encode($json);
	}
	elseif (! preg_match ("/^[0-9]{10}+$/", $mobile) ) 
   {
   	 $json['status']=401;
     $json['message']='Only 10 digit numeric value is allowed.';
     echo json_encode($json);
	}
	elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) 
	{
	$json['status']=401;
     $json['message']='Invalid Email Format.';	
     echo json_encode($json);
	}
 	elseif (!empty($username) && !empty($email) && !empty($mobile) && !empty($type) && !empty($password) && !empty($division)) 
 	{
     does_user_exist($username,$password,$email,$mobile,$type,$division);
    }
  
   else 
   {
	$json['status']=100;
     $json['message']='You must fill all the fields';
     echo json_encode($json);
   }
 }
 */ 
?> 
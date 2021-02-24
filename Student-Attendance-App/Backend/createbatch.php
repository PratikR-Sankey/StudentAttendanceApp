<?php
include("configure.php");
header('Content-Type: application/json');
header('Access-Control-Allow-Headers: Access-Control-Allow-Origin, Content-Type');
header('Access-Control-Allow-Origin: *');

header('Content-Type: application/json');

function does_user_exist($s_name,$s_division,$s_student_list,$s_date,$s_time,$s_type)
{
	$con=mysqli_connect("localhost","root","","studentattendanceapp");
$query = "SELECT * FROM `createsession` WHERE s_name='$s_name' and s_date='$s_date' and s_time='$s_time'";
$result=mysqli_query($con,$query);
if(mysqli_num_rows($result)>0)
{
	$json['status']=400;
	$json['message']=' Sorry '.$s_name.' Batch is already created on same date and time';
   echo json_encode($json);
   mysqli_close($con);
}
else
{
	$sql="INSERT INTO `createsession`(`s_name`, `s_division`, `s_student_list`, `s_date`, `s_time`, `s_type`) VALUES ('$s_name','$s_division','$s_student_list','$s_date','$s_time','$s_type')";
	$sql1="INSERT INTO `createsession`(`s_name`, `s_division`, `s_student_list`, `s_date`, `s_time`, `s_type`) VALUES ()";
	//echo $sql;
	$is_inserted=mysqli_query($con,$sql);
	echo $is_inserted;
   if($is_inserted == 1)
   {
		$json['status']=200;
     	$json['message']='Batch created';
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

   $s_name = mysqli_real_escape_string($con, trim($json->s_name));
   $s_division = mysqli_real_escape_string($con, trim($json->s_division));
   $s_student_list = mysqli_real_escape_string($con, trim($json->s_student_list)); 
   $s_date = $json->s_date;
   $s_time = mysqli_real_escape_string($con, trim($json->s_time));
   $s_type = mysqli_real_escape_string($con, trim($json->s_type));

   if(isset($s_name,$s_division,$s_student_list,$s_date,$s_time,$s_type))
     {
     	if (! preg_match ("/^[a-zA-Z]*$/", $s_name)) 
   		{
    		 $json->status=401;
     		 $json->message='Only alphabets are allowed.';
     		 unset($json->s_name);
     		 unset($json->s_division); 
     		 unset($json->s_student_list);
     		 unset($json->s_date);
     		 unset($json->s_time);
     		 unset($json->s_type);    
     		 echo json_encode($json);
		}
		elseif (!empty($s_name) && !empty($s_division) && !empty($s_student_list) && !empty($s_date) && !empty($s_time) && !empty($s_type)) 
 		{
     		does_user_exist($s_name,$s_division,$s_student_list,$s_date,$s_time,$s_type);
    	}
    	else 
 	    {
			$json->status=100;
      		$json->message='You must fill all the fields';
     		unset($json->s_name);
     		unset($json->s_division); 
     		unset($json->s_student_list);
     		unset($json->s_date);
     		unset($json->s_time);
     		unset($json->s_type);    
    		echo json_encode($json);
 	    }

     }

?>
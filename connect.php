<?php
$con= new mysqli("localhost","vinam","vinam","vuejs");
if($con->connect_error){
	die("not connected to database"); 
}
$res=array('error'=>false);
$action='read';
if(isset($_GET['action'])){
	$action=$_GET['action'];
}

if($action=='read')
{
	$result=$con->query("select * from `user`");
	$users=array();
	while($row=$result->fetch_assoc()){
		array_push($users,$row);
	}
	$res['users']=$users;
}


if($action=='create')
{	

	$username=$_POST['username'];
	$email=$_POST['email'];
	$mobile=$_POST['mobile'];
	$result=$con->query("insert into `user` (`username`,`email`,`mobile`) values('$username','$email','$mobile')");
	if($result){
		$res['message']="User details added successfully ";
	}
	else{
		$res['error']=true;
		$res['message']="Please try again";
	}
	$res['users']=$users;
}


if($action=='update')
{	
	$id=$_POST['id'];
	$username=$_POST['username'];
	$email=$_POST['email'];
	$mobile=$_POST['mobile'];
	echo $id;
	echo $result=$con->query("update `user` set `username`='$username',`email`='$email',`mobile`='$mobile' where `id`='$id'");
	if($result){
		$res['message']="User details updated successfully ";
	}
	else{
		$res['error']=true;
		$res['message']="Please try again";
	}
	$res['users']=$users;
}


if($action=='delete')
{	
	$id=$_POST['id'];
	echo $result=$con->query("delete from `user` where `id`='$id'");
	if($result){
		$res['message']="User details deleted successfully ";
	}
	else{
		$res['error']=true;
		$res['message']="Please try again";
	}
	$res['users']=$users;
}

header("Content_type: application/json");
echo json_encode($res);
$con->close;

?>
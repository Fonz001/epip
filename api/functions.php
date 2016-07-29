<?php

function insert_share( $creatorId, $url, $userId, $title, $comment )
{
	global $con;

	$creatorId 	=  get_user_id( $creatorId );

	$query 		=  $con->prepare( "INSERT INTO  `shares` (`date` ,`url` ,`creatorId`,`userId` ,`title` ,`comment`) VALUES (NOW(), :url,  :creatorId, :userId, :title, :comment)" );
	$query      -> bindValue('url',    		$url?$url:'', 				PDO::PARAM_STR);
	$query      -> bindValue('creatorId', 	$creatorId?$creatorId:'', 	PDO::PARAM_STR);
	$query      -> bindValue('userId', 		$userId?$userId:'', 		PDO::PARAM_STR);
	$query      -> bindValue('title',  		$title?$title:'', 			PDO::PARAM_STR);
	$query      -> bindValue('comment',   	$comment?$comment:'', 		PDO::PARAM_STR);
	$query 		-> execute();
}

function delete_share( $url, $userId )
{
	global $con;

	$query 		=  $con->prepare( "DELETE FROM `shares` WHERE `url`=:url AND `userId`=:userId" );
	$query      -> bindValue('url',    		$url?$url:'', 			PDO::PARAM_STR);
	$query      -> bindValue('userId', 		$userId?$userId:'', 	PDO::PARAM_STR);
	$query 		-> execute();
}

function set_user_data( $apiId, $name  )
{
	global $con;

	$userId 	=  get_user_id( $apiId );

	$query 		=  $con->prepare( "UPDATE `users` SET `name` = :name WHERE `userId` = :userId LIMIT 1;" );
	$query      -> bindValue('userId', $userId?$userId:'', PDO::PARAM_STR);
	$query      -> bindValue('name', $name?$name:'', PDO::PARAM_STR);
	$query 		-> execute();
}

function set_user_id( $apiId )
{
	global $con;

	$query 		=  $con->prepare( "INSERT INTO  `users` ( `apiId` ) VALUES (:apiId)" );
	$query      -> bindValue('apiId', $apiId?$apiId:'', PDO::PARAM_STR);
	$query 		-> execute();

	return $con->lastInsertId();
}

function get_user_id( $apiId )
{
	global $con;

	$query 		=  $con->prepare( "SELECT `userId` FROM `users` WHERE `apiId`=:apiId" );
	$query      -> bindValue('apiId',    $apiId?$apiId:'', PDO::PARAM_STR);
	$query 		-> execute();
	$res 		=  $query->fetch(PDO::FETCH_OBJ);
	
	if(!isset($res->userId)) return set_user_id( $apiId ); // SET USER ID IF NOT EXIST

	return isset($res->userId)?$res->userId:false;
}

function get_users(  )
{
	global $con;

	$query 		= $con->prepare( "SELECT * FROM `users` " );
	$query 		-> execute();
	$users 		= $query->fetchAll(PDO::FETCH_ASSOC);
	$result 	= array();

	foreach ($users as $user) {
		$result[$user['userId']] = $user;
	}

	return $result;
}

function get_user( $apiId )
{
	global $con;

	$query 		= $con->prepare( "SELECT * FROM `users` WHERE `apiId`=:apiId");
	$query      -> bindValue('apiId',    $apiId?$apiId:'', PDO::PARAM_STR);
	$query 		-> execute();
	return 		$query->fetch(PDO::FETCH_OBJ);
}

function get_shares( $apiId )
{
	global $con;

	$userId 	=  get_user_id( $apiId );
	$query 		=  $con->prepare( "SELECT * FROM `shares` WHERE `userId`=:userId ORDER BY  `date` DESC" );
	$query      -> bindValue('userId',    $userId, PDO::PARAM_STR);
	$query 		-> execute();
	$result 	=  $query->fetchAll(PDO::FETCH_OBJ);

	return $result;
}

function get_shared( $shares, $url )
{
	global $con;

	$query 		=  $con->prepare( "SELECT * FROM `shares` WHERE `url`=:url" );
	$query      -> bindValue('url',    $url, PDO::PARAM_STR);
	$query 		-> execute();
	$shares 	=  $query->fetchAll(PDO::FETCH_OBJ);

	$result = array();
	foreach ($shares as $share) {
		if($share->url == $url){
			$result[] = $share->userId;
		}
	}
	return $result;
}

?>
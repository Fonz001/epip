<?php

require_once('../config.php');
require_once('../functions.php');

//$_GET['creatorId']='87ed21f557ed632c715a7eedec21e407';

$users   = get_users ( );
$shares  = get_shares( $_GET['creatorId'] );

$shared =  isset( $_GET['url'] ) ? get_shared( $shares , $_GET['url'] ) : null;

print_r(json_encode(
	array(
		'user'		=> get_user( $_GET['creatorId'] ),
		'users'		=> $users,
		'shares'	=> $shares,
		'shared'	=> $shared
	)));

?>
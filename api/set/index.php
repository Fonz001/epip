<?php

require_once('../config.php');
require_once('../functions.php');

// INSERT URL
if( isset($_GET['del']) ){
	delete_share( $_GET['url'], $_GET['user'] );
}elseif( isset($_GET['url']) ){
	insert_share( $_GET['creatorId'], $_GET['url'], $_GET['user'], $_GET['title'], $_GET['comment'] );
}elseif( isset($_GET['name']) ){
	set_user_data( $_GET['creatorId'], $_GET['name'] );
}

print_r(json_encode($_GET));

?>
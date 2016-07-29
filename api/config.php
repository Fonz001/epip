<?php
// DB VARS
$db_user 	= 'samoht_epip';
$db_name 	= 'samoht_epip';
$db_pass 	= 'Gte56E2Ugsd7D!wfc';

// DB CONNECTION
$con = new PDO('mysql:host=localhost;dbname='.$db_name.';charset=utf8', $db_user, $db_pass);
$con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);
$con->setAttribute(PDO::ATTR_ERRMODE, PDO::NULL_EMPTY_STRING);

?>
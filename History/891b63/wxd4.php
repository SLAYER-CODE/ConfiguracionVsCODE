<?php

$FristNumber = 'n';
$SecondNumber = 'a';
$TreeNumber = 'm';
if(isset($_POST['fnumber'])){
	$FristNumber = $_POST['fnumber'];
}

if(isset($_POST['snumber'])){
	$SecondNumber= $_POST['snumber'];
}


if(isset($_POST['tnumber'])){
	$TreeNumber  = $_POST['tnumber'];
}

$myObj->voids = $FristNumber;
$myObj->variable = $SecondNumber;
$myObj->radicando = $TreeNumber;

echo json_encode($myObj);
?>

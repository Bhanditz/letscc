<?php
	require_once('comm/inc.session.php');
	$keyword = $_GET['k']; 
	$type = $_GET['t'];
	$comm = $_GET['c'];
	$deriv = $_GET['d'];
	if ($keyword == '') $body_class = 'init';
	else $body_class = 'search';
	if ($type == '' || $type == 'all') {
		$all_selected = 'selected';
	} else if ($type == 'image') {
		$image_selected = 'selected';
	} else if ($type == 'music') {
		$music_selected = 'selected';
	} else if ($type == 'video') {
		$video_selected = 'selected';
	} else if ($type == 'doc') {
		$doc_selected = 'selected';
	}
	if ($comm == '1') $comm_checked = 'checked';
	if ($deriv == '1') $deriv_checked = 'checked';
?>

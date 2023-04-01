<?php
$filename = '/home/q/quasia/quasi-art.ru/core/cache/logs/error.log';
$code = 'gnwv4ngy3o8nliaejg833';
$die = true;
if (isset($_GET['code']) && $_GET['code'] == $code) {
	$die = false;
} elseif ($argc == 2 && $argv[1] == $code) {
    $die = false;
}
if ($die) {
	die();
}

if (file_exists($filename)) {
	echo 'ok';
	unlink($filename);
} else {
	echo 'non exists';
}

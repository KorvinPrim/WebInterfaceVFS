<?php
//console_log() выводит сообщение из php в консоль браунзера благодаря JS
function consoleLog($data)
{
	if (is_array($data) || is_object($data)) {
		echo ("<script>console.log('php_array: " . json_encode($data) . "');</script>");
	} else {
		echo ("<script>console.log('php_string: " . $data . "');</script>");
	}
}
?>
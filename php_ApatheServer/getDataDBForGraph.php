<?php
include 'getDate.php';
header('Content-Type: application/json');
echo json_encode(getDateDir(), true);
?>
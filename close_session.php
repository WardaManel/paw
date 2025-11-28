<?php
require "db_connect.php";
$conn = connectDB();

$session_id = $_POST["session_id"];

$sql = "UPDATE attendance_sessions SET status='closed' WHERE id=?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $session_id);
$stmt->execute();

echo "Session closed!";
?>

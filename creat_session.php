<?php
require "db_connect.php";
$conn = connectDB();

$course_id = $_POST["course_id"];
$group_id = $_POST["group_id"];
$professor = $_POST["professor"];

$date = date("Y-m-d");

$sql = "INSERT INTO attendance_sessions (course_id, group_id, date, opened_by, status)
        VALUES (?, ?, ?, ?, 'open')";
$stmt = $conn->prepare($sql);
$stmt->bind_param("iisi", $course_id, $group_id, $date, $professor);
$stmt->execute();

echo "Session created. ID = " . $stmt->insert_id;
?>

<?php
require "db_connect.php";
$conn = connectDB();

$id = $_POST["id"];

$sql = "DELETE FROM students WHERE id=?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id);
$stmt->execute();

echo "Student deleted!";
?>

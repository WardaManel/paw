<?php
require "db_connect.php";
$conn = connectDB();

$id = $_POST["id"];
$fullname = $_POST["fullname"];
$matricule = $_POST["matricule"];
$group_id = $_POST["group_id"];

$sql = "UPDATE students SET fullname=?, matricule=?, group_id=? WHERE id=?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssii", $fullname, $matricule, $group_id, $id);
$stmt->execute();

echo "Student updated!";
?>

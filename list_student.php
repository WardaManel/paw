<?php
require "db_connect.php";
$conn = connectDB();

$result = $conn->query("SELECT * FROM students");

while ($row = $result->fetch_assoc()) {
    echo $row["id"] . " - " . $row["fullname"] . " - " . $row["matricule"] . " - Group " . $row["group_id"] . "<br>";
}
?>

<?php

function connectDB() {
    $config = include "config.php";

    try {
        $conn = new mysqli(
            $config["host"],
            $config["username"],
            $config["password"],
            $config["database"]
        );

        if ($conn->connect_error) {
            throw new Exception("Connection failed: " . $conn->connect_error);
        }

        return $conn;

    } catch (Exception $e) {
        error_log($e->getMessage(), 3, "db_errors.log");
        return false;
    }
}
?>
